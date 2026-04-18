export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#060606] border-t border-[#b89a6a]/15 py-12 px-8 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        <div className="flex items-center gap-3">
          <span className="font-display text-xl text-[#e8e0d0]">
            ARUFE<span className="text-[#b89a6a]">&</span>ASOCIADOS
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <a
            href="mailto:arufeyasociados@gmail.com"
            className="font-['Jost'] text-[#7a7268] text-xs hover:text-[#b89a6a] transition-colors tracking-widest"
          >
            arufeyasociados@gmail.com
          </a>
          <p className="font-['Jost'] text-[#4a4540] text-xs tracking-wider">
            © {year} Arufe y Asociados. Todos los derechos reservados.
          </p>
        </div>

        <div className="flex gap-4">
          {[
            { label: 'IG', href: 'https://www.instagram.com/arufeyasociados' },
            { label: 'LI', href: '#' },
            { label: 'FB', href: '#' },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 border border-[#b89a6a]/20 flex items-center justify-center text-[#b89a6a]/60 hover:text-[#b89a6a] hover:border-[#b89a6a]/60 transition-all duration-300 font-['Jost'] text-xs"
            >
              {s.label}
            </a>
          ))}
        </div>

      </div>
    </footer>
  )
}
