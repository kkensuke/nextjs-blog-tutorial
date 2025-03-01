'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card/card';
import Loading from '@/components/common/Loading';
import { Shield } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { STORE_CONFIG } from '@/lib/shop/config';
import { apiClient } from '@/lib/api/client';
import { API } from '@/config/constants';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Separate client component for the checkout content
function CheckoutContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get planId from URL (e.g., 'basic' or 'pro')
  const planId = searchParams.get('plan') as keyof typeof STORE_CONFIG.products;
  const plan = STORE_CONFIG.products[planId];

  // Early return if invalid plan
  if (!plan) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-slate-600">Invalid plan selected.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      setError(null);
  
      const { data, error: apiError } = await apiClient.post(API.SHOP.CHECKOUT, {
        planId: plan.id,
        priceId: plan.stripePriceId,
      });
  
      if (apiError) {
        throw new Error(apiError);
      }
  
      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');
  
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });
  
      if (error) {
        throw error;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Checkout Summary */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{plan.name}</h3>
                  <p className="text-sm text-slate-600">{plan.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold">${plan.price}</span>
                  <span className="text-slate-600">/{plan.period}</span>
                </div>
              </div>
              
              <hr className="border-slate-200" />
              
              <div className="space-y-2">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <Shield className="mt-0.5 h-4 w-4 text-blue-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="mt-6 w-full rounded-lg bg-blue-500 py-3 font-medium text-white transition-all hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? (
                <Loading size="sm" text="Processing..." variant="primary" className="py-1" />
              ) : (
                'Proceed to Payment'
              )}
            </button>
          </CardContent>
        </Card>

        {/* Trust Signals */}
        <div className="space-y-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>Secure Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Your payment is secured by Stripe, the industry leader in online payments.
                We never store your card details.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>Money Back Guarantee</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Try our service risk-free. If you're not satisfied within 30 days,
                we'll refund your purchase - no questions asked.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Loading fallback component
function CheckoutLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <p className="text-center text-slate-600">Loading checkout details...</p>
        </CardContent>
      </Card>
    </div>
  );
}

// Main page component
export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutContent />
    </Suspense>
  );
}