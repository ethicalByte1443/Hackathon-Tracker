// seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const users = [
  {
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123',
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
    password: 'mypassword456',
  },
  {
    username: 'rohan_kumar',
    email: 'rohan.kumar@example.com',
    password: 'securePass789',
  },
  {
    username: 'alice_b',
    email: 'alice.b@example.com',
    password: 'alicePwd321',
  },
  {
    username: 'bob_dev',
    email: 'bob@example.com',
    password: 'bobPassword001',
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany();
    await User.insertMany(users);
    console.log('Database seeded!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
