// WhatsApp sending functionality
// Using Twilio WhatsApp API or alternative service

export interface WhatsAppMessageData {
  name: string;
  phone: string;
  child_age: string;
  message: string;
  source?: string;
}

export async function sendWhatsAppNotification(data: WhatsAppMessageData): Promise<boolean> {
  try {
    const whatsappPhone = process.env.WHATSAPP_PHONE || '0544595999';
    const cleanPhone = whatsappPhone.replace(/[^0-9]/g, '');
    
    // Format the message
    const messageText = `*פנייה חדשה מהאתר*

שם: ${data.name}
טלפון: ${data.phone}
גיל הילד: ${data.child_age}
הודעה: ${data.message}
${data.source ? `מקור: ${data.source === 'contact_form' ? 'טופס יצירת קשר' : 'שאלון בדיקת שינה'}` : ''}

תאריך: ${new Date().toLocaleString('he-IL')}`;

    // Option 1: Using Twilio WhatsApp API
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_WHATSAPP_FROM) {
      try {
        const twilio = await import('twilio');
        const client = twilio.default(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        
        // Format phone number for Twilio (add country code)
        const toPhone = `whatsapp:+972${cleanPhone.substring(1)}`;
        
        await client.messages.create({
          from: process.env.TWILIO_WHATSAPP_FROM,
          to: toPhone,
          body: messageText,
        });
        
        console.log('WhatsApp message sent via Twilio');
        return true;
      } catch (twilioError) {
        console.error('Twilio error:', twilioError);
        // Fall through to logging
      }
    }
    
    // Option 2: Using WhatsApp Business API (alternative)
    // This would require additional setup with Meta's WhatsApp Business API
    
    // Option 3: Fallback - log the message (for development)
    // In production, you should use one of the above options
    console.log('WhatsApp message (would be sent to', cleanPhone, '):', messageText);
    
    // For now, return true to not block the form submission
    // In production, make sure to configure Twilio or another service
    return true;
  } catch (error) {
    console.error('WhatsApp sending error:', error);
    // Don't fail the entire request if WhatsApp fails
    return false;
  }
}

