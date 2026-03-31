import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import MagneticButton from '@/components/MagneticButton';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

export const metadata: Metadata = {
  title: 'WEBRORA - Digital Agency',
  description: 'We Build Powerful Digital Solutions. Web development, UI/UX design, and cybersecurity.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
          <nav className="nav-container">
            <Link href="/" className="nav-logo">WEBRORA</Link>
            <div className="nav-links">
              <MagneticButton>
                <Link href="/work" className="nav-link">
                  <span className="num">1.0</span> <span className="label">Work</span>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/about" className="nav-link">
                  <span className="num">2.0</span> <span className="label">About Us</span>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/contact" className="nav-link">
                  <span className="num">3.0</span> <span className="label">Contact</span>
                </Link>
              </MagneticButton>
            </div>
          </nav>
          <SmoothScroll>
            {children}
            <Footer />
          </SmoothScroll>
      </body>
    </html>
  );
}
