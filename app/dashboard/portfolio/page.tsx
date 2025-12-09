'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, TrendingUp, DollarSign, PieChart } from 'lucide-react'
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

  const portfolioValue = userData ? userData.initialInvestment * 1.25 : 0
  const totalGain = portfolioValue - (userData?.initialInvestment || 0)

  const holdings = [
    { symbol: 'NSEASI', name: 'Nigerian Stock Exchange Index', shares: 150, price: 45.50, value: 6825, change: 5.2 },
    { symbol: 'DANGSUGAR', name: 'Dangote Sugar Refinery', shares: 50, price: 18.75, value: 937.50, change: 3.8 },
    { symbol: 'ZENITHBANK', name: 'Zenith Bank PLC', shares: 100, price: 32.40, value: 3240, change: 2.1 },
    { symbol: 'GTCO', name: 'Guaranty Trust Holding Company', shares: 75, price: 28.90, value: 2167.50, change: 4.5 },
    { symbol: 'SEPLAT', name: 'Seplat Energy PLC', shares: 200, price: 1.85, value: 370, change: -1.2 },
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
            <p className="text-gray-600 mt-2">Detailed view of all your investments</p>
          </div>

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
              <p className="text-sm opacity-90">+{((totalGain / (userData?.initialInvestment || 1)) * 100).toFixed(2)}% return</p>
            </Card>

            <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-purple-600 to-purple-700 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold opacity-90">Number of Holdings</h3>
                <PieChart className="w-5 h-5" />
              </div>
              <div className="text-3xl font-bold mb-2">{holdings.length}</div>
              <p className="text-sm opacity-90">Diversified investments</p>
            </Card>
          </div>

          {/* Holdings Table */}
          <Card className="p-6 border-0 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Holdings</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Symbol</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Company Name</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Shares</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Price</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Value</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((holding, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-4 px-4 font-bold text-blue-600">{holding.symbol}</td>
                      <td className="py-4 px-4 text-gray-900">{holding.name}</td>
                      <td className="py-4 px-4 text-right text-gray-900">{holding.shares}</td>
                      <td className="py-4 px-4 text-right text-gray-900">GHS {holding.price.toFixed(2)}</td>
                      <td className="py-4 px-4 text-right font-semibold text-gray-900">GHS {holding.value.toFixed(2)}</td>
                      <td className={`py-4 px-4 text-right font-semibold ${holding.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {holding.change >= 0 ? '+' : ''}{holding.change.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Asset Allocation */}
          <Card className="p-6 border-0 shadow-lg mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Asset Allocation</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 font-medium">Stocks</span>
                      <span className="text-gray-900 font-bold">60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 font-medium">Bonds</span>
                      <span className="text-gray-900 font-bold">25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 font-medium">Real Estate</span>
                      <span className="text-gray-900 font-bold">10%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 font-medium">Cash</span>
                      <span className="text-gray-900 font-bold">5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Portfolio Strategy</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Your portfolio is diversified across multiple asset classes to balance growth potential with risk management.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✓ 60% in growth stocks for capital appreciation</li>
                  <li>✓ 25% in bonds for stability and income</li>
                  <li>✓ 10% in real estate for long-term value</li>
                  <li>✓ 5% in cash for liquidity</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
