import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Log the submission
    console.log('Contact form submission:', { name, email, subject, message })

    // In production, integrate with Resend or SendGrid:
    // const response = await resend.emails.send({
    //   from: 'noreply@wealthbuilders.com',
    //   to: 'ngilbert688@gmail.com',
    //   subject: `New Contact Form: ${subject}`,
    //   html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`
    // })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We will get back to you within 24 hours.' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    )
  }
}
