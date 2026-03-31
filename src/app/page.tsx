"use client";

import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';

const ServiceCard = ({ service, index }: { service: any; index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
      className="service-card-3d"
    >
      <div 
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="card-content-3d"
      >
        <div className="card-top">
          <span className="card-id">0{service.id}</span>
          <div className="card-icon">
            <ArrowUpRight size={24} />
          </div>
        </div>
        
        <div className="card-image-wrap" style={{ transform: "translateZ(50px)" }}>
           {service.video ? (
             <video 
               src={service.video} 
               autoPlay 
               loop 
               muted 
               playsInline 
               poster={service.img}
               className="card-image"
               style={{ width: '100%', height: '100%', objectFit: 'cover' }}
             />
           ) : (
             <img src={service.img} alt={service.title} className="card-image" />
           )}
           <div className="card-image-overlay"></div>
        </div>

        <h3 className="card-title-3d" style={{ transform: "translateZ(100px)" }}>
          {service.title}
        </h3>
        <p className="card-desc-3d" style={{ transform: "translateZ(60px)" }}>
          {service.desc}
        </p>

        <div className="card-tags-3d" style={{ transform: "translateZ(40px)" }}>
          {service.tags.map((tag: string) => (
            <span key={tag} className="card-tag-3d">{tag}</span>
          ))}
        </div>
      </div>
      
      {/* Background Glow */}
      <motion.div 
        className="card-glow"
        style={{
          transform: "translateZ(-10px)",
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(100);
  const [activeService, setActiveService] = useState(2);
  const [activeIndustry, setActiveIndustry] = useState(0);

  const servicesData = [
    {
      id: '1',
      title: 'Brand Strategy',
      desc: 'Connecting your brand with its true audience through deep research and strategic positioning.',
      tags: ['RESEARCH', 'POSITIONING', 'BRANDING', 'STRATEGY'],
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
      video: '/videos/services/2026.mp4'
    },
    {
      id: '2',
      title: 'Web Design & Dev.',
      desc: 'Engineering scalable, high-performance web applications using cutting edge frameworks like Next.js and React.',
      tags: ['NEXT.JS', 'REACT', 'UX/UI', 'DEVELOPMENT'],
      img: 'https://images.unsplash.com/photo-1531297172813-90d1656a81ca?auto=format&fit=crop&q=80&w=800',
      video: '/videos/services/Web.mp4'
    },
    {
      id: '3',
      title: 'Brand Visibility',
      desc: 'Elevating brand presence through strategic campaigns and visual storytelling.',
      tags: ['VIDEO', '3D', 'BRANDING', 'BRAND STRATEGY', 'DESIGN'],
      img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
      video: '/videos/services/Brand Visibility.mp4'
    }
  ];

  const industriesData = [
    {
      id: 'ind-1',
      verticalTitle: 'EDTECH',
      label: 'TRANSFORMING EDUCATION',
      title: 'EdTech',
      desc: 'We build immersive learning platforms, student management systems, and interactive educational tools designed to scale.',
      img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1600'
    },
    {
      id: 'ind-2',
      verticalTitle: 'FINTECH',
      label: 'FINANCIAL INNOVATION',
      title: 'FinTech',
      desc: 'Secure, compliant, and lightning-fast financial applications. From payment gateways to complex trading dashboards.',
      img: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&q=80&w=1600'
    },
    {
      id: 'ind-3',
      verticalTitle: 'E-COMMERCE',
      label: 'DIGITAL RETAIL',
      title: 'E-Commerce',
      desc: 'High-conversion storefronts and robust backend management systems that handle global scale and deliver seamless checkout experiences.',
      img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1600'
    }
  ];



  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Force render

  return (
    <main>
      {/* Preloader removed */}

      {/* Hero Section */}
      <div className="hero-wrapper" id="home">
        {/* Background layer */}
        <div className="beam-container">
          {/* Background Video */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="hero-bg-video"
          >
            <source src="/showreel.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Background Marquee */}
        <div className="hero-marquee">
          <div className="hero-marquee-track">
            <span>UX|UI • CYBERSECURITY • WEB DEVELOPMENT • QA/TESTING • </span>
            <span>UX|UI • CYBERSECURITY • WEB DEVELOPMENT • QA/TESTING • </span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="hero-content">
          <div className="hero-left">
            <h1 className="hero-title">
              We Build, Launch<br/>
              <span style={{ color: "var(--cyan)" }}>& Grow.</span>
            </h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="hero-desc"
            >
              Every detail is crafted for your growth - from bold brand 
              identity to seamless digital experiences and data-backed 
              product launches.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
            <Link href="/contact" style={{ textDecoration: 'none' }}>
              <MagneticButton className="btn-meeting">
                SCHEDULE A MEETING <ArrowRight size={16} />
              </MagneticButton>
            </Link>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.4 }}
            className="hero-right"
          >
            <p className="labs-cyan">WEBRORA LABS</p>
            <p className="labs-subtitle">Explore</p>
            <h2 className="labs-title">WEBRORA Labs</h2>
            <p className="labs-desc">
              Discover our experimental ventures, cutting-edge AI research, 
              and moonshot projects.
            </p>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 10 }}
        >
          <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', letterSpacing: '2px' }}>EXPLORE</span>
        </motion.div>
      </div>

      {/* 3D Interactive Services Grid */}
      <section id="services" className="services-grid-section">
        <div className="section-intro">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="intro-tag"
          >
            Capabilities // 02
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="intro-title"
          >
            Modern solutions for <br/>
            <span className="gradient-text">boundary-pushing</span> brands.
          </motion.h2>
        </div>

        <div className="services-card-grid">
          {servicesData.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </section>

      {/* Industries "Drawing Folder" Section */}
      <section className="industries-section">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="industries-header"
        >
          <div className="industries-left">
            <div className="cyan-label" style={{ marginBottom: '1.5rem' }}>&gt; INDUSTRIES WE SERVE</div>
            <h2 className="industries-title">
              <span className="text-white">All types of projects,</span><br/>
              <span className="text-dim">we have got you<br/>covered.</span>
            </h2>
          </div>
          <div className="industries-right">
            <p className="team-subtext" style={{ marginBottom: '1.5rem', color: 'rgba(255,255,255,0.6)' }}>
              Whether you're disrupting finance, revolutionizing education, or scaling digital retail, our engineering and design teams deliver tailored excellence.
            </p>
            <a href="/work" className="drawer-view-works">VIEW ALL WORKS <ArrowRight size={14} /></a>
          </div>
        </motion.div>
        
        <div className="drawers-container">
          {industriesData.map((ind, idx) => {
            const isActive = activeIndustry === idx;
            return (
              <div 
                key={ind.id} 
                className={`drawer-item ${isActive ? 'active' : ''}`}
                onMouseEnter={() => setActiveIndustry(idx)}
                onClick={() => setActiveIndustry(idx)}
              >
                <img src={ind.img} alt={ind.title} />
                <div className="drawer-title-vertical">{ind.verticalTitle}</div>
                
                <div className="drawer-content">
                  <div className="drawer-label">{ind.label}</div>
                  <h3 className="drawer-title">{ind.title}</h3>
                  <p className="drawer-desc">{ind.desc}</p>
                  
                  <div className="drawer-btn">
                    EXPLORE CAPABILITIES
                    <div className="circle-icon"><ArrowUpRight size={14} /></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="client-section" style={{ padding: '10rem 0' }}>
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {[...Array(10)].map((_, i) => (
              <h2 key={i} className="client-title" style={{ 
                fontSize: 'clamp(1.5rem, 5vw, 4rem)', 
                whiteSpace: 'nowrap', 
                color: '#000', 
                fontWeight: 900,
                letterSpacing: '-2px',
                textTransform: 'uppercase',
                display: 'inline-block',
                padding: '0 2rem'
              }}>
                CLIENTS STORIES ARE NOT AVAILABLE •
              </h2>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy-section">
        <div className="phi-grid">
          <div className="phi-item">
            <div className="phi-num">01</div>
            <h3>Innovation</h3>
            <p>Pushing the technical boundaries of what's possible in the digital realm.</p>
          </div>
          <div className="phi-item">
            <div className="phi-num">02</div>
            <h3>Design</h3>
            <p>Crafting immersive visual experiences that leave a lasting digital footprint.</p>
          </div>
          <div className="phi-item">
            <div className="phi-num">03</div>
            <h3>Execution</h3>
            <p>Precise engineering and rapid delivery without compromising on reliability.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '12rem 6%' }}>
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="cyan-label" style={{ marginBottom: '1rem' }}>/ START A CONVERSATION</div>
          <h2 className="section-title" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: 0.9, marginBottom: '2.5rem' }}>
            Let's <span style={{ color: 'var(--cyan)' }}>Talk.</span>
          </h2>
          <div style={{ maxWidth: '650px' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3.5rem', fontSize: '1.4rem', lineHeight: 1.4 }}>
              Ready to launch your next big idea? <br/>
              Reach out to our team of experts today and build the future together.
            </p>
            <Link href="/contact" style={{ textDecoration: 'none' }}>
              <MagneticButton className="btn-meeting">
                GET IN TOUCH <ArrowRight size={20} />
              </MagneticButton>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
