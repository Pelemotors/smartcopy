import nodemailer from 'nodemailer';

export interface ContactFormData {
  name: string;
  phone: string;
  child_age: string;
  message: string;
  source?: string;
  quiz_score?: number | null;
  quiz_tier?: number | null;
}

export async function sendContactFormEmail(data: ContactFormData): Promise<boolean> {
  try {
    // Check if SMTP is configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP is not configured. Please set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env.local');
      return false;
    }

    // Support multiple emails separated by comma or semicolon
    const emailToEnv = process.env.EMAIL_TO || 'lioralmos@gmail.com';
    // Split by comma or semicolon, trim whitespace, and filter empty strings
    const emailRecipients = emailToEnv
      .split(/[,;]/)
      .map(email => email.trim())
      .filter(email => email.length > 0);

    if (emailRecipients.length === 0) {
      console.error('No email recipients configured. Email will not be sent.');
      return false;
    }

    console.log(`Attempting to send email to: ${emailRecipients.join(', ')}`);

    // Create transporter for Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    
    // Create email HTML content
    const emailHtml = `
      <!DOCTYPE html>
      <html dir="rtl" lang="he">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #4A90E2;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              background-color: #f9f9f9;
              padding: 20px;
              border: 1px solid #ddd;
            }
            .field {
              margin-bottom: 15px;
            }
            .field-label {
              font-weight: bold;
              color: #555;
              margin-bottom: 5px;
            }
            .field-value {
              background-color: white;
              padding: 10px;
              border-radius: 3px;
              border: 1px solid #ddd;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #777;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>פנייה חדשה מהאתר</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">שם מלא:</div>
              <div class="field-value">${escapeHtml(data.name)}</div>
            </div>
            <div class="field">
              <div class="field-label">טלפון:</div>
              <div class="field-value">${escapeHtml(data.phone)}</div>
            </div>
            <div class="field">
              <div class="field-label">גיל הילד:</div>
              <div class="field-value">${escapeHtml(data.child_age)}</div>
            </div>
            <div class="field">
              <div class="field-label">הודעה:</div>
              <div class="field-value">${escapeHtml(data.message)}</div>
            </div>
            ${data.source ? `
            <div class="field">
              <div class="field-label">מקור:</div>
              <div class="field-value">${escapeHtml(data.source === 'contact_form' ? 'טופס יצירת קשר' : 'שאלון בדיקת שינה')}</div>
            </div>
            ` : ''}
            ${data.quiz_score !== null && data.quiz_score !== undefined ? `
            <div class="field">
              <div class="field-label">ציון שאלון:</div>
              <div class="field-value">${data.quiz_score}</div>
            </div>
            ` : ''}
            ${data.quiz_tier !== null && data.quiz_tier !== undefined ? `
            <div class="field">
              <div class="field-label">רמה (Tier):</div>
              <div class="field-value">${data.quiz_tier}</div>
            </div>
            ` : ''}
            ${data.quiz_tier !== null && data.quiz_tier !== undefined ? `
            <div class="field">
              <div class="field-label">דרגת חום הליד:</div>
              <div class="field-value" style="background-color: ${getHeatLevelColor(data.quiz_tier)}; color: white; font-weight: bold; padding: 15px; border-radius: 5px; text-align: center; font-size: 18px;">
                ${getHeatLevelEmoji(data.quiz_tier)} ${getHeatLevelLabel(data.quiz_tier)}
              </div>
            </div>
            ` : ''}
            ${data.quiz_score !== null && data.quiz_score !== undefined ? `
            <div class="field">
              <div class="field-label">ציון מפורט:</div>
              <div class="field-value">${data.quiz_score} / 18</div>
            </div>
            ` : ''}
          </div>
          <div class="footer">
            <p>פנייה זו נשלחה מהאתר - ${new Date().toLocaleString('he-IL')}</p>
          </div>
        </body>
      </html>
    `;

    const emailText = `
פנייה חדשה מהאתר

שם מלא: ${data.name}
טלפון: ${data.phone}
גיל הילד: ${data.child_age}
הודעה: ${data.message}
${data.source ? `מקור: ${data.source === 'contact_form' ? 'טופס יצירת קשר' : 'שאלון בדיקת שינה'}` : ''}
${data.quiz_score !== null && data.quiz_score !== undefined ? `ציון שאלון: ${data.quiz_score} / 18` : ''}
${data.quiz_tier !== null && data.quiz_tier !== undefined ? `רמה (Tier): ${data.quiz_tier}` : ''}
${data.quiz_tier !== null && data.quiz_tier !== undefined ? `דרגת חום: ${getHeatLevelEmoji(data.quiz_tier)} ${getHeatLevelLabel(data.quiz_tier)}` : ''}

תאריך: ${new Date().toLocaleString('he-IL')}
    `;

    // Send email to all recipients
    const sendPromises = emailRecipients.map(email => 
      transporter.sendMail({
        from: process.env.SMTP_USER, // Use the same email as sender
        to: email,
        subject: 'פנייה חדשה מהאתר - ' + data.name,
        html: emailHtml,
        text: emailText,
      })
    );

    const results = await Promise.allSettled(sendPromises);
    
    // Check if at least one email was sent successfully
    const hasSuccess = results.some(result => 
      result.status === 'fulfilled' && result.value.accepted && result.value.accepted.length > 0
    );

    // Log any errors
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Failed to send email to ${emailRecipients[index]}:`, result.reason);
      } else if (result.value.rejected && result.value.rejected.length > 0) {
        console.error(`SMTP error for ${emailRecipients[index]}:`, result.value.rejected);
      } else {
        console.log(`Email sent successfully to ${emailRecipients[index]}`);
      }
    });

    if (!hasSuccess) {
      console.error('No emails were sent successfully. Check SMTP configuration (SMTP_HOST, SMTP_USER, SMTP_PASS).');
    }

    return hasSuccess;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function getHeatLevelEmoji(tier: number): string {
  switch (tier) {
    case 3: return '🔥🔥🔥';
    case 2: return '🔥🔥';
    case 1: return '🔥';
    default: return '';
  }
}

function getHeatLevelLabel(tier: number): string {
  switch (tier) {
    case 3: return 'ליד חם מאוד';
    case 2: return 'ליד חם';
    case 1: return 'ליד פוטנציאלי';
    default: return '';
  }
}

function getHeatLevelColor(tier: number): string {
  switch (tier) {
    case 3: return '#dc2626'; // red-600
    case 2: return '#ea580c'; // orange-600
    case 1: return '#ca8a04'; // yellow-600
    default: return '#6b7280'; // gray-500
  }
}

