import { useState, useEffect } from 'react'

const links = [
  { label: 'Historia',  href: '#hero' },
  { label: 'Nosotros',  href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Contacto',  href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-[#b89a6a]/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo + nombre */}
        <a href="#hero" onClick={(e) => handleNav(e, '#hero')} className="flex items-center gap-3 group">
          {/* Reemplazá el src con tu logo real: src="/img/arufe-logo.jpeg" */}
          <div className="w-10 h-10 rounded-full border border-[#b89a6a]/50 flex items-center justify-center overflow-hidden">
            <img
              src="/img/arufe-logo.png"
              alt="Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentNode.innerHTML = '<span class="text-[#b89a6a] text-xs font-display">A&A</span>'
              }}
            />
          </div>
          <span className="font-display text-lg tracking-widest text-[#e8e0d0] group-hover:text-[#b89a6a] transition-colors duration-300">
            ARUFE<span className="text-[#b89a6a]">&</span>ASOCIADOS
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNav(e, l.href)}
              className="font-['Jost'] text-sm tracking-[0.15em] text-[#c8bfb0] hover:text-[#b89a6a] transition-colors duration-300 relative group"
            >
              {l.label.toUpperCase()}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#b89a6a] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span className={`w-6 h-px bg-[#b89a6a] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`w-6 h-px bg-[#b89a6a] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-px bg-[#b89a6a] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="bg-black/95 border-t border-[#b89a6a]/20 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNav(e, l.href)}
              className="text-sm tracking-[0.15em] text-[#c8bfb0] hover:text-[#b89a6a] transition-colors py-1"
            >
              {l.label.toUpperCase()}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
