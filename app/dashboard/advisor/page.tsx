'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Phone, Mail, MapPin, Calendar, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { useState, useRef } from 'react'

export default function AdvisorPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formMessage, setFormMessage] = useState('')

  const advisors = [
    {
      name: 'Kwame Mensah',
      title: 'Senior Investment Advisor',
      experience: '15+ years',
      specialization: 'Portfolio Management',
      phone: '+233 (0) 247 135 159',
      email: 'kwame@wealthbuilders.com',
      image: '👨‍💼'
    },
    {
      name: 'Ama Osei',
      title: 'Financial Planning Specialist',
      experience: '12+ years',
      specialization: 'Wealth Planning',
      phone: '+233 (0) 247 135 160',
      email: 'ama@wealthbuilders.com',
      image: '👩‍💼'
    },
    {
      name: 'Kofi Asante',
      title: 'Investment Analyst',
      experience: '8+ years',
      specialization: 'Market Analysis',
      phone: '+233 (0) 247 135 161',
      email: 'kofi@wealthbuilders.com',
      image: '👨‍💼'
    }
  ]

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string

    if (!name.trim() || !email.trim() || !phone.trim() || !subject.trim() || !message.trim()) {
      setFormStatus('error')
      setFormMessage('Please fill in all fields')
      return
    }

    setFormStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject,
          message
        })
      })

      const data = await response.json()

      if (response.ok) {
        setFormStatus('success')
        setFormMessage('Your message has been sent! An advisor will contact you shortly.')
        if (formRef.current) {
          formRef.current.reset()
        }
        setTimeout(() => {
          setFormStatus('idle')
          setFormMessage('')
        }, 5000)
      } else {
        setFormStatus('error')
        setFormMessage(data.error || 'Failed to send message')
      }
    } catch (error) {
      setFormStatus('error')
      setFormMessage('An error occurred. Please try again.')
    }
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
            <h1 className="text-3xl font-bold text-gray-900">Contact Our Advisors</h1>
            <p className="text-gray-600 mt-2">Get personalized investment guidance from our expert team</p>
          </div>

          {/* Advisors Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {advisors.map((advisor, index) => (
              <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition">
                <div className="text-5xl mb-4">{advisor.image}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{advisor.name}</h3>
                <p className="text-blue-600 font-semibold text-sm mb-2">{advisor.title}</p>
                <p className="text-gray-600 text-sm mb-4">{advisor.experience} experience</p>
                <p className="text-gray-700 text-sm mb-4 pb-4 border-b border-gray-200">
                  <span className="font-semibold">Specialization:</span> {advisor.specialization}
                </p>
                <div className="space-y-3">
                  <a href={`tel:${advisor.phone}`} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{advisor.phone}</span>
                  </a>
                  <a href={`mailto:${advisor.email}`} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{advisor.email}</span>
                  </a>
                </div>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <Card className="p-8 border-0 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule a Consultation</h2>
            <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+233 000 000 000"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="What would you like to discuss?"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us about your investment goals and concerns..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                ></textarea>
              </div>

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

              <Button
                type="submit"
                disabled={formStatus === 'loading'}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 text-base"
              >
                {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-0 shadow-lg text-center">
              <Phone className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm mb-3">+233 (0) 247 135 159</p>
              <p className="text-gray-500 text-xs">Monday - Friday, 9AM - 5PM</p>
            </Card>

            <Card className="p-6 border-0 shadow-lg text-center">
              <Mail className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm mb-3">ngilbert688@gmail.com</p>
              <p className="text-gray-500 text-xs">We'll respond within 24 hours</p>
            </Card>

            <Card className="p-6 border-0 shadow-lg text-center">
              <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600 text-sm mb-3">Sunyani, Ghana</p>
              <p className="text-gray-500 text-xs">By appointment</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
