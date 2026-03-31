"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Video, Globe, Clock, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MeetingSchedulerProps {
  onSchedule: (date: Date, time: string) => void;
  selectedLeader: string;
}

export default function MeetingScheduler({ onSchedule, selectedLeader }: MeetingSchedulerProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [viewType, setViewType] = useState<'12h' | '24h'>('12h');

  // Calendar logic
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const days = [];
  const totalDays = daysInMonth(year, currentDate.getMonth());
  const startDay = firstDayOfMonth(year, currentDate.getMonth());

  // Fill empty days from prev month
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  // Fill current month days
  for (let d = 1; d <= totalDays; d++) {
    days.push(new Date(year, currentDate.getMonth(), d));
  }

  const timeSlots = [
    "9:00am", "9:30am", "10:00am", "10:30am", "11:00am", "11:30am",
    "12:00pm", "12:30pm", "1:00pm", "1:30pm", "2:00pm", "2:30pm",
    "3:00pm", "3:30pm", "4:00pm", "4:30pm"
  ];

  const formatTime = (time: string) => {
    if (viewType === '24h') {
      const match = time.match(/(\d+):(\d+)(am|pm)/);
      if (!match) return time;
      let [_, h, m, p] = match;
      let hour = parseInt(h);
      if (p === 'pm' && hour !== 12) hour += 12;
      if (p === 'am' && hour === 12) hour = 0;
      return `${hour.toString().padStart(2, '0')}:${m}`;
    }
    return time;
  };

  const handleDateClick = (date: Date) => {
    // Prevent selecting past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return;
    
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date) => {
    return selectedDate && 
           date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };

  const isPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="scheduler-container">
      {/* Left Sidebar */}
      <div className="scheduler-sidebar">
        <div className="scheduler-brand">
          <div className="brand-dot"></div>
          <span>WEBRORA Studios</span>
        </div>
        <h2 className="scheduler-title">30 min meeting</h2>
        <div className="scheduler-meta">
          <div className="meta-item">
            <Clock size={16} /> <span>30m</span>
          </div>
          <div className="meta-item">
            <Video size={16} /> <span>Video Call</span>
          </div>
          <div className="meta-item">
            <Globe size={16} /> <span>Asia/Kolkata</span>
          </div>
        </div>
        <div className="leader-badge">
          Meeting with {selectedLeader || "Leadership"}
        </div>
      </div>

      {/* Center: Calendar */}
      <div className="scheduler-main">
        <div className="cal-header">
          <h3>{monthName} {year}</h3>
          <div className="cal-nav">
            <button onClick={handlePrevMonth}><ChevronLeft size={18} /></button>
            <button onClick={handleNextMonth}><ChevronRight size={18} /></button>
          </div>
        </div>

        <div className="cal-grid">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
            <div key={d} className="day-name">{d}</div>
          ))}
          {days.map((date, idx) => (
            <div key={idx} className="day-cell">
              {date ? (
                <button
                  className={`day-btn ${isSelected(date) ? 'selected' : ''} ${isToday(date) ? 'today' : ''} ${isPast(date) ? 'past' : ''}`}
                  onClick={() => handleDateClick(date)}
                  disabled={isPast(date)}
                >
                  {date.getDate()}
                  {isToday(date) && <div className="today-dot"></div>}
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Time Slots */}
      <div className="scheduler-time">
        <div className="time-header">
          <h3>{selectedDate ? selectedDate.toLocaleDateString('default', { weekday: 'short', day: 'numeric' }) : 'Select Date'}</h3>
          <div className="view-toggle">
            <button 
              className={viewType === '12h' ? 'active' : ''} 
              onClick={() => setViewType('12h')}
            >12h</button>
            <button 
              className={viewType === '24h' ? 'active' : ''} 
              onClick={() => setViewType('24h')}
            >24h</button>
          </div>
        </div>

        <div className="time-slots-list">
          <AnimatePresence mode="wait">
            {selectedDate ? (
              <motion.div 
                key="slots"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="slots-wrapper"
              >
                {timeSlots.map(time => (
                  <button
                    key={time}
                    className={`time-btn ${selectedTime === time ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedTime(time);
                      onSchedule(selectedDate, time);
                    }}
                  >
                    {formatTime(time)}
                    {selectedTime === time && <Check size={14} />}
                  </button>
                ))}
              </motion.div>
            ) : (
              <div className="no-date-msg">Please select a date from the calendar to view available slots.</div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
