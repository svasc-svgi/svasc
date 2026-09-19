const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const Activities = require('../models/activities.model');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/college-website';

const INTRO_MAP = {
  'voter literacy': 'Transforming every eligible citizen into an informed, ethical and empowered voter — because democracy is only as strong as its most engaged participant.',
  'national service scheme': 'Forging youth into agents of change — guided by the timeless motto ‘Not Me But You’ — to serve society with dedication, empathy and purpose.',
  'rotaract': 'Service Above Self — where student leaders transform compassion into action, and local service into global impact.',
  'junior jci': 'Developing tomorrow’s ethical, visionary leaders through the proven JCI philosophy of active citizenship, community service and lifelong personal growth.',
  'fine arts': 'Nurturing student creativity, artistic expression, cultural traditions, and stage confidence through diverse cultural events.',
  'consumer protection': 'Educating consumers on statutory rights, fair-trade standards, ethical purchasing, and legal redressal pathways.',
  'red ribbon': 'Harnessing the potential of youth in health promotion, HIV/AIDS awareness, voluntary blood donation, and compassionate community care.',
  'literary': 'Fostering linguistic flair, public speaking, debating excellence, and creative literary pursuits among students.',
  'eco club': 'Instilling environmental stewardship, campus sustainability, bio-diversity conservation, and climate responsibility.',
  'anti drug': 'Building an informed, healthy, and substance-free campus through proactive youth awareness, peer education, and wellness counseling.',
  'research and development': 'Cultivating a thriving ecosystem of innovation, interdisciplinary inquiry and transformative research that connects academic knowledge to national development.',
  'innovation': 'Transforming student ideas into sustainable ventures through incubation mentorship, intellectual property support, and startup funding guidance.',
  'placement': 'Empowering students with industry-aligned competencies, corporate mentorship, professional grooming, and premier placement opportunities.',
  'exam': 'Administering transparent, rigorous, and seamless continuous assessments, university examinations, and academic evaluation.',
  'women empowerment': 'Championing gender equity, self-reliance, leadership, campus safety, and holistic empowerment for women students and faculty.',
  'media': 'Amplifying campus milestones, academic achievements, student life, and institutional storytelling across modern media platforms.',
  'quality assurance': 'Spearheading continuous quality benchmarks, academic innovations, NAAC excellence, and holistic institutional governance.',
  'internal grievance': 'Providing prompt, transparent, and fair dispute redressal mechanisms to ensure harmonious campus relations.',
  'anti ragging': 'Upholding strict zero-tolerance protocols, respectful student fellowship, and a secure, supportive campus atmosphere.',
  'swayam': 'Bridging the digital education frontier — empowering SVASC students and faculty with world-class online certifications that redefine career trajectories.',
  'red cross': 'Instilling emergency preparedness, humanitarian relief, voluntary blood donation, and health awareness in youth.',
  'physical education': 'Championing fitness, disciplined sportsmanship, athletic excellence, and competitive university championship honors.'
};

const getIntroForTitle = (title) => {
  const t = (title || '').toLowerCase();
  for (const [key, intro] of Object.entries(INTRO_MAP)) {
    if (t.includes(key)) return intro;
  }
  return `Explore the initiatives, objectives, and developmental programs of ${title} at SVASC.`;
};

async function updateIntros() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB!');

    const activities = await Activities.find();
    let updatedCount = 0;

    for (const doc of activities) {
      let docModified = false;
      for (const card of (doc.cards || [])) {
        const cleanIntro = getIntroForTitle(card.title);
        card.intro = cleanIntro;
        docModified = true;
        updatedCount++;
        console.log(`Updated [${doc.category}] -> "${card.title}": "${cleanIntro.slice(0, 60)}..."`);
      }
      if (docModified) {
        doc.markModified('cards');
        await doc.save();
      }
    }

    console.log(`\n🎉 Successfully updated ${updatedCount} cards with clean intros in MongoDB!`);
    process.exit(0);
  } catch (err) {
    console.error('Error updating intros:', err);
    process.exit(1);
  }
}

updateIntros();
