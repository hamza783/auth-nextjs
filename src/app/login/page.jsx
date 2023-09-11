'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const LoginPage = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [buttonDisabled, setButtonDisabld] = useState(true)
  const [loading, setLoading] = useState(false)

  const onLogin = async () => {
    console.log('trying to login', user)
    try {
      setLoading(true)
      const response = await axios.post('/api/users/login', user)
      console.log('response', response?.data)
      toast.success('Login success')
      router.push('/profile')
    } catch (error) {
      console.log('Login failed: ', error)
      toast.error(error?.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user?.email?.length > 0 && user?.password?.length > 0) {
      setButtonDisabld(false)
      return
    }

    setButtonDisabld(true)
  }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Login</h1>
      <hr />
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
        onClick={onLogin}
        disabled={buttonDisabled || loading}
        style={{ backgroundColor: buttonDisabled ? 'gray' : 'blue', color: 'white' }}
      >
       {loading ? 'Processing....' : 'Login'}
      </button>
      <Link href='/signup'>Visit Signup</Link>
    </div>
  )
}

export default LoginPage