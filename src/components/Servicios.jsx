import { useEffect, useRef, useState } from 'react'

const servicios = [
  { num: '01', label: 'Homologaciones de grado en España',            imgSrc: '/img/t1.png' },
  { num: '02', label: 'Homologaciones de especialidades médicas',      imgSrc: '/img/t3.png' },
  { num: '03', label: 'Certificaciones ante organismos nacionales',    imgSrc: '/img/t2.png' },
  { num: '04', label: 'Certificaciones a nivel universitario',         imgSrc: '/img/t4.png' },
  { num: '05', label: 'Certificaciones ante Ministerio de Salud',      imgSrc: '/img/t5.png' },
  { num: '06', label: 'Certificaciones ante Ministerio del Interior',  imgSrc: '/img/t6.png' },
  { num: '07', label: 'Certificaciones mediante Escribano Público',    imgSrc: '/img/t7.png' },
  { num: '08', label: 'Certificaciones ante Colegios Médicos',         imgSrc: '/img/t8.png' },
  { num: '09', label: 'Apostillados express de 24 hs',                 imgSrc: '/img/t9.png' },
]

function useInView(threshold = 0.1) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

function ServiceCard({ num, label, imgSrc, delay }) {
  const [ref, visible] = useInView()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative group overflow-hidden border border-[#b89a6a]/15 hover:border-[#b89a6a]/50 transition-all duration-500 cursor-default ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms`, transitionProperty: 'opacity, transform, border-color' }}
    >
      {/* Fondo imagen tenue */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${hovered ? 'opacity-20' : 'opacity-5'}`}
        style={{
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111]/80 to-[#0a0a0a]/95" />

      {/* Contenido */}
      <div className="relative z-10 p-9">
        <span className="font-display text-[#b89a6a]/30 text-5xl font-light leading-none block mb-4">
          {num}
        </span>
        <div className={`w-8 h-px bg-[#b89a6a] mb-4 transition-all duration-300 ${hovered ? 'w-14' : 'w-8'}`} />
        <p className="font-['Jost'] text-[#c8bfb0] text-xl font-light leading-snug">
          {label}
        </p>
      </div>

      {/* Corner accent */}
      <div
        className={`absolute bottom-0 right-0 w-8 h-8 transition-all duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: 'linear-gradient(135deg, transparent 50%, #b89a6a20 50%)',
        }}
      />
    </div>
  )
}

export default function Servicios() {
  const [titleRef, titleVisible] = useInView()

  return (
    <section id="servicios" className="py-28 px-8 md:px-20 bg-[#080808]">
      <div className="max-w-6xl mx-auto">

        {/* Título */}
        <div
          ref={titleRef}
          className={`mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="text-[#b89a6a] text-xs tracking-[0.4em] uppercase font-['Jost']">
            Lo que hacemos
          </span>
          <h2 className="font-display text-6xl md:text-7xl text-[#f0e8d8] font-light mt-2">
            Servicios
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-[#b89a6a] to-transparent mt-4" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#b89a6a]/10">
          {servicios.map((s, i) => (
            <ServiceCard key={s.num} {...s} delay={i * 60} />
          ))}
        </div>

      </div>
    </section>
  )
}
