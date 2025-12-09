'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, TrendingUp, Clock, DollarSign, Target, CheckCircle2, Zap, Shield } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function InvestmentPlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const plans = [
    {
      id: 'short-term',
      name: 'Short-Term Growth',
      duration: '1-3 months',
      investmentRange: 'GHS 50 - GHS 300',
      returnPercentage: '2-5% per month',
      totalReturn: '6-15% total',
      description: 'Perfect for investors looking for quick returns with minimal commitment. Ideal for those who want to test the waters or need liquidity in the short term.',
      benefits: [
        'Quick returns on investment',
        'Low minimum investment (GHS 50)',
        'Flexible withdrawal options',
        'Perfect for beginners',
        'Low risk profile',
        'Monthly compounding'
      ],
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      accentColor: 'bg-orange-50',
      buttonColor: 'bg-orange-600 hover:bg-orange-700'
    },
    {
      id: 'medium-term',
      name: 'Medium-Term Equity',
      duration: '3-6 months',
      investmentRange: 'GHS 300 - GHS 1,000',
      returnPercentage: '5-8% per month',
      totalReturn: '15-48% total',
      description: 'Balanced investment plan for those seeking moderate returns with a reasonable time commitment. Great for building wealth steadily.',
      benefits: [
        'Higher returns than short-term',
        'Moderate investment range',
        'Diversified portfolio',
        'Professional management',
        'Quarterly performance reports',
        'Monthly compounding'
      ],
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      accentColor: 'bg-blue-50',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      featured: true
    },
    {
      id: 'long-term',
      name: 'Long-Term Capital',
      duration: 'Up to 1 year',
      investmentRange: 'GHS 1,000+',
      returnPercentage: '8-12% per month',
      totalReturn: '96-144% total',
      description: 'Premium investment plan for serious investors. Maximum returns through long-term commitment and strategic portfolio management.',
      benefits: [
        'Highest returns available',
        'Substantial investment opportunity',
        'Dedicated account manager',
        'Priority support',
        'Annual performance review',
        'Monthly compounding',
        'Tax optimization strategies'
      ],
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      accentColor: 'bg-green-50',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    }
  ]

  const handleChoosePlan = (planId: string) => {
    setSelectedPlan(planId)
    // Redirect to signup with plan parameter
    window.location.href = `/signup?plan=${planId}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <Image
              src="/images/logo.png"
              alt="Wealth Builders Ghana"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-xl font-bold text-gray-900">Wealth Builders</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Investment Plans
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Choose the investment plan that best fits your financial goals and timeline. Whether you're looking for quick returns or long-term wealth building, we have the perfect plan for you.
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">SEC Ghana Regulated • Transparent Returns • Professional Management</span>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => {
              const IconComponent = plan.icon
              return (
                <Card
                  key={plan.id}
                  className={`border-0 shadow-lg hover:shadow-2xl transition overflow-hidden ${
                    plan.featured ? 'md:scale-105 ring-2 ring-blue-500' : ''
                  }`}
                >
                  {/* Plan Header */}
                  <div className={`bg-gradient-to-r ${plan.color} text-white p-8`}>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold">{plan.name}</h2>
                      <IconComponent className="w-8 h-8 opacity-80" />
                    </div>
                    {plan.featured && (
                      <div className="inline-block bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                        Most Popular
                      </div>
                    )}
                  </div>

                  {/* Plan Content */}
                  <div className={`p-8 ${plan.accentColor}`}>
                    {/* Key Metrics */}
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-600 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-600">Duration</p>
                          <p className="font-bold text-gray-900">{plan.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-gray-600 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-600">Investment Range</p>
                          <p className="font-bold text-gray-900">{plan.investmentRange}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-600">Monthly Return</p>
                          <p className="font-bold text-gray-900">{plan.returnPercentage}</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">Total Estimated Return</p>
                        <p className="text-2xl font-bold text-gray-900">{plan.totalReturn}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                      {plan.description}
                    </p>

                    {/* Benefits */}
                    <div className="mb-8">
                      <h3 className="font-bold text-gray-900 mb-4">Plan Benefits:</h3>
                      <ul className="space-y-3">
                        {plan.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleChoosePlan(plan.id)}
                      className={`w-full ${plan.buttonColor} text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2`}
                    >
                      Choose This Plan
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Comparison Section */}
          <Card className="p-8 border-0 shadow-lg mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Plan Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-4 px-4 font-bold text-gray-900">Feature</th>
                    <th className="text-center py-4 px-4 font-bold text-gray-900">Short-Term</th>
                    <th className="text-center py-4 px-4 font-bold text-gray-900">Medium-Term</th>
                    <th className="text-center py-4 px-4 font-bold text-gray-900">Long-Term</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4 font-semibold text-gray-900">Minimum Investment</td>
                    <td className="text-center py-4 px-4 text-gray-700">GHS 50</td>
                    <td className="text-center py-4 px-4 text-gray-700">GHS 300</td>
                    <td className="text-center py-4 px-4 text-gray-700">GHS 1,000</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4 font-semibold text-gray-900">Duration</td>
                    <td className="text-center py-4 px-4 text-gray-700">1-3 months</td>
                    <td className="text-center py-4 px-4 text-gray-700">3-6 months</td>
                    <td className="text-center py-4 px-4 text-gray-700">Up to 1 year</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4 font-semibold text-gray-900">Monthly Return</td>
                    <td className="text-center py-4 px-4 text-gray-700">2-5%</td>
                    <td className="text-center py-4 px-4 text-gray-700">5-8%</td>
                    <td className="text-center py-4 px-4 text-gray-700">8-12%</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4 font-semibold text-gray-900">Total Return</td>
                    <td className="text-center py-4 px-4 text-gray-700">6-15%</td>
                    <td className="text-center py-4 px-4 text-gray-700">15-48%</td>
                    <td className="text-center py-4 px-4 text-gray-700">96-144%</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4 font-semibold text-gray-900">Account Manager</td>
                    <td className="text-center py-4 px-4">
                      <span className="text-gray-400">—</span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4 font-semibold text-gray-900">Priority Support</td>
                    <td className="text-center py-4 px-4">
                      <span className="text-gray-400">—</span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-4 font-semibold text-gray-900">Tax Optimization</td>
                    <td className="text-center py-4 px-4">
                      <span className="text-gray-400">—</span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className="text-gray-400">—</span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Why Choose Us Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="p-8 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our Plans?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-900">SEC Ghana Regulated</p>
                    <p className="text-sm text-gray-700">Fully compliant with all regulatory requirements</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-900">Transparent Returns</p>
                    <p className="text-sm text-gray-700">Clear, honest reporting with no hidden fees</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-900">Professional Management</p>
                    <p className="text-sm text-gray-700">Expert advisors with 15+ years experience</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-900">Diversified Portfolio</p>
                    <p className="text-sm text-gray-700">Spread across multiple asset classes</p>
                  </div>
                </li>
              </ul>
            </Card>

            <Card className="p-8 border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h3>
              <ol className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Choose Your Plan</p>
                    <p className="text-sm text-gray-700">Select the investment plan that matches your goals</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Create Account</p>
                    <p className="text-sm text-gray-700">Sign up and complete your profile in minutes</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Make Investment</p>
                    <p className="text-sm text-gray-700">Deposit your funds securely through our platform</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Earn Returns</p>
                    <p className="text-sm text-gray-700">Watch your investment grow with monthly compounding</p>
                  </div>
                </li>
              </ol>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="p-8 border-0 shadow-lg mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-gray-900 mb-2">Can I switch plans after investing?</h3>
                <p className="text-gray-700 text-sm">
                  Yes, you can upgrade to a higher plan or adjust your investment strategy. Contact our support team for assistance with plan transitions.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-gray-900 mb-2">What happens if I need to withdraw early?</h3>
                <p className="text-gray-700 text-sm">
                  Early withdrawals are possible with minimal penalties. The exact terms depend on your plan and how long you've been invested. Contact us for details.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-gray-900 mb-2">Are returns guaranteed?</h3>
                <p className="text-gray-700 text-sm">
                  While we strive to meet our projected returns, past performance does not guarantee future results. All investments carry some level of risk.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">How are returns calculated?</h3>
                <p className="text-gray-700 text-sm">
                  Returns are calculated monthly and compounded, meaning you earn returns on your returns. Detailed calculations are provided in your quarterly reports.
                </p>
              </div>
            </div>
          </Card>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Investing?</h2>
            <p className="text-lg mb-8 opacity-90">
              Choose your investment plan today and start building wealth for your future.
            </p>
            <Link href="/signup">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-3 text-lg">
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-4">&copy; 2025 Wealth Builders Ghana. All rights reserved.</p>
          <p className="text-sm">Regulated by SEC Ghana • Transparent Returns • Professional Management</p>
        </div>
      </footer>
    </div>
  )
}
