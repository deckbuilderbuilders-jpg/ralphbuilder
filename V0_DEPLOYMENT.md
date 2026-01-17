# V0 & AI Deployment Guide

This repository is optimized for deployment with v0, Claude, or other AI deployment tools.

## 🤖 For v0 (v0.dev)

### Automatic Deployment

v0 can automatically deploy this repository. Here's what v0 will do:

1. **Clone** the repository
2. **Detect** it's a Next.js project
3. **Install** dependencies (`npm install`)
4. **Build** the project (`npm run build`)
5. **Deploy** to Vercel or your specified platform

### What v0 Needs to Know

This is a **Next.js 14** project that:
- Requires **Node.js 18+**
- Uses **TypeScript**
- Needs environment variables (see `.env.local.example`)
- Builds with `npm run build`
- Runs with `npm start`
- Can be deployed to **Vercel** (recommended)

### Required Environment Variables

For v0 to deploy successfully, provide:

```
ANTHROPIC_API_KEY=sk-ant-your-actual-key
STRIPE_SECRET_KEY=sk_test_your-key (optional)
STRIPE_PUBLISHABLE_KEY=pk_test_your-key (optional)
```

### Deployment Command for v0

```bash
# v0 will automatically run:
npm install
npm run build
npm start

# Or for Vercel:
vercel deploy --prod
```

---

## 🔧 For Other AI Deployment Tools

### Key Project Information

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Package Manager**: npm
- **Node Version**: 18+
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Dev Command**: `npm run dev`
- **Port**: 3000 (default)

### Deployment Checklist for AI Tools

- [ ] Clone the repository
- [ ] Install dependencies: `npm install`
- [ ] Set environment variables (see `.env.local.example`)
- [ ] Build: `npm run build`
- [ ] Deploy to Vercel/AWS/GCP/Azure/Other
- [ ] Add environment variables in hosting dashboard
- [ ] Test the deployment

### What the App Does

This is a web application that lets users:
1. Describe an app they want to build
2. Get AI-generated questions to clarify requirements
3. Receive an auto-generated product specification
4. See cost estimates
5. Have Claude AI build their application autonomously
6. Download the finished code

**No manual intervention needed during deployment.**

---

## ✅ Deployment Validation

After deployment, verify:

```bash
# Check if app responds
curl https://your-deployed-url.vercel.app/

# Should return 200 and HTML content
```

Visit `https://your-deployed-url.vercel.app/` in a browser. You should see:
- Navigation bar with "Ralph Builder" logo
- "What do you want to build?" heading
- Text input field for app description
- Example app suggestions
- "Continue →" button

---

## 🚨 If Deployment Fails

### Common Issues for AI Deployment Tools

1. **Missing dependencies**
   - Solution: Run `npm install`
   - Check: `package.json` exists and has all dependencies

2. **Missing environment variables**
   - Solution: Add ANTHROPIC_API_KEY (required)
   - Check: `.env.local.example` for all available variables

3. **Build fails**
   - Solution: Check Node.js version is 18+
   - Check: Run `npm run build` locally first
   - Check: No TypeScript errors in output

4. **Port issues**
   - Solution: Vercel/cloud platforms auto-assign ports
   - Not an issue for serverless deployment

### Debug Steps for AI Tools

```bash
# 1. Verify Node version
node --version  # Should be 18+

# 2. Verify npm install works
npm install

# 3. Verify build works
npm run build

# 4. Check for TypeScript errors
npx tsc --noEmit

# 5. Verify all files are present
ls -la app/ components/ lib/ styles/
```

---

## 🚀 Deployment Platforms

This app works on any Node.js hosting platform:

### ✅ Recommended: Vercel
- Built by Next.js creators
- Auto-detects Next.js projects
- Free tier available
- Automatic deployments from git
- See: `vercel.json` for configuration

### ✅ Also Works: AWS Amplify
```bash
amplify add hosting
amplify publish
```

### ✅ Also Works: Firebase Hosting
```bash
npm install -g firebase-tools
firebase deploy
```

### ✅ Also Works: Railway, Render, Heroku
```bash
# These platforms auto-detect Next.js
# Just push code or connect GitHub repo
```

---

## 📝 Notes for AI Deployment Tools

### Before Deploying

Ensure you have:
1. ✅ This repository code
2. ✅ Anthropic API key (required)
3. ✅ Stripe keys (optional, for payments)
4. ✅ Target deployment platform

### What the App Needs

The deployed app will need access to:
- **Claude API** (via ANTHROPIC_API_KEY)
- **Stripe API** (optional, if payments enabled)
- **Outbound internet** (to call external APIs)

### What the App Does NOT Need

- ❌ Database (uses in-memory storage)
- ❌ File storage (users download code)
- ❌ Authentication (no user accounts)
- ❌ Email service (no notifications)

---

## 🔄 Continuous Deployment

If deploying with git-based CI/CD:

```yaml
# GitHub Actions example
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - run: npm start
```

For Vercel, just push to GitHub - Vercel deploys automatically!

---

## ✅ Deployment Success Indicators

After deployment, you should see:

1. ✅ App loads at your deployment URL
2. ✅ Can type in the "Describe your app" field
3. ✅ "Continue" button is clickable
4. ✅ Example apps appear as buttons
5. ✅ Navigation bar is visible
6. ✅ Dark theme displays correctly

If all the above work, deployment is successful!

---

## 🎯 Quick Deployment Summary for v0

1. **Clone** this repository
2. **Run** `npm install` (installs all dependencies)
3. **Build** with `npm run build` (creates production build)
4. **Deploy** to Vercel (recommended) or other Node.js platform
5. **Add env vars** (ANTHROPIC_API_KEY at minimum)
6. **Test** by visiting the deployed URL
7. **Done!** Users can now build apps with Ralph

**Total deployment time: ~5 minutes**

---

**Questions?** Check README.md, SETUP_GUIDE.md, or PROJECT_OVERVIEW.md
