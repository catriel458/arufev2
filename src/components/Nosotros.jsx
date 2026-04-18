import { useEffect, useRef, useState } from 'react'

const items = [
  {
    key: 'objetivo',
    label: 'Objetivo',
    imgSrc: '/img/objetivos.png',
    text: 'Lograr la homologación en grado o especialidad de tu título extranjero en España, para insertarte en el mercado laboral.',
  },
  {
    key: 'vision',
    label: 'Visión',
    imgSrc: '/img/mision.png',
    text: 'Simplificar y brindar conocimiento en procesos de homologaciones dentro del Reino de España, evitando demoras y desembolso de dinero innecesario.',
    reverse: true,
  },
  {
    key: 'mision',
    label: 'Misión',
    imgSrc: '/img/vision.png',
    text: 'Que conozcas cómo es el sistema sin pagar de más y que puedas llevar el proceso de una manera ordenada y responsable, con o sin nuestra asistencia.',
  },
]

function useInView(threshold = 0.2) {
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

function NosotrosItem({ label, imgSrc, text, reverse, idx }) {
  const [ref, visible] = useInView()
  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-10 md:gap-20 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${reverse ? 'md:flex-row-reverse' : ''}`}
      style={{ transitionDelay: `${idx * 100}ms` }}
    >
      {/* Imagen */}
      <div className="relative flex-shrink-0 w-full md:w-72 h-60 md:h-80 overflow-hidden">
        <div className="absolute inset-0 border border-[#b89a6a]/20" />
        <div className="absolute -inset-1 border border-[#b89a6a]/10 -translate-x-2 translate-y-2" />
        <img
          src={imgSrc}
          alt={label}
          className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
          onError={(e) => {
            e.target.src = `https://placehold.co/300x340/111/b89a6a?text=${label}`
          }}
        />
      </div>

      {/* Texto */}
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-display text-[#b89a6a]/30 text-5xl font-light leading-none select-none">
            {String(idx + 1).padStart(2, '0')}
          </span>
          <div className="w-8 h-px bg-[#b89a6a]/40" />
        </div>
        <h3 className="font-display text-5xl text-[#f0e8d8] font-light mb-4">{label}</h3>
        <div className="w-10 h-px bg-gradient-to-r from-[#b89a6a] to-transparent mb-5" />
        <p className="font-['Jost'] text-[#a09888] font-light leading-relaxed text-xl">
          {text}
        </p>
      </div>
    </div>
  )
}

export default function Nosotros() {
  const [titleRef, titleVisible] = useInView()

  return (
    <section id="nosotros" className="py-28 px-8 md:px-20 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">

        {/* Título sección */}
        <div
          ref={titleRef}
          className={`mb-20 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="text-[#b89a6a] text-xs tracking-[0.4em] uppercase font-['Jost']">
            Quiénes somos
          </span>
          <h2 className="font-display text-6xl md:text-7xl text-[#f0e8d8] font-light mt-2">
            Nosotros
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-[#b89a6a] to-transparent mt-4" />
        </div>

        {/* Items */}
        <div className="flex flex-col gap-24">
          {items.map((item, idx) => (
            <NosotrosItem key={item.key} {...item} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  )
}
