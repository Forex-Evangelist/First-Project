import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, initialInvestment, password, confirmPassword, agreeTerms } = body

    // Validation
    if (!firstName || !lastName || !email || !phone || !initialInvestment || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Password validation
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Investment validation
    const investmentAmount = parseFloat(initialInvestment)
    if (isNaN(investmentAmount) || investmentAmount < 50) {
      return NextResponse.json(
        { error: 'Minimum investment is GHS 50' },
        { status: 400 }
      )
    }

    // Terms validation
    if (!agreeTerms) {
      return NextResponse.json(
        { error: 'You must agree to the terms and conditions' },
        { status: 400 }
      )
    }

    // Generate user ID
    const userId = `WB${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Create user object
    const user = {
      id: userId,
      firstName,
      lastName,
      email,
      phone,
      initialInvestment: investmentAmount,
      createdAt: new Date().toISOString(),
      status: 'active'
    }

    console.log('New user created:', user)

    // Return success response with user data
    return NextResponse.json(
      {
        message: 'Account created successfully',
        user: user
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'An error occurred during signup' },
      { status: 500 }
    )
  }
}
