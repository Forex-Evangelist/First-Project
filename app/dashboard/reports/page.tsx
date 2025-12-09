'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Download, TrendingUp, Calendar, FileText } from 'lucide-react'
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

export default function ReportsPage() {
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
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    )
  }

  const reports = [
    {
      title: 'Q4 2024 Performance Report',
      date: 'December 9, 2024',
      type: 'Quarterly',
      status: 'Available',
      highlights: [
        'Portfolio Growth: +25%',
        'Total Gain: GHS 12.50',
        'Best Performing Asset: Stocks (+5.2%)',
        'Risk Assessment: Low'
      ]
    },
    {
      title: 'Q3 2024 Performance Report',
      date: 'September 9, 2024',
      type: 'Quarterly',
      status: 'Available',
      highlights: [
        'Portfolio Growth: +18%',
        'Total Gain: GHS 9.00',
        'Best Performing Asset: Bonds (+4.1%)',
        'Risk Assessment: Low'
      ]
    },
    {
      title: 'Q2 2024 Performance Report',
      date: 'June 9, 2024',
      type: 'Quarterly',
      status: 'Available',
      highlights: [
        'Portfolio Growth: +12%',
        'Total Gain: GHS 6.00',
        'Best Performing Asset: Real Estate (+3.5%)',
        'Risk Assessment: Low'
      ]
    },
    {
      title: 'Q1 2024 Performance Report',
      date: 'March 9, 2024',
      type: 'Quarterly',
      status: 'Available',
      highlights: [
        'Portfolio Growth: +8%',
        'Total Gain: GHS 4.00',
        'Best Performing Asset: Stocks (+2.8%)',
        'Risk Assessment: Low'
      ]
    }
  ]

  const yearlyReports = [
    {
      title: '2024 Annual Report',
      date: 'December 31, 2024',
      type: 'Annual',
      status: 'Available',
      highlights: [
        'Year-to-Date Return: +25%',
        'Total Contributions: GHS 50.00',
        'Total Earnings: GHS 12.50',
        'Account Performance: Excellent'
      ]
    },
    {
      title: '2023 Annual Report',
      date: 'December 31, 2023',
      type: 'Annual',
      status: 'Available',
      highlights: [
        'Year-to-Date Return: +18%',
        'Total Contributions: GHS 0.00',
        'Total Earnings: GHS 0.00',
        'Account Performance: N/A'
      ]
    }
  ]

  const handleDownload = (reportTitle: string) => {
    alert(`Downloading: ${reportTitle}\n\nThis would download the PDF report to your device.`)
  }

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
            <h1 className="text-3xl font-bold text-gray-900">Investment Reports</h1>
            <p className="text-gray-600 mt-2">View and download your detailed performance reports</p>
          </div>

          {/* Annual Reports */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Annual Reports</h2>
            <div className="space-y-4">
              {yearlyReports.map((report, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <FileText className="w-6 h-6 text-blue-600" />
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{report.title}</h3>
                          <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                            <Calendar className="w-4 h-4" />
                            {report.date}
                          </p>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        {report.highlights.map((highlight, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0" />
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(report.title)}
                      className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition flex items-center gap-2 flex-shrink-0"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Quarterly Reports */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quarterly Reports</h2>
            <div className="space-y-4">
              {reports.map((report, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <FileText className="w-6 h-6 text-green-600" />
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{report.title}</h3>
                          <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                            <Calendar className="w-4 h-4" />
                            {report.date}
                          </p>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        {report.highlights.map((highlight, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0" />
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(report.title)}
                      className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition flex items-center gap-2 flex-shrink-0"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Report Information */}
          <Card className="p-6 border-0 shadow-lg mt-12 bg-blue-50 border border-blue-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">About Your Reports</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>✓ <span className="font-semibold">Quarterly Reports:</span> Detailed performance analysis every 3 months</li>
              <li>✓ <span className="font-semibold">Annual Reports:</span> Comprehensive year-end summary and tax information</li>
              <li>✓ <span className="font-semibold">Transparency:</span> All reports include detailed breakdowns of your holdings and performance</li>
              <li>✓ <span className="font-semibold">Tax Documents:</span> Annual reports include information for tax filing purposes</li>
              <li>✓ <span className="font-semibold">Historical Data:</span> Access all past reports anytime from your dashboard</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
