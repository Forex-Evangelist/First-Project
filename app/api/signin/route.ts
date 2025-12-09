import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
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

    // In a real application, you would:
    // 1. Query the database to find the user by email
    // 2. Verify the password hash
    // 3. Create a session/JWT token
    
    // For now, we'll create a mock user object
    const user = {
      id: `WB${Date.now()}`,
      email,
      firstName: 'User',
      lastName: 'Account',
      phone: '+233 000 000 000',
      initialInvestment: 0,
      createdAt: new Date().toISOString(),
      status: 'active'
    }

    console.log('User signed in:', user)

    // Return success response with user data
    return NextResponse.json(
      {
        message: 'Sign in successful',
        user: user
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Sign in error:', error)
    return NextResponse.json(
      { error: 'An error occurred during sign in' },
      { status: 500 }
    )
  }
}
