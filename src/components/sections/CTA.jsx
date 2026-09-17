import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import MagicRings from '../MagicRings';

const CTA = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(contentRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1, scale: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 40%',
          scrub: true
        }
      }
    );
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section" 
      style={{ 
        paddingTop: '8rem', 
        paddingBottom: '2rem',
        background: 'linear-gradient(0deg, rgba(45, 212, 191, 0.05) 0%, rgba(10, 16, 30, 0) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Magic Rings Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <MagicRings
          color="#2DD4BF"
          colorTwo="#4ADE80"
          ringCount={5}
          speed={0.8}
          attenuation={10}
          lineThickness={2}
          baseRadius={0.3}
          radiusStep={0.15}
          scaleRate={0.1}
          opacity={0.6}
          blur={0}
          noiseAmount={0.05}
          rotation={0}
          ringGap={1.5}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse={false}
          mouseInfluence={0.1}
          hoverScale={1.1}
          parallax={0.05}
          clickBurst={false}
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div 
          ref={contentRef}
          style={{
            textAlign: 'center',
            marginBottom: '8rem'
          }}
        >
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
            Experience <span className="text-gradient">OrionVolt</span>
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '3rem' }}>
            This is a live, functional prototype — try the full charging flow yourself.
          </p>
          
          <a 
            href="https://orion-volt-userapp.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary magnetic-hover"
          >
            Try OrionVolt Live
            <ArrowRight size={20} />
          </a>
        </div>

        <footer style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '2rem',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.9rem'
        }}>
          OrionVolt · Smart EV Charging Kiosk System
        </footer>
      </div>
    </section>
  );
};

export default CTA;
