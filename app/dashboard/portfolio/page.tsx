'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, TrendingUp, DollarSign, PieChart, Zap, Clock, Target, AlertCircle, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface UserData {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  initialInvestment: number
  createdAt: string
}

export default function PortfolioPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setUserData(user)
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  // Determine current plan based on investment amount
  const getPlanDetails = () => {
    const amount = userData?.initialInvestment || 0;
    if (amount >= 1000) {
      return {
        id: 'long-term',
        name: 'Long-Term Capital',
        duration: 'Up to 1 year',
        returnPercentage: '8-12% per month',
        totalReturn: '96-144% total',
        icon: Target,
        color: 'from-green-500 to-emerald-500',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-600',
        portfolio: [
          { name: 'Bonds', percentage: 40, color: 'bg-green-600', description: 'Government & Corporate Bonds', value: amount * 0.40 },
          { name: 'Real Estate', percentage: 30, color: 'bg-blue-600', description: 'Real Estate Investment Trusts', value: amount * 0.30 },
          { name: 'Stocks', percentage: 20, color: 'bg-purple-600', description: 'Blue-chip Stocks', value: amount * 0.20 },
          { name: 'Cash', percentage: 10, color: 'bg-yellow-600', description: 'Money Market Funds', value: amount * 0.10 }
        ]
      };
    }
    if (amount >= 300) {
      return {
        id: 'medium-term',
        name: 'Medium-Term Equity',
        duration: '3-6 months',
        returnPercentage: '5-8% per month',
        totalReturn: '15-48% total',
        icon: TrendingUp,
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-600',
        portfolio: [
          { name: 'Stocks', percentage: 45, color: 'bg-blue-600', description: 'Growth Stocks & Equities', value: amount * 0.45 },
          { name: 'Bonds', percentage: 30, color: 'bg-green-600', description: 'Fixed Income Securities', value: amount * 0.30 },
          { name: 'Real Estate', percentage: 15, color: 'bg-purple-600', description: 'Property Investments', value: amount * 0.15 },
          { name: 'Cash', percentage: 10, color: 'bg-yellow-600', description: 'Liquid Reserves', value: amount * 0.10 }
        ]
      };
    }
    // Short-term
    return {
      id: 'short-term',
      name: 'Short-Term Growth',
      duration: '1-3 months',
      returnPercentage: '2-5% per month',
      totalReturn: '6-15% total',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-600',
      portfolio: [
        { name: 'Stocks', percentage: 60, color: 'bg-blue-600', description: 'High-Growth Stocks', value: amount * 0.60 },
        { name: 'Bonds', percentage: 20, color: 'bg-green-600', description: 'Short-term Bonds', value: amount * 0.20 },
        { name: 'Cash', percentage: 15, color: 'bg-yellow-600', description: 'Money Market', value: amount * 0.15 },
        { name: 'Commodities', percentage: 5, color: 'bg-red-600', description: 'Commodity Futures', value: amount * 0.05 }
      ]
    };
  }

  const currentPlan = getPlanDetails();
  const portfolioValue = (userData?.initialInvestment || 0) * 1.25;
  const totalGain = portfolioValue - (userData?.initialInvestment || 0);
  const gainPercentage = ((totalGain / (userData?.initialInvestment || 1)) * 100).toFixed(2);

  const CurrentPlanIcon = currentPlan.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Wealth Builders Ghana"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-xl font-bold text-gray-900">Wealth Builders</span>
          </div>
          <Link href="/dashboard">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Your Full Portfolio</h1>
            <p className="text-gray-600 mt-2">Detailed view of all your investments aligned with your {currentPlan.name} plan</p>
          </div>

          {/* Current Plan Card */}
          <Card className={`p-6 border-0 shadow-lg mb-8 ${currentPlan.bgColor} border ${currentPlan.borderColor}`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${currentPlan.color} text-white`}>
                <CurrentPlanIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Your Investment Plan</p>
                <h2 className="text-2xl font-bold text-gray-900">{currentPlan.name}</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-bold text-gray-900">{currentPlan.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Return</p>
                <p className="font-bold text-gray-900">{currentPlan.returnPercentage}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Return</p>
                <p className="font-bold text-gray-900">{currentPlan.totalReturn}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Asset Classes</p>
                <p className="font-bold text-gray-900">{currentPlan.portfolio.length}</p>
              </div>
            </div>
          </Card>

          {/* Portfolio Summary */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold opacity-90">Total Portfolio Value</h3>
                <DollarSign className="w-5 h-5" />
              </div>
              <div className="text-3xl font-bold mb-2">GHS {portfolioValue.toFixed(2)}</div>
              <p className="text-sm opacity-90">All holdings combined</p>
            </Card>

            <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-green-600 to-green-700 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold opacity-90">Total Gain</h3>
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-3xl font-bold mb-2">GHS {totalGain.toFixed(2)}</div>
              <p className="text-sm opacity-90">+{gainPercentage}% return</p>
            </Card>

            <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-purple-600 to-purple-700 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold opacity-90">Asset Classes</h3>
                <PieChart className="w-5 h-5" />
              </div>
              <div className="text-3xl font-bold mb-2">{currentPlan.portfolio.length}</div>
              <p className="text-sm opacity-90">Diversified allocation</p>
            </Card>
          </div>

          {/* Asset Allocation */}
          <Card className="p-8 border-0 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Asset Allocation</h2>
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left: Breakdown */}
              <div className="space-y-6">
                {currentPlan.portfolio.map((asset, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${asset.color}`}></div>
                        <div>
                          <p className="font-bold text-gray-900">{asset.name}</p>
                          <p className="text-sm text-gray-600">{asset.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{asset.percentage}%</p>
                        <p className="text-sm text-gray-600">GHS {asset.value.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`${asset.color} h-3 rounded-full`}
                        style={{ width: `${asset.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: Strategy Info */}
              <div className="space-y-6">
                <div className={`p-6 rounded-lg ${currentPlan.bgColor} border ${currentPlan.borderColor}`}>
                  <h3 className="font-bold text-gray-900 mb-4">Portfolio Strategy</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    This allocation is specifically optimized for your {currentPlan.name} investment plan to maximize returns within your {currentPlan.duration} investment timeframe.
                  </p>
                  <ul className="space-y-3">
                    {currentPlan.portfolio.map((asset, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 ${asset.color.replace('bg-', 'text-')} flex-shrink-0 mt-0.5`} />
                        <span className="text-sm text-gray-700">
                          <span className="font-semibold">{asset.percentage}%</span> in {asset.description.toLowerCase()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Card className="p-6 border-0 shadow-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-900 mb-2">Plan-Aligned Allocation</p>
                      <p className="text-sm text-gray-700">
                        Your portfolio allocation is dynamically adjusted based on your investment plan to balance growth potential with risk management appropriate for your investment timeline.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Card>

          {/* Asset Class Details */}
          <Card className="p-8 border-0 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Asset Class Details</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-4 px-4 font-bold text-gray-900">Asset Class</th>
                    <th className="text-center py-4 px-4 font-bold text-gray-900">Allocation</th>
                    <th className="text-center py-4 px-4 font-bold text-gray-900">Amount (GHS)</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPlan.portfolio.map((asset, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${asset.color}`}></div>
                          <span className="font-bold text-gray-900">{asset.name}</span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-4 font-bold text-gray-900">{asset.percentage}%</td>
                      <td className="text-center py-4 px-4 font-bold text-gray-900">GHS {asset.value.toFixed(2)}</td>
                      <td className="py-4 px-4 text-gray-600">{asset.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Plan Comparison */}
          <Card className="p-8 border-0 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Why This Allocation?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg bg-orange-50 border border-orange-200">
                <h3 className="font-bold text-gray-900 mb-3">Short-Term Growth</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Emphasizes high-growth stocks (60%) for quick returns within 1-3 months, with bonds and cash for stability.
                </p>
                <p className="text-xs text-gray-600">Best for: Quick returns, 1-3 months</p>
              </div>

              <div className={`p-6 rounded-lg ${currentPlan.id === 'medium-term' ? 'bg-blue-50 border-2 border-blue-500' : 'bg-blue-50 border border-blue-200'}`}>
                <h3 className="font-bold text-gray-900 mb-3">Medium-Term Equity</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Balanced approach with stocks (45%), bonds (30%), and real estate (15%) for steady growth over 3-6 months.
                </p>
                <p className="text-xs text-gray-600">Best for: Balanced growth, 3-6 months</p>
              </div>

              <div className="p-6 rounded-lg bg-green-50 border border-green-200">
                <h3 className="font-bold text-gray-900 mb-3">Long-Term Capital</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Conservative approach with bonds (40%) and real estate (30%) for stability and long-term wealth building.
                </p>
                <p className="text-xs text-gray-600">Best for: Long-term wealth, up to 1 year</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
