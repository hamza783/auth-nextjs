'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const SignupPage = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  })
  const [buttonDisabled, setButtonDisabld] = useState(true)
  const [loading, setLoading] = useState(false)

  const onSignup = async () => {
    console.log('trying to sign up', user)
    try {
      setLoading(true)
      const response = await axios.post('/api/users/signup', user)
      console.log('response', response?.data)
      router.push('/login')
    } catch (error) {
      console.log('Signup failed: ', error)
      toast.error(error?.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user?.email?.length > 0 && user?.username?.length > 0 && user?.password?.length > 0) {
      setButtonDisabld(false)
      return
    }

    setButtonDisabld(true)
  }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Signup</h1>
      <hr />
      <label htmlFor='username'>Username</label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        id='username'
        type='text'
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder='username'
      />
      <label htmlFor='email'>Email</label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        id='email'
        type='text'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='email'
      />
      <label htmlFor='password'>password</label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        id='password'
        type='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='password'
      />
      <button
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        onClick={onSignup}
        disabled={buttonDisabled || loading}
        style={{ backgroundColor: buttonDisabled ? 'gray' : 'lightgreen' }}
      >
        {loading ? 'Processing....' : 'Signup here'}
      </button>
      <Link href='/login'>Visit login</Link>
    </div>
  )
}

export default SignupPage