# Ralph Builder - Project Overview

## 🎯 What is Ralph Builder?

Ralph Builder is a **no-code web application** that makes the powerful Ralph Wiggum autonomous AI technique accessible to non-technical users.

Users can describe an app they want in plain English, answer some clarifying questions, get a cost estimate, and then watch Ralph (powered by Claude AI) automatically build a complete, production-ready application.

---

## 🏗️ Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                     Ralph Builder                           │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Frontend (React + Next.js)                            │ │
│  │  ┌──────────┬──────────┬──────────┬────────────────┐   │ │
│  │  │Describe  │Clarify   │Review    │Cost Estimate  │   │ │
│  │  │App       │Details   │PRD       │& Approve      │   │ │
│  │  └──────────┴──────────┴──────────┴────────────────┘   │ │
│  │  ┌──────────┬──────────┬──────────┐                    │ │
│  │  │Build     │Progress  │Download  │                    │ │
│  │  │Progress  │Tracking  │Code      │                    │ │
│  │  └──────────┴──────────┴──────────┘                    │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│  ┌────────────────────────▼────────────────────────────────┐ │
│  │  Backend API Routes (Next.js)                           │ │
│  │  ┌──────────┬──────────┬──────────┬────────────────┐   │ │
│  │  │Generate  │Generate  │Estimate  │Create Stripe  │   │ │
│  │  │Questions │PRD       │Cost      │Checkout       │   │ │
│  │  └──────────┴──────────┴──────────┴────────────────┘   │ │
│  │  ┌──────────────────────────────────┐                  │ │
│  │  │Run Ralph Loop (Autonomous Build) │                  │ │
│  │  └──────────────────────────────────┘                  │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│  ┌────────────────────────▼────────────────────────────────┐ │
│  │  External APIs                                          │ │
│  │  ┌──────────────┬──────────────┬──────────────────┐    │ │
│  │  │Claude API    │Stripe API    │(Payment)         │    │ │
│  │  │(Code Gen)    │(Payments)    │                  │    │ │
│  │  └──────────────┴──────────────┴──────────────────┘    │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Input
    ↓
[API] Generate Questions
    ↓ Claude decides what to ask
User Answers
    ↓
[API] Generate PRD
    ↓ Claude writes detailed specification
[API] Estimate Cost
    ↓ Claude analyzes complexity
Show Cost to User
    ↓
User Approves
    ↓
[API] Create Stripe Checkout (optional)
    ↓ Stripe processes payment
[API] Run Ralph Loop
    ├─ Iteration 1: Structure & Core
    ├─ Iteration 2-5: Features & Validation
    ├─ Iteration 6-10: Tests & Polish
    ├─ Iteration 11-15: Refinement
    └─ Output: Complete Code
    ↓
Download Source Code
```

---

## 📁 Project Structure

```
ralph-webapp/
├── app/
│   ├── layout.tsx              # Root layout with navigation
│   ├── page.tsx                # Main builder page
│   └── api/
│       ├── generate-questions/  # Generate clarifying questions
│       ├── generate-prd/        # Generate Product Requirements
│       ├── estimate-cost/       # Estimate costs
│       ├── create-checkout/     # Create Stripe session
│       └── run-ralph/           # Run the Ralph building loop
├── components/
│   └── steps/
│       ├── DescriptionStep.tsx  # Step 1: App description
│       ├── ClarificationStep.tsx# Step 2: Answer questions
│       ├── PRDStep.tsx          # Step 3: Review PRD
│       ├── CostStep.tsx         # Step 4: Cost estimate
│       ├── BuildingStep.tsx     # Step 5: Watch build
│       └── CompleteStep.tsx     # Step 6: Success
├── lib/
│   └── store.ts                 # Zustand state management
├── styles/
│   └── globals.css              # Global styles & animations
├── public/                      # Static assets
├── package.json                 # Dependencies
├── next.config.js               # Next.js config
├── tailwind.config.ts           # Tailwind CSS config
├── tsconfig.json                # TypeScript config
├── .env.local.example           # Environment template
├── README.md                    # Project documentation
└── SETUP_GUIDE.md              # Complete setup guide
```

---

## 🔄 User Journey

### Phase 1: Planning (Steps 1-3)
1. **Describe** - User tells Ralph what to build
2. **Clarify** - AI asks 5-7 questions to understand better
3. **Review** - User approves the generated PRD

### Phase 2: Decision (Step 4)
4. **Estimate** - AI calculates cost and shows estimate
5. **Approve** - User confirms they want to proceed

### Phase 3: Execution (Steps 5-6)
5. **Build** - Ralph autonomously builds the application
6. **Complete** - User downloads the finished code

---

## 🤖 The Ralph Loop

Ralph uses a proven technique for autonomous code generation:

```
Loop Iteration N:
├── 1. Read current state (files, git history)
├── 2. Send to Claude with PRD + context
├── 3. Claude generates/improves code
├── 4. Check if <BUILD_COMPLETE> in response
├── 5. If yes → Done! If no → Iteration N+1
└── Each iteration brings app closer to completion
```

**Key Benefits:**
- **Fresh context each iteration** - Avoids context pollution
- **Progressive refinement** - Each iteration improves
- **Persistent state** - Progress saved in files
- **Deterministic naivety** - Keeps trying until done

---

## 💾 Technical Stack

### Frontend
- **React 18** - UI library
- **Next.js 14** - Framework with SSR and API routes
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **React Icons** - Icon library

### Backend
- **Next.js API Routes** - Serverless endpoints
- **Claude API** - AI operations
- **Stripe API** - Payment processing (optional)

### Infrastructure
- **Node.js 18+** - Runtime
- **npm** - Package manager
- **Vercel** - Recommended hosting

---

## 📊 Cost Model

### How Costs Are Calculated

```
Complexity Assessment
    ↓
Estimate Iterations: 8-25
    ↓
Calculate Tokens:
  ├─ Avg input per iteration: 2,000-4,000
  ├─ Avg output per iteration: 1,500-3,500
  └─ Total = iterations × (input + output)
    ↓
Apply Pricing:
  ├─ Input: $0.015 per 1K tokens
  ├─ Output: $0.045 per 1K tokens
  └─ Total = (input_tokens/1000 × 0.015) + (output_tokens/1000 × 0.045)
```

### Example Costs

| Complexity | Iterations | Tokens | Cost |
|------------|-----------|--------|------|
| Simple | 8-12 | 20-40K | $10-25 |
| Medium | 12-18 | 40-70K | $25-60 |
| Complex | 18-25 | 70-100K+ | $60-150 |

---

## 🔐 Security Considerations

### API Keys
- Store in environment variables only
- Never commit to git
- Use `.env.local.example` template
- Rotate regularly

### Payment Processing
- All Stripe integration server-side
- PCI compliance handled by Stripe
- No credit cards stored locally
- HTTPS required in production

### User Data
- Clear session data after building
- Don't store generated code server-side
- Download only (user owns the code)
- No persistent user accounts needed

---

## 🚀 Deployment Checklist

### Before Going Live

- [ ] Set up Anthropic API key
- [ ] Set up Stripe keys (test then production)
- [ ] Configure `.env.local` with real credentials
- [ ] Test complete flow with sample app
- [ ] Set up error monitoring (optional)
- [ ] Configure analytics (optional)
- [ ] Review cost estimates
- [ ] Set up billing alerts

### Deployment Steps

1. **Build**: `npm run build`
2. **Test**: `npm run dev` locally
3. **Deploy**: Push to Vercel or hosting platform
4. **Verify**: Test in production
5. **Monitor**: Watch usage and costs

---

## 📈 Scaling Considerations

### Current Limitations
- Single user at a time (add auth if needed)
- No persistent project storage
- API rate limits from Anthropic
- Stripe rate limits

### Future Enhancements
- User accounts and authentication
- Save/load projects
- Multiple concurrent builds
- Advanced cost analytics
- Build templates
- Custom code templates
- Integration marketplace

---

## 🧪 Testing

### Manual Testing Checklist

```
Step 1: Description
  ✓ Can enter app description
  ✓ Can select example
  ✓ Next button enabled/disabled correctly
  
Step 2: Clarification
  ✓ Questions generated correctly
  ✓ Can answer all questions
  ✓ Progress indicator works
  ✓ Back button works
  
Step 3: PRD
  ✓ PRD displays correctly
  ✓ Can edit PRD
  ✓ Back button works
  
Step 4: Cost
  ✓ Cost calculated and displayed
  ✓ Details show correctly
  ✓ Approval flow works
  
Step 5: Building
  ✓ Progress bar updates
  ✓ Build log streams
  ✓ Completion detected
  
Step 6: Success
  ✓ Code displays
  ✓ Can copy code
  ✓ Can download code
  ✓ Can reset and start over
```

---

## 📞 Support & Help

### Documentation
- README.md - Project overview
- SETUP_GUIDE.md - Complete setup and usage
- API docs in code comments
- Inline JSDoc for functions

### External Resources
- [Anthropic Claude Docs](https://docs.anthropic.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Ralph Wiggum Technique](https://ghuntley.com/ralph/)
- [Stripe Integration Guide](https://stripe.com/docs)

---

## 🎓 Learning Outcomes

After implementing Ralph Builder, you'll understand:

1. **Multi-step forms** in React with state management
2. **API route design** in Next.js
3. **Streaming API responses** and handling
4. **Claude API integration** for AI features
5. **Stripe payment integration**
6. **Real-time progress tracking** with animations
7. **State management** with Zustand
8. **TypeScript** for frontend development
9. **The Ralph Wiggum autonomous technique**

---

## 🎉 Next Steps

1. **Setup**: Follow SETUP_GUIDE.md
2. **Run**: `npm run dev`
3. **Test**: Build a sample app
4. **Deploy**: Use Vercel or your platform
5. **Customize**: Add your branding
6. **Extend**: Add new features

---

## 📄 License & Credits

- **License**: MIT
- **Built with**: Next.js, React, Claude, Stripe
- **Inspired by**: Ralph Wiggum technique by Geoffrey Huntley
- **Author**: Built with Claude

---

**Ready to build? Start with `npm install && npm run dev`** 🚀
