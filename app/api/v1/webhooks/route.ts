import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = headers().get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.error('Webhook signature verification failed');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle specific webhook events
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Update your database with subscription info
        await handleSuccessfulSubscription(session);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Handle subscription updates (upgrades/downgrades)
        await handleSubscriptionUpdate(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Handle subscription cancellations
        await handleSubscriptionCancellation(subscription);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// Implement these functions based on your database and business logic
async function handleSuccessfulSubscription(session: Stripe.Checkout.Session) {
  // Example implementation:
  // 1. Get or create user
  // 2. Update user's subscription status
  // 3. Send welcome email
  // 4. Add to CRM, etc.
  
  // const user = await db.user.update({
  //   where: { id: session.client_reference_id },
  //   data: {
  //     stripeCustomerId: session.customer as string,
  //     subscriptionStatus: 'active',
  //     subscriptionPlan: session.metadata.planId,
  //   },
  // });
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  // Example implementation:
  // 1. Update user's subscription status
  // 2. Handle proration if necessary
  // 3. Send confirmation email
  
  // const user = await db.user.update({
  //   where: { stripeCustomerId: subscription.customer as string },
  //   data: {
  //     subscriptionStatus: subscription.status,
  //     subscriptionPlan: subscription.metadata.planId,
  //   },
  // });
}

async function handleSubscriptionCancellation(subscription: Stripe.Subscription) {
  // Example implementation:
  // 1. Update user's subscription status
  // 2. Send cancellation email
  // 3. Start offboarding process
  
  // const user = await db.user.update({
  //   where: { stripeCustomerId: subscription.customer as string },
  //   data: {
  //     subscriptionStatus: 'cancelled',
  //     subscriptionPlan: null,
  //   },
  // });
}