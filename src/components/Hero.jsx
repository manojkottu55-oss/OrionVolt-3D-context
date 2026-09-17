import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import LOGO_IMG from '../assets/LOGOO.png';
import KIOSK_IMG from '../assets/KIOSKIMG.png';

const Hero = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Motion values for normalized mouse position (-1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid lerped movement
  const springConfig = { damping: 20, stiffness: 100, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Tilt transforms for the kiosk
  const tiltX = useTransform(smoothY, [-1, 1], [15, -15]);
  const tiltY = useTransform(smoothX, [-1, 1], [-15, 15]);

  // Magnetic pull transforms for the logo
  const logoPullX = useTransform(smoothX, [-1, 1], [-15, 15]);
  const logoPullY = useTransform(smoothY, [-1, 1], [-15, 15]);

  // Handle window resize & mouse move
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      if (isMobile) return;
      const { innerWidth, innerHeight } = window;
      // Normalize to -1 to 1
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile, mouseX, mouseY]);

  return (
    <section 
      ref={containerRef}
      className="hero-section"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Background Particles Parallax (Subtle) */}
      <motion.div 
        className="hero-bg"
        style={{
          position: 'absolute',
          inset: -50,
          background: 'radial-gradient(circle at center, rgba(45,212,191,0.05) 0%, rgba(10,16,30,1) 70%)',
          zIndex: 1,
          x: useTransform(smoothX, [-1, 1], [-10, 10]),
          y: useTransform(smoothY, [-1, 1], [-10, 10]),
        }}
      />

      <div 
        className="hero-container"
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          maxWidth: '1400px',
          padding: '2rem',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: isMobile ? '4rem' : '0'
        }}
      >
        {/* LEFT COLUMN: Rotating Kiosk Image */}
        <div 
          className="hero-left"
          style={{
            width: isMobile ? '100%' : '35%',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            perspective: '1200px',
            order: isMobile ? 2 : 1
          }}
        >
          <motion.div
            className="magnetic-hover"
            style={{
              rotateX: isMobile ? 0 : tiltX,
              rotateY: isMobile ? 0 : tiltY,
              transformStyle: 'preserve-3d',
              position: 'relative',
              zIndex: 1
            }}
            whileHover="hover"
            initial="initial"
          >
            {/* Subtle green glow behind kiosk (placed inside to inherit hover) */}
            <motion.div 
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
                width: '60%',
                paddingBottom: '60%',
                background: 'radial-gradient(circle, rgba(74,222,128,0.2) 0%, transparent 70%)',
                filter: 'blur(30px)',
                pointerEvents: 'none',
                zIndex: -1
              }}
              variants={{
                initial: { scale: 1, opacity: 1 },
                hover: { scale: 1.3, opacity: 1.5, background: 'radial-gradient(circle, rgba(74,222,128,0.4) 0%, transparent 70%)' }
              }}
              transition={{ type: 'spring', damping: 15 }}
            />
            
            <motion.div 
              style={{
                animation: 'spin3d 15s linear infinite',
                transformStyle: 'preserve-3d'
              }}
              variants={{
                initial: { scale: 1 },
                hover: { scale: 1.05 }
              }}
            >
              <img 
                src={KIOSK_IMG} 
                alt="OrionVolt Kiosk" 
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0px 20px 30px rgba(0,0,0,0.7))'
                }} 
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Divider */}
        {!isMobile && (
          <div 
            style={{
              width: '1px',
              height: '50vh',
              background: 'linear-gradient(to bottom, transparent, rgba(74,222,128,0.1), transparent)',
              order: 2
            }}
          />
        )}

        {/* CENTER COLUMN: OrionVolt Title */}
        <div 
          className="hero-center"
          style={{
            width: isMobile ? '100%' : '30%',
            textAlign: 'center',
            order: isMobile ? 1 : 3
          }}
        >
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
          >
            <motion.h1 
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 800,
                marginBottom: '1rem',
                lineHeight: 1.1,
                letterSpacing: '-0.02em'
              }}
              className="shiny-text"
            >
              OrionVolt
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                color: 'var(--text-muted)',
                fontWeight: 500
              }}
            >
              Smart EV Charging, Simplified
            </motion.p>
          </motion.div>
        </div>

        {/* Divider */}
        {!isMobile && (
          <div 
            style={{
              width: '1px',
              height: '50vh',
              background: 'linear-gradient(to bottom, transparent, rgba(74,222,128,0.1), transparent)',
              order: 4
            }}
          />
        )}

        {/* RIGHT COLUMN: Logo */}
        <div 
          className="hero-right"
          style={{
            width: isMobile ? '100%' : '35%',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            order: 5
          }}
        >
          <motion.div
            className="magnetic-hover"
            style={{
              x: isMobile ? 0 : logoPullX,
              y: isMobile ? 0 : logoPullY,
              position: 'relative'
            }}
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity, delay: 1 }}
            whileHover={{ scale: 1.08 }}
          >
            {/* Soft glow ring on hover */}
            <motion.div 
              style={{
                position: 'absolute',
                inset: -20,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(74,222,128,0.3) 0%, rgba(45,212,191,0.3) 100%)',
                filter: 'blur(20px)',
                opacity: 0,
                zIndex: 0
              }}
              whileHover={{ opacity: 1, scale: 1.2 }}
              transition={{ type: 'spring', damping: 15 }}
            />
            
            <img 
              src={LOGO_IMG} 
              alt="OrionVolt Logo" 
              style={{
                maxWidth: '200px',
                width: '100%',
                height: 'auto',
                position: 'relative',
                zIndex: 1,
                filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.5))'
              }} 
            />
          </motion.div>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          color: 'var(--accent-teal)'
        }}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;
