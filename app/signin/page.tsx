'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, CheckCircle2, Lock, Mail } from 'lucide-react'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formMessage, setFormMessage] = useState('')

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Client-side validation
    if (!email.trim()) {
      setFormStatus('error')
      setFormMessage('Email is required')
      return
    }

    if (!password) {
      setFormStatus('error')
      setFormMessage('Password is required')
      return
    }

    setFormStatus('loading')

    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      const data = await response.json()

      if (response.ok) {
        setFormStatus('success')
        setFormMessage('Sign in successful! Redirecting to your dashboard...')
        
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
        setFormMessage(data.error || 'Failed to sign in')
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
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          <Card className="p-8 border-0 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600 mb-6">Sign in to your Wealth Builders account</p>

            <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4">
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600" />
                  Remember me
                </label>
                <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
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
                {formStatus === 'loading' ? 'Signing In...' : 'Sign In'}
              </Button>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-gray-600 mt-4">
                Don't have an account? <Link href="/signup" className="text-blue-600 hover:underline font-semibold">Create one</Link>
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
  )
}
