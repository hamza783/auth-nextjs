'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

const ProfilePage = () => {
  const router = useRouter()
  const [userId, setUserId] = useState(null)

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    console.log('res new: ', res)
    setUserId(res?.data?.data?._id)
  }

  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success('Logout success')
      router.push('/login')
    } catch (error) {
      console.log('Log out failed: ', error)
      toast.error(error?.message)
    } finally {
    }
  }

  // useEffect(() => {
  //   getUserDetails()
  // }, [])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2>
        {userId && (
          <Link
            className='p-1 rounded bg-green-500'
            href={`/profile/${userId}`}
          >
            {userId}
          </Link>
        )}
      </h2>
      <hr />
      <button
        className='bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={getUserDetails}
      >
        User profile
      </button>
      <button
        className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={logout}
      >
        Log out
      </button>
    </div>
  )
}

export default ProfilePage