import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from 'react';

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero section */}
        <div className="py-12 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:flex-col sm:align-center">
              <h1 className="text-4xl font-extrabold text-primary text-center sm:text-5xl">
                Simple, Transparent Pricing
              </h1>
              <p className="mt-5 text-xl text-slate-600 text-center max-w-3xl mx-auto">
                Choose the plan that's right for you or your organization
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Pricing section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Free Plan */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-slate-900">Free</h2>
                  <p className="mt-1 text-sm text-slate-600">For personal use and evaluation</p>
                  <p className="mt-4">
                    <span className="text-4xl font-extrabold text-slate-900">$0</span>
                    <span className="text-base font-medium text-slate-500">/month</span>
                  </p>
                  <Button className="mt-6 w-full">Get Started</Button>
                </div>
                <div className="px-6 pt-4 pb-8">
                  <h3 className="text-sm font-medium text-slate-900 mb-4">What's included:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span className="text-sm text-slate-700">10 account verifications per month</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span className="text-sm text-slate-700">Basic account comparison (2 accounts)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span className="text-sm text-slate-700">Standard verification metrics</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span className="text-sm text-slate-700">Access to web interface</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="bg-white border-2 border-primary rounded-lg shadow-md overflow-hidden relative">
                <div className="absolute top-0 right-0">
                  <Badge className="m-2 bg-primary hover:bg-primary/90">Popular</Badge>
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-medium text-slate-900">Pro</h2>
                  <p className="mt-1 text-sm text-slate-600">For professionals and small teams</p>
                  <p className="mt-4">
                    <span className="text-4xl font-extrabold text-slate-900">$29</span>
                    <span className="text-base font-medium text-slate-500">/month</span>
                  </p>
                  <Button className="mt-6 w-full bg-primary hover:bg-primary/90">Subscribe</Button>
                </div>
                <div className="px-6 pt-4 pb-8">
                  <h3 className="text-sm font-medium text-slate-900 mb-4">Everything in Free, plus:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span className="text-sm text-slate-700">100 account verifications per month</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span className="text-sm text-slate-700">Advanced account comparison (up to 5 accounts)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span className="text-sm text-slate-700">Detailed behavior pattern analysis</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span className="text-sm text-slate-700">API access (1,000 requests/month)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span className="text-sm text-slate-700">Verification history and reports</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span className="text-sm text-slate-700">Email support</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-slate-900">Enterprise</h2>
                  <p className="mt-1 text-sm text-slate-600">For organizations with advanced needs</p>
                  <p className="mt-4">
                    <span className="text-4xl font-extrabold text-slate-900">$99</span>
                    <span className="text-base font-medium text-slate-500">/month</span>
                  </p>
                  <Button className="mt-6 w-full" variant="outline">Contact Sales</Button>
                </div>
                <div className="px-6 pt-4 pb-8">
                  <h3 className="text-sm font-medium text-slate-900 mb-4">Everything in Pro, plus:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span className="text-sm text-slate-700">Unlimited account verifications</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span className="text-sm text-slate-700">Advanced account comparison (unlimited accounts)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span className="text-sm text-slate-700">Custom verification metrics and analysis</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span className="text-sm text-slate-700">API access (10,000 requests/month)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span className="text-sm text-slate-700">Advanced analytics and reporting</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span className="text-sm text-slate-700">Dedicated account manager</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span className="text-sm text-slate-700">Custom integration support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span className="text-sm text-slate-700">Priority support with SLA</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* FAQ section */}
        <div className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-primary text-center">Frequently Asked Questions</h2>
            <div className="mt-12 space-y-8">
              <div>
                <h3 className="text-lg font-medium text-slate-900">Can I upgrade or downgrade my plan at any time?</h3>
                <p className="mt-2 text-base text-slate-600">
                  Yes, you can upgrade or downgrade your subscription plan at any time. The changes will take effect at the beginning of your next billing cycle.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-slate-900">Do you offer a free trial for paid plans?</h3>
                <p className="mt-2 text-base text-slate-600">
                  Yes, we offer a 14-day free trial for our Pro plan. No credit card is required to start the trial.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-slate-900">What payment methods do you accept?</h3>
                <p className="mt-2 text-base text-slate-600">
                  We accept all major credit cards, including Visa, Mastercard, American Express, and Discover. We also support payment via PayPal.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-slate-900">Can I get a custom plan for my specific needs?</h3>
                <p className="mt-2 text-base text-slate-600">
                  Absolutely! If your organization has specific requirements that don't fit our standard plans, please contact our sales team to discuss a custom solution.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-slate-900">How accurate are the verification results?</h3>
                <p className="mt-2 text-base text-slate-600">
                  Our verification system uses advanced algorithms and machine learning to provide highly accurate results. However, please note that no verification system is 100% accurate, and we recommend using the results as part of a broader assessment strategy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricingPage;