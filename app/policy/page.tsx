'use client';

import React, { useState } from 'react';

export default function PolicyPage() {
  const [activeTab, setActiveTab] = useState('privacy');
  const lastUpdated = "October 31, 2024";

  return (
    <div className="mx-auto max-w-screen-md px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Legal Information</h1>
      
      {/* Simple Tab Buttons */}
      <div className="mb-8 flex border-b">
        <button
          className={`px-4 py-2 ${activeTab === 'privacy' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('privacy')}
        >
          Privacy Policy
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'terms' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('terms')}
        >
          Terms of Service
        </button>
      </div>

      {/* Privacy Policy Content */}
      {activeTab === 'privacy' && (
        <div className="space-y-6">
          <div>
            <h2 className="mb-2 text-2xl font-semibold">Privacy Policy</h2>
            <p className="mb-6 text-sm text-gray-600">Last Updated: {lastUpdated}</p>

            <section className="mb-8">
              <h3 className="mb-4 text-xl font-semibold">1. Introduction</h3>
              <p>Welcome to [Your Website Name] ("we," "our," or "us"). This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website.</p>
            </section>

            <section className="mb-8">
              <h3 className="mb-4 text-xl font-semibold">2. Information We Collect</h3>
              
              <h4 className="mb-2 text-lg font-medium">2.1 Information You Provide</h4>
              <ul className="mb-4 list-disc pl-6">
                <li>Contact information (name, email address)</li>
                <li>Messages sent through contact forms</li>
                <li>Comments or feedback you submit</li>
                <li>Account information (if applicable)</li>
              </ul>

              <h4 className="mb-2 text-lg font-medium">2.2 Information Automatically Collected</h4>
              <ul className="list-disc pl-6">
                <li>Log data (IP address, browser type, pages visited)</li>
                <li>Device information</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Analytics data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="mb-4 text-xl font-semibold">3. How We Use Your Information</h3>
              <ul className="list-disc pl-6">
                <li>To provide and maintain our website</li>
                <li>To respond to your inquiries</li>
                <li>To improve our services</li>
                <li>To send periodic emails (if subscribed)</li>
                <li>To monitor and analyze usage patterns</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="mb-4 text-xl font-semibold">4. Contact Information</h3>
              <p>[Your Contact Details]</p>
            </section>
          </div>
        </div>
      )}

      {/* Terms of Service Content */}
      {activeTab === 'terms' && (
        <div className="space-y-6">
          <div>
            <h2 className="mb-2 text-2xl font-semibold">Terms of Service</h2>
            <p className="mb-6 text-sm text-gray-600">Last Updated: {lastUpdated}</p>

            <section className="mb-8">
              <h3 className="mb-4 text-xl font-semibold">1. Agreement to Terms</h3>
              <p>By accessing [Your Website Name], you agree to these Terms of Service and any additional terms referenced herein.</p>
            </section>

            <section className="mb-8">
              <h3 className="mb-4 text-xl font-semibold">2. Intellectual Property Rights</h3>
              <ul className="list-disc pl-6">
                <li>Website content ownership</li>
                <li>Permitted uses</li>
                <li>Copyright and trademark notices</li>
                <li>User-generated content licenses</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="mb-4 text-xl font-semibold">3. User Responsibilities</h3>
              <ul className="list-disc pl-6">
                <li>Accurate information provision</li>
                <li>Account security (if applicable)</li>
                <li>Prohibited activities</li>
                <li>Content guidelines</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="mb-4 text-xl font-semibold">4. Contact Information</h3>
              <p>[Your Contact Details]</p>
            </section>
          </div>
        </div>
      )}

      <footer className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
        <p>For any questions regarding our Privacy Policy or Terms of Service, please contact:</p>
        <p className="mt-2">[Your Contact Details]</p>
      </footer>
    </div>
  );
}