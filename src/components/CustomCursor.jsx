import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use motion values instead of React state for 60fps performance without re-renders
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for trailing follow effect
  const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if touch device
    if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0)) {
      return;
    }
    
    setIsVisible(true);

    const updateMousePosition = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      // Check if hovering over clickable elements
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('magnetic-hover') ||
        target.closest('.magnetic-hover')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="custom-cursor-dot"
      animate={{
        width: isHovered ? 48 : 12,
        height: isHovered ? 48 : 12,
        backgroundColor: isHovered ? 'transparent' : 'rgba(74, 222, 128, 1)',
        border: isHovered ? '1.5px solid rgba(74, 222, 128, 0.8)' : '0px solid transparent',
      }}
      transition={{
        type: "tween",
        ease: "backOut",
        duration: 0.3
      }}
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
        position: 'fixed',
        top: 0,
        left: 0,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        boxShadow: isHovered ? '0 0 15px rgba(74, 222, 128, 0.4), inset 0 0 10px rgba(74, 222, 128, 0.2)' : '0 0 15px rgba(74, 222, 128, 0.8)',
      }}
    />
  );
};

export default CustomCursor;
