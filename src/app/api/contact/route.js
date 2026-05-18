import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, message } = body;

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 });
    }

    // 1. Store in Supabase
    const { data: dbData, error: dbError } = await supabase
      .from('enquiries')
      .insert([{ name, message }])
      .select();

    if (dbError) {
      console.error('Supabase save failed:', dbError);
      return NextResponse.json({ error: 'Failed to record your enquiry. Please try again.' }, { status: 500 });
    }

    // 2. Deliver Email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Al Fahath Bags & Footwears <onboarding@resend.dev>',
            to: 'alfahathbagsandfootwear@gmail.com',
            subject: `New Enquiry from ${name}`,
            html: `
              <div style="font-family: serif; color: #071B34; padding: 20px; max-width: 600px; border: 1px solid rgba(7, 27, 52, 0.1);">
                <h2 style="border-bottom: 1px solid #C89B3C; padding-bottom: 10px; text-transform: uppercase; letter-spacing: 0.1em;">New Atelier Enquiry</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p style="background: #F7F3EE; padding: 15px; border-radius: 8px; font-style: italic;">"${message}"</p>
                <footer style="margin-top: 20px; font-size: 11px; color: #7A7A7A; border-top: 1px solid rgba(7, 27, 52, 0.05); padding-top: 10px;">
                  Sent from Al Fahath Bags & Footwears Platform
                </footer>
              </div>
            `,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Resend delivery failed:', errorText);
        }
      } catch (emailErr) {
        console.error('Resend server request failed:', emailErr);
      }
    } else {
      console.warn("RESEND_API_KEY is not defined in environment variables. Email notification skipped.");
    }

    return NextResponse.json({ success: true, data: dbData });
  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
