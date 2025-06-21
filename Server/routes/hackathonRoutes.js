import express from 'express';
import HackathonEntry from '../models/HackathonEntry.js';
const router = express.Router();

// Fetch hackathons by email
router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    const query = email ? { email } : {};
    const hackathons = await HackathonEntry.find(query);
    res.json(hackathons);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch hackathons' });
  }
});

// Create new hackathon
router.post('/', async (req, res) => {
  try {
    const newHackathon = new HackathonEntry(req.body);
    await newHackathon.save();
    res.status(201).json(newHackathon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding hackathon' });
  }
});

export default router;