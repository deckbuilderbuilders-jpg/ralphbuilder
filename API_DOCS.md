# API Documentation

Complete API reference for Ralph Builder endpoints.

## Base URL

```
http://localhost:3000/api  (development)
https://your-deployed-url.vercel.app/api  (production)
```

All endpoints are POST requests and return JSON.

---

## 1. Generate Questions

**Endpoint**: `POST /api/generate-questions`

Generate 5-7 clarifying questions based on app description.

### Request

```json
{
  "appDescription": "A todo list app with cloud sync"
}
```

### Response

```json
{
  "questions": [
    "What is the primary use case?",
    "Who are the target users?",
    "Should it work offline?",
    "Do you need user authentication?",
    "What devices should it support?",
    "Do you have design preferences?",
    "Any specific technology preferences?"
  ],
  "usage": {
    "input_tokens": 150,
    "output_tokens": 320
  }
}
```

### Error Handling

```json
{
  "error": "App description is required"
}
```

---

## 2. Generate PRD

**Endpoint**: `POST /api/generate-prd`

Generate detailed Product Requirements Document from description and answers.

### Request

```json
{
  "appDescription": "A todo list app with cloud sync",
  "questionsAndAnswers": {
    "What is the primary use case?": "Personal task management",
    "Who are the target users?": "Professionals and students",
    "Should it work offline?": "Yes, sync when online",
    "Do you need user authentication?": "Basic email/password",
    "What devices should it support?": "Web and mobile",
    "Do you have design preferences?": "Clean and minimal",
    "Any specific technology preferences?": "React preferred"
  }
}
```

### Response

```json
{
  "prd": "# Product Requirements Document\n\n## Overview\nA cloud-synced todo list application...\n\n## Features\n- Create, read, update, delete tasks\n- Cloud synchronization\n- Offline support\n...",
  "usage": {
    "input_tokens": 800,
    "output_tokens": 1500
  }
}
```

### Error Handling

```json
{
  "error": "Missing required fields"
}
```

---

## 3. Estimate Cost

**Endpoint**: `POST /api/estimate-cost`

Analyze PRD complexity and estimate build costs.

### Request

```json
{
  "prd": "# Product Requirements Document\n\n## Overview\n..."
}
```

### Response

```json
{
  "complexity": "medium",
  "reasoning": "The app requires multiple features including authentication, data sync, and responsive UI. Moderate complexity.",
  "label": "Medium (Web app with features)",
  "estimates": {
    "iterations": 15,
    "avgInputTokens": 3000,
    "avgOutputTokens": 2500,
    "totalInputTokens": 45000,
    "totalOutputTokens": 37500,
    "totalTokens": 82500
  },
  "pricing": {
    "inputCost": 0.68,
    "outputCost": 1.69,
    "totalCost": 45.99
  }
}
```

### Complexity Levels

- **simple**: CRUD apps, basic APIs (~$10-25)
- **medium**: Web apps with features (~$25-60)
- **complex**: Full-featured applications (~$60-150+)

---

## 4. Create Checkout

**Endpoint**: `POST /api/create-checkout`

Create Stripe checkout session for payment.

### Request

```json
{
  "cost": 45.99,
  "appName": "My Todo App",
  "appDescription": "A cloud-synced todo list application"
}
```

### Response

```json
{
  "sessionId": "cs_test_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9",
  "url": "https://checkout.stripe.com/pay/cs_test_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9"
}
```

### Error Handling

```json
{
  "error": "Failed to create checkout session"
}
```

---

## 5. Run Ralph Loop

**Endpoint**: `POST /api/run-ralph`

Execute the Ralph autonomous building loop.

### Request

```json
{
  "prd": "# Product Requirements Document\n\n...",
  "appName": "My Todo App",
  "maxIterations": 15
}
```

### Response

```json
{
  "success": true,
  "appName": "My Todo App",
  "iterations": 12,
  "code": "import React from 'react';\n...",
  "extractedCode": {
    "code_block_1": "import React from 'react';\n...",
    "code_block_2": "export default function App() {\n...",
    "main_code": "..."
  },
  "message": "Successfully built My Todo App in 12 iterations"
}
```

### Response (Failure)

```json
{
  "success": false,
  "iterations": 15,
  "code": "...",
  "message": "Completed 15 iterations. App may need further refinement."
}
```

### Parameters

- `prd` (string, required) - Product Requirements Document
- `appName` (string, required) - Name of the application
- `maxIterations` (number, optional, default: 15) - Maximum iterations before stopping

### Completion Signal

Ralph checks for `<BUILD_COMPLETE>` in the response to determine if building is done.

---

## Error Handling

All endpoints follow this error pattern:

### 400 Bad Request

```json
{
  "error": "Missing required fields"
}
```

### 500 Internal Server Error

```json
{
  "error": "API key not configured"
}
```

### Common Issues

| Error | Cause | Solution |
|-------|-------|----------|
| "API key not configured" | ANTHROPIC_API_KEY not set | Add env var |
| "Failed to generate questions" | API call failed | Check API key validity |
| "Failed to generate PRD" | Invalid Q&A data | Verify all fields |
| "Failed to estimate cost" | Claude API error | Check API limits |
| "Failed to create checkout session" | Stripe error | Verify Stripe keys |

---

## Rate Limits

- **Claude API**: Subject to Anthropic's rate limits
- **Stripe API**: Subject to Stripe's rate limits
- **No per-request limits** in this application

Monitor your API usage:
- Anthropic: https://console.anthropic.com/account/usage
- Stripe: https://dashboard.stripe.com/account/usage

---

## Authentication

Currently, no authentication is required. All endpoints are public.

For production, consider adding:
- API key validation
- Rate limiting by IP
- User authentication

---

## Content Types

All requests should have:

```
Content-Type: application/json
```

All responses return JSON.

---

## Example Usage

### Complete Flow

```bash
# 1. Generate questions
curl -X POST http://localhost:3000/api/generate-questions \
  -H "Content-Type: application/json" \
  -d '{"appDescription": "A todo app"}'

# 2. Generate PRD
curl -X POST http://localhost:3000/api/generate-prd \
  -H "Content-Type: application/json" \
  -d '{
    "appDescription": "A todo app",
    "questionsAndAnswers": {...}
  }'

# 3. Estimate cost
curl -X POST http://localhost:3000/api/estimate-cost \
  -H "Content-Type: application/json" \
  -d '{"prd": "..."}'

# 4. Run Ralph
curl -X POST http://localhost:3000/api/run-ralph \
  -H "Content-Type: application/json" \
  -d '{
    "prd": "...",
    "appName": "My App",
    "maxIterations": 15
  }'
```

---

## API Endpoint Files

- `app/api/generate-questions/route.ts` - Questions generation
- `app/api/generate-prd/route.ts` - PRD generation
- `app/api/estimate-cost/route.ts` - Cost estimation
- `app/api/create-checkout/route.ts` - Stripe checkout
- `app/api/run-ralph/route.ts` - Ralph building loop

---

## Version

Current API Version: **1.0.0**

Last Updated: January 2026
