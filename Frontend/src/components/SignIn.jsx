'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignIn({setLoggedIn, setUserEmail, setUsername}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setLoggedIn(true); // Assuming you have a state to manage login status
        setEmail(email); // Assuming the response contains user data
        setUsername(data.user.username); // ✅ correctly set username
        setUserEmail(email); // Set user email for future use
        console.log(data.user);
        alert('Login successful!')
        navigate('/dashboard')
      } else {
        alert(data.message || 'Login failed')
      }
    } catch (error) {
      console.error(error)
      alert('Server error')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Sign In</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}
