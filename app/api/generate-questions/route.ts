import { NextRequest, NextResponse } from 'next/server';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const { appDescription } = await request.json();

    if (!appDescription) {
      return NextResponse.json(
        { error: 'App description is required' },
        { status: 400 }
      );
    }

    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const systemPrompt = `You are an expert product manager helping to clarify app requirements. 
Your job is to ask 5-7 strategic questions that will help fully specify what the user wants to build.

Focus on:
- Core functionality and primary user stories
- Technology preferences/constraints
- Data models and storage needs
- User authentication/authorization requirements
- Performance and scalability needs
- Design/UX preferences

Format your response as a JSON object with a "questions" array containing 5-7 string questions.
Example: { "questions": ["What is the primary use case?", "Who are the users?", ...] }`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-opus-4.5',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: `The user wants to build: ${appDescription}\n\nAsk clarifying questions to fully understand their requirements.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Claude API error:', error);
      return NextResponse.json(
        { error: 'Failed to generate questions' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const responseText = data.content[0].text;

    // Parse JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: 'Failed to parse questions' },
        { status: 500 }
      );
    }

    const { questions } = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      questions,
      usage: data.usage,
    });
  } catch (error) {
    console.error('Error generating questions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
