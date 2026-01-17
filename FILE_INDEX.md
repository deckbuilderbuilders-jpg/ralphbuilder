# Ralph Builder - File Index & Quick Reference

## 📑 Project Files Overview

### 📄 Documentation
- **README.md** - Main project documentation with features, setup, and API docs
- **SETUP_GUIDE.md** - Complete setup instructions and user guide (START HERE!)
- **PROJECT_OVERVIEW.md** - Architecture, data flow, and technical details
- **FILE_INDEX.md** - This file

### 🔧 Configuration Files
- **package.json** - NPM dependencies and scripts
- **next.config.js** - Next.js configuration
- **tsconfig.json** - TypeScript configuration
- **tailwind.config.ts** - Tailwind CSS configuration
- **postcss.config.js** - PostCSS configuration
- **.env.local.example** - Environment variables template (copy to .env.local)

### 🎨 Frontend Components

#### Main Pages
- **app/page.tsx** - Main builder page orchestrating all steps and flow

#### Layout
- **app/layout.tsx** - Root layout with navigation and styling

#### Step Components (components/steps/)
- **DescriptionStep.tsx** - Step 1: User describes their app idea
- **ClarificationStep.tsx** - Step 2: User answers clarifying questions
- **PRDStep.tsx** - Step 3: Review and edit the PRD
- **CostStep.tsx** - Step 4: View cost estimate and approve
- **BuildingStep.tsx** - Step 5: Watch Ralph build with progress tracking
- **CompleteStep.tsx** - Step 6: Download built app and success message

### 🔌 API Routes (app/api/)

#### Content Generation
- **api/generate-questions/route.ts** - Generate clarifying questions using Claude
  - POST request with app description
  - Returns array of 5-7 strategic questions

#### PRD Generation
- **api/generate-prd/route.ts** - Generate detailed PRD from answers
  - POST request with description and Q&A
  - Returns formatted PRD in markdown

#### Cost Estimation
- **api/estimate-cost/route.ts** - Analyze complexity and estimate costs
  - POST request with PRD
  - Returns complexity level and pricing breakdown

#### Payment Processing
- **api/create-checkout/route.ts** - Create Stripe checkout session
  - POST request with cost and app details
  - Returns Stripe session ID

#### App Building
- **api/run-ralph/route.ts** - Execute Ralph autonomous loop
  - POST request with PRD and parameters
  - Returns built application code
  - Implements iterative building with max iterations

### 📦 State Management
- **lib/store.ts** - Zustand store for application state
  - Manages all UI state across steps
  - Handles user input, questions, PRD, costs, build progress
  - Provides reset functionality

### 🎨 Styling
- **styles/globals.css** - Global styles, animations, and custom classes
  - Tailwind imports
  - Custom animations (fadeInUp, slideIn, pulse-glow)
  - Glass morphism effects
  - Component base styles (btn-primary, card, badges)

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Setup environment
cp .env.local.example .env.local
# Edit .env.local with your API keys

# Development
npm run dev        # Start on http://localhost:3000

# Production
npm run build      # Build for production
npm start          # Start production server

# Linting
npm run lint       # Run ESLint
```

---

## 📋 Key Features by File

### Step 1: Description
**File**: `components/steps/DescriptionStep.tsx`
- User input for app description
- Example app suggestions
- Validation and next button

### Step 2: Clarification
**Files**: 
- `components/steps/ClarificationStep.tsx` - Component
- `app/api/generate-questions/route.ts` - API

**Features**:
- Display 5-7 clarifying questions
- Collect user answers
- Progress tracking
- Call PRD generation API

### Step 3: Review PRD
**Files**:
- `components/steps/PRDStep.tsx` - Component
- `app/api/generate-prd/route.ts` - API

**Features**:
- Display generated PRD
- Edit mode for customization
- Professional formatting
- Call cost estimation API

### Step 4: Cost Estimate
**Files**:
- `components/steps/CostStep.tsx` - Component
- `app/api/estimate-cost/route.ts` - API

**Features**:
- Complexity analysis
- Token estimation
- Cost breakdown
- Cost approval workflow

### Step 5: Building
**Files**:
- `components/steps/BuildingStep.tsx` - Component
- `app/api/run-ralph/route.ts` - API

**Features**:
- Real-time progress tracking
- Build log streaming
- Ralph iteration monitoring
- Completion detection

### Step 6: Success
**File**: `components/steps/CompleteStep.tsx`

**Features**:
- Code preview
- Copy to clipboard
- Download as file
- Build another app option

---

## 🔐 Environment Variables

Create `.env.local` from `.env.local.example`:

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
STRIPE_SECRET_KEY=sk_test_or_sk_live_key
STRIPE_PUBLISHABLE_KEY=pk_test_or_pk_live_key
NEXT_PUBLIC_APP_URL=http://localhost:3000 (or production URL)
```

---

## 📊 Data Flow

### 1. Description → Questions
```
User Input (app description)
    ↓
POST /api/generate-questions
    ↓
Claude API generates questions
    ↓
Display in UI
```

### 2. Answers → PRD
```
User Answers
    ↓
POST /api/generate-prd
    ↓
Claude API generates PRD
    ↓
Display & Allow Editing
```

### 3. PRD → Cost Estimate
```
PRD Content
    ↓
POST /api/estimate-cost
    ↓
Claude analyzes complexity
    ↓
Return cost calculation
    ↓
Display with approval
```

### 4. Approval → Build
```
User Approves Cost
    ↓
[Optional] POST /api/create-checkout
    ↓
[Optional] Stripe payment
    ↓
POST /api/run-ralph
    ↓
Claude builds through iterations
    ↓
Return complete code
```

---

## 🧩 Component Hierarchy

```
app/page.tsx (Main Builder)
├── Step Indicator Component
├── DescriptionStep
│   └── User input form
├── ClarificationStep
│   └── Question/Answer pairs
├── PRDStep
│   └── Markdown display/editor
├── CostStep
│   └── Cost breakdown
├── BuildingStep
│   └── Progress bar + Log
└── CompleteStep
    └── Code preview + Download
```

---

## 🔄 State Management (Zustand Store)

The `lib/store.ts` manages:

```typescript
Interface AppBuilderState {
  // Navigation
  currentStep: Step
  
  // User Input
  appDescription: string
  
  // Clarification
  questions: string[]
  answers: Record<string, string>
  
  // PRD
  prd: string
  
  // Cost
  estimatedTokens: number
  estimatedCost: number
  costApproved: boolean
  
  // Building
  buildProgress: number
  buildLog: string[]
  
  // Results
  builtAppUrl: string
  builtAppCode: string
}
```

---

## 🔌 API Endpoints

### POST /api/generate-questions
Generate clarifying questions
- **Input**: `{ appDescription: string }`
- **Output**: `{ questions: string[], usage: { input_tokens, output_tokens } }`

### POST /api/generate-prd
Generate PRD from answers
- **Input**: `{ appDescription: string, questionsAndAnswers: Record }`
- **Output**: `{ prd: string, usage: {...} }`

### POST /api/estimate-cost
Estimate costs
- **Input**: `{ prd: string }`
- **Output**: `{ complexity, reasoning, estimates: {...}, pricing: {...}, label }`

### POST /api/create-checkout
Create Stripe checkout (optional)
- **Input**: `{ cost: number, appName: string, appDescription: string }`
- **Output**: `{ sessionId: string, url: string }`

### POST /api/run-ralph
Execute Ralph loop
- **Input**: `{ prd: string, appName: string, maxIterations?: number }`
- **Output**: `{ success: boolean, iterations: number, code: string, message: string }`

---

## 🎨 Design System

### Colors
- **Primary**: Cyan-500, Blue-500 (gradients)
- **Dark**: Slate-900, Slate-800, Slate-950
- **Success**: Green-500
- **Warning**: Yellow-500
- **Error**: Red-500

### Typography
- **Display**: Space Mono (monospace)
- **Body**: Inter (sans-serif)
- **Weights**: 400, 500, 600, 700

### Components
- `.btn-primary` - Cyan-blue gradient button
- `.btn-secondary` - Slate button
- `.card` - Dark card with border
- `.glass` - Glass morphism effect
- `.badge-*` - Status badges

### Animations
- `fadeInUp` - Fade in and slide up
- `slideIn` - Slide in from left
- `pulse-glow` - Pulsing glow effect
- Framer Motion for component animations

---

## 📦 Dependencies

### Core
- **next**: 14.x - React framework
- **react**: 18.x - UI library
- **typescript**: Latest - Type safety

### State & UI
- **zustand**: State management
- **framer-motion**: Animations
- **react-icons**: Icon library

### Styling
- **tailwindcss**: Utility-first CSS
- **postcss**: CSS processing
- **autoprefixer**: Browser prefixes

### External APIs
- **stripe**: Payment processing
- **axios**: HTTP client (optional)

---

## 🧪 Testing Checklist

### User Flow
- [ ] Can describe an app
- [ ] Questions are generated
- [ ] Can answer all questions
- [ ] PRD is generated correctly
- [ ] Can edit PRD
- [ ] Cost is estimated
- [ ] Build starts after approval
- [ ] Progress updates during build
- [ ] Code can be copied
- [ ] Code can be downloaded
- [ ] Can reset and start over

### API Endpoints
- [ ] /api/generate-questions returns valid questions
- [ ] /api/generate-prd generates quality PRDs
- [ ] /api/estimate-cost gives reasonable estimates
- [ ] /api/run-ralph builds code successfully
- [ ] Error handling for API failures

### UI/UX
- [ ] Responsive design on mobile
- [ ] Animations are smooth
- [ ] Progress indicators work
- [ ] Step navigation is clear
- [ ] All buttons are clickable
- [ ] Form validation works

---

## 🚀 Deployment Checklist

- [ ] All environment variables set
- [ ] API keys verified
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors
- [ ] No linting errors: `npm run lint`
- [ ] Tested complete flow
- [ ] Stripe integration tested (if using)
- [ ] Error monitoring configured
- [ ] Database backups configured (if needed)
- [ ] CDN configured (if needed)
- [ ] SSL/HTTPS enabled

---

## 📞 Support Files

If issues arise, check these files first:
- **Env errors**: Check `.env.local` against `.env.local.example`
- **API errors**: Check specific `app/api/*/route.ts` files
- **Component errors**: Check `components/steps/*.tsx`
- **State errors**: Check `lib/store.ts`
- **Build errors**: Check `next.config.js` and `tsconfig.json`

---

## 📚 File Statistics

```
Total Files: 24
  - TypeScript/TSX: 13
  - Config Files: 6
  - Markdown Docs: 4
  - CSS: 1

Total Lines of Code: ~3,500+
  - Frontend Components: ~1,200
  - API Routes: ~1,000
  - Configuration: ~300
  - Documentation: ~1,000+
```

---

## 🎓 Learning Path

To understand the codebase:

1. **Start**: Read SETUP_GUIDE.md
2. **Overview**: Read PROJECT_OVERVIEW.md
3. **Architecture**: Check the data flow diagrams
4. **Frontend**: Understand each step component
5. **Backend**: Study each API route
6. **State**: Learn Zustand store patterns
7. **Styling**: Review globals.css and tailwind config
8. **Integration**: See how components call APIs

---

**Last Updated**: January 2026
**Status**: Production Ready
**License**: MIT
