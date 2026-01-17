# Ralph Builder - Complete Setup & User Guide

## 🎯 Quick Start (5 minutes)

### Prerequisites
- Node.js 18+ and npm
- Anthropic API key: https://console.anthropic.com
- (Optional) Stripe account for production

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.local.example .env.local

# 3. Edit .env.local with your keys
# ANTHROPIC_API_KEY=sk-ant-...
# STRIPE_SECRET_KEY=sk_test_...
# STRIPE_PUBLISHABLE_KEY=pk_test_...

# 4. Run development server
npm run dev

# 5. Visit http://localhost:3000
```

That's it! Ralph Builder is ready to use.

---

## 📚 User Guide

### Step 1: Describe Your App

Describe what you want to build in plain English. Be specific about:
- Main purpose of the app
- Key features you need
- Who will use it
- Any technology preferences

**Examples:**
```
"A note-taking app where users can create, organize, and search notes with tag support"

"A task management tool with kanban board, team collaboration, and progress tracking"

"An inventory management system for small retail stores with barcode scanning"
```

### Step 2: Answer Clarifying Questions

Ralph will ask 5-7 questions to better understand your vision:

- What is the primary use case?
- Who are the main users?
- What devices will they use?
- Do you need user authentication?
- Should data persist after closing the app?
- Any preferred technology or design style?

**Pro Tip**: The more detailed your answers, the better Ralph can build your app.

### Step 3: Review the Specification

Ralph generates a detailed Product Requirements Document (PRD) based on your description and answers. You can:
- Review the specification
- Edit it if needed
- Approve it to continue

**What's in the PRD:**
- Overview and purpose
- Core features and user stories
- Data model and storage
- Technical specifications
- Acceptance criteria
- Deployment notes

### Step 4: Check Cost Estimate

Ralph analyzes the complexity and shows you:
- **Estimated cost**: Transparent pricing (usually $10-150)
- **Complexity level**: Simple, Medium, or Complex
- **Iteration count**: Number of AI loops needed
- **Token usage**: API tokens consumed

**Cost Breakdown:**
- Simple apps (CRUD, simple API): $10-25
- Medium apps (Web app with features): $30-75
- Complex apps (Full-featured system): $80-200

### Step 5: Approve & Pay (Optional)

When you're ready, approve the cost estimate. In production, this redirects to Stripe for payment.

For development, you can skip Stripe and go straight to building.

### Step 6: Watch Ralph Build

Ralph automatically builds your app through autonomous iterations:

1. **Iteration 1**: Creates project structure and core functionality
2. **Iteration 2-5**: Implements features and validation
3. **Iteration 6-10**: Adds tests, error handling, and improvements
4. **Iteration 11-15**: Refines UI, optimizes code, ensures completeness

Watch the build log to see what Ralph is doing. The app is complete when Ralph outputs `<BUILD_COMPLETE>`.

### Step 7: Download Your App

You get:
- **Complete source code** ready for deployment
- **Working application** that runs immediately
- **Professional code quality** with best practices
- **Tests and documentation** included

Download the code and deploy it to your hosting platform.

---

## 🔧 Technical Details

### Architecture

**Frontend:**
- React 18 with TypeScript
- Next.js 14 for SSR and API routes
- Framer Motion for animations
- Tailwind CSS for styling
- Zustand for state management

**Backend:**
- Next.js API routes
- Claude API for AI operations
- Stripe API for payments (optional)

### Data Flow

```
User Input
    ↓
Generate Questions (Claude API)
    ↓
User Answers
    ↓
Generate PRD (Claude API)
    ↓
Estimate Cost (Claude API)
    ↓
[Payment Processing]
    ↓
Run Ralph Loop (Claude API)
    ↓
Built Application
```

### Ralph Loop Execution

```
Iteration 1
├── Read PRD and task
├── Send to Claude with context
├── Claude generates code
├── Validate completion
└── If not done, go to Iteration 2

Iteration 2-15
├── Read previous code from context
├── Claude improves application
├── Run tests and validation
└── Repeat until <BUILD_COMPLETE>
```

---

## 💰 Cost Management

### Understanding Costs

Costs are calculated based on:
- **Input tokens**: PRD, context, instructions (~2-4k per iteration)
- **Output tokens**: Generated code (~1.5-3.5k per iteration)
- **Number of iterations**: Typically 8-25 depending on complexity

### Pricing Example

For a medium complexity app:
- 15 iterations × 3,500 input tokens = 52,500 tokens
- 15 iterations × 2,500 output tokens = 37,500 tokens
- Total: 90,000 tokens
- Cost: ~$45 (at $0.0001-0.0004 per token)

### Tips to Reduce Costs

1. **Be specific** in your app description
2. **Write clear requirements** in the PRD
3. **Start simple** - build core features first
4. **Review the estimate** before approving
5. **Use max-iterations wisely** (default 15 is usually enough)

---

## 🚀 Deployment

### Deploy Built App to Production

Once you have your app code:

```bash
# 1. Extract your app code
# 2. Install dependencies if needed
npm install

# 3. Deploy to your platform:

# Vercel (Recommended for Next.js)
npm install -g vercel
vercel

# Or docker
docker build -t my-app .
docker run my-app

# Or traditional hosting
npm run build
npm start
```

### Deploy Ralph Builder Itself

Deploy Ralph Builder to Vercel:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# - ANTHROPIC_API_KEY
# - STRIPE_SECRET_KEY
# - STRIPE_PUBLISHABLE_KEY
```

---

## 🐛 Troubleshooting

### "API key error"
**Problem**: ANTHROPIC_API_KEY not set
**Solution**:
1. Copy `.env.local.example` to `.env.local`
2. Add your actual API key
3. Restart the dev server
4. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

### "Failed to generate questions"
**Problem**: Claude API call failed
**Solution**:
1. Verify API key is valid: https://console.anthropic.com
2. Check account has sufficient credits
3. Try with a simpler description
4. Check error in browser console

### "Ralph keeps iterating"
**Problem**: Building seems stuck
**Solution**:
1. Check the build log to see what's happening
2. This is normal - Ralph may take 15+ iterations
3. You can stop (reload page) and try different requirements
4. Review the .ralph-iteration logs to debug

### "Stripe not working"
**Problem**: Payment fails
**Solution**:
1. Use test Stripe keys: https://stripe.com/docs/keys#test
2. Test card: 4242 4242 4242 4242
3. Check Stripe dashboard for error logs
4. Verify webhook endpoints

### "Code generation seems wrong"
**Problem**: Ralph generated incorrect code
**Solution**:
1. This is rare but can happen
2. Check what the PRD specifies
3. Review the generated code
4. Build again with a more detailed PRD
5. File an issue with the specific case

---

## 📊 Monitoring

### Check API Usage

Visit: https://console.anthropic.com/account/usage

Monitor:
- Tokens used
- Cost to date
- API calls made
- Peak usage times

### Optimize Usage

1. **Batch apps**: Build multiple apps in one session
2. **Monitor costs**: Check usage dashboard regularly
3. **Test locally**: Validate expensive operations first
4. **Use estimates**: Review costs before building

---

## 🎓 Learning Resources

### Ralph Technique
- [Original Ralph Creator](https://ghuntley.com/ralph/)
- [Ralph Playbook](https://github.com/ClaytonFarr/ralph-playbook)
- [Awesome Claude](https://awesomeclaude.ai/ralph-wiggum)

### Claude API
- [Claude Docs](https://docs.anthropic.com)
- [API Reference](https://docs.anthropic.com/claude/reference)
- [Models Guide](https://docs.anthropic.com/claude/docs/models)

### Next.js
- [Next.js Docs](https://nextjs.org/docs)
- [API Routes Guide](https://nextjs.org/docs/api-routes/introduction)
- [Deployment](https://nextjs.org/docs/deployment)

---

## 🤝 Contributing

Found a bug? Have an idea? Contributions welcome!

### Local Development
```bash
npm run dev          # Start dev server
npm run lint         # Run linter
npm run build        # Build for production
```

---

## 📄 License

MIT - Use freely for personal and commercial projects.

---

## 🎉 You're Ready!

1. ✅ Set up the project
2. ✅ Configure your API keys
3. ✅ Run the dev server
4. ✅ Describe your first app
5. ✅ Watch Ralph build it!

**Happy building! 🚀**

Have questions? Check the README or review the API documentation.
