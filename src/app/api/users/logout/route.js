import { connect} from '@/dbConfig/dbConfig'
import { NextResponse } from 'next/server'

connect()

export const GET = async () => {
  try {
    // create response
    const response = NextResponse.json({
      message: 'Logout successful',
      succes: true
    })
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0)
    })
    return response
  } catch (error) {
    console.log('Error logging out: ', error)
    return NextResponse.json(
      {error: error.message},
      {status: 500}
    )
  }
}