import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  try {
    const { cost, appName, appDescription } = await request.json();

    if (!cost || !appName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Ralph Builder: ${appName}`,
              description: appDescription || 'AI-powered app generation',
            },
            unit_amount: Math.round(cost * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/builder?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${request.headers.get('origin')}/builder?canceled=true`,
      metadata: {
        appName,
        appDescription,
        cost: cost.toString(),
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
