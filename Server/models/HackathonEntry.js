import mongoose from 'mongoose';

const hackathonSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  hackathon_name: {
    type: String,
    required: true,
  },
  hackathon_organiser: {
    type: String,
    required: true,
  },
  description: String,
  registration_date: Date,
  start_date: Date,
  due_date: Date,
  project_link_git: String,
  current_phase: {
    type: String,
    enum: ['Ideation', 'Development', 'Testing', 'Submitted', 'Completed'],
    default: 'Ideation',
  },
  team_member_number: {
    type: Number,
    default: 1,
  },
  team_member_names: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
});

const HackathonEntry = mongoose.model('HackathonEntry', hackathonSchema);
export default HackathonEntry;
