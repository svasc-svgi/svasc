const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Staff = require('../models/staff.model');
const Department = require('../models/department.model');
const { parseStaffName } = require('../utils/staffParser');

const bcaStaffList = [
  { sNo: 1, name: "Dr. V. Suresh Kumar", qualification: "MCA., M.Phil., Ph.D." },
  { sNo: 2, name: "Mr. S. Kumaravel", qualification: "M.Sc., M.Phil., B.Ed., (Ph.D)" },
  { sNo: 3, name: "Mrs. B. Karthikeyani", qualification: "M.Sc., M.Phil., (Ph.D)" },
  { sNo: 4, name: "Mrs. C. Neevetha", qualification: "M.Sc., M.Phil." },
  { sNo: 5, name: "Mrs. G. Gowri Nithya", qualification: "MCA" },
  { sNo: 6, name: "Mrs. K. Sangeetha", qualification: "M. Sc., M. Tech., M. Phil." },
  { sNo: 7, name: "Mrs. T. MohanaPriya", qualification: "M.Sc., (Ph.D)" },
  { sNo: 8, name: "Ms. D. Sathyarubha", qualification: "M.Sc." },
  { sNo: 9, name: "Mr. D. Shyamsundar", qualification: "MCA., M.Phil." },
  { sNo: 10, name: "Ms. D. Usha Nandhini", qualification: "MCA" }
];

const bbaStaffList = [
  { sNo: 1, name: "Dr. P. RAJASEKAR", qualification: "MBA., M.COM., PGDCA., M.PHIL., PH.D." },
  { sNo: 2, name: "Ms. G. GURULAKSHMI", qualification: "MBA., (PH.D)" },
  { sNo: 3, name: "Mrs. H.S. PRABHASHANKAR", qualification: "MBA., (PH.D)" },
  { sNo: 4, name: "Mr. G. BALASUBRAMANIYAN", qualification: "MBA., M.COM(CA)., M.PHIL., (PH.D)." }
];

const phdTamilStaffList = [
  { sNo: 1, name: "Dr. P. Raman", qualification: "M.A., M.Phil., Ph.D. (Assistant Professor & Research Supervisor)" }
];

const seedStaff = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/svasc';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const toInsert = [];

    // 1. BCA staff -> BCA, B.Sc. IT, B.Sc. Cyber Security
    const compCourses = [
      'Bachelor of Computer Applications (BCA)',
      'B.Sc. Information Technology',
      'B.Sc. Cyber Security'
    ];

    for (const dept of compCourses) {
      for (const s of bcaStaffList) {
        toInsert.push({ ...s, department: dept });
      }
    }

    // 2. BBA staff -> BBA - Management Studies
    for (const s of bbaStaffList) {
      toInsert.push({ ...s, department: 'BBA - Management Studies' });
    }

    // 3. Ph.D. Tamil staff
    for (const s of phdTamilStaffList) {
      toInsert.push({ ...s, department: 'Ph.D. Tamil' });
    }

    let inserted = 0;
    let updated = 0;

    for (const item of toInsert) {
      const parsed = parseStaffName(item.name);
      const coreName = parsed.coreName;
      const initial = parsed.initial;
      let cleanCore = coreName.toLowerCase().replace(/[^a-z0-9\u0B80-\u0BFF]/g, '').replace(/j/g, 'ch');
      const cleanInit = initial.toLowerCase().replace(/[^a-z0-9\u0B80-\u0BFF]/g, '');
      const normalizedKey = cleanInit ? `${cleanCore}_${cleanInit}` : cleanCore;

      const existing = await Staff.findOne({
        fullName: item.name,
        department: item.department
      });

      if (!existing) {
        await Staff.create({
          fullName: item.name,
          coreName,
          initial,
          normalizedKey,
          qualification: item.qualification,
          designation: item.designation || 'Faculty',
          department: item.department,
          departments: [item.department],
          sNo: item.sNo
        });
        inserted++;
      } else {
        existing.qualification = item.qualification;
        existing.sNo = item.sNo;
        await existing.save();
        updated++;
      }
    }

    console.log(`Seeding complete: ${inserted} inserted, ${updated} updated`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seedStaff();
