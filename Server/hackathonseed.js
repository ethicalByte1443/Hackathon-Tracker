// seedHackathons.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import HackathonEntry from './models/HackathonEntry.js';

dotenv.config();

const dummyHackathons = [
  {
    email: 'john@example.com',
    hackathon_name: 'AI Innovators Hackathon',
    hackathon_organiser: 'TechNext',
    description: 'Create AI solutions to automate daily tasks.',
    registration_date: new Date('2025-04-10'),
    start_date: new Date('2025-04-20'),
    due_date: new Date('2025-05-20'),
    project_link_git: 'https://github.com/john/ai-innovator',
    current_phase: 'Development',
    team_member_number: 3,
    team_member_names: ['John', 'Mike', 'Sarah'],
  },
  {
    email: 'jane@example.com',
    hackathon_name: 'Green Planet Hack',
    hackathon_organiser: 'EcoWorld',
    description: 'Build a tool to track personal carbon emissions.',
    registration_date: new Date('2025-03-15'),
    start_date: new Date('2025-03-25'),
    due_date: new Date('2025-04-30'),
    project_link_git: 'https://github.com/jane/green-hack',
    current_phase: 'Testing',
    team_member_number: 2,
    team_member_names: ['Jane', 'Leo'],
  },
  {
    email: 'rohan.kumar@example.com',
    hackathon_name: 'Code Sprint 2.0',
    hackathon_organiser: 'CodeBase',
    description: 'Speed coding challenge with real-world tasks.',
    registration_date: new Date('2025-02-01'),
    start_date: new Date('2025-02-10'),
    due_date: new Date('2025-03-10'),
    project_link_git: 'https://github.com/rohan/code-sprint',
    current_phase: 'Submitted',
    team_member_number: 1,
    team_member_names: ['Rohan Kumar'],
  },
  {
    email: 'alice.b@example.com',
    hackathon_name: 'Women in Tech Hackathon',
    hackathon_organiser: 'SheCodes',
    description: 'Innovate for inclusivity in tech.',
    registration_date: new Date('2025-05-01'),
    start_date: new Date('2025-05-10'),
    due_date: new Date('2025-06-01'),
    project_link_git: 'https://github.com/aliceb/shetech',
    current_phase: 'Completed',
    team_member_number: 4,
    team_member_names: ['Alice', 'Nina', 'Tina', 'Grace'],
  },
  {
    email: 'bob@example.com',
    hackathon_name: 'Hack the Health',
    hackathon_organiser: 'HealthHack',
    description: 'Build a fitness and habit tracker app.',
    registration_date: new Date('2025-06-01'),
    start_date: new Date('2025-06-05'),
    due_date: new Date('2025-07-01'),
    project_link_git: 'https://github.com/bob/health-tracker',
    current_phase: 'Ideation',
    team_member_number: 3,
    team_member_names: ['Bob', 'Kevin', 'Terry'],
  },
  {
    email: 'aseem@gmail.com',
    hackathon_name: 'Smart City Challenge',
    hackathon_organiser: 'Gov of India',
    description: 'AI-based urban innovation challenge.',
    registration_date: new Date('2025-06-01'),
    start_date: new Date('2025-06-15'),
    due_date: new Date('2025-07-15'),
    project_link_git: 'https://github.com/aseem/smartcity-solution',
    current_phase: 'Development',
    team_member_number: 3,
    team_member_names: ['Aseem', 'Rohit', 'Neha'],
  },
  {
    email: 'aseem@gmail.com',
    hackathon_name: 'HackForFood',
    hackathon_organiser: 'FoodTech Labs',
    description: 'Healthy food recognition app.',
    registration_date: new Date('2025-05-10'),
    start_date: new Date('2025-05-20'),
    due_date: new Date('2025-06-10'),
    project_link_git: 'https://github.com/aseem/food-ai',
    current_phase: 'Testing',
    team_member_number: 2,
    team_member_names: ['Aseem', 'Priya'],
  },
  {
    email: 'aseem@gmail.com',
    hackathon_name: 'GreenTech Hack',
    hackathon_organiser: 'EcoCoders',
    description: 'Tools to monitor carbon emissions.',
    registration_date: new Date('2025-04-01'),
    start_date: new Date('2025-04-10'),
    due_date: new Date('2025-05-05'),
    project_link_git: 'https://github.com/aseem/greentech-dashboard',
    current_phase: 'Completed',
    team_member_number: 4,
    team_member_names: ['Aseem', 'Divya', 'Ravi', 'Sneha'],
  },
];

const seedHackathons = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await HackathonEntry.deleteMany(); // Optional: reset
    await HackathonEntry.insertMany(dummyHackathons);

    console.log('✅ Dummy hackathon entries seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding data:', err);
    process.exit(1);
  }
};

seedHackathons();
