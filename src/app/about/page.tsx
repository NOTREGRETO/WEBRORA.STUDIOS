"use client";

import { ArrowRight, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
  const team = [
    {
      name: 'Aadi Arora',
      role: 'CEO / FOUNDER',
      bio: 'Hi, I’m Aadi Arora, an 18-year-old BCA student and Front-End Developer. I’m also the CEO of WEBRORA STUDIOS, focused on building responsive websites and delivering modern digital solutions.',
      img: '/images/founders/aadi.jpeg',
      phone: '+917835946076',
    },
    {
      name: 'Karan Arora',
      role: 'COO / CO-FOUNDER',
      bio: 'Hi, I’m Karan Arora, a DevOps Engineer and Back-End Developer with a BCA and MCA. I’m also the COO of WEBRORA STUDIOS, focused on building scalable and reliable systems.',
      img: '/images/founders/karan.jpeg',
      phone: '+918447100153',
    },
    {
      name: 'Parth Arora',
      role: 'CTO',
      bio: 'Hi, I’m Parth Arora, a 19-year-old cybersecurity student. I’m a SOC Analyst and QA/Tester, and the CTO of WEBRORA STUDIOS, focused on building secure and reliable digital solutions.',
      img: '/images/founders/parth.jpeg',
      phone: '+918700383626',
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <main style={{ backgroundColor: '#000', minHeight: '100vh', paddingTop: '10rem', overflow: 'hidden' }}>
      
      {/* About Hero Section */}
      <section className="about-hero">
        <motion.h1 
          className="about-hero-title"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          We build<br/>
          <motion.span 
            className="text-gradient-reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 2 }}
          >the extraordinary.</motion.span>
        </motion.h1>
        <motion.p 
          className="about-hero-desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          We focus on combining strategic thinking with cutting edge technology to help brands 
          grow faster, operate smarter, and communicate better. Every project we take on 
          is driven by <span className="text-white">precision, performance, and purpose.</span>
        </motion.p>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy-section">
        <motion.div 
          className="phi-grid"
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
           {[
             { num: "BUILD", title: "Digital Native", desc: "We build for the future, leveraging edge technologies to ensure scalability and speed." },
             { num: "THINK", title: "Strategic Growth", desc: "Design is intelligence made visible. We align every pixel with your business goals." },
             { num: "DELIVER", title: "Premium Precision", desc: "Excellence is non-negotiable. We deliver flawless digital products that command attention." }
           ].map((item, idx) => (
             <motion.div key={idx} className="phi-item" variants={fadeInUp}>
                <span className="phi-num">{item.num}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
             </motion.div>
           ))}
        </motion.div>
      </section>

      {/* Mission Marquee Section */}
      <motion.div 
        className="about-marquee-row"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.5, ease: "circOut" }}
        viewport={{ once: true }}
      >
         <div className="about-marquee-track">
            <span>MODERN DESIGN • TECHNICAL EXCELLENCE • STRATEGIC THINKING • BESPOKE CODE • </span>
            <span>MODERN DESIGN • TECHNICAL EXCELLENCE • STRATEGIC THINKING • BESPOKE CODE • </span>
         </div>
      </motion.div>

      {/* Team Section */}
      <section className="team-section">
        <motion.div 
          className="team-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="cyan-label">OUR PEOPLE</div>
          <h2 className="team-headline">Meet the Team</h2>
          <p className="team-subtext">
            A collective of visionaries, engineers, and creatives dedicated to pushing the boundaries of what is possible online.
          </p>
        </motion.div>

        <motion.div 
          className="team-grid"
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {team.map((member, idx) => (
            <motion.div 
              key={idx} 
              className="team-card" 
              variants={fadeInUp}
            >
              <div className="team-img-wrapper glass-hover">
                <img src={member.img} alt={member.name} />
                <div className="card-shine"></div>
              </div>
              
              <div className="team-info-header">
                <h3>{member.name}</h3>
              </div>
              
              <div className="team-role">{member.role}</div>
              {member.phone && (
                <div className="team-phone">
                  <a href={`tel:${member.phone}`}>
                    <Phone size={14} /> {member.phone}
                  </a>
                </div>
              )}
              <p className="team-bio">{member.bio}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Footer Section */}
      <section className="cta-section" style={{ borderTop: 'none' }}>
        <motion.div 
          className="cyan-label text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >SCHEDULE A MEETING</motion.div>
        <motion.h2 
          className="cta-headline"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Let's build<br/>
          <span className="text-dim">the extraordinary.</span>
        </motion.h2>
        <motion.p 
          className="cta-desc"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          Ready to transform your vision into a digital reality? Whether it's a new brand, a complex platform, or an engaging digital experience - we're here to make it happen.
        </motion.p>
        
        <motion.div 
          className="cta-actions"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link href="/contact" style={{ textDecoration: 'none' }}>
            <button className="btn-solid">
              BOOK A CALL <ArrowRight size={16} />
            </button>
          </Link>
          <span className="cta-or">or drop us a line at webrorastudios@gmail.com</span>
        </motion.div>
      </section>

    </main>
  );
}
