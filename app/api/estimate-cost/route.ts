import { NextRequest, NextResponse } from 'next/server';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

// Claude Opus 4.5 pricing
const PRICING = {
  input: 0.000015, // $0.015 per 1K tokens
  output: 0.000045, // $0.045 per 1K tokens
};

// Token estimates based on task complexity
const COMPLEXITY_ESTIMATES = {
  simple: {
    iterations: 8,
    avgInputTokens: 2000,
    avgOutputTokens: 1500,
    label: 'Simple (API, CRUD app)',
  },
  medium: {
    iterations: 15,
    avgInputTokens: 3000,
    avgOutputTokens: 2500,
    label: 'Medium (Web app with features)',
  },
  complex: {
    iterations: 25,
    avgInputTokens: 4000,
    avgOutputTokens: 3500,
    label: 'Complex (Full-featured app)',
  },
};

export async function POST(request: NextRequest) {
  try {
    const { prd } = await request.json();

    if (!prd) {
      return NextResponse.json(
        { error: 'PRD is required' },
        { status: 400 }
      );
    }

    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const systemPrompt = `You are an AI cost estimation expert. Analyze the complexity of the app based on its PRD.

Respond with a JSON object in this format:
{
  "complexity": "simple" | "medium" | "complex",
  "reasoning": "Brief explanation of complexity assessment"
}

Factors to consider:
- Number of features and endpoints
- Data model complexity
- User authentication needs
- Integration requirements
- UI/UX complexity
- Testing requirements`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-opus-4.5',
        max_tokens: 500,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: `Please analyze the complexity of building this app:\n\n${prd}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Claude API error:', error);
      return NextResponse.json(
        { error: 'Failed to estimate cost' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const responseText = data.content[0].text;

    // Parse JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: 'Failed to parse complexity analysis' },
        { status: 500 }
      );
    }

    const analysis = JSON.parse(jsonMatch[0]);
    const complexity = analysis.complexity as keyof typeof COMPLEXITY_ESTIMATES;
    const estimate = COMPLEXITY_ESTIMATES[complexity];

    // Calculate total tokens and cost
    const totalInputTokens = estimate.iterations * estimate.avgInputTokens;
    const totalOutputTokens = estimate.iterations * estimate.avgOutputTokens;
    const totalTokens = totalInputTokens + totalOutputTokens;

    const inputCost = (totalInputTokens / 1000) * PRICING.input;
    const outputCost = (totalOutputTokens / 1000) * PRICING.output;
    const totalCost = inputCost + outputCost;

    // Round to nearest cent
    const roundedCost = Math.round(totalCost * 100) / 100;

    return NextResponse.json({
      complexity,
      reasoning: analysis.reasoning,
      estimates: {
        iterations: estimate.iterations,
        avgInputTokens: estimate.avgInputTokens,
        avgOutputTokens: estimate.avgOutputTokens,
        totalInputTokens,
        totalOutputTokens,
        totalTokens,
      },
      pricing: {
        inputCost: Math.round(inputCost * 100) / 100,
        outputCost: Math.round(outputCost * 100) / 100,
        totalCost: roundedCost,
      },
      label: estimate.label,
    });
  } catch (error) {
    console.error('Error estimating cost:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
