import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, initialInvestment, password, confirmPassword, agreeTerms } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !initialInvestment || !password || !confirmPassword) {
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

    // Validate passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      )
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Validate minimum investment
    const investmentAmount = parseFloat(initialInvestment)
    if (investmentAmount < 50) {
      return NextResponse.json(
        { error: 'Minimum investment is GHS 50' },
        { status: 400 }
      )
    }

    // Validate terms agreement
    if (!agreeTerms) {
      return NextResponse.json(
        { error: 'You must agree to the terms and conditions' },
        { status: 400 }
      )
    }

    // Log the signup
    console.log('New signup:', { firstName, lastName, email, phone, initialInvestment })

    // In production, you would:
    // 1. Hash the password
    // 2. Store user in database
    // 3. Send verification email
    // 4. Create investment account

    return NextResponse.json(
      { 
        success: true, 
        message: 'Account created successfully! Welcome to Wealth Builders Ghana.',
        userId: `user_${Date.now()}`
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
  }
}
