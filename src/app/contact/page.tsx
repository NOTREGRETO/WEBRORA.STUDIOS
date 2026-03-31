"use client";

import { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MeetingScheduler from '@/components/MeetingScheduler';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    details: '',
    leader: '', // For scheduling
    type: 'inquiry', // inquiry or meeting
  });

  const [activeTab, setActiveTab] = useState<'inquiry' | 'meeting'>('inquiry');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          type: activeTab,
          selectedDate: selectedDate?.toLocaleDateString(),
          selectedTime: selectedTime
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', organization: '', details: '', leader: '', type: activeTab });
        setSelectedDate(null);
        setSelectedTime(null);
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Form execution error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (tab: 'inquiry' | 'meeting') => {
    setActiveTab(tab);
    setFormData(prev => ({ ...prev, type: tab }));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleSchedule = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  return (
    <main className="contact-page">
      <div className="contact-wrapper">
        {/* Left Side: Contact Info */}
        <div className="contact-info-panel">
          <h1 className="contact-headline">
            Get in<br />
            <span className="text-cyan">{activeTab === 'inquiry' ? 'touch.' : 'session.'}</span>
          </h1>
          
          <div className="contact-details">
            <a href="mailto:webrorastudios@gmail.com" className="contact-email">webrorastudios@gmail.com</a>
            <div className="contact-phones">
              <div className="phone-item">
                <span className="phone-label">AADI ARORA</span>
                <a href="https://wa.me/917835946076" target="_blank" rel="noopener noreferrer" className="phone-number">+91 78359 46076</a>
              </div>
              <div className="phone-item">
                <span className="phone-label">KARAN ARORA</span>
                <a href="https://wa.me/918447100153" target="_blank" rel="noopener noreferrer" className="phone-number">+91 84471 00153</a>
              </div>
              <div className="phone-item">
                <span className="phone-label">PARTH ARORA</span>
                <a href="https://wa.me/918700383626" target="_blank" rel="noopener noreferrer" className="phone-number">+91 87003 83626</a>
              </div>
            </div>
          </div>
          
          <p className="contact-sub">
            {activeTab === 'inquiry' 
              ? "Tell us about your project, goals, and vision. Our team is ready to help you build the next extraordinary digital experience."
              : "Book a 1:1 strategy session with our core leadership. Share your website ideas and technical requirements directly."
            }
          </p>

          <div className="office-locations">
            <div className="location-item">
              <div className="location-icon">
                <svg width="60" height="64" viewBox="0 0 100 100" fill="none" stroke="var(--cyan)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  {/* Ground Level Silhouette */}
                  <path d="M15 88H85" opacity="0.3" strokeWidth="1.5" />
                  
                  {/* Main Architectural Structure */}
                  <path d="M28 88V38H72V88" strokeWidth="2" />
                  
                  {/* The Recognizable Vaulted Arch */}
                  <path d="M44 88V68C44 64 47 61 50 61C53 61 56 64 56 68V88" strokeWidth="1.5" />
                  
                  {/* Layered Architectural Crown Structure */}
                  <path d="M22 38H78" strokeWidth="3" />
                  <path d="M30 32H70" strokeWidth="2" />
                  <path d="M37 26H63" />
                  <path d="M43 20H57" />
                  <path d="M47 14H53" />
                  
                  {/* Column Detail / Accent Lines */}
                  <path d="M33 38V88M67 38V88" opacity="0.2" />
                  
                  {/* Technical Realism Detail Centered */}
                  <circle cx="50" cy="30" r="1.5" fill="var(--cyan)" />
                  <path d="M50 20V26" opacity="0.3" />
                </svg>
              </div>
              <h3 style={{ color: 'var(--cyan)' }}>INDIA</h3>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="contact-form-panel">
          <div className={`form-card ${activeTab === 'meeting' && !selectedTime && formData.leader ? 'full-width' : ''}`}>
            
            <div className="form-tab-switcher">
               <button 
                type="button" 
                className={activeTab === 'inquiry' ? 'active' : ''} 
                onClick={() => handleTabChange('inquiry')}
              >
                Inquiry
              </button>
               <button 
                type="button" 
                className={activeTab === 'meeting' ? 'active' : ''} 
                onClick={() => handleTabChange('meeting')}
              >
                Schedule Meeting
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'meeting' && !formData.leader ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }}
                  className="leader-selection-step"
                >
                  <label className="step-label">WHOM DO YOU WANT TO MEET?</label>
                  <div className="leader-options-grid">
                    {[
                      { name: 'Aadi Arora', role: 'CEO', value: 'Aadi Arora (CEO)' },
                      { name: 'Karan Arora', role: 'COO', value: 'Karan Arora (COO)' },
                      { name: 'Parth Arora', role: 'CTO', value: 'Parth Arora (CTO)' },
                    ].map(l => (
                      <button 
                        key={l.value} 
                        className="leader-option-btn glass-hover"
                        onClick={() => setFormData(prev => ({ ...prev, leader: l.value }))}
                      >
                        <span className="l-name">{l.name}</span>
                        <span className="l-role">{l.role}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : activeTab === 'meeting' && formData.leader && !selectedTime ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.98 }}
                >
                  <div className="scheduler-header-row">
                    <button className="back-btn" onClick={() => setFormData(prev => ({ ...prev, leader: '' }))}>
                      ← Change Leader
                    </button>
                  </div>
                  <MeetingScheduler selectedLeader={formData.leader} onSchedule={handleSchedule} />
                </motion.div>
              ) : (
                <motion.form 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  onSubmit={handleSubmit}
                >
                  {activeTab === 'meeting' && selectedTime && (
                    <div className="selected-slot-summary">
                      <div className="slot-pill">
                        <Clock size={16} /> {selectedDate?.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })} at {selectedTime}
                      </div>
                      <button type="button" className="edit-slot-btn" onClick={() => setSelectedTime(null)}>Edit Slot</button>
                    </div>
                  )}

                  <div className="form-group">
                    <label>WHAT'S YOUR NAME?</label>
                    <input 
                      name="name"
                      type="text" 
                      placeholder="John Doe *" 
                      required 
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>WHAT'S YOUR EMAIL?</label>
                    <input 
                      name="email"
                      type="email" 
                      placeholder="john@doe.com *" 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  {activeTab === 'inquiry' && (
                    <div className="form-group">
                      <label>YOUR ORGANIZATION?</label>
                      <input 
                        name="organization"
                        type="text" 
                        placeholder="John & Doe Inc." 
                        value={formData.organization}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                  
                  <div className="form-group">
                    <label>{activeTab === 'meeting' ? 'SHARE YOUR WEBSITE IDEAS' : 'PROJECT DETAILS'}</label>
                    <textarea 
                      name="details"
                      placeholder={activeTab === 'meeting' ? "Briefly explain the ideas you'd like to share about your website..." : "Hello, I'm interested in..."}
                      rows={4}
                      required
                      value={formData.details}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="form-submit-container">
                    <button 
                      type="submit" 
                      className={`btn-send ${status === 'loading' ? 'loading' : ''} ${status === 'success' ? 'success' : ''} ${status === 'error' ? 'error' : ''}`}
                      disabled={status === 'loading'}
                    >
                      <AnimatePresence mode="wait">
                        {status === 'idle' && (
                          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {activeTab === 'meeting' ? 'CONFIRM MEETING' : 'SEND MESSAGE'} <ArrowRight size={18} />
                          </motion.div>
                        )}
                        {status === 'loading' && (
                          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            SENDING... <Loader2 size={18} className="animate-spin" />
                          </motion.div>
                        )}
                        {status === 'success' && (
                          <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4ade80' }}>
                            SENT! <CheckCircle size={18} />
                          </motion.div>
                        )}
                        {status === 'error' && (
                          <motion.div key="error" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f87171' }}>
                            TRY AGAIN <AlertCircle size={18} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
