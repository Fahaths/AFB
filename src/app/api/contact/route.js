import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, message } = body;

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 });
    }

    // 1. Store in Supabase
    // Note: The user needs to create an "enquiries" table in Supabase 
    // with columns: id, name, message, created_at
    const { data, error } = await supabase
      .from('enquiries')
      .insert([{ name, message }]);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to save enquiry to database. Ensure the "enquiries" table exists.' }, { status: 500 });
    }

    // 2. Send Email
    // Setup transporter using SMTP details from env vars
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER || '"AFB Contact Form" <noreply@example.com>',
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `New Enquiry from ${name}`,
      text: `You have received a new enquiry.\n\nName: ${name}\nMessage: ${message}`,
      html: `<h3>New Enquiry</h3><p><strong>Name:</strong> ${name}</p><p><strong>Message:</strong> ${message}</p>`,
    };

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail(mailOptions);
    } else {
      console.warn("SMTP credentials not configured. Skipping email send.");
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
