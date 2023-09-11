import { connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

connect()

export const POST = async (request) => {
  try {
    const reqBody = await request.json()
    const { username, email, password } = reqBody
    
    const user = await User.findOne({email})
    if (user) {
      return NextResponse.json(
        {error: 'User already exists'},
        {status: 400}
      )
    }

    // hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    // create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })
    const savedUser = await newUser.save()

    return NextResponse.json({
      message: 'User created successfully',
      succes: true,
      user: savedUser
    })
  } catch (error) {
    return NextResponse.json(
      {error: error.message},
      {status: 500}
    )
  }
}