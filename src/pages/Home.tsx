import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { Stars, Divider } from '../components/ui'
import {
  Hero, About, Experience, Projects,
  // OpenSource,
  Services,
  // Blog,
  Testimonials, Contact,
} from '../sections'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <Stars />
      <Navbar />
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Experience />
      <Divider />
      <Projects />
      <Divider />
      {/* <OpenSource /> */}
      {/* <Divider /> */}
      <Services />
      {/* <Divider /> */}
      {/* <Blog /> */}
      <Divider />
      <Testimonials />
      <Divider />
      <Contact />
      <Footer />
    </div>
  )
}