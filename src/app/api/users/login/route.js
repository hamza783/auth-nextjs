import { connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export const POST = async (request) => {
  try {
    const reqBody = await request.json()
    const { email, password } = reqBody
    
    const user = await User.findOne({email})
    if (!user) {
      return NextResponse.json(
        {error: 'User with these credentials does not exist'},
        {status: 400}
      )
    }

    // validate password
    const validatePassword = await bcryptjs.compare(password, user.password)
    if (!validatePassword) {
      return NextResponse.json(
        {error: 'User with these credentials does not exist'},
        {status: 400}
      )
    }

    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    }

    // create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: '1hr'})

    // create response
    const response = NextResponse.json({
      message: 'Login successful',
      succes: true,
      user: user
    })
    response.cookies.set("token", token, {
      httpOnly: true
    })
    return response
  } catch (error) {
    console.log('ERORR: ', error)
    return NextResponse.json(
      {error: error.message},
      {status: 500}
    )
  }
}