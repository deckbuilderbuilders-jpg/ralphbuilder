import { NextRequest, NextResponse } from 'next/server';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const { appDescription, questionsAndAnswers } = await request.json();

    if (!appDescription || !questionsAndAnswers) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Format Q&A for the prompt
    const qaText = Object.entries(questionsAndAnswers)
      .map(([q, a]) => `Q: ${q}\nA: ${a}`)
      .join('\n\n');

    const systemPrompt = `You are an expert technical product manager. Create a detailed Product Requirements Document (PRD) based on the user's description and answers.

The PRD should include:
1. Overview & Purpose
2. Core Features & User Stories
3. Data Model & Storage
4. Technical Specifications
5. Acceptance Criteria
6. Deployment Notes

Format the output as a well-structured markdown document with clear sections.
Be specific and detailed enough that a developer could build this exactly as specified.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-opus-4.5',
        max_tokens: 3000,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: `App Description:\n${appDescription}\n\nAnswers to Clarifying Questions:\n${qaText}\n\nPlease create a detailed PRD for this app.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Claude API error:', error);
      return NextResponse.json(
        { error: 'Failed to generate PRD' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const prd = data.content[0].text;

    return NextResponse.json({
      prd,
      usage: data.usage,
    });
  } catch (error) {
    console.error('Error generating PRD:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
