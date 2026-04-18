import { useState, useEffect } from 'react'



import gif1 from '../assets/gifs/gif1.gif'
import gif2 from '../assets/gifs/gif2.gif'
import gif3 from '../assets/gifs/gif3.gif'
import gif4 from '../assets/gifs/gif4.gif'


const slides = [
  {
    gifSrc: gif1,  
    gradient: 'from-[#1a1408] via-[#0d0d0d] to-[#0a0a0a]', // placeholder
    titulo: 'Arufe y Asociados',
    subtitulo: 'Segunda Generación Familiar',
    texto:
      'Somos la segunda generación familiar dedicada a trámites universitarios de pregrado, grado y postgrado, especializados en homologaciones de títulos argentinos en España y trámites con salida al exterior.',
    num: '01',
  },
  {
    gifSrc: gif2,
    gradient: 'from-[#0d1a14] via-[#0a0d0a] to-[#0a0a0a]',
    titulo: 'Optimizando Recursos',
    subtitulo: 'Eficiencia Comprobada',
    texto:
      'A lo largo de los años hemos aprendido a capitalizar nuestros recursos, convirtiendo gestiones burocráticas engorrosas en trámites simples, en el menor tiempo posible.',
    num: '02',
  },
  {
   gifSrc: gif3,
    gradient: 'from-[#1a1510] via-[#0d0d0a] to-[#0a0a0a]',
    titulo: 'Fomentando Transparencia',
    subtitulo: 'Claridad en Cada Paso',
    texto:
      'Nos interesa que cada cliente sea partícipe y conozca, independientemente de nuestra intervención, qué y cómo se están realizando las gestiones.',
    num: '03',
  },
  {
    gifSrc: gif4,
    gradient: 'from-[#12101a] via-[#0a0a0d] to-[#0a0a0a]',
    titulo: 'Simplicidad en Soluciones',
    subtitulo: 'Años de Trayectoria',
    texto:
      'Nuestros años de experiencia en el mercado nos permiten dar soluciones simples a problemas complejos, acompañando a cada cliente durante todo el proceso.',
    num: '04',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = (idx) => {
    if (animating || idx === current) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent(idx)
      setAnimating(false)
    }, 400)
  }

  const prev = () => goTo((current - 1 + slides.length) % slides.length)
  const next = () => goTo((current + 1) % slides.length)

  // Auto-avance cada 6 segundos
  useEffect(() => {
    const t = setTimeout(() => goTo((current + 1) % slides.length), 6000)
    return () => clearTimeout(t)
  }, [current])

  const slide = slides[current]

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">

      {/* ── FONDO: GIF o gradient placeholder ── */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${animating ? 'opacity-0' : 'opacity-100'}`}
        style={
          slide.gifSrc
            ? {
                backgroundImage: `url(${slide.gifSrc})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : {}
        }
      >
        {/* Gradient placeholder — se oculta automáticamente cuando gifSrc existe */}
        {!slide.gifSrc && (
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />
        )}

        {/* Overlay oscuro semitransparente para que el texto sea legible sobre el GIF */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          }}
        />
      </div>

      {/* ── CONTENIDO ── */}
      <div
        className={`relative z-10 h-full flex flex-col justify-center px-8 md:px-20 max-w-5xl transition-all duration-500 ${
          animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        {/* Número de slide */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-display text-[#b89a6a]/60 text-6xl font-light leading-none select-none">
            {slide.num}
          </span>
          <div className="w-12 h-px bg-[#b89a6a]/40" />
          <span className="text-[#b89a6a] text-xs tracking-[0.3em] uppercase font-['Jost']">
            {slide.subtitulo}
          </span>
        </div>

        {/* Título */}
        <h1 className="font-display text-5xl md:text-7xl text-[#f0e8d8] font-light leading-tight mb-6">
          {slide.titulo}
        </h1>

        {/* Línea dorada */}
        <div className="w-16 h-px bg-gradient-to-r from-[#b89a6a] to-transparent mb-6" />

        {/* Texto */}
        <p className="font-['Jost'] text-[#b0a898] text-lg md:text-xl font-light leading-relaxed max-w-xl"
>
          {slide.texto}
        </p>

        {/* CTA */}
        <a
          href="#contacto"
          onClick={(e) => {
            e.preventDefault()
            document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="mt-10 inline-flex items-center gap-3 text-[#b89a6a] text-sm tracking-[0.2em] uppercase border border-[#b89a6a]/40 px-8 py-3 hover:bg-[#b89a6a]/10 hover:border-[#b89a6a] transition-all duration-300 w-fit"
        >
          Consultar ahora
          <span className="text-lg">→</span>
        </a>
      </div>

      {/* ── CONTROLES ── */}
      <div className="absolute bottom-10 right-8 md:right-20 z-10 flex items-center gap-6">
        <button
          onClick={prev}
          className="w-10 h-10 border border-[#b89a6a]/40 flex items-center justify-center text-[#b89a6a] hover:bg-[#b89a6a]/10 hover:border-[#b89a6a] transition-all duration-300"
          aria-label="Anterior"
        >
          ‹
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 ${
                i === current
                  ? 'w-6 h-px bg-[#b89a6a]'
                  : 'w-2 h-px bg-[#b89a6a]/30 hover:bg-[#b89a6a]/60'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-10 h-10 border border-[#b89a6a]/40 flex items-center justify-center text-[#b89a6a] hover:bg-[#b89a6a]/10 hover:border-[#b89a6a] transition-all duration-300"
          aria-label="Siguiente"
        >
          ›
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-8 md:left-20 z-10 flex flex-col items-center gap-2">
        <span className="text-[#b89a6a]/40 text-xs tracking-[0.3em] uppercase rotate-90 origin-center mb-4">scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#b89a6a]/40 to-transparent" />
      </div>
    </section>
  )
}
