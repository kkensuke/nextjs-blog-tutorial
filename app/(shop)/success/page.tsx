'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      setError('No session ID found');
      setIsLoading(false);
      return;
    }

    // Verify the checkout session
    fetch(`/api/verify-session?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSession(data.session);
        }
      })
      .catch((err) => {
        setError('Failed to verify session');
        console.error('Error:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-slate-600">Verifying your purchase...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-red-600">{error}</p>
            <Link 
              href="/"
              className="mt-4 block text-center text-blue-500 hover:text-blue-600"
            >
              Return to homepage
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16">
      <Card className="mx-auto max-w-2xl border-slate-200">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Thank you for your purchase!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-center text-slate-600">
              We've sent a confirmation email with your receipt and next steps.
            </p>

            <div className="rounded-lg bg-slate-50 p-6">
              <h3 className="font-semibold">What's next?</h3>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="mt-1 h-4 w-4 text-green-600" />
                  <span>Check your email for login instructions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-1 h-4 w-4 text-green-600" />
                  <span>Set up your account preferences</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-1 h-4 w-4 text-green-600" />
                  <span>Start using your new subscription</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-center">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-all hover:bg-blue-600"
              >
                Go to Dashboard <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
