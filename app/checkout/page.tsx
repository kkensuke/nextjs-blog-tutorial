'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, ChevronRight, CreditCard, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { STORE_CONFIG } from '../../lib/store/config';

// Step indicators for the checkout process
const CheckoutSteps = ({ currentStep }: { currentStep: number }) => {
  const steps = ['Details', 'Payment', 'Confirmation'];
  
  return (
    <div className="mb-8">
      <div className="flex justify-center">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
              index < currentStep 
                ? 'bg-blue-500 text-white' 
                : index === currentStep 
                  ? 'bg-blue-100 text-blue-500'
                  : 'bg-slate-100 text-slate-400'
            }`}>
              {index < currentStep ? <Check size={16} /> : index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className={`h-0.5 w-12 ${
                index < currentStep ? 'bg-blue-500' : 'bg-slate-200'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-center">
        <span className="text-sm font-medium text-slate-900">{steps[currentStep]}</span>
      </div>
    </div>
  );
};

// Summary component showing selected plan
const OrderSummary = ({ planId }: { planId: string }) => {
  const plan = STORE_CONFIG.products[planId as keyof typeof STORE_CONFIG.products];
  const subtotal = plan.price;
  const tax = subtotal * STORE_CONFIG.tax.rate;
  const total = subtotal + tax;

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <h3 className="mb-2 font-medium">Order Summary</h3>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span>{plan.name} Plan</span>
          <span>${plan.price}/{plan.period}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax ({(STORE_CONFIG.tax.rate * 100)}%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t border-slate-200 pt-1 font-medium">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

// Customer details form
const CustomerDetails = ({ onNext }: { onNext: () => void }) => {
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan') || 'basic';

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">First Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-lg border border-slate-200 p-2.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Last Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-lg border border-slate-200 p-2.5"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                required
                className="mt-1 block w-full rounded-lg border border-slate-200 p-2.5"
              />
            </div>

            <OrderSummary planId={planId} />

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 py-2.5 font-medium text-white hover:bg-blue-600"
            >
              Continue to Payment
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Payment form
const Payment = ({ onNext }: { onNext: () => void }) => {
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan') || 'basic';

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Card Number</label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="text"
                  required
                  placeholder="1234 5678 9012 3456"
                  className="block w-full rounded-lg border border-slate-200 p-2.5"
                />
                <CreditCard className="text-slate-400" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Expiry Date</label>
                <input
                  type="text"
                  required
                  placeholder="MM/YY"
                  className="mt-1 block w-full rounded-lg border border-slate-200 p-2.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">CVC</label>
                <input
                  type="text"
                  required
                  placeholder="123"
                  className="mt-1 block w-full rounded-lg border border-slate-200 p-2.5"
                />
              </div>
            </div>

            <OrderSummary planId={planId} />

            <div className="rounded-lg bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Lock size={16} />
                Your payment information is encrypted and secure
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 py-2.5 font-medium text-white hover:bg-blue-600"
            >
              Complete Purchase
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Order confirmation
const Confirmation = () => {
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan') || 'basic';

  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="rounded-full bg-green-100 p-4 text-green-500">
        <Check size={48} className="mx-auto" />
      </div>
      <h2 className="mt-6 text-2xl font-bold text-slate-900">Thank you for your purchase!</h2>
      <p className="mt-2 text-slate-600">
        We've sent a confirmation email with your subscription details.
      </p>
      <div className="mt-8">
        <Card>
          <CardContent className="p-6">
            <OrderSummary planId={planId} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Main checkout component
const CheckoutFlow = () => {
  const [step, setStep] = useState(0);
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 2));

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <CheckoutSteps currentStep={step} />
        
        {step === 0 && <CustomerDetails onNext={nextStep} />}
        {step === 1 && <Payment onNext={nextStep} />}
        {step === 2 && <Confirmation />}
      </div>
    </div>
  );
};

export default CheckoutFlow;