import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { 
  UserCircle, Smartphone, Database, Zap, 
  ShieldAlert, RefreshCcw, CalendarClock, Leaf, 
  MapPin, Activity, TrendingUp, Settings 
} from 'lucide-react';
import MagicBento from '../MagicBento';

const featuresData = [
  {
    icon: <UserCircle size={32} />,
    title: "Guest Mode — No App, No Account",
    desc: "Zero-friction access for one-time or occasional users. Just a mobile number as your session ID — ideal for mall and college foot traffic."
  },
  {
    icon: <Smartphone size={32} />,
    title: "Sign-In Mode — Personalized & Trackable",
    desc: "Log in with mobile OTP or Google, save your vehicles, view your full charging history, and track or control sessions live from any phone."
  },
  {
    icon: <Database size={32} />,
    title: "Vehicle Master Database",
    desc: "A maintained database of real EV specifications. Select your model; every technical parameter is fetched automatically."
  },
  {
    icon: <Zap size={32} />,
    title: "Three Charging Modes",
    desc: "Amount Mode, Percentage Mode, and Full Charge Mode to suit exactly how you want to pay and charge."
  },
  {
    icon: <Activity size={32} />,
    title: "Live Telemetry & Auto-Stop Safety",
    desc: "Continuously measures real voltage and current. Charging stops instantly the moment your target is reached or limits exceeded."
  },
  {
    icon: <RefreshCcw size={32} />,
    title: "Automatic Proportional Refunds",
    desc: "If a session ends early before the paid-for energy is fully delivered, the unused portion is calculated and refunded automatically."
  },
  {
    icon: <CalendarClock size={32} />,
    title: "Slot Booking with Secure Access Codes",
    desc: "Reserve a kiosk in advance for a specific time window. Unlock the kiosk on arrival with a one-time access code."
  },
  {
    icon: <Leaf size={32} />,
    title: "Green Score",
    desc: "Every charging session contributes to a personal sustainability score, rewarding continued clean-energy vehicle use."
  },
  {
    icon: <MapPin size={32} />,
    title: "Kiosk Location Map",
    desc: "An interactive map showing every kiosk's location and real-time availability so you can find a working charger before you arrive."
  },
  {
    icon: <Settings size={32} />,
    title: "Live Operator Dashboard",
    desc: "Real-time visibility into kiosk status, active and historical charging sessions, payment records, and refund records."
  },
  {
    icon: <TrendingUp size={32} />,
    title: "Business Economics Dashboard",
    desc: "A dedicated view showing the true grid-to-revenue picture: units purchased from the grid versus units sold to users."
  },
  {
    icon: <ShieldAlert size={32} />,
    title: "Admin-Configurable Tariff System",
    desc: "Electricity pricing and slot booking fees are set by the administrator and take effect immediately — never hardcoded."
  }
];

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div
    className="feature-card magnetic-hover"
    whileHover={{ y: -5 }}
    style={{
      background: 'var(--bg-card)',
      padding: '2rem',
      borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.05)',
      transition: 'all 0.3s ease'
    }}
    onHoverStart={(e) => {
      e.currentTarget.style.borderColor = 'var(--accent-green)';
      e.currentTarget.style.boxShadow = '0 10px 30px rgba(74, 222, 128, 0.15)';
    }}
    onHoverEnd={(e) => {
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    <div style={{ color: 'var(--accent-green)', marginBottom: '1.5rem' }}>
      {icon}
    </div>
    <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{title}</h4>
    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{desc}</p>
  </motion.div>
);

const Features = () => {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    gsap.fromTo(sectionRef.current.querySelector('.container'), 
      { opacity: 0, y: 50 },
      {
        opacity: 1, 
        y: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 10%',
          scrub: true
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="section" style={{ minHeight: '100vh', background: '#080d17' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Key Features</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Everything you need for a seamless charging experience.</p>
        </div>

        <MagicBento 
          items={featuresData}
          textAutoHide={false}
          enableStars={!isMobile} // Disable stars on mobile for performance
          enableSpotlight={!isMobile} // Disable spotlight on mobile
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect={true}
          spotlightRadius={isMobile ? 0 : 400}
          particleCount={isMobile ? 0 : 12} // Disable particles on mobile
          glowColor="132, 0, 255"
          disableAnimations={false}
          isMobile={isMobile}
        />
      </div>
    </section>
  );
};

export default Features;
