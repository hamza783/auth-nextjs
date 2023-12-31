import { connect} from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken'
import User from '@/models/userModel'
import { NextResponse } from 'next/server'

connect()

export const GET = async (request) => {
  try {
    const tokenData = getDataFromToken(request)
    const user = await User.findOne({ _id: tokenData?.id }).select('-password')
    return NextResponse.json({
      message: 'User found',
      data: user
    })
  } catch (error) {
    return NextResponse.json(
      {error: error.message},
      {status: 500}
    )
  }
}