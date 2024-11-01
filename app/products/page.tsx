'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Shield, Clock, Zap, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { STORE_CONFIG } from '../../lib/store/config';

const features = [
  { title: "Feature 1", description: "Detailed explanation of feature 1" },
  { title: "Feature 2", description: "Detailed explanation of feature 2" },
  { title: "Feature 3", description: "Detailed explanation of feature 3" },
];

export default function ProductSalesPage() {
  const pricingPlans = Object.values(STORE_CONFIG.products);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 px-6 py-16 text-center text-white shadow-xl md:px-12 md:py-24">
        <div className="relative z-10">
          <span className="mb-4 inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400">
            New Release
          </span>
          <h1 className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
            Your Product Name
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            A compelling description of your product that highlights its main value proposition and how it solves your customer's problems.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/checkout?plan=pro" className="flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3 font-medium text-white transition-all hover:bg-blue-600">
              Get Started
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="mt-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">Everything you need</h2>
          <p className="mt-4 text-lg text-slate-600">
            Comprehensive set of features to help you achieve your goals
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-slate-200">
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="mt-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">Simple, transparent pricing</h2>
          <p className="mt-4 text-lg text-slate-600">
            Choose the plan that's right for you
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border ${
                plan.isPopular ? 'border-blue-500 shadow-lg' : 'border-slate-200'
              } bg-white p-8`}
            >
              {plan.isPopular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-4 py-1 text-sm font-medium text-white">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-slate-600">/{plan.period}</span>
              </div>
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <Check size={18} className="text-blue-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link 
                href={`/checkout?plan=${plan.id}`}
                className={`mt-8 block w-full rounded-lg py-3 px-4 text-center font-medium ${
                  plan.isPopular
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="mt-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">Frequently asked questions</h2>
          <p className="mt-4 text-lg text-slate-600">
            Everything you need to know about the product
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold">How does billing work?</h3>
            <p className="mt-2 text-slate-600">
              We offer monthly and annual billing options. You can upgrade, downgrade, or cancel your subscription at any time.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold">Can I get a refund?</h3>
            <p className="mt-2 text-slate-600">
              Yes, we offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your purchase.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-24">
        <div className="rounded-2xl bg-slate-900 p-8 text-center md:p-16">
          <h2 className="text-3xl font-bold text-white">Ready to get started?</h2>
          <p className="mt-4 text-lg text-slate-300">
            Join thousands of satisfied customers today
          </p>
          <Link 
            href="/checkout?plan=pro"
            className="mt-8 inline-block rounded-full bg-blue-500 px-8 py-3 font-medium text-white transition-all hover:bg-blue-600"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}