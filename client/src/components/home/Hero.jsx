import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileText, Route, ArrowDown } from 'lucide-react';

// --- Helper Component: Particle Background ---
// This component creates the three.js particle animation.
const ParticlesBackground = () => {
  const mountRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // This check ensures the code doesn't run if three.js isn't loaded yet.
    // The script should be included in your main public/index.html file.
    if (!window.THREE) {
      console.error("Three.js script not found. Please add it to your index.html");
      return;
    }

    const THREE = window.THREE;
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Particle creation
    const particleCount = 5000;
    const vertices = [];
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 1000;
      vertices.push(x, y, z);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    
    const material = new THREE.PointsMaterial({
      color: 0x8899ff,
      size: 1.5,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse move listener
    const onMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.0001;
      particles.rotation.y += 0.0002;
      camera.position.x += (mouse.current.x * 10 - camera.position.x) * 0.02;
      camera.position.y += (mouse.current.y * 10 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const onResize = () => {
        if(!currentMount) return;
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 -z-10" style={{ pointerEvents: 'none' }} />;
};


// --- Main Hero Section Component ---
// It now accepts 'onAnalyzeClick' as a prop from Home.jsx
const HeroSection = ({ onAnalyzeClick }) => {
  const navigate = (path) => console.log(`Navigating to: ${path}`);
  
  const typedText = "SkillMatched AI".split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: i * 0.04 },
    }),
  };

  const childVariants = {
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 20, transition: { type: "spring", damping: 12, stiffness: 100 } },
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-50">
      <ParticlesBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-sky-50/80 to-indigo-100/80 -z-10" />
      <div className="relative text-center max-w-4xl mx-auto px-4">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
        >
          Unlock Your Career Potential with
          <motion.span 
            className="block mt-2 md:mt-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-sky-500"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'inline-block' }}
          >
            {typedText.map((char, index) => (
              <motion.span key={index} variants={childVariants} style={{ display: 'inline-block' }}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: "easeInOut" }}
        >
          Your intelligent partner for resume optimization, personalized career roadmaps, and discovering your perfect job match.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8, ease: "easeInOut" }}
        >
          <motion.button
            onClick={onAnalyzeClick} // This now calls the function passed from Home.jsx
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-indigo-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg shadow-indigo-500/20 transition-all duration-300 ease-in-out"
            whileHover={{ scale: 1.05, y: -2, boxShadow: "0px 10px 20px rgba(99, 102, 241, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText size={18} />
            Analyze My Resume
          </motion.button>

          <motion.button
            onClick={() => navigate('/roadmap')}
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-white/80 backdrop-blur-sm text-slate-700 font-semibold px-8 py-3 rounded-full border border-slate-200 shadow-md transition-all duration-300 ease-in-out"
            whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(255, 255, 255, 1)", boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Route size={18} />
            Explore Roadmaps
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 10 }}
          transition={{ delay: 2.5, duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          <ArrowDown className="text-slate-400" />
        </motion.div>
      </div>
    </section>
  );
};

// The component is now correctly exported as the default.
export default HeroSection;
