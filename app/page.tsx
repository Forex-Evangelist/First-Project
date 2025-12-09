'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, TrendingUp, Shield, Users, Award, Phone, Mail, MapPin, CheckCircle2, Star, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  // State for FAQ accordion
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)
  
  // State for contact form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formMessage, setFormMessage] = useState('')

  // Testimonials data
  const testimonials = [
    {
      name: "Kwame Asante",
      role: "Business Owner",
      image: "👨‍💼",
      quote: "I started with just GHS 500 and now my portfolio has grown to over GHS 15,000. The team's guidance has been invaluable.",
      rating: 5
    },
    {
      name: "Ama Osei",
      role: "Teacher",
      image: "👩‍🏫",
      quote: "Finally, an investment platform I can trust. The quarterly reports are transparent and the returns have exceeded my expectations.",
      rating: 5
    },
    {
      name: "Kofi Mensah",
      role: "Entrepreneur",
      image: "👨‍💼",
      quote: "The low minimum investment of GHS 50 made it easy to start. Now I'm building wealth for my family's future.",
      rating: 5
    }
  ]

  // FAQ data
  const faqs = [
    {
      question: "What is the minimum investment amount?",
      answer: "You can start investing with as little as GHS 50. There's no large upfront capital required, making wealth building accessible to everyone."
    },
    {
      question: "How are my investments protected?",
      answer: "We are fully regulated by the Securities and Exchange Commission (SEC) Ghana. Your investments are protected by law, and we undergo annual audits to ensure compliance and security."
    },
    {
      question: "What are the average returns?",
      answer: "Our diversified portfolio has delivered average annual returns of 12-18% over the past 10 years. However, past performance does not guarantee future results. Returns vary based on market conditions and your investment strategy."
    },
    {
      question: "How often do I receive reports?",
      answer: "You receive detailed performance reports every quarter. You also have 24/7 access to your portfolio through our secure online platform to monitor your investments anytime."
    },
    {
      question: "Can I withdraw my money anytime?",
      answer: "Yes, you can withdraw your funds. Most withdrawals are processed within 5-7 business days. We recommend discussing your withdrawal strategy with our advisors to optimize your returns."
    },
    {
      question: "What fees do you charge?",
      answer: "We have a transparent fee structure with no hidden charges. Our management fee is typically 1-2% annually depending on your portfolio size. You'll know exactly what you're paying and why."
    },
    {
      question: "Do you offer personalized investment advice?",
      answer: "Absolutely! Our certified advisors will work with you to create a personalized investment strategy based on your goals, risk tolerance, and financial situation."
    },
    {
      question: "How do I get started?",
      answer: "Simply click 'Get Started' or contact us at +233 (0) 247 135 159 or ngilbert688@gmail.com. Our team will guide you through the account opening process, which takes about 15 minutes."
    }
  ]

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setFormStatus('success')
        setFormMessage(data.message)
        setFormData({ name: '', email: '', subject: '', message: '' })
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormStatus('idle')
          setFormMessage('')
        }, 3000)
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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
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
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition">About</a>
            <a href="#why-us" className="text-gray-600 hover:text-gray-900 transition">Why Us</a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition">Testimonials</a>
            <a href="#faq" className="text-gray-600 hover:text-gray-900 transition">FAQ</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 transition">Contact</a>
          </div>
          <Link href="/signup">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Grow Your Wealth with <span className="text-blue-600">Confidence</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Expert investment solutions designed specifically for Ghanaians. Build a secure financial future with transparent returns and professional guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg h-12">
                    Start Investing Today <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-lg h-12 border-gray-300">
                  Learn More
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                ✓ Trusted by 5,000+ Ghanaian investors • ✓ GHS 250M+ Assets Under Management
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur-3xl opacity-20"></div>
              <Image
                src="/images/logo.png"
                alt="Investment Growth"
                width={400}
                height={400}
                className="relative w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Wealth Builders Ghana</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to making wealth creation accessible to every Ghanaian through transparent, professional investment management.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Certified Professionals</h3>
              <p className="text-gray-600">
                Our team consists of licensed investment advisors with 15+ years of experience in African markets.
              </p>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Regulated</h3>
              <p className="text-gray-600">
                Fully compliant with SEC Ghana regulations. Your investments are protected and audited annually.
              </p>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Proven Returns</h3>
              <p className="text-gray-600">
                Average annual returns of 12-18% across our diversified portfolio. Transparent reporting every quarter.
              </p>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-white">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg leading-relaxed">
              To empower Ghanaians with accessible, transparent, and professional investment solutions that build generational wealth. We believe every Ghanaian deserves the opportunity to grow their money with confidence and expert guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">Why Choose Wealth Builders?</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Transparent Fee Structure</h3>
                  <p className="text-gray-600">No hidden charges. You know exactly what you're paying and why.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Personalized Strategy</h3>
                  <p className="text-gray-600">Custom investment plans tailored to your goals and risk tolerance.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Expert Guidance</h3>
                  <p className="text-gray-600">Direct access to experienced advisors who understand the Ghanaian market.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Quarterly Reports</h3>
                  <p className="text-gray-600">Detailed performance reports and market insights delivered every quarter.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Diversified Portfolio</h3>
                  <p className="text-gray-600">Spread across stocks, bonds, real estate, and alternative investments.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Ultra-Low Minimum</h3>
                  <p className="text-gray-600">Start with as little as GHS 50. Wealth building is now accessible to everyone.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">24/7 Online Access</h3>
                  <p className="text-gray-600">Monitor your portfolio anytime, anywhere through our secure platform.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Dedicated Support</h3>
                  <p className="text-gray-600">Our team is available to answer questions and provide guidance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">What Our Investors Say</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">5,000+</div>
              <p className="text-blue-100">Active Investors</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">GHS 250M+</div>
              <p className="text-blue-100">Assets Managed</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">15%</div>
              <p className="text-blue-100">Average Annual Return</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10+</div>
              <p className="text-blue-100">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-4">
                    <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <h3 className="text-lg font-bold text-gray-900 text-left">{faq.question}</h3>
                  </div>
                  <span className={`text-2xl text-gray-600 transition ${openFAQ === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {openFAQ === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Ready to Start Your Investment Journey?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of Ghanaians who are building wealth with Wealth Builders. Start with as little as GHS 50.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg h-12 px-8">
              Open Your Account Today <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">Get In Touch</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 border-0 shadow-lg text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Office Location</h3>
              <p className="text-gray-600">
                Sunyani, Ghana
              </p>
            </Card>

            <Card className="p-8 border-0 shadow-lg text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Phone</h3>
              <a href="tel:+233247135159" className="text-blue-600 hover:text-blue-700 font-semibold">
                +233 (0) 247 135 159
              </a>
            </Card>

            <Card className="p-8 border-0 shadow-lg text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
              <a href="mailto:ngilbert688@gmail.com" className="text-blue-600 hover:text-blue-700 font-semibold">
                ngilbert688@gmail.com
              </a>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-12 border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Send us a Message</h3>
            <p className="text-gray-600 mb-6">
              Have questions? Our team is ready to help. Fill out the form below and we'll get back to you within 24 hours.
            </p>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              ></textarea>
              
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
              
              <Button 
                type="submit"
                disabled={formStatus === 'loading'}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12"
              >
                {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
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
                <li><a href="#about" className="hover:text-white transition">About Us</a></li>
                <li><a href="#testimonials" className="hover:text-white transition">Testimonials</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
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
