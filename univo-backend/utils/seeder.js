require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Subject = require('../models/Subject');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('DB Connected for seeding...');
};

const seed = async () => {
  await connectDB();

  // Clear existing data
  await User.deleteMany({});
  await Subject.deleteMany({});

  // Create users
  const users = await User.create([
    {
      name: 'Admin User',
      email: 'admin@univo.edu',
      password: 'Admin@123',
      role: 'admin',
      branch: 'Administration',
    },
    {
      name: 'Dr. Sarah Williams',
      email: 'hod.cs@univo.edu',
      password: 'Hod@123',
      role: 'hod',
      branch: 'Computer Science',
      department: 'Computer Science',
    },
    {
      name: 'Prof. Michael Chen',
      email: 'faculty.cs1@univo.edu',
      password: 'Faculty@123',
      role: 'faculty',
      branch: 'Computer Science',
      department: 'Computer Science',
    },
    {
      name: 'Prof. Emily Rodriguez',
      email: 'faculty.cs2@univo.edu',
      password: 'Faculty@123',
      role: 'faculty',
      branch: 'Computer Science',
      department: 'Computer Science',
    },
    {
      name: 'Coordinator Alex',
      email: 'coordinator@univo.edu',
      password: 'Coord@123',
      role: 'coordinator',
      branch: 'Computer Science',
    },
    {
      name: 'M. Anantha',
      email: '23p31a05j4@univo.edu',
      password: 'Student@123',
      role: 'student',
      branch: 'Computer Science',
      year: 3,
      rollNumber: '23P31A05J4',
      section: 'A',
    },
    {
      name: 'Ravi Kumar',
      email: 'ravi.kumar@univo.edu',
      password: 'Student@123',
      role: 'student',
      branch: 'Computer Science',
      year: 3,
      rollNumber: '23P31A05J5',
      section: 'A',
    },
  ]);

  const faculty1 = users.find((u) => u.email === 'faculty.cs1@univo.edu');
  const faculty2 = users.find((u) => u.email === 'faculty.cs2@univo.edu');

  // Create subjects
  await Subject.create([
    {
      name: 'Data Structures and Algorithms',
      code: 'CS301',
      branch: 'Computer Science',
      year: 3,
      semester: 5,
      credits: 4,
      faculty: faculty1._id,
    },
    {
      name: 'Database Management Systems',
      code: 'CS302',
      branch: 'Computer Science',
      year: 3,
      semester: 5,
      credits: 4,
      faculty: faculty2._id,
    },
    {
      name: 'Operating Systems',
      code: 'CS303',
      branch: 'Computer Science',
      year: 3,
      semester: 5,
      credits: 3,
      faculty: faculty1._id,
    },
  ]);

  console.log('✅ Seeding complete!\n');
  console.log('📋 Test Credentials:');
  console.log('  Admin    → admin@univo.edu / Admin@123');
  console.log('  HOD      → hod.cs@univo.edu / Hod@123');
  console.log('  Faculty  → faculty.cs1@univo.edu / Faculty@123');
  console.log('  Student  → 23p31a05j4@univo.edu / Student@123');
  console.log('  Coord.   → coordinator@univo.edu / Coord@123');

  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
