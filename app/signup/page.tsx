'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, CheckCircle2, Lock, Mail, User, Phone, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formMessage, setFormMessage] = useState('')

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const initialInvestment = formData.get('initialInvestment') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    const agreeTerms = formData.get('agreeTerms') === 'on'

    // Client-side validation
    if (!firstName.trim()) {
      setFormStatus('error')
      setFormMessage('First name is required')
      return
    }

    if (!lastName.trim()) {
      setFormStatus('error')
      setFormMessage('Last name is required')
      return
    }

    if (!email.trim()) {
      setFormStatus('error')
      setFormMessage('Email is required')
      return
    }

    if (!phone.trim()) {
      setFormStatus('error')
      setFormMessage('Phone number is required')
      return
    }

    if (!password) {
      setFormStatus('error')
      setFormMessage('Password is required')
      return
    }

    if (!confirmPassword) {
      setFormStatus('error')
      setFormMessage('Please confirm your password')
      return
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      setFormStatus('error')
      setFormMessage('Passwords do not match')
      return
    }

    // Validate terms agreement
    if (!agreeTerms) {
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
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          initialInvestment: parseFloat(initialInvestment),
          password,
          confirmPassword,
          agreeTerms
        })
      })

      const data = await response.json()

      if (response.ok) {
        setFormStatus('success')
        setFormMessage('Account created successfully! Redirecting to your dashboard...')
        
        // Store user data in localStorage
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user))
        }
        
        // Reset form
        if (formRef.current) {
          formRef.current.reset()
        }
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push('/dashboard')
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
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Benefits */}
            <div className="hidden md:block">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">
                Start Your Investment Journey Today
              </h1>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-green-600 mt-1" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Low Minimum Investment</h3>
                    <p className="text-gray-600">Start with as little as GHS 50. No large upfront capital required.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-green-600 mt-1" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Expert Management</h3>
                    <p className="text-gray-600">Your portfolio managed by certified investment professionals with 15+ years experience.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-green-600 mt-1" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Transparent Returns</h3>
                    <p className="text-gray-600">Average annual returns of 12-18%. Detailed quarterly reports on your performance.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-green-600 mt-1" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Fully Regulated</h3>
                    <p className="text-gray-600">SEC Ghana regulated. Your investments are protected and audited annually.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-green-600 mt-1" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">24/7 Access</h3>
                    <p className="text-gray-600">Monitor your portfolio anytime, anywhere through our secure online platform.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700">
                  <span className="font-bold text-blue-600">Join 5,000+ Ghanaian investors</span> who are building wealth with Wealth Builders Ghana.
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <Card className="p-8 border-0 shadow-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h2>
                <p className="text-gray-600 mb-6">Join thousands of Ghanaians building wealth</p>

                <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="John"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="+233 247 135 159"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  {/* Initial Investment */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      <DollarSign className="w-4 h-4 inline mr-2" />
                      Initial Investment (GHS)
                    </label>
                    <input
                      type="number"
                      name="initialInvestment"
                      placeholder="50"
                      defaultValue="50"
                      min="50"
                      step="10"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">Minimum: GHS 50</p>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      <Lock className="w-4 h-4 inline mr-2" />
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      <Lock className="w-4 h-4 inline mr-2" />
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600 mt-1"
                    />
                    <label className="text-sm text-gray-600">
                      I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                    </label>
                  </div>

                  {/* Status Messages */}
                  {formStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-green-800 text-sm">{formMessage}</p>
                    </div>
                  )}

                  {formStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm">{formMessage}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 text-base mt-6"
                  >
                    {formStatus === 'loading' ? 'Creating Account...' : 'Create Account'}
                  </Button>

                  {/* Login Link */}
                  <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account? <Link href="/signin" className="text-blue-600 hover:underline font-semibold">Sign In</Link>
                  </p>
                </form>
              </Card>

              {/* Security Note */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
                <p className="text-xs text-gray-700">
                  🔒 Your information is secure and encrypted. We never share your data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
