import Navbar   from './components/Navbar'
import Hero     from './components/Hero'
import Nosotros from './components/Nosotros'
import Servicios from './components/Servicios'
import Contacto from './components/Contacto'
import Footer   from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Hero />
      <Nosotros />
      <Servicios />
      <Contacto />
      <Footer />
    </div>
  )
}
