"use client";

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const cursorX = useSpring(0, { stiffness: 450, damping: 35 });
  const cursorY = useSpring(0, { stiffness: 450, damping: 35 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY;
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      
      cursorX.set(clientX);
      cursorY.set(clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleLinkHover = () => setLinkHovered(true);
    const handleLinkLeave = () => setLinkHovered(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('touchstart', updatePosition);
    window.addEventListener('touchmove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const clickableElements = document.querySelectorAll('a, button, .accordion-item, .drawer-item, input, textarea, .glass-hover');
    clickableElements.forEach(el => {
      el.addEventListener('mouseenter', handleLinkHover);
      el.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      clickableElements.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkHover);
        el.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div 
      className={`custom-cursor ${clicked ? 'clicked' : ''} ${linkHovered ? 'hovered' : ''}`}
      style={{
        x: cursorX,
        y: cursorY,
        opacity: visible ? 1 : 0
      }}
    >
      <div className="cursor-dot" />
      <div className="cursor-ring" />
    </motion.div>
  );
}
