import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/layout/CustomCursor';

// Sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Certificates from './components/sections/Certificates';
import GitHub from './components/sections/GitHub';
import Contact from './components/sections/Contact';

// Neo AI
import NeoAssistant from './components/neo/NeoAssistant';

function App() {
  // Hide default cursor on desktop
  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouchDevice) {
      document.body.style.cursor = 'none';
    }
    return () => {
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans">
      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certificates />
        <GitHub />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Neo AI Assistant */}
      <NeoAssistant />
    </div>
  );
}

export default App;
