import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';

const faqData = [
  {
    q: "Do I need to download an app to charge?",
    a: "No — Guest Mode requires only a mobile number."
  },
  {
    q: "What happens if my charging session is interrupted?",
    a: "Any unused balance is automatically refunded to your original payment method."
  },
  {
    q: "How is the charging cost calculated?",
    a: "Based on live, admin-configured electricity tariff rates and whichever charging mode you select."
  },
  {
    q: "Can I book a charging slot in advance?",
    a: "Yes — through Slot Booking, with a small reservation fee and a secure access code to unlock your kiosk."
  },
  {
    q: "What vehicles are supported?",
    a: "A growing database of two-wheeler EV models from major Indian manufacturers, with three- and four-wheeler support planned."
  },
  {
    q: "Is my payment secure?",
    a: "Yes — all payments are processed through Razorpay's UPI infrastructure."
  }
];

const FAQItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <button 
        className="magnetic-hover"
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem 0',
          background: 'none',
          border: 'none',
          color: 'var(--text-primary)',
          fontSize: '1.1rem',
          textAlign: 'left',
          fontWeight: 600
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {q}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown color="var(--accent-teal)" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ paddingBottom: '1.5rem', color: 'var(--text-muted)' }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const sectionRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(listRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 30%',
          scrub: true
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="section" style={{ minHeight: '80vh' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: '4rem' }}>
          Frequently Asked Questions
        </h2>
        
        <div 
          ref={listRef}
          style={{
            maxWidth: '700px',
            margin: '0 auto',
            background: 'var(--bg-card)',
            padding: 'clamp(1.5rem, 5vw, 3rem)',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}
        >
          {faqData.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
