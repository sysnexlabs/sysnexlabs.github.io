# Contact Form Integration Options

## ⭐ Recommended: Direct Zoho SMTP (No Third-Party Service)

**Why this is best:** Uses your Zoho account directly, no separate EmailJS account needed.

### Step 1: Get Zoho App Password
1. Go to https://mail.zoho.com/zm/#settings/all/mailaccounts
2. Select your email account (contact@sysnex.tech)
3. Go to **Security** → **App Passwords**
4. Click **Generate New Password**
5. **Save this password** - you'll need it (it won't be shown again)

### Step 2: Setup Serverless Function

**For Netlify:**
1. Install nodemailer: `npm install nodemailer`
2. The serverless function is already created at `netlify/functions/send-email.js`
3. Set environment variables in Netlify dashboard (Site settings → Environment variables):
   - `ZOHO_EMAIL`: contact@sysnex.tech
   - `ZOHO_APP_PASSWORD`: [the app password you generated]

**For Vercel:**
1. Create `api/send-email.js` (similar to netlify function)
2. Set environment variables in Vercel dashboard

### Step 3: Update Contact.jsx
See code example below (using fetch to call the serverless function).

---

## Alternative: EmailJS (If you prefer managed service)

**Why use EmailJS:** 
- No serverless functions needed (works purely client-side)
- Built-in spam protection
- Email analytics
- But requires a separate EmailJS account (free tier available)

### Setup:
1. Sign up at https://www.emailjs.com/ (free tier: 200 emails/month)
2. Create an Email Service → Choose "Zoho Mail"
3. Create Email Template with variables
4. Install: `npm install @emailjs/browser`

---

## Alternative: Netlify/Vercel Serverless Function (Direct Zoho SMTP)

If you're deploying on Netlify or Vercel, use the serverless function approach.
The `netlify/functions/send-email.js` file has been created for you.

### Requirements:
1. Install nodemailer: `npm install nodemailer`
2. Set environment variables:
   - `ZOHO_EMAIL`: contact@sysnex.tech
   - `ZOHO_APP_PASSWORD`: [Get from Zoho Mail settings]

### Get Zoho App Password:
1. Go to https://mail.zoho.com/zm/#settings/all/mailaccounts
2. Select your email account
3. Security → App Passwords
4. Generate new app password

---

## Alternative: Zoho Forms (Embedded)

1. Create form at https://www.zoho.com/forms/
2. Configure email notifications
3. Get embed code
4. Replace form section with embed

---

## Why EmailJS Requires a Separate Account

**Short answer:** EmailJS is a third-party service that acts as a proxy/middleman between your website and email providers. It requires a separate account because:
- It stores your email service credentials securely on their servers
- It provides additional features (analytics, spam filtering, email templates)
- It handles the email sending on your behalf from their infrastructure

**If you don't want a separate account:** Use the **Direct Zoho SMTP** approach (Option 1 above) - it uses your Zoho account directly via serverless functions, no third-party service needed!

---

## Alternative: Simple Email Forwarding

If you just want emails to forward to Zoho:
1. Configure DNS MX records for contact@sysnex.tech
2. Set up forwarding in your domain's email settings
3. Keep the mailto link (current implementation)

