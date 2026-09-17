import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const Architecture = () => {
  const sectionRef = useRef(null);
  const panelsRef = useRef(null);

  useEffect(() => {
    const panels = panelsRef.current.children;
    gsap.fromTo(panels, 
      { opacity: 0, x: -50 },
      {
        opacity: 1, 
        x: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 20%',
          scrub: true
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="section" style={{ minHeight: '80vh' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '4rem' }}>
          Built on a <span className="text-gradient">Three-Layer Architecture</span>
        </h2>

        <div 
          ref={panelsRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}
        >
          {/* Hardware Layer */}
          <div style={{
            background: 'var(--bg-card)',
            padding: '2.5rem',
            borderRadius: '16px',
            borderLeft: '4px solid var(--accent-green)',
            position: 'relative'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-green)' }}>Hardware Layer</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
              ESP32 microcontroller with voltage and current sensors, relay-controlled charging, and a TFT touchscreen — communicating over MQTT.
            </p>
          </div>

          {/* Backend Layer */}
          <div style={{
            background: 'var(--bg-card)',
            padding: '2.5rem',
            borderRadius: '16px',
            borderLeft: '4px solid var(--accent-teal)'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-teal)' }}>Backend Layer</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
              A Node.js/Express server bridging hardware and software — running all billing and safety calculations, managing a Supabase (PostgreSQL) database, and exposing a REST API.
            </p>
          </div>

          {/* Presentation Layer */}
          <div style={{
            background: 'var(--bg-card)',
            padding: '2.5rem',
            borderRadius: '16px',
            borderLeft: '4px solid #fff'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>Presentation Layer</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Two React web applications — a mobile-first User Website for charging and booking, and an Admin Website for network-wide monitoring.
            </p>
          </div>
        </div>

        <div style={{
          marginTop: '4rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'center'
        }}>
          {['ESP32', 'MQTT (EMQX Cloud)', 'Node.js', 'Express', 'Supabase', 'React', 'Razorpay UPI', 'Render', 'Vercel'].map((badge, i) => (
            <span key={i} style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Architecture;
