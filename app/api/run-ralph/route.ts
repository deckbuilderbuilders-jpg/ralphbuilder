import { NextRequest, NextResponse } from 'next/server';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

interface RalphLoopRequest {
  prd: string;
  appName: string;
  maxIterations?: number;
}

interface RalphIteration {
  iteration: number;
  code: string;
  status: string;
}

async function callClaude(
  systemPrompt: string,
  userMessage: string,
  maxTokens: number = 4096
): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_API_KEY || '',
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-opus-4.5',
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Claude API error: ${error}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

export async function POST(request: NextRequest) {
  try {
    const { prd, appName, maxIterations = 15 } = (await request.json()) as RalphLoopRequest;

    if (!prd || !appName) {
      return NextResponse.json(
        { error: 'PRD and app name are required' },
        { status: 400 }
      );
    }

    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Start the Ralph loop
    const systemPrompt = `You are Ralph, an autonomous AI app builder. Your task is to build a production-ready web application based on a PRD.

You will output code in a React/Next.js format. Each iteration, you should:
1. Review the PRD and any previous code
2. Build or improve the application
3. Include tests when possible
4. Output complete, working code
5. When the app is fully complete and working, end with: <BUILD_COMPLETE>

Guidelines:
- Use React/TypeScript for frontend
- Include proper error handling
- Make the UI clean and professional
- Write self-contained code that works immediately
- Use Tailwind CSS for styling
- Include documentation
- Aim for complete implementation in minimal iterations`;

    const iterations: RalphIteration[] = [];
    let completeCode = '';
    let isComplete = false;

    for (let i = 1; i <= maxIterations && !isComplete; i++) {
      const contextMessage = i === 1
        ? `Build a React/Next.js application based on this PRD:\n\n${prd}`
        : `Continue building the application. Here's what we have so far:\n\n${completeCode}\n\nPRD:\n${prd}\n\nContinue improving and completing the application until all requirements are met.`;

      try {
        const response = await callClaude(systemPrompt, contextMessage);

        iterations.push({
          iteration: i,
          code: response,
          status: 'completed',
        });

        // Check if complete
        if (response.includes('<BUILD_COMPLETE>')) {
          isComplete = true;
          completeCode = response.replace('<BUILD_COMPLETE>', '').trim();
        } else {
          completeCode = response;
        }
      } catch (error) {
        iterations.push({
          iteration: i,
          code: '',
          status: `error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
      }

      // Small delay between iterations
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    // Parse the final code to extract usable parts
    const finalCode = extractCodeBlocks(completeCode);

    return NextResponse.json({
      success: isComplete,
      appName,
      iterations: iterations.length,
      code: completeCode,
      extractedCode: finalCode,
      message: isComplete
        ? `Successfully built ${appName} in ${iterations.length} iterations`
        : `Completed ${iterations.length} iterations. App may need further refinement.`,
    });
  } catch (error) {
    console.error('Ralph loop error:', error);
    return NextResponse.json(
      {
        error: `Ralph loop failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      },
      { status: 500 }
    );
  }
}

function extractCodeBlocks(text: string): { [key: string]: string } {
  const blocks: { [key: string]: string } = {};

  // Extract code blocks
  const codeBlockRegex = /```(?:typescript|tsx|jsx|javascript|js|python|json)?\n([\s\S]*?)```/g;
  let match;
  let blockIndex = 0;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    blockIndex++;
    blocks[`code_block_${blockIndex}`] = match[1];
  }

  // If no blocks found, try to find the entire response as code
  if (blockIndex === 0 && text.includes('function') || text.includes('const')) {
    blocks['main_code'] = text;
  }

  return blocks;
}
