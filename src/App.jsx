import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { GlassTooth, FloatingInstrument, Bubble } from './components/ThreeDModels';

const TestimonialCard = ({ text, author, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2, type: "spring", bounce: 0.4 }}
      viewport={{ once: true }}
      className="glass-card p-8 rounded-2xl flex flex-col justify-between h-full"
    >
      <p className="text-pearl italic text-lg mb-4">"{text}"</p>
      <p className="text-mint font-bold mt-auto">- {author}</p>
    </motion.div>
  );
};

function App() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-pearl/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate">Dra. Eva Romero</h1>
          <button className="btn-3d text-slate">Reserva Cita</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-6xl font-bold text-slate mb-6 leading-tight">
              Tecnología <span className="text-mint">Futurista</span><br />
              Cuidado Humano.
            </h2>
            <p className="text-xl text-slate/70 mb-10 max-w-lg">
              Descubre una nueva era en salud dental. Minimalismo, calma y la tecnología más avanzada para tu sonrisa.
            </p>
            <button className="btn-3d text-slate text-lg glow">
              Reserva tu Primera Visita Gratis
            </button>
          </motion.div>

          <div className="h-[500px] lg:h-[600px] relative">
            <Canvas shadows>
              <color attach="background" args={['#F8F9FA']} />
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <Environment preset="apartment" />
              <ambientLight intensity={1.5} />
              <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
              <pointLight position={[-10, -10, -10]} intensity={1} color="#A8DADC" />
              <GlassTooth />
              <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
              <OrbitControls enableZoom={false} />
            </Canvas>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <Canvas>
            <ambientLight intensity={0.5} />
            <FloatingInstrument position={[-3, 2, -2]} rotation={[Math.PI / 4, 0, 0]} speed={1} />
            <FloatingInstrument position={[3, -2, -1]} rotation={[0, Math.PI / 3, 0]} speed={1.2} />
            <Bubble position={[-2, -3, -3]} size={0.1} />
            <Bubble position={[4, 1, -2]} size={0.15} />
            <Bubble position={[1, 4, -4]} size={0.08} />
          </Canvas>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-pearl relative overflow-hidden">
        <motion.div
          style={{ y: yParallax }}
          className="container mx-auto px-6 text-center"
        >
          <motion.h3
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-slate mb-12"
          >
            Nuestra Filosofía
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Sin Dolor", desc: "Técnicas mínimamente invasivas." },
              { title: "Transparencia", desc: "Honestidad en cada tratamiento." },
              { title: "Diseño", desc: "Espacios diseñados para tu calma." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-white/50 border border-mint/20"
              >
                <h4 className="text-2xl font-bold text-slate mb-4">{item.title}</h4>
                <p className="text-slate/60">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate text-pearl relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <h3 className="text-4xl font-bold mb-16 text-center text-pearl">Lo que dicen nuestros pacientes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <TestimonialCard
              text="Toda la vida acojonao de los dentistas, y ha sido una suerte encontrar está clínica ! El miedo se fue gracias a todas las doctoras de alli! Son estupendas todas !"
              author="Alexandru Istrate"
              index={0}
            />
            <TestimonialCard
              text="Estoy súper contento con el servicio. Son muy profesionales y honestos, utilizan materiales de calidad, lo que da mucha confianza. Me hice un blanqueamiento y el cambio fue increíble."
              author="Arnau Pidelaserra"
              index={1}
            />
            <TestimonialCard
              text="Que mi hija con miedo al dentista salga FELIZ de una hora de tratamiento por un empaste complicado.... ¡No tiene precio! ¡La paciencia y profesionalidad que tienen es de 10!"
              author="Gemma Baladron"
              index={2}
            />
          </div>
        </div>

        {/* Abstract background for testimonials */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
           <Canvas>
             {Array.from({length: 20}).map((_, i) => (
               <Bubble key={i} position={[Math.random() * 10 - 5, Math.random() * 10 - 5, -2]} size={Math.random() * 0.1} />
             ))}
           </Canvas>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-24 bg-pearl text-center border-t border-mint/20">
        <h3 className="text-4xl font-bold text-slate mb-8">¿Listo para sonreír?</h3>
        <button className="btn-3d text-slate text-xl glow scale-110">
          Reserva tu Primera Visita Gratis
        </button>
        <div className="mt-16 text-slate/50">
          <p>&copy; 2024 Clínica Dental Dra. Eva Romero. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
