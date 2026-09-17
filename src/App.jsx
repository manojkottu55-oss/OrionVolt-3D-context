import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Problem from './components/sections/Problem';
import Solution from './components/sections/Solution';
import HowItWorks from './components/sections/HowItWorks';
import Features from './components/sections/Features';
import Architecture from './components/sections/Architecture';
import Safety from './components/sections/Safety';
import FAQ from './components/sections/FAQ';
import CTA from './components/sections/CTA';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const scrollProgressRef = useRef(null);

  useEffect(() => {
    // Check if mobile (simplistic check to disable custom cursor on touch)
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (!isTouchDevice) {
      document.body.classList.add('custom-cursor');
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Global scroll progress line
    gsap.to(scrollProgressRef.current, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      }
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      ScrollTrigger.getAll().forEach(t => t.kill());
      document.body.classList.remove('custom-cursor');
    };
  }, []);

  return (
    <>
      <CustomCursor />
      
      {/* Scroll Progress Line */}
      <div className="scroll-progress-container">
        <div 
          ref={scrollProgressRef} 
          className="scroll-progress-line" 
          style={{ height: '100%', transform: 'scaleY(0)' }} 
        />
      </div>

      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Features />
        <Architecture />
        <Safety />
        <FAQ />
        <CTA />
      </main>
    </>
  );
}

export default App;
