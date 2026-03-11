import { Hero, About, Services, Gallery, Testimonials, Contact } from '../sections';

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Testimonials />
      <Contact />
    </main>
  );
};

export default LandingPage;
