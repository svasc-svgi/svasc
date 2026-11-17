const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Staff = require('../models/staff.model');
const { parseStaffName } = require('../utils/staffParser');

const seedStaff = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/svasc';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const dataPath = path.join(__dirname, '../data/facultyProfiles.json');
    if (!fs.existsSync(dataPath)) {
      console.error('facultyProfiles.json not found at:', dataPath);
      process.exit(1);
    }

    const profiles = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    console.log(`Loaded ${profiles.length} faculty profiles from file.`);

    let inserted = 0;
    let updated = 0;

    for (const item of profiles) {
      const rawName = item.fullName || '';
      const parsed = parseStaffName(rawName);
      const coreName = parsed.coreName;
      const initial = item.initial || parsed.initial;

      let cleanCore = coreName.toLowerCase().replace(/[^a-z0-9\u0B80-\u0BFF]/g, '').replace(/j/g, 'ch');
      const cleanInit = initial.toLowerCase().replace(/[^a-z0-9\u0B80-\u0BFF]/g, '');
      const normalizedKey = cleanInit ? `${cleanCore}_${cleanInit}` : cleanCore;

      const existing = await Staff.findOne({
        fullName: rawName,
        department: item.department
      });

      const staffPayload = {
        fullName: rawName,
        coreName,
        initial,
        normalizedKey,
        qualification: item.qualification || '',
        designation: item.designation || 'Assistant Professor',
        department: item.department,
        departments: item.departments || [item.department],
        photo: item.photo || '',
        sNo: item.sNo || 0,
        contactNo: item.contactNo || '',
        email: item.email || '',
        education: item.education || {},
        experience: item.experience || {},
        specialization: item.specialization || '',
        publications: item.publications || {},
        conferences: item.conferences || {},
        books: item.books || '',
        workshops: item.workshops || '',
        fdp: item.fdp || '',
        researchGuidance: item.researchGuidance || {},
        researchProjects: item.researchProjects || {},
        awards: item.awards || ''
      };

      if (!existing) {
        await Staff.create(staffPayload);
        inserted++;
      } else {
        Object.assign(existing, staffPayload);
        await existing.save();
        updated++;
      }
    }

    console.log(`Faculty seeding complete: ${inserted} inserted, ${updated} updated`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seedStaff();
