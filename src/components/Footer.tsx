"use client";

import Link from 'next/link';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="main-footer">
      <motion.div 
        className="footer-content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="footer-header-pill">
          <div className="f-pill-inner">
            <div className="f-logo-text">WEBRORA</div>
            <div className="f-pill-nav">
              <Link href="/work" className="nav-item"><span>1.0</span> WORK</Link>
              <Link href="/about" className="nav-item"><span>2.0</span> ABOUT</Link>
              <Link href="/contact" className="nav-item"><span>3.0</span> CONTACT</Link>
            </div>
          </div>
        </div>
        <div className="footer-grid">
          {/* Identity Desc */}
          <div className="f-col main-brand">
            <h2 className="f-brand-title">WEBRORA</h2>
            <p className="f-brand-desc">
              We engineer enterprise world models for simulation.<br/>
              Building the extraordinary, one digital reality at a time.
            </p>
          </div>

          {/* Menu */}
          <div className="f-col">
            <span className="f-label">MENU</span>
            <ul className="f-links">
              <li><Link href="/work">Work</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/about">About Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="f-col contact-col">
            <span className="f-label">CONTACT</span>
            <div className="f-contact-info">
              <div className="f-item">
                <span className="i-label">Email</span>
                <a href="mailto:webrorastudios@gmail.com" className="f-email-large">
                  webrorastudios@gmail.com
                </a>
              </div>
              <div className="f-item">
                <span className="i-label">Phone</span>
                <div className="f-phone-stack">
                  <a href="https://wa.me/917835946076" target="_blank" rel="noopener noreferrer">+91 78359 46076 (Aadi)</a>
                  <a href="https://wa.me/918447100153" target="_blank" rel="noopener noreferrer">+91 84471 00153 (Karan)</a>
                  <a href="https://wa.me/918700383626" target="_blank" rel="noopener noreferrer">+91 87003 83626 (Parth)</a>
                </div>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="f-col">
            <span className="f-label">SOCIAL</span>
            <div className="f-social-grid">
              <a href="https://www.instagram.com/webrora.studios/" target="_blank" rel="noopener noreferrer" className="social-pill-icon"><Instagram size={18} /></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright">© 2026 WEBRORA Studios. All rights reserved.</p>
          <div className="legal-links">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms & Conditions</Link>
            <Link href="#">Refund Policy</Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
