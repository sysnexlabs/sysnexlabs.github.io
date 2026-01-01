// Netlify Serverless Function to send email via Zoho SMTP
// Requires nodemailer package

const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const formData = JSON.parse(event.body);

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Create transporter using Zoho SMTP
    // Get these from Zoho Mail settings: https://mail.zoho.com/zm/#settings/all/mailaccounts
    // For group emails (contact@sysnex.tech), use the individual account's app password
    // that has permission to send as the group email
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.ZOHO_EMAIL, // contact@sysnex.tech (group email or individual account)
        pass: process.env.ZOHO_APP_PASSWORD // Zoho App Password (not your regular password)
      }
    });

    // Email content
    // If using a Zoho Mail group (contact@sysnex.tech), all group members will receive the email
    const mailOptions = {
      from: `"${formData.name}" <${process.env.ZOHO_EMAIL}>`,
      to: process.env.ZOHO_EMAIL, // contact@sysnex.tech (group email - all members receive)
      replyTo: formData.email,
      subject: `Contact Form: ${formData.interest || 'General Inquiry'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Company:</strong> ${formData.company || 'N/A'}</p>
        <p><strong>Role:</strong> ${formData.role || 'N/A'}</p>
        <p><strong>Interest:</strong> ${formData.interest || 'general'}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
      `,
      text: `
New Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company || 'N/A'}
Role: ${formData.role || 'N/A'}
Interest: ${formData.interest || 'general'}

Message:
${formData.message}
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        message: 'Email sent successfully' 
      })
    };

  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to send email',
        message: error.message 
      })
    };
  }
};

