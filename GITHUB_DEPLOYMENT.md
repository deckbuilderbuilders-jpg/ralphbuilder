# GitHub Setup & v0 Deployment Guide

This guide walks you through pushing Ralph Builder to GitHub and deploying it with v0.

## 📋 Prerequisites

- GitHub account (free at https://github.com)
- Git installed locally
- Anthropic API key
- (Optional) Stripe keys for payments

## 🚀 Step-by-Step: Push to GitHub

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. **Repository name**: `ralph-builder`
3. **Description**: "No-code app creation platform powered by Claude AI"
4. **Public** (so v0 can access it)
5. **Don't initialize** with README (we already have one)
6. Click **Create repository**

### Step 2: Get the Repository URL

After creating, you'll see:

```
https://github.com/YOUR-USERNAME/ralph-builder.git
```

Copy this URL.

### Step 3: Push Code to GitHub (Local Machine)

```bash
# Navigate to the project directory
cd /path/to/ralph-builder

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Ralph Builder - No-code app creation platform"

# Add the remote repository
git remote add origin https://github.com/YOUR-USERNAME/ralph-builder.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Verify on GitHub

Go to `https://github.com/YOUR-USERNAME/ralph-builder`

You should see:
- ✅ All files uploaded
- ✅ README.md displayed
- ✅ Commit history shows your initial commit
- ✅ Green checkmark (if Actions runs successfully)

---

## 🤖 Step-by-Step: Deploy with v0

### Step 1: Share Repository with v0

Tell v0 (or the AI deploying):

> "Deploy this GitHub repository: https://github.com/YOUR-USERNAME/ralph-builder
> 
> Instructions:
> 1. Clone from GitHub
> 2. Install: `npm install`
> 3. Build: `npm run build`
> 4. Deploy to Vercel (or preferred platform)
> 5. Add environment variables
> 6. Test the deployment"

### Step 2: v0 Will Automatically

```bash
# 1. Clone the repository
git clone https://github.com/YOUR-USERNAME/ralph-builder.git
cd ralph-builder

# 2. Install dependencies
npm install

# 3. Build the application
npm run build

# 4. Deploy to Vercel
# (v0 handles this based on vercel.json configuration)
```

### Step 3: Add Environment Variables in v0/Vercel

v0 or Vercel will prompt for:

```
ANTHROPIC_API_KEY = sk-ant-your-actual-key
STRIPE_SECRET_KEY = sk_test_your-key (optional)
STRIPE_PUBLISHABLE_KEY = pk_test_your-key (optional)
```

### Step 4: Deployment Complete!

v0 will provide you with:

```
Deployment URL: https://ralph-builder-abc123.vercel.app
Status: ✅ Deployed
```

Visit this URL and you'll see Ralph Builder running!

---

## 📝 What v0 Needs to Know

Include this in your message to v0:

```
This is a Next.js 14 web application with:
- Node.js 18+ requirement
- npm for package management
- TypeScript for type safety
- API routes that call Claude and Stripe APIs

Build Command: npm run build
Start Command: npm start
Dev Command: npm run dev

Environment Variables Required:
- ANTHROPIC_API_KEY (required)
- STRIPE_SECRET_KEY (optional)
- STRIPE_PUBLISHABLE_KEY (optional)

Documentation:
- README.md - Project overview
- SETUP_GUIDE.md - Setup instructions
- V0_DEPLOYMENT.md - Deployment guide
- API_DOCS.md - API endpoints
```

---

## ✅ Verification Checklist

After pushing to GitHub and deploying with v0:

### GitHub Repository
- [ ] Repository is public
- [ ] All files are uploaded
- [ ] README.md is visible
- [ ] .gitignore is present
- [ ] vercel.json is present
- [ ] .github/workflows exists
- [ ] package.json is correct

### v0 Deployment
- [ ] App deploys successfully
- [ ] Build logs show "Build completed"
- [ ] No TypeScript errors
- [ ] Deployment URL is provided
- [ ] Environment variables are set

### Live Application
- [ ] Can visit deployment URL
- [ ] App loads without errors
- [ ] Can type in input field
- [ ] Example apps are visible
- [ ] Dark theme displays correctly
- [ ] Navigation bar appears

---

## 🔑 Getting Your API Keys

### Anthropic API Key (Required)

1. Go to https://console.anthropic.com
2. Sign up or log in
3. Go to "API Keys"
4. Click "Create New Key"
5. Copy the key (looks like: `sk-ant-abc123xyz`)
6. Save in a secure location

### Stripe Keys (Optional, for Payments)

1. Go to https://stripe.com/dashboard
2. Sign up or log in
3. Go to "Developers" → "API Keys"
4. Find "Publishable key" and "Secret key"
5. Copy both keys
6. Test keys start with `pk_test_` and `sk_test_`

---

## 🚀 Quick Commands Reference

### GitHub Push (One Time)

```bash
cd ralph-builder
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/ralph-builder.git
git push -u origin main
```

### After Making Changes

```bash
git add .
git commit -m "Your message"
git push
```

### Clone for Another Person

```bash
git clone https://github.com/YOUR-USERNAME/ralph-builder.git
cd ralph-builder
npm install
```

---

## 🎯 Share with v0

Copy-paste this prompt for v0:

```
Deploy this GitHub repository to Vercel:
https://github.com/YOUR-USERNAME/ralph-builder

This is a Next.js 14 application.

Instructions:
1. Clone the repository
2. Run: npm install
3. Run: npm run build
4. Deploy to Vercel with these environment variables:
   - ANTHROPIC_API_KEY (get from https://console.anthropic.com)
   - STRIPE_SECRET_KEY (optional, from https://stripe.com)
   - STRIPE_PUBLISHABLE_KEY (optional, from https://stripe.com)
5. Provide the deployment URL

The app is a no-code app builder. It should load with a form asking "What do you want to build?"

See V0_DEPLOYMENT.md for detailed deployment instructions.
```

---

## 🐛 Troubleshooting

### Repository Not Found

**Problem**: v0 can't access the repository

**Solution**:
- Make sure repository is PUBLIC (not private)
- Check URL is correct
- Verify repository exists at https://github.com/YOUR-USERNAME/ralph-builder

### Build Fails

**Problem**: v0 reports build failure

**Solution**:
- Check that Node.js 18+ is specified
- Verify `.env.local.example` exists
- Run `npm install` locally to test
- Check GitHub Actions logs for details

### API Key Errors

**Problem**: App deploys but API calls fail

**Solution**:
- Verify ANTHROPIC_API_KEY is set in Vercel
- Check key is valid at https://console.anthropic.com
- Ensure no extra spaces or quotes in key
- Test key locally first

---

## 📚 File Reference

Key files v0 needs to know about:

```
ralph-builder/
├── package.json              ← Dependencies & scripts
├── next.config.js            ← Next.js configuration
├── tsconfig.json             ← TypeScript configuration
├── vercel.json               ← Vercel deployment config
├── .env.local.example        ← Environment template
├── README.md                 ← Project overview
├── V0_DEPLOYMENT.md          ← This deployment guide
├── API_DOCS.md               ← API documentation
├── app/
│   ├── page.tsx              ← Main UI
│   └── api/                  ← Backend endpoints
└── .github/
    └── workflows/
        └── build-deploy.yml  ← CI/CD automation
```

---

## ✨ After Successful Deployment

Once deployed, the app will be live at:

```
https://your-vercel-domain.vercel.app
```

Users can:
1. Describe an app they want to build
2. Get AI-generated clarifying questions
3. Receive auto-generated product specs
4. See cost estimates
5. Have Claude AI build their app
6. Download the source code

---

## 🎉 You're Done!

Your Ralph Builder is now:
- ✅ On GitHub (backed up, shareable)
- ✅ Deployed on Vercel (live and running)
- ✅ Ready for v0 or other AI tools to manage
- ✅ Accessible to anyone at your Vercel URL

### Next Steps

1. Test the deployment at your Vercel URL
2. Share the URL with users
3. Monitor API usage at console.anthropic.com
4. Track costs at stripe.com/dashboard

---

**Questions?** Check V0_DEPLOYMENT.md, README.md, or SETUP_GUIDE.md
