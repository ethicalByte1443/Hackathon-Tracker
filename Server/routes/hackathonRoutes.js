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
// Create new hackathon
router.post('/', async (req, res) => {
  try {
    const {
      email,
      hackathon_name,
      hackathon_organiser,
      start_date,
      due_date,
    } = req.body;

    // Check for required fields
    if (!email || !hackathon_name || !hackathon_organiser || !start_date || !due_date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newHackathon = new HackathonEntry(req.body);
    await newHackathon.save();
    res.status(201).json(newHackathon);
  } catch (error) {
    console.error('❌ Error saving hackathon:', error.message);
    res.status(500).json({ message: 'Error adding hackathon', error: error.message });
  }
});


router.patch('/:id', async (req, res) => {
  try {
    const updated = await HackathonEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Hackathon not found' });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update hackathon' });
  }
});


export default router;