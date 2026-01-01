# Zoho Mail Integration Guide

## Option 1: Serverless Function (Recommended)

### Setup Steps:

1. **Create Zoho Mail Group (Optional but Recommended):**
   - Go to https://mail.zoho.com/zm/#settings/groups
   - Create a new group: `contact@sysnex.tech`
   - Add team members who should receive contact form submissions
   - **Benefits:** Multiple people receive emails, better for team collaboration

2. **Get Zoho App Password:**
   - Go to https://mail.zoho.com/zm/#settings/all/mailaccounts
   - Select your email account (or the account that manages the group)
   - Go to "Security" → "App Passwords"
   - Generate a new app password (save it - you'll need it)
   - **Note:** Use the account that has permissions to send as the group email

3. **For Netlify - Set Environment Variables:**
   - Install dependencies: `npm install nodemailer`
   - Create `netlify/functions/send-email.js` (already created)
   - **Set environment variables in Netlify Dashboard:**
     1. Go to https://app.netlify.com/
     2. Click on your site name (or create a new site if you haven't)
     3. In the top menu, click **"Site configuration"** or **"Site settings"**
     4. In the left sidebar, click **"Environment variables"** (under "Build & deploy")
     5. Click the **"Add a variable"** button (or "Add variable")
     6. **First variable:**
        - **Key:** `ZOHO_EMAIL`
        - **Value:** `contact@sysnex.tech`
        - **Scopes:** Select "All scopes" (or at least "Production")
        - Click **"Add variable"**
     7. **Second variable:**
        - Click **"Add a variable"** again
        - **Key:** `ZOHO_APP_PASSWORD`
        - **Value:** `[paste your Zoho app password from step 2]`
        - **Scopes:** Select "All scopes" (or at least "Production")
        - Click **"Add variable"**
     8. **Important:** After adding variables, you need to **redeploy your site** for them to take effect:
        - Go to "Deploys" tab
        - Click "Trigger deploy" → "Deploy site" (or push a new commit)
   - **Alternative:** Use Netlify CLI (see `ENVIRONMENT_VARIABLES_GUIDE.md` for CLI instructions)

4. **For Vercel:**
   - Create `api/send-email.js` instead
   - Set environment variables:
     - **Via Dashboard:** Go to https://vercel.com/dashboard → Your Project → Settings → Environment Variables
     - **Add the same variables as above**
     - **See `ENVIRONMENT_VARIABLES_GUIDE.md` for detailed instructions**

5. **Update Contact.jsx** to call the API endpoint

---

## Option 2: Form Submission Service (Easiest)

Use a third-party service that forwards to Zoho:

### Services:
- **Formspree**: https://formspree.io/ (free tier available)
- **EmailJS**: https://www.emailjs.com/ (free tier available)
- **Web3Forms**: https://web3forms.com/ (free)

### Example with EmailJS:
1. Sign up at emailjs.com
2. Create email service (connect Zoho Mail)
3. Get your public key
4. Update Contact.jsx to use EmailJS SDK

---

## Option 3: Zoho Forms (Embedded)

1. Create form at https://www.zoho.com/forms/
2. Configure email notifications to your Zoho Mail
3. Get embed code
4. Replace your current form with Zoho Forms embed

---

## Option 4: Zoho Mail Group Setup (Recommended for Teams)

**Best for:** Teams where multiple people need to receive contact form submissions

1. **Create Zoho Mail Group:**
   - Go to https://mail.zoho.com/zm/#settings/groups
   - Click "Create Group"
   - Set group email: `contact@sysnex.tech`
   - Add team members who should receive emails
   - Configure group settings (notifications, permissions)

2. **Use the group email in your form:**
   - All emails sent to contact@sysnex.tech will be delivered to all group members
   - No need to update individual email addresses when team changes
   - Better for collaboration and shared inbox management

3. **For serverless function approach:**
   - Use the group email (contact@sysnex.tech) as the `to` address
   - Use an individual account's app password for authentication (the account must have permission to send as the group)

---

## Option 5: Email Forwarding (Simple)

1. Set up email forwarding:
   - contact@sysnex.tech → your-zoho-email@zoho.com
2. Keep mailto link (form will open email client)
3. Emails sent to contact@sysnex.tech will forward to Zoho

---

## Option 6: Zoho Mail API (Advanced)

Use Zoho Mail API directly (requires OAuth setup):
- Documentation: https://www.zoho.com/mail/help/api/
- More complex, requires authentication flow

