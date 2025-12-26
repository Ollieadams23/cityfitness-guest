# Netlify Deployment Instructions

## Quick Deploy to Netlify

### Option 1: Drag & Drop (Easiest)
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "Add new site" → "Deploy manually"
3. Drag the entire `cityfitness-guest` folder onto the page
4. Wait for deployment to complete
5. Your app will be live at a URL like: `https://random-name-123.netlify.app`

### Option 2: Connect to GitHub (Recommended)
1. Push your code to GitHub (if not already done)
2. Go to [netlify.com](https://netlify.com) and login
3. Click "Add new site" → "Import an existing project"
4. Choose "GitHub" and authorize Netlify
5. Select your `cityfitness-guest` repository
6. Click "Deploy site"
7. Netlify will automatically deploy and create a URL

### Option 3: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from your project directory
cd cityfitness-guest
netlify deploy --prod
```

## What Gets Deployed

- `index.html` - Your main app
- `manifest.json` - PWA configuration
- `sw.js` - Service worker
- `netlify/functions/submit-guest.js` - Serverless proxy function
- `netlify.toml` - Netlify configuration

## How It Works

Once deployed on Netlify:
1. User fills out form on your Netlify site
2. Form submits to `/.netlify/functions/submit-guest`
3. Netlify function forwards request to CityFitness API
4. Response comes back through the function (no CORS issues!)
5. User sees success message

## Testing Locally with Netlify Dev

To test the Netlify function locally:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Start local development server
netlify dev
```

This will start a local server at `http://localhost:8888` that includes the serverless function.

## Custom Domain (Optional)

After deployment, you can add a custom domain:
1. Go to your site settings in Netlify
2. Click "Domain management"
3. Add your custom domain
4. Follow DNS configuration instructions

## Environment Variables (If Needed)

If you need to add any configuration:
1. Go to Site settings → Environment variables
2. Add variables as needed
3. Redeploy the site

## Troubleshooting

**Function not working?**
- Check the function logs in Netlify dashboard → Functions tab
- Ensure `netlify.toml` is in the root directory
- Verify function is in `netlify/functions/` directory

**Still getting CORS errors?**
- Make sure you're accessing the deployed Netlify URL, not localhost
- Clear browser cache
- Check browser console for detailed error messages
