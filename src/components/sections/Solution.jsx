import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const Solution = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    gsap.fromTo(el, 
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1, 
        scale: 1,
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
    <section 
      ref={sectionRef} 
      className="section" 
      style={{ 
        minHeight: '80vh', 
        display: 'flex', 
        alignItems: 'center',
        background: 'linear-gradient(180deg, rgba(45, 212, 191, 0.02) 0%, rgba(10, 16, 30, 0) 100%)'
      }}
    >
      <div className="container">
        <div 
          ref={contentRef}
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center',
            background: 'var(--bg-card)',
            padding: '4rem',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            border: '1px solid rgba(45, 212, 191, 0.1)'
          }}
        >
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '2rem' }}>
            A <span className="text-gradient">Smarter Way</span> to Charge
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-primary)', lineHeight: 1.8 }}>
            OrionVolt is a smart, vending-machine-style EV charging kiosk that works with or without login. It auto-detects your vehicle's specifications from a simple model selection, lets you pay via dynamic UPI QR in whichever mode suits you, and automatically refunds any unused balance the moment something changes — all monitored live through a unified operator dashboard.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Solution;
