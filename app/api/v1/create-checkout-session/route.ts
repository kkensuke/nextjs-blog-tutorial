import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { STORE_CONFIG } from '@/lib/shop/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(request: Request) {
  try {
    const { planId, priceId } = await request.json();

    // Validate the plan and price ID
    const plan = STORE_CONFIG.products[planId as keyof typeof STORE_CONFIG.products];
    if (!plan || plan.stripePriceId !== priceId) {
      return NextResponse.json(
        { error: 'Invalid plan or price ID' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      automatic_tax: {
        enabled: true
      },
      billing_address_collection: 'required',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?plan=${planId}`,
      metadata: {
        planId: planId, // Store your internal plan ID in metadata
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error('Error creating checkout session:', err);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}