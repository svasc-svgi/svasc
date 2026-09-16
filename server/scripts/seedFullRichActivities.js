const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const Activities = require('../models/activities.model');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/college-website';

// Read site.ts from client
const siteTsPath = path.join(__dirname, '..', '..', 'client', 'src', 'data', 'site.ts');
let siteContent = fs.readFileSync(siteTsPath, 'utf8');

// Find start of pages array
const pagesIndex = siteContent.indexOf('export const pages');
let pagesJs = siteContent.slice(pagesIndex);

pagesJs = pagesJs
  .replace(/export const pages: PageDef\[\] =/g, 'const pages =')
  .replace(/export const pages =/g, 'const pages =')
  .replace(/export const pageBySlug = [^;]+;/g, '')
  .replace(/export const navLinks = [^;]+;/g, '')
  .replace(/export const [^=]+ = [^;]+;/g, '')
  .replace(/: string/g, '');

const tempJsPath = path.join(__dirname, 'temp_site_eval.js');
fs.writeFileSync(tempJsPath, pagesJs + '\nmodule.exports = { pages };', 'utf8');

const { pages } = require('./temp_site_eval.js');

// Map slug to category
const getCategoryForSlug = (slug) => {
  const s = slug.toLowerCase();
  if (['/nss', '/youth-red-cross', '/swayam-nptel', '/physical-education'].includes(s)) {
    return 'Professional Wings';
  }
  if (['/iqac', '/anti-ragging-cell', '/grievance-redressal-committee', '/internal-grievances-committee'].includes(s)) {
    return 'College Committee';
  }
  if (['/women-empowerment-cell', '/research-development-cell', '/placement-training-cell', '/placement-and-training-cell', '/entrepreneurship-development-cell', '/media-cell', '/exam-cell', '/innovation-entrepreneurship'].includes(s)) {
    return 'SVASC Cells';
  }
  return 'College Club';
};

// Convert PageDef blocks into structured card data
const convertPageToCard = (page) => {
  let vision = '';
  let mission = '';
  let objectives = [];
  let roles = [];
  let members = [];

  (page.blocks || []).forEach(b => {
    const titleLower = (b.title || '').toLowerCase();
    
    if (titleLower.includes('vision')) {
      if (b.body && Array.isArray(b.body)) {
        vision = b.body.join('\n\n');
      } else if (b.items && Array.isArray(b.items)) {
        vision = b.items.join('\n\n');
      }
    } else if (titleLower.includes('mission')) {
      if (b.body && Array.isArray(b.body)) {
        mission = b.body.join('\n\n');
      } else if (b.items && Array.isArray(b.items)) {
        mission = b.items.join('\n');
      }
    } else if (titleLower.includes('objective') || titleLower.includes('strategic objective')) {
      if (b.items && Array.isArray(b.items)) {
        objectives = objectives.concat(b.items);
      } else if (b.body && Array.isArray(b.body)) {
        objectives = objectives.concat(b.body);
      }
    } else if (titleLower.includes('role') || titleLower.includes('responsibilit') || b.kind === 'cards') {
      if (b.items && Array.isArray(b.items)) {
        b.items.forEach(it => {
          roles.push({
            role: it.title || it.label || 'Role',
            responsibility: it.body || it.description || ''
          });
        });
      }
    } else if (titleLower.includes('member') || titleLower.includes('coordinator') || titleLower.includes('composition') || b.kind === 'members') {
      if (b.items && Array.isArray(b.items)) {
        b.items.forEach(m => {
          members.push({
            name: m.name || '',
            designation: m.role || m.extra || 'Member',
            phone: m.phone || '',
            email: m.email || ''
          });
        });
      }
    }
  });

  return {
    title: page.title || page.nav,
    description: page.intro || '',
    image: page.customImage || (typeof page.image === 'string' && (page.image.startsWith('/') || page.image.startsWith('http')) ? page.image : '/hero-campus.jpg'),
    link: page.slug,
    vision: vision,
    mission: mission,
    objectives: objectives.join('\n'),
    showRoles: roles.length > 0,
    roles: roles,
    showMembers: members.length > 0,
    memberFormat: 'table',
    members: members
  };
};

async function seedFullActivities() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected! Clearing existing activities...');
    await Activities.deleteMany({});

    // Group cards by category
    const categoriesMap = {
      'College Club': {
        category: 'College Club',
        categoryMode: 'structured',
        bannerImage: '/cell.JPG',
        intro: 'SVASC College Clubs provide a vibrant platform for students to explore their interests, develop leadership skills, and engage in holistic learning beyond the classroom. Each club is student-driven with faculty mentorship, fostering creativity, teamwork, and personal growth.',
        vision: 'To nurture well-rounded students who excel academically and contribute meaningfully to society through active club participation, peer learning, and community engagement.',
        mission: 'To provide platforms for students to discover and develop their talents.\nTo foster leadership, teamwork, communication, and organizational skills.\nTo encourage innovation, creativity, and entrepreneurial thinking.\nTo bridge the gap between academics and real-world experience.',
        clubsSummary: 'Literary Club: Promotes reading, writing, debate, and elocution.\nFine Arts Club: Nurtures artistic talent and cultural programs.\nEco Club: Environmental awareness and sustainability.\nConsumer Protection Club: Educates about consumer rights.\nRotaract Club: Social service, community health, and leadership.\nAnti Drug Club: Substance abuse prevention and youth well-being.',
        objectives: 'To provide a co-curricular platform for students to develop skills beyond academics.\nTo cultivate leadership, communication, creativity, and problem-solving abilities.\nTo conduct inter-departmental and inter-collegiate competitions, seminars, and workshops.\nTo promote cultural awareness, environmental responsibility, and social consciousness.\nTo encourage student-led initiatives, events, and community outreach programs.',
        order: 1,
        cards: []
      },
      'SVASC Cells': {
        category: 'SVASC Cells',
        categoryMode: 'structured',
        bannerImage: '/cell.JPG',
        intro: 'SVASC Cells are dedicated institutional bodies that drive skill development, research, student welfare, gender empowerment, and campus inclusivity.',
        vision: 'To empower students with specialized training, research ecosystems, and holistic support for professional and personal excellence.',
        mission: 'Facilitate specialized training and entrepreneurship.\nEnsure campus safety, equity, and well-being.\nBridge industry requirements and academic learning.',
        clubsSummary: 'Research & Development Cell: Innovation and scholarly publications.\nWomen Empowerment Cell: Gender equity, leadership, and safety.\nPlacement & Training Cell: Corporate readiness and campus recruitments.\nEntrepreneurship Development Cell: Startup incubation and business planning.',
        objectives: 'Support research publications, patents, and faculty development.\nProvide comprehensive career guidance and placement opportunities.\nFoster startup culture and self-employment skills.\nEnsure safety, grievance redressal, and women empowerment.',
        order: 2,
        cards: []
      },
      'College Committee': {
        category: 'College Committee',
        categoryMode: 'structured',
        bannerImage: '/commities.JPG',
        intro: 'College Committees ensure democratic governance, quality assurance, campus harmony, and prompt grievance resolution across SVASC.',
        vision: 'To maintain the highest standards of academic integrity, student discipline, and institutional transparency.',
        mission: 'Ensure zero tolerance for ragging and harassment.\nMaintain continuous quality improvement in academic and administrative processes.\nProvide fair and transparent dispute resolution mechanisms.',
        clubsSummary: 'Internal Quality Assurance Cell (IQAC): Quality benchmarks.\nAnti Ragging Committee: Campus safety and discipline.\nGrievance Redressal Committee: Transparent student support.\nExam Cell: Rigorous and transparent assessment management.',
        objectives: 'Ensure smooth and ethical academic functioning.\nUphold NAAC and UGC accreditation standards.\nGuarantee safe and respectful campus life for all stakeholders.',
        order: 3,
        cards: []
      },
      'Professional Wings': {
        category: 'Professional Wings',
        categoryMode: 'structured',
        bannerImage: '/sporthero1.jpg',
        intro: 'Professional Wings instill national service, disciplined sportsmanship, health awareness, and global certifications.',
        vision: 'To foster patriotism, physical vigor, humanitarian service, and industry-grade competencies.',
        mission: 'Engage youth in nation building and rural immersion.\nPromote athletic excellence, yoga, and wellness.\nFacilitate premier national certifications like SWAYAM/NPTEL.',
        clubsSummary: 'National Service Scheme (NSS): "Not Me But You" community outreach.\nYouth Red Cross (YRC): First aid, emergency response, and blood donation.\nSWAYAM / NPTEL Chapter: IIT/IISc online certifications.\nPhysical Education: Sports championships and fitness training.',
        objectives: 'Nurture national integration and civic responsibility.\nTrain emergency first responders and regular blood donors.\nScale online credit transfer certifications.\nAchieve university and state sports medals.',
        order: 4,
        cards: []
      }
    };

    pages.forEach(page => {
      const catName = getCategoryForSlug(page.slug);
      const card = convertPageToCard(page);
      if (categoriesMap[catName]) {
        categoriesMap[catName].cards.push(card);
      }
    });

    for (const key of Object.keys(categoriesMap)) {
      const doc = await Activities.create(categoriesMap[key]);
      console.log(`✅ Seeded Full Category: ${doc.category} with ${doc.cards.length} complete rich cards!`);
    }

    // Clean temp file
    if (fs.existsSync(tempJsPath)) fs.unlinkSync(tempJsPath);

    console.log('\n🎉 ALL 24 Clubs, Cells, Committees with full multi-paragraph Vision, Mission, Objectives, Roles, and Members successfully seeded into MongoDB Atlas!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding full activities:', err);
    if (fs.existsSync(tempJsPath)) fs.unlinkSync(tempJsPath);
    process.exit(1);
  }
}

seedFullActivities();
