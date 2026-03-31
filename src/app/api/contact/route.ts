import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, organization, details, type, leader, selectedDate, selectedTime } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const isMeeting = type === 'meeting';
    const accentColor = isMeeting ? '#3b82f6' : '#111111';
    
    const subject = isMeeting 
      ? `📅 Session Booked: ${leader} with ${name}` 
      : `📩 New Project Inquiry from ${name}`;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_RECEIVER,
      subject: subject,
      text: `
        TYPE: ${isMeeting ? 'LEADERSHIP SESSION' : 'PROJECT INQUIRY'}
        NAME: ${name}
        EMAIL: ${email}
        ${isMeeting ? `LEADER: ${leader}\nDATE: ${selectedDate}\nTIME: ${selectedTime}` : `ORGANIZATION: ${organization || 'N/A'}`}
        MESSAGE: ${details}
      `,
      html: `
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #fcfcfc; color: #111111; }
            .wrapper { padding: 60px 20px; text-align: center; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #eeeeee; text-align: left; }
            .header { padding: 50px 40px; border-bottom: 1px solid #f5f5f5; text-align: center; }
            .logo { font-size: 22px; font-weight: 800; letter-spacing: -0.02em; color: #111; margin: 0; font-family: 'Inter', sans-serif; }
            .logo span { color: #3b82f6; }
            .content { padding: 48px 40px; }
            .status-badge { display: inline-block; padding: 6px 14px; background: #f0f7ff; color: #3b82f6; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; border-radius: 4px; margin-bottom: 24px; }
            .type-badge { font-size: 13px; font-weight: 500; color: #888888; margin-bottom: 8px; font-family: 'JetBrains Mono', monospace; }
            .main-title { font-size: 32px; font-weight: 700; color: #111111; margin: 0 0 40px 0; line-height: 1.1; letter-spacing: -0.01em; }
            
            .data-section { margin-bottom: 40px; }
            .data-grid { display: block; border-top: 1px solid #eeeeee; }
            .data-row { display: flex; border-bottom: 1px solid #f5f5f5; padding: 18px 0; }
            .data-label { width: 140px; font-size: 12px; font-weight: 600; color: #999999; text-transform: uppercase; letter-spacing: 0.05em; }
            .data-value { flex: 1; font-size: 14px; color: #111111; font-weight: 500; }
            
            .message-label { font-size: 12px; font-weight: 600; color: #999999; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
            .message-box { font-size: 15px; line-height: 1.6; color: #444444; background: #fafafa; padding: 24px; border-radius: 8px; border: 1px solid #eeeeee; white-space: pre-wrap; }
            
            .footer { padding: 40px; text-align: center; font-size: 11px; color: #bbbbbb; letter-spacing: 0.05em; line-height: 1.8; }
            .btn-wrap { text-align: center; margin-top: 48px; }
            .button { display: inline-block; padding: 18px 36px; background: #111111; color: #ffffff !important; text-decoration: none; font-weight: 700; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 4px; transition: all 0.3s ease; }
            
            .meeting-highlight { background: #111111; color: #ffffff; padding: 32px; border-radius: 4px; margin-bottom: 40px; }
            .meeting-title { font-size: 11px; font-weight: 700; color: #3b82f6; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 16px; }
            .meeting-info { font-size: 18px; font-weight: 600; line-height: 1.4; color: #ffffff; }
            .meeting-sub { font-size: 13px; color: #999999; margin-top: 4px; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="header">
                <div class="logo">WEBRORA<span>.</span></div>
              </div>
              <div class="content">
                <div class="type-badge">NOTIFICATION // 01</div>
                <h2 class="main-title">${isMeeting ? 'Meeting Scheduled' : 'New Client Request'}</h2>
                
                ${isMeeting ? `
                <div class="meeting-highlight">
                  <div class="meeting-title">CONFIRMED APPOINTMENT</div>
                  <div class="meeting-info">${leader} Strategy Session</div>
                  <div class="meeting-sub">Scheduled for ${selectedDate} at ${selectedTime}</div>
                </div>
                ` : ''}

                <div class="data-section">
                  <div class="data-grid">
                    <div class="data-row">
                      <div class="data-label">NAME</div>
                      <div class="data-value">${name}</div>
                    </div>
                    <div class="data-row">
                      <div class="data-label">EMAIL</div>
                      <div class="data-value">${email}</div>
                    </div>
                    ${!isMeeting && organization ? `
                    <div class="data-row">
                      <div class="data-label">ORG</div>
                      <div class="data-value">${organization}</div>
                    </div>
                    ` : ''}
                  </div>
                </div>

                <div class="message-label">${isMeeting ? 'IDEAS & REQUIREMENTS' : 'PROJECT DESCRIPTION'}</div>
                <div class="message-box">${details}</div>

                <div class="btn-wrap">
                  <a href="mailto:${email}" class="button">Direct Reply</a>
                </div>
              </div>
              <div class="footer">
                This is an automated notification from WEBRORA STUDIOS.<br/>
                &copy; 2026 INTERNAL USE ONLY
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ message: 'Failed to send email.' }, { status: 500 });
  }
}
