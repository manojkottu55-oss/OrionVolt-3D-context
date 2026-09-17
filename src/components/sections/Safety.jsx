import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const Safety = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(contentRef.current, 
      { opacity: 0, scale: 0.95, y: 50 },
      {
        opacity: 1, scale: 1, y: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top 25%',
          scrub: true
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div 
          ref={contentRef}
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
            background: 'radial-gradient(circle at center, rgba(45, 212, 191, 0.1) 0%, rgba(10, 16, 30, 0) 70%)',
            padding: '4rem 2rem',
            borderRadius: '24px'
          }}
        >
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '2rem' }}>
            Safety <span className="text-gradient">Built Into Every Session</span>
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-primary)', lineHeight: 1.8 }}>
            Each vehicle model's safe operating limits — overvoltage, overcurrent, overtemperature protection — are stored in the Vehicle Master database and actively enforced during charging. The system automatically halts charging if live readings exceed your vehicle's rated safe limits.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Safety;
