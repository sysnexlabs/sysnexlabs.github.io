// EXAMPLE: Contact.jsx with EmailJS integration
// To use this:
// 1. npm install @emailjs/browser
// 2. Sign up at emailjs.com and configure Zoho Mail service
// 3. Replace the handleSubmit function in Contact.jsx with this version
// 4. Add your EmailJS credentials (or use environment variables)

import emailjs from '@emailjs/browser';

// EmailJS Configuration (use environment variables in production)
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'your_service_id';
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'your_template_id';
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'your_public_key';

const handleSubmit = async (e) => {
  e.preventDefault()
  if (!validate()) return

  try {
    setSubmitted(false); // Reset previous state
    
    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Send email via EmailJS
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        name: formData.name,
        email: formData.email,
        company: formData.company || 'N/A',
        role: formData.role || 'N/A',
        interest: formData.interest,
        message: formData.message,
        to_email: 'contact@sysnex.tech', // Your receiving email
      }
    );

    console.log('Email sent successfully:', result);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        role: '',
        interest: 'general',
        message: ''
      });
    }, 3000);

  } catch (error) {
    console.error('Error sending email:', error);
    // Fallback to mailto if EmailJS fails
    const subject = encodeURIComponent(`Contact Form: ${formData.interest}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Company: ${formData.company || 'N/A'}\n` +
      `Role: ${formData.role || 'N/A'}\n` +
      `Interest: ${formData.interest}\n\n` +
      `Message:\n${formData.message}`
    );
    window.location.href = `mailto:contact@sysnex.tech?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }
};

// Alternative: Using Fetch API with Serverless Function (Netlify/Vercel)
const handleSubmitWithAPI = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      setSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          role: '',
          interest: 'general',
          message: ''
        });
      }, 3000);
    } else {
      throw new Error(result.error || 'Failed to send email');
    }
  } catch (error) {
    console.error('Error:', error);
    // Show error message to user
    alert('Failed to send message. Please try again or email us directly at contact@sysnex.tech');
  }
};

