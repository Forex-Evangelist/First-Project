'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  TrendingUp, 
  Wallet, 
  Settings, 
  LogOut, 
  Bell, 
  Eye, 
  EyeOff, 
  Download, 
  Plus, 
  Briefcase,
  Clock,
  DollarSign,
  Target,
  ChevronRight,
  BarChart3,
  Zap,
  Calendar,
  PieChart,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface UserData {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  initialInvestment: number
  createdAt: string
}

export default function Dashboard() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [showBalance, setShowBalance] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get user data from localStorage (set during signup)
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

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Account Found</h1>
          <p className="text-gray-600 mb-6">Please create an account first.</p>
          <Link href="/signup">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Create Account</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Determine current plan based on investment amount
  const getPlanDetails = () => {
    const amount = userData.initialInvestment;
    if (amount >= 1000) {
      return {
        id: 'long-term',
        name: 'Long-Term Capital',
        duration: 'Up to 1 year',
        investmentRange: 'GHS 1,000+',
        returnPercentage: '8-12% per month',
        totalReturn: '96-144% total',
        icon: Target,
        color: 'from-green-500 to-emerald-500',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-600',
        // Long-term portfolio: More conservative, focus on stability
        portfolio: [
          { name: 'Bonds', percentage: 40, color: 'bg-green-600', description: 'Government & Corporate Bonds' },
          { name: 'Real Estate', percentage: 30, color: 'bg-blue-600', description: 'Real Estate Investment Trusts' },
          { name: 'Stocks', percentage: 20, color: 'bg-purple-600', description: 'Blue-chip Stocks' },
          { name: 'Cash', percentage: 10, color: 'bg-yellow-600', description: 'Money Market Funds' }
        ]
      };
    }
    if (amount >= 300) {
      return {
        id: 'medium-term',
        name: 'Medium-Term Equity',
        duration: '3-6 months',
        investmentRange: 'GHS 300 - GHS 1,000',
        returnPercentage: '5-8% per month',
        totalReturn: '15-48% total',
        icon: TrendingUp,
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-600',
        // Medium-term portfolio: Balanced approach
        portfolio: [
          { name: 'Stocks', percentage: 45, color: 'bg-blue-600', description: 'Growth Stocks & Equities' },
          { name: 'Bonds', percentage: 30, color: 'bg-green-600', description: 'Fixed Income Securities' },
          { name: 'Real Estate', percentage: 15, color: 'bg-purple-600', description: 'Property Investments' },
          { name: 'Cash', percentage: 10, color: 'bg-yellow-600', description: 'Liquid Reserves' }
        ]
      };
    }
    // Short-term
    return {
      id: 'short-term',
      name: 'Short-Term Growth',
      duration: '1-3 months',
      investmentRange: 'GHS 50 - GHS 300',
      returnPercentage: '2-5% per month',
      totalReturn: '6-15% total',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-600',
      // Short-term portfolio: High growth, more aggressive
      portfolio: [
        { name: 'Stocks', percentage: 60, color: 'bg-blue-600', description: 'High-Growth Stocks' },
        { name: 'Bonds', percentage: 20, color: 'bg-green-600', description: 'Short-term Bonds' },
        { name: 'Cash', percentage: 15, color: 'bg-yellow-600', description: 'Money Market' },
        { name: 'Commodities', percentage: 5, color: 'bg-red-600', description: 'Commodity Futures' }
      ]
    };
  }

  const currentPlan = getPlanDetails();

  // Mock portfolio data
  const portfolioValue = userData.initialInvestment * 1.25 // Simulated 25% growth
  const totalGain = portfolioValue - userData.initialInvestment
  const gainPercentage = ((totalGain / userData.initialInvestment) * 100).toFixed(2)

  const recentTransactions = [
    {
      id: 1,
      type: 'deposit',
      description: 'Initial Investment',
      amount: userData.initialInvestment,
      date: userData.createdAt,
      status: 'completed'
    },
    {
      id: 2,
      type: 'dividend',
      description: 'Q4 2024 Dividend',
      amount: totalGain,
      date: new Date().toISOString(),
      status: 'completed'
    }
  ]

  // Performance metrics based on current plan
  const performanceMetrics = [
    { name: 'Monthly Return', value: currentPlan.returnPercentage, icon: TrendingUp, color: 'text-green-600' },
    { name: 'Total Return', value: currentPlan.totalReturn, icon: BarChart3, color: 'text-blue-600' },
    { name: 'Investment Term', value: currentPlan.duration, icon: Calendar, color: 'text-purple-600' },
    { name: 'Portfolio Assets', value: `${currentPlan.portfolio.length} Classes`, icon: PieChart, color: 'text-orange-600' }
  ]

  // Investment plans for comparison
  const investmentPlans = [
    {
      id: 'short-term',
      name: 'Short-Term Growth',
      duration: '1-3 months',
      returnPercentage: '2-5% per month',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-600'
    },
    {
      id: 'medium-term',
      name: 'Medium-Term Equity',
      duration: '3-6 months',
      returnPercentage: '5-8% per month',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600'
    },
    {
      id: 'long-term',
      name: 'Long-Term Capital',
      duration: 'Up to 1 year',
      returnPercentage: '8-12% per month',
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-600'
    }
  ]

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
          <div className="flex items-center gap-4">
            <Link href="/investment-plans" className="text-gray-600 hover:text-gray-900 transition font-semibold flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Investment Plans
            </Link>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <button onClick={handleLogout} className="p-2 hover:bg-gray-100 rounded-lg transition">
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {userData.firstName}! 👋
            </h1>
            <p className="text-gray-600 mt-2">Here's your investment overview</p>
          </div>

          {/* Current Plan Card */}
          <Card className={`p-6 border-0 shadow-lg mb-8 ${currentPlan.bgColor} border ${currentPlan.borderColor}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${currentPlan.color} text-white`}>
                    <CurrentPlanIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Your Current Plan</p>
                    <h2 className="text-xl font-bold text-gray-900">{currentPlan.name}</h2>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-600">Investment Amount</p>
                    <p className="font-bold text-gray-900">GHS {userData.initialInvestment.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Monthly Return</p>
                    <p className="font-bold text-gray-900">{currentPlan.returnPercentage}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/investment-plans">
                  <Button variant="outline" className="border-gray-300">
                    Upgrade Plan
                  </Button>
                </Link>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Funds
                </Button>
              </div>
            </div>
          </Card>

          {/* Portfolio Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Total Balance Card */}
            <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold opacity-90">Total Balance</h3>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-2 hover:bg-blue-500 rounded-lg transition"
                >
                  {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
              <div className="text-3xl font-bold mb-2">
                {showBalance ? `GHS ${portfolioValue.toFixed(2)}` : '••••••'}
              </div>
              <p className="text-sm opacity-90">Your current portfolio value</p>
            </Card>

            {/* Total Gain Card */}
            <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-green-600 to-green-700 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold opacity-90">Total Gain</h3>
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-3xl font-bold mb-2">
                {showBalance ? `GHS ${totalGain.toFixed(2)}` : '••••••'}
              </div>
              <p className="text-sm opacity-90">+{gainPercentage}% return</p>
            </Card>

            {/* Account Status Card */}
            <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-purple-600 to-purple-700 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold opacity-90">Account Status</h3>
                <Wallet className="w-5 h-5" />
              </div>
              <div className="text-3xl font-bold mb-2">Active</div>
              <p className="text-sm opacity-90">Account verified and active</p>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card className="p-6 border-0 shadow-lg mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Performance Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-50">
                  <metric.icon className={`w-8 h-8 ${metric.color} mb-3`} />
                  <p className="font-bold text-gray-900 text-lg">{metric.value}</p>
                  <p className="text-sm text-gray-600">{metric.name}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Portfolio Breakdown */}
            <div className="lg:col-span-2 space-y-8">
              {/* Portfolio Breakdown - Plan-Specific */}
              <Card className="p-6 border-0 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Portfolio Breakdown</h2>
                    <p className="text-sm text-gray-600 mt-1">{currentPlan.name} Strategy</p>
                  </div>
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${currentPlan.color} text-white`}>
                    <PieChart className="w-5 h-5" />
                  </div>
                </div>
                <div className="space-y-4">
                  {currentPlan.portfolio.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-gray-700 font-medium">{item.name}</span>
                          <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                        <span className="text-gray-900 font-bold">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${item.color} h-2 rounded-full`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={`mt-6 p-4 rounded-lg ${currentPlan.bgColor} border ${currentPlan.borderColor}`}>
                  <div className="flex items-start gap-3">
                    <AlertCircle className={`w-5 h-5 ${currentPlan.textColor} flex-shrink-0 mt-0.5`} />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Plan-Specific Allocation</p>
                      <p className="text-xs text-gray-600 mt-1">
                        This portfolio allocation is optimized for your {currentPlan.name} investment plan to maximize returns within your investment timeframe.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Recent Transactions */}
              <Card className="p-6 border-0 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Transactions</h2>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${transaction.type === 'deposit' ? 'bg-green-100' : 'bg-blue-100'}`}>
                          {transaction.type === 'deposit' ? (
                            <ArrowDownLeft className={`w-5 h-5 ${transaction.type === 'deposit' ? 'text-green-600' : 'text-blue-600'}`} />
                          ) : (
                            <ArrowUpRight className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{transaction.description}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(transaction.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          {transaction.type === 'deposit' ? '+' : '+'}GHS {transaction.amount.toFixed(2)}
                        </p>
                        <p className="text-sm text-green-600 font-medium">{transaction.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Column - Account Info & Plans */}
            <div className="space-y-8">
              {/* Account Information */}
              <Card className="p-6 border-0 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Account Information</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Full Name</p>
                    <p className="font-semibold text-gray-900">{userData.firstName} {userData.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="font-semibold text-gray-900 break-all">{userData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                    <p className="font-semibold text-gray-900">{userData.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Account ID</p>
                    <p className="font-semibold text-gray-900 font-mono text-sm">{userData.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Member Since</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(userData.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Other Investment Plans */}
              <Card className="p-6 border-0 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Other Plans</h2>
                  <Link href="/investment-plans">
                    <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0 h-auto">
                      View All
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {investmentPlans
                    .filter(plan => plan.id !== currentPlan.id)
                    .map((plan, index) => (
                      <Link href={`/investment-plans?plan=${plan.id}`} key={index}>
                        <div className={`p-4 rounded-lg ${plan.bgColor} border ${plan.borderColor} hover:shadow-md transition cursor-pointer`}>
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`p-1.5 rounded-lg bg-gradient-to-r ${plan.color} text-white`}>
                              <plan.icon className="w-4 h-4" />
                            </div>
                            <h3 className="font-bold text-gray-900">{plan.name}</h3>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                            <div>
                              <p className="text-gray-600">Duration</p>
                              <p className="font-semibold text-gray-900">{plan.duration}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Monthly Return</p>
                              <p className="font-semibold text-gray-900">{plan.returnPercentage}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6 border-0 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Link href="/dashboard/portfolio" className="block">
                    <button className="w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold rounded-lg transition">
                      View Full Portfolio
                    </button>
                  </Link>
                  <Link href="/dashboard/reports" className="block">
                    <button className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition">
                      View Reports
                    </button>
                  </Link>
                  <Link href="/investment-plans" className="block">
                    <button className="w-full px-4 py-3 bg-green-50 hover:bg-green-100 text-green-600 font-semibold rounded-lg transition flex items-center justify-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      View Investment Plans
                    </button>
                  </Link>
                </div>
              </Card>

              {/* Help & Support */}
              <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Need Help?</h2>
                <p className="text-sm text-gray-700 mb-4">
                  Our investment advisors are here to help you make the most of your portfolio.
                </p>
                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
                  Contact Support
                </button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
