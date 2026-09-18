import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const Problem = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    gsap.fromTo(el, 
      { opacity: 0, y: 100 },
      {
        opacity: 1, 
        y: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: true
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div 
          ref={contentRef}
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center'
          }}
        >
          <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 3.5rem)', marginBottom: '2rem' }}>
            Charging Shouldn't Be <span className="text-gradient">This Hard</span>
          </h2>
          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: 'var(--text-muted)', lineHeight: 1.8 }}>
            Public EV charging today means friction, uncertainty, and wasted time. Most networks require app downloads and account creation before you can charge at all. Users are often asked to manually enter technical vehicle details they don't know. When a session is interrupted or overpaid, there's usually no automatic refund — just a slow manual dispute process. And operators running these networks rarely have real visibility into what a kiosk is actually earning versus what it costs to run.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Problem;
