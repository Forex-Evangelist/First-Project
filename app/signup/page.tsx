'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, CheckCircle2, Lock, Mail, User, Phone, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    initialInvestment: '50',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  })

  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formMessage, setFormMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setFormStatus('error')
      setFormMessage('Passwords do not match')
      return
    }

    // Validate terms agreement
    if (!formData.agreeTerms) {
      setFormStatus('error')
      setFormMessage('You must agree to the terms and conditions')
      return
    }

    setFormStatus('loading')

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setFormStatus('success')
        setFormMessage('Account created successfully! Redirecting to dashboard...')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          initialInvestment: '50',
          password: '',
          confirmPassword: '',
          agreeTerms: false
        })
        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = '/'
        }, 2000)
      } else {
        setFormStatus('error')
        setFormMessage(data.error || 'Failed to create account')
      }
    } catch (error) {
      setFormStatus('error')
      setFormMessage('An error occurred. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
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
            <Button variant="outline" className="border-gray-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Side - Benefits */}
            <div className="hidden md:block">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">
                Start Your Wealth Building Journey Today
              </h1>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Ultra-Low Minimum</h3>
                    <p className="text-gray-600">Start with just GHS 50. No large upfront capital needed.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Secure & Regulated</h3>
                    <p className="text-gray-600">SEC Ghana regulated. Your investments are fully protected.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Expert Guidance</h3>
                    <p className="text-gray-600">Access to certified advisors with 15+ years experience.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Proven Returns</h3>
                    <p className="text-gray-600">Average annual returns of 12-18% on diversified portfolio.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">24/7 Access</h3>
                    <p className="text-gray-600">Monitor your portfolio anytime, anywhere online.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-blue-100 rounded-lg border border-blue-200">
                <p className="text-blue-900 font-semibold">
                  ✓ Join 5,000+ Ghanaian investors
                </p>
                <p className="text-blue-900 font-semibold">
                  ✓ GHS 250M+ Assets Under Management
                </p>
              </div>
            </div>

            {/* Right Side - Sign Up Form */}
            <div>
              <Card className="p-8 border-0 shadow-xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
                <p className="text-gray-600 mb-8">Join Wealth Builders Ghana in 5 minutes</p>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+233 (0) 247 135 159"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  {/* Initial Investment */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Initial Investment (GHS)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        name="initialInvestment"
                        placeholder="50"
                        value={formData.initialInvestment}
                        onChange={handleInputChange}
                        min="50"
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Minimum: GHS 50</p>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600 mt-1"
                    />
                    <label className="text-sm text-gray-600">
                      I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                    </label>
                  </div>

                  {/* Status Messages */}
                  {formStatus === 'success' && (
                    <div className="p-4 bg-green-100 border border-green-300 rounded-lg text-green-800">
                      ✓ {formMessage}
                    </div>
                  )}

                  {formStatus === 'error' && (
                    <div className="p-4 bg-red-100 border border-red-300 rounded-lg text-red-800">
                      ✗ {formMessage}
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12 font-semibold"
                  >
                    {formStatus === 'loading' ? 'Creating Account...' : 'Create Account'}
                  </Button>

                  {/* Login Link */}
                  <p className="text-center text-gray-600 text-sm">
                    Already have an account? <a href="#" className="text-blue-600 hover:underline font-semibold">Sign In</a>
                  </p>
                </form>
              </Card>

              {/* Security Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Your data is encrypted and secure. We never share your information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/images/logo.png"
                  alt="Wealth Builders Ghana"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <span className="font-bold text-white">Wealth Builders</span>
              </div>
              <p className="text-sm">Building generational wealth for Ghanaians.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li><a href="/#about" className="hover:text-white transition">About Us</a></li>
                <li><a href="/#contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Disclaimer</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>Sunyani, Ghana</li>
                <li>+233 (0) 247 135 159</li>
                <li>ngilbert688@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 Wealth Builders Ghana. All rights reserved. | Regulated by SEC Ghana</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
