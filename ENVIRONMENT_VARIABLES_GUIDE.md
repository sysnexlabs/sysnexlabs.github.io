# Environment Variables Setup Guide

## Where to Set Environment Variables

### For Netlify (Recommended if using netlify/functions)

1. **Via Netlify Dashboard (Easiest):**
   - Go to https://app.netlify.com/
   - Select your site (or create one)
   - Go to **Site settings** → **Environment variables**
   - Click **Add variable**
   - Add these variables:
     - **Key:** `ZOHO_EMAIL`
     - **Value:** `contact@sysnex.tech`
     - Click **Save**
   - Add second variable:
     - **Key:** `ZOHO_APP_PASSWORD`
     - **Value:** `[your Zoho app password]`
     - Click **Save**

2. **Via Netlify CLI:**
   ```bash
   # Install Netlify CLI if you haven't
   npm install -g netlify-cli
   
   # Login to Netlify
   netlify login
   
   # Set environment variables
   netlify env:set ZOHO_EMAIL "contact@sysnex.tech"
   netlify env:set ZOHO_APP_PASSWORD "your-app-password-here"
   
   # Verify they're set
   netlify env:list
   ```

3. **Via netlify.toml (Not recommended for secrets):**
   ```toml
   [build.environment]
     ZOHO_EMAIL = "contact@sysnex.tech"
     # ZOHO_APP_PASSWORD should NOT be in this file (it's a secret!)
   ```
   **Note:** Never commit secrets to git! Use the dashboard for `ZOHO_APP_PASSWORD`.

---

### For Vercel

1. **Via Vercel Dashboard:**
   - Go to https://vercel.com/dashboard
   - Select your project (or create one)
   - Go to **Settings** → **Environment Variables**
   - Click **Add New**
   - Add variable:
     - **Key:** `ZOHO_EMAIL`
     - **Value:** `contact@sysnex.tech`
     - **Environment:** Select all (Production, Preview, Development)
     - Click **Save**
   - Add second variable:
     - **Key:** `ZOHO_APP_PASSWORD`
     - **Value:** `[your Zoho app password]`
     - **Environment:** Select all
     - Click **Save**

2. **Via Vercel CLI:**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Login
   vercel login
   
   # Set environment variables
   vercel env add ZOHO_EMAIL production
   # When prompted, enter: contact@sysnex.tech
   
   vercel env add ZOHO_APP_PASSWORD production
   # When prompted, enter your app password
   ```

---

### For GitHub Pages (Static Site Only)

**Important:** GitHub Pages only serves static files and **does NOT support serverless functions or environment variables**.

**Options:**
1. Use EmailJS (client-side only, no serverless function needed)
2. Use a separate service like Netlify Functions or Vercel Functions
3. Use GitHub Actions to deploy to Netlify/Vercel automatically
4. Use a third-party form service (Formspree, etc.)

---

### For Local Development

Create a `.env.local` file in your project root (this file should be in `.gitignore`):

```bash
# .env.local
ZOHO_EMAIL=contact@sysnex.tech
ZOHO_APP_PASSWORD=your-app-password-here
```

**For Vite projects (like yours):**
- Environment variables must be prefixed with `VITE_` to be accessible in the browser
- For serverless functions, you can use regular env vars (they run server-side)

**Example for Netlify Functions:**
- In your function: `process.env.ZOHO_EMAIL` works directly
- No `VITE_` prefix needed for serverless functions

---

### Security Best Practices

1. **Never commit secrets to git:**
   - Add `.env.local` to `.gitignore`
   - Never commit `.env` files with passwords
   - Use platform-specific secret management

2. **Use different passwords for different environments:**
   - Production environment variables (sensitive)
   - Development/staging (less sensitive)

3. **Rotate passwords regularly:**
   - If a password is compromised, regenerate it in Zoho
   - Update environment variables immediately

---

### Testing Environment Variables

**For Netlify Functions:**
```javascript
// In your function code, you can test:
console.log('ZOHO_EMAIL:', process.env.ZOHO_EMAIL ? 'Set' : 'Not set');
// Never log the actual password!
```

**After deploying:**
1. Test the contact form
2. Check Netlify/Vercel function logs
3. Verify emails are being sent

---

### Troubleshooting

**Issue: Environment variable not found**
- Check spelling (case-sensitive)
- Redeploy after adding variables
- For Netlify: Variables are available immediately after saving
- For Vercel: You may need to redeploy

**Issue: Function can't send email**
- Verify Zoho App Password is correct
- Check Zoho account permissions
- Verify email address format
- Check function logs in dashboard

