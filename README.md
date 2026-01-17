# Ralph Builder - No-Code App Creation Platform

Build production-ready web applications without writing code. Ralph Builder makes the powerful Ralph Wiggum technique accessible to everyone.

## 🚀 What is Ralph Builder?

Ralph Builder combines:
- **The Ralph Wiggum Technique**: An autonomous AI loop that iteratively builds apps until they're complete
- **Claude AI**: The most capable AI model for code generation
- **Stripe Integration**: Easy payment processing for app building
- **Beautiful UI**: A delightful, intuitive interface for non-technical users

Simply describe what you want to build, answer a few clarifying questions, and Ralph automatically builds your entire application.

## ✨ Features

- **No Coding Required**: Describe your app idea in plain English
- **Intelligent Clarification**: AI asks questions to understand your vision
- **Automated PRD Generation**: Creates a detailed spec automatically
- **Cost Estimation**: Transparent pricing before you build
- **Ralph Automation**: AI iteratively builds until complete
- **Production-Ready Code**: Get working, tested applications
- **Stripe Integration**: Secure payment processing

## 📋 Prerequisites

- Node.js 18+ and npm
- Anthropic API key (get one at [console.anthropic.com](https://console.anthropic.com))
- Stripe account (optional, for production)

## 🛠️ Setup

### 1. Clone or download the project

```bash
cd ralph-webapp
npm install
```

### 2. Configure environment variables

```bash
# Copy the example
cp .env.local.example .env.local

# Edit .env.local with your credentials
ANTHROPIC_API_KEY=sk-ant-your-key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 3. Run the development server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 🎯 How It Works

### Step 1: Describe Your App
Tell Ralph what you want to build in plain English.

**Example inputs:**
- "A todo list app that syncs across devices"
- "An e-commerce store for selling digital products"
- "A real-time chat application for teams"

### Step 2: Clarify Details
Ralph asks 5-7 strategic questions about your app's requirements, technology preferences, and user needs.

### Step 3: Review PRD
Review and optionally edit the auto-generated Product Requirements Document.

### Step 4: Cost Estimate
See the transparent cost estimate for building your app based on complexity.

### Step 5: Approve & Pay
When ready, approve the cost and proceed with payment.

### Step 6: Build
Watch Ralph build your app using autonomous iterations. The AI loops until your app is complete.

### Step 7: Download
Get your production-ready source code and deploy it.

## 💾 What You Get

- **Complete source code** in React/TypeScript/Next.js
- **Working application** ready to deploy
- **Professional code quality** with best practices
- **Tests and validation** built in
- **Git history** showing each iteration
- **README documentation** for your app

## 💰 Pricing

Costs depend on app complexity:
- **Simple apps** (CRUD, API): ~$10-20
- **Medium apps** (Web app with features): ~$30-60
- **Complex apps** (Full-featured applications): ~$80-150

Prices are estimated before building, so you know the cost upfront.

## 🔧 Technical Architecture

### Frontend
- **React 18** with TypeScript
- **Next.js 14** for server-side rendering
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **Zustand** for state management

### Backend
- **Next.js API Routes** for endpoints
- **Claude API** integration for AI operations
- **Stripe API** for payments

### Key API Endpoints

```
POST /api/generate-questions    # Generate clarifying questions
POST /api/generate-prd          # Generate PRD from answers
POST /api/estimate-cost         # Estimate costs
POST /api/create-checkout       # Create Stripe checkout
POST /api/run-ralph             # Execute Ralph build loop
```

## 📝 Environment Variables

```
ANTHROPIC_API_KEY              # Your Anthropic API key
STRIPE_SECRET_KEY             # Stripe secret key (production)
STRIPE_PUBLISHABLE_KEY        # Stripe publishable key
NEXT_PUBLIC_APP_URL          # App URL for callbacks
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Add environment variables in Vercel dashboard under project settings.

### Deploy to Other Platforms

1. Build the app: `npm run build`
2. Set environment variables
3. Start the server: `npm start`

## 💡 How Ralph Works

The Ralph Wiggum technique is a development methodology that:

1. **Reads current state** - Checks git history and existing files
2. **Sends context to Claude** - Includes PRD, previous code, and task
3. **Executes AI response** - Claude generates/improves code
4. **Validates work** - Checks if task is complete
5. **Iterates** - Repeats 2-4 if not complete

This continues until Claude outputs a completion signal or max iterations reached.

**Key insight**: State lives in files and git, not in Claude's memory. This allows for extended autonomous building sessions with fresh context each iteration.

## 🎓 Learning Resources

- [Ralph Wiggum Technique](https://ghuntley.com/ralph/)
- [Ralph Playbook](https://github.com/ClaytonFarr/ralph-playbook)
- [Awesome Claude](https://awesomeclaude.ai/ralph-wiggum)
- [Claude Documentation](https://docs.anthropic.com)

## 🐛 Troubleshooting

### "API key not configured"
- Ensure `ANTHROPIC_API_KEY` is set in `.env.local`
- Restart dev server after changing env vars

### "Failed to generate questions"
- Check that your API key is valid and has sufficient credits
- Try with a simpler app description

### "Ralph keeps iterating"
- This is normal - Ralph will eventually converge
- Check the build log to see what's being attempted
- You can always stop and try a different approach

### "Stripe not working"
- Verify Stripe keys in environment variables
- Use test keys for development (stripe.com/docs/keys#test)
- Check Stripe dashboard for errors

## 📚 API Documentation

### POST /api/generate-questions

Generates clarifying questions based on app description.

**Request:**
```json
{
  "appDescription": "A todo list app with cloud sync"
}
```

**Response:**
```json
{
  "questions": [
    "What is the primary use case?",
    "Who are the target users?",
    ...
  ],
  "usage": { "input_tokens": 150, "output_tokens": 320 }
}
```

### POST /api/generate-prd

Generates PRD from description and clarifying answers.

**Request:**
```json
{
  "appDescription": "...",
  "questionsAndAnswers": {
    "What is the primary use case?": "Personal productivity...",
    ...
  }
}
```

**Response:**
```json
{
  "prd": "# Product Requirements Document\n...",
  "usage": { ... }
}
```

### POST /api/estimate-cost

Estimates costs based on PRD complexity.

**Request:**
```json
{
  "prd": "# PRD content..."
}
```

**Response:**
```json
{
  "complexity": "medium",
  "label": "Medium (Web app with features)",
  "pricing": {
    "inputCost": 0.03,
    "outputCost": 0.08,
    "totalCost": 45.99
  },
  "estimates": {
    "iterations": 15,
    "totalTokens": 45000
  }
}
```

### POST /api/run-ralph

Executes the Ralph loop to build the application.

**Request:**
```json
{
  "prd": "# PRD...",
  "appName": "My Todo App",
  "maxIterations": 15
}
```

**Response:**
```json
{
  "success": true,
  "iterations": 12,
  "code": "...",
  "message": "Successfully built My Todo App in 12 iterations"
}
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📄 License

MIT License - feel free to use for commercial or personal projects.

## 🎉 Getting Started

1. Set up environment variables
2. Run `npm run dev`
3. Visit http://localhost:3000
4. Describe an app you want to build
5. Watch Ralph build it!

## 📞 Support

- Check the troubleshooting section
- Review API documentation
- Check Claude docs: https://docs.anthropic.com
- Read Ralph resources: https://ghuntley.com/ralph/

---

**Happy building with Ralph! 🚀**
