// EXAMPLE: Contact.jsx with Direct Zoho SMTP (via Serverless Function)
// This uses Zoho Mail directly - NO EmailJS account needed!
// 
// Steps:
// 1. Create serverless function (netlify/functions/send-email.js - already created)
// 2. Get Zoho App Password from Zoho Mail settings
// 3. Set environment variables: ZOHO_EMAIL, ZOHO_APP_PASSWORD
// 4. Replace handleSubmit in Contact.jsx with this version

const handleSubmit = async (e) => {
  e.preventDefault()
  if (!validate()) return

  try {
    setSubmitted(false); // Reset previous state
    
    // Call your serverless function
    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const result = await response.json()

    if (response.ok) {
      setSubmitted(true);
      console.log('Email sent successfully!');
      
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
    console.error('Error sending email:', error);
    
    // Fallback to mailto if API fails
    const subject = encodeURIComponent(`Contact Form: ${formData.interest}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Company: ${formData.company || 'N/A'}\n` +
      `Role: ${formData.role || 'N/A'}\n` +
      `Interest: ${formData.interest}\n\n` +
      `Message:\n${formData.message}`
    );
    
    // Show user-friendly error
    alert('There was an issue sending your message. Opening your email client as a backup...');
    window.location.href = `mailto:contact@sysnex.tech?subject=${subject}&body=${body}`;
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  }
};

// For Vercel, use: '/api/send-email'
// For Netlify, use: '/.netlify/functions/send-email'

