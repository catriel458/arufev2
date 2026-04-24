import { useRef, useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'

// ─────────────────────────────────────────────────────────
//  CONFIGURACIÓN EMAILJS
//  1. Creá tu cuenta gratis en https://emailjs.com
//  2. Conectá tu Gmail (arufeyasociados@gmail.com)
//  3. Creá un Email Template con las variables:
//     {{from_name}}, {{from_email}}, {{telefono}}, {{message}}
//  4. Reemplazá los valores de abajo con los tuyos:
// ─────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_qd4sncr'   // ej: 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'template_5lst3bq'  // ej: 'template_xyz456'
const EMAILJS_PUBLIC_KEY  = 'Q7mMMeV9kAn9ZiYf5'   // ej: 'AbCdEfGhIjKlMnOp'

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

export default function Contacto() {
  const [titleRef, titleVisible] = useInView()
  const [formRef, formVisible]   = useInView()
  const formEl = useRef(null)

  const [fields, setFields] = useState({
    from_name: '', from_email: '', telefono: '', message: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) =>
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!fields.from_name || !fields.from_email || !fields.message) return

    setStatus('sending')
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formEl.current,
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setFields({ from_name: '', from_email: '', telefono: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const inputBase = 'w-full bg-transparent border-b border-[#b89a6a]/30 focus:border-[#b89a6a] outline-none py-3 text-[#e8e0d0] font-["Jost"] text-base placeholder:text-[#6a6258] transition-colors duration-300'
  return (
    <section id="contacto" className="py-28 px-8 md:px-20 bg-[#0a0a0a] relative overflow-hidden">

      {/* Decorative large letter */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-[20rem] text-[#b89a6a]/[0.03] leading-none select-none pointer-events-none">
        C
      </div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Título */}
        <div
          ref={titleRef}
          className={`mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="text-[#b89a6a] text-xs tracking-[0.4em] uppercase font-['Jost']">
            Hablemos
          </span>
          <h2 className="font-display text-6xl md:text-7xl text-[#f0e8d8] font-light mt-2">
            Contacto
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-[#b89a6a] to-transparent mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-20">

          {/* Info lado izquierdo */}
          <div
            className={`transition-all duration-700 delay-100 ${titleVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
          >
            <p className="font-['Jost'] text-[#a09888] font-light leading-relaxed mb-12 text-lg">
              Estamos para orientarte en cada paso de tu trámite. Envianos tu consulta
              y nos pondremos en contacto a la brevedad.
            </p>

            <div className="flex flex-col gap-8">
              <div>
                <span className="text-[#b89a6a] text-xs tracking-[0.3em] uppercase font-['Jost'] block mb-1">
                  Email
                </span>
                <a
                  href="mailto:arufeyasociados@gmail.com"
                  className="text-[#c8bfb0] hover:text-[#b89a6a] transition-colors font-['Jost'] text-lg"

                >
                  arufeyasociados@gmail.com
                </a>
              </div>

              <div>
                <span className="text-[#b89a6a] text-xs tracking-[0.3em] uppercase font-['Jost'] block mb-2">
                  Redes sociales
                </span>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/arufeyasociados"
                    target="_blank"
                    rel="noreferrer"
                    className="border border-[#b89a6a]/30 px-4 py-2 text-[#b89a6a] text-xs tracking-[0.2em] uppercase hover:bg-[#b89a6a]/10 hover:border-[#b89a6a] transition-all duration-300 font-['Jost']"
                  >
                    Instagram
                  </a>
                  <a
                    href="#"
                    className="border border-[#b89a6a]/30 px-4 py-2 text-[#b89a6a] text-xs tracking-[0.2em] uppercase hover:bg-[#b89a6a]/10 hover:border-[#b89a6a] transition-all duration-300 font-['Jost']"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="border border-[#b89a6a]/30 px-4 py-2 text-[#b89a6a] text-xs tracking-[0.2em] uppercase hover:bg-[#b89a6a]/10 hover:border-[#b89a6a] transition-all duration-300 font-['Jost']"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div
            ref={formRef}
            className={`transition-all duration-700 delay-200 ${formVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}
          >
            <form ref={formEl} onSubmit={handleSubmit} className="flex flex-col gap-6">

              <div>
                <label className="text-[#b89a6a] text-sm tracking-[0.25em] uppercase font-['Jost'] block mb-2"
>
                  Nombre y Apellido *
                </label>
                <input
                  type="text"
                  name="from_name"
                  value={fields.from_name}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  required
                  className={inputBase}
                />
              </div>

              <div>
                <label className="text-[#b89a6a] text-sm tracking-[0.25em] uppercase font-['Jost'] block mb-2"
>
                  Email *
                </label>
                <input
                  type="email"
                  name="from_email"
                  value={fields.from_email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                  className={inputBase}
                />
              </div>

              <div>
                <label className="text-[#b89a6a] text-sm tracking-[0.25em] uppercase font-['Jost'] block mb-2"
>
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={fields.telefono}
                  onChange={handleChange}
                  placeholder="+54 11 ..."
                  className={inputBase}
                />
              </div>

              <div>
                <label className="text-[#b89a6a] text-sm tracking-[0.25em] uppercase font-['Jost'] block mb-2"
>
                  Motivo de consulta *
                </label>
                <textarea
                  name="message"
                  value={fields.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Contanos brevemente tu consulta..."
                  required
                  className={`${inputBase} resize-none`}
                />
              </div>

              {/* Feedback de estado */}
              {status === 'success' && (
                <p className="text-green-400/80 text-xs tracking-[0.2em] uppercase font-['Jost']">
                  ✓ Mensaje enviado correctamente
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-400/80 text-xs tracking-[0.2em] uppercase font-['Jost']">
                  ✗ Error al enviar — verificá la configuración de EmailJS
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="mt-2 w-full border border-[#b89a6a]/40 py-4 text-[#b89a6a] text-sm tracking-[0.3em] uppercase font-['Jost'] hover:bg-[#b89a6a]/10 hover:border-[#b89a6a] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Enviando...' : 'Enviar consulta'}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
