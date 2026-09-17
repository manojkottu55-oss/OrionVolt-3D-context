import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const StepCard = ({ number, text }) => (
  <motion.div 
    className="step-card magnetic-hover"
    whileHover={{ scale: 1.02 }}
    style={{
      display: 'flex',
      gap: '1rem',
      padding: '1.5rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '12px',
      marginBottom: '1rem',
      border: '1px solid rgba(255,255,255,0.05)',
      transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
    }}
    onHoverStart={(e) => {
      e.currentTarget.style.borderColor = 'var(--accent-teal)';
      e.currentTarget.style.boxShadow = '0 4px 20px rgba(45, 212, 191, 0.1)';
    }}
    onHoverEnd={(e) => {
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    <div style={{
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: 'var(--accent-green)',
      color: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      flexShrink: 0
    }}>
      {number}
    </div>
    <p style={{ margin: 0, color: 'var(--text-primary)' }}>{text}</p>
  </motion.div>
);

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(leftColRef.current, 
      { opacity: 0, x: -50 },
      {
        opacity: 1, x: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 30%',
          scrub: true
        }
      }
    );
    gsap.fromTo(rightColRef.current, 
      { opacity: 0, x: 50 },
      {
        opacity: 1, x: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 30%',
          scrub: true
        }
      }
    );
  }, []);

  const guestSteps = [
    "Walk up to the kiosk",
    "Enter your mobile number on the touchscreen — no account needed",
    "Select your vehicle type, manufacturer, and model",
    "Choose a charging mode: Amount, Percentage, or Full Charge",
    "Scan the dynamic UPI QR code shown on screen and pay",
    "Charging starts automatically the moment payment is confirmed",
    "If you stop early or a target is reached, any unused balance is refunded automatically"
  ];

  const signInSteps = [
    "Scan the QR code displayed on the kiosk with your phone",
    "Log in via mobile OTP or Google",
    "Your session links to that specific kiosk",
    "Choose your vehicle and charging mode, see a live cost breakdown",
    "Pay via UPI directly in the app",
    "Track live voltage, current, power, energy delivered, and remaining time from your phone",
    "Stop and resume charging remotely at any time"
  ];

  return (
    <section ref={sectionRef} className="section" style={{ minHeight: '100vh' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '4rem' }}>How It Works</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '4rem' 
        }}>
          {/* Guest Mode */}
          <div ref={leftColRef}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--accent-teal)' }}>
              Guest Mode
            </h3>
            <div>
              {guestSteps.map((step, i) => (
                <StepCard key={i} number={i + 1} text={step} />
              ))}
            </div>
          </div>

          {/* Sign-In Mode */}
          <div ref={rightColRef}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--accent-green)' }}>
              Sign-In Mode
            </h3>
            <div>
              {signInSteps.map((step, i) => (
                <StepCard key={i} number={i + 1} text={step} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
