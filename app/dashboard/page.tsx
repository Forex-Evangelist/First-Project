'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowUpRight, ArrowDownLeft, TrendingUp, Wallet, Settings, LogOut, Bell, Eye, EyeOff, Download, Plus } from 'lucide-react'
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

  const portfolioBreakdown = [
    { name: 'Stocks', percentage: 40, color: 'bg-blue-600' },
    { name: 'Bonds', percentage: 30, color: 'bg-green-600' },
    { name: 'Real Estate', percentage: 20, color: 'bg-purple-600' },
    { name: 'Cash', percentage: 10, color: 'bg-yellow-600' }
  ]

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

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white h-12 text-base">
              <Plus className="w-5 h-5 mr-2" />
              Add Funds
            </Button>
            <Button variant="outline" className="h-12 text-base border-gray-300">
              <Download className="w-5 h-5 mr-2" />
              Download Statement
            </Button>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Portfolio Breakdown */}
            <div className="lg:col-span-2 space-y-8">
              {/* Portfolio Breakdown */}
              <Card className="p-6 border-0 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Portfolio Breakdown</h2>
                <div className="space-y-4">
                  {portfolioBreakdown.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700 font-medium">{item.name}</span>
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

            {/* Right Column - Account Info */}
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

              {/* Quick Actions */}
              <Card className="p-6 border-0 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Link href="/dashboard/portfolio" className="block">
                    <button className="w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold rounded-lg transition">
                      View Full Portfolio
                    </button>
                  </Link>
                  <Link href="/dashboard/advisor" className="block">
                    <button className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition">
                      Contact Advisor
                    </button>
                  </Link>
                  <Link href="/dashboard/reports" className="block">
                    <button className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition">
                      View Reports
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
