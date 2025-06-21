// routes/userRoutes.js
import express from 'express'
import User from '../models/User.js'

const router = express.Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body



  try {
    const user = await User.findOne({ email })
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    console.log(req.body);
    res.status(200).json({ message: 'Login successful', user })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// POST /api/users/register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body // FIXED: use username here

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Create new user
    const newUser = new User({ username, email, password }) // FIXED: username
    await newUser.save()

    res.status(201).json({ message: 'User registered successfully', user: newUser })
  } catch (error) {
    console.error(error)
    console.log('req.body:', req.body)
    res.status(500).json({ message: 'Server error' })
  }
})


export default router
