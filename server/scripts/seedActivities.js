const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const Activities = require('../models/activities.model');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/college-website';

const seedData = [
  {
    category: "College Club",
    categoryMode: "structured",
    bannerImage: "/cell.JPG",
    intro: "SVASC College Clubs provide a vibrant platform for students to explore their interests, develop leadership skills, and engage in holistic learning beyond the classroom. Each club is student-driven with faculty mentorship, fostering creativity, teamwork, and personal growth.",
    vision: "To nurture well-rounded students who excel academically and contribute meaningfully to society through active club participation, peer learning, and community engagement.",
    mission: "To provide platforms for students to discover and develop their talents.\nTo foster leadership, teamwork, communication, and organizational skills.\nTo encourage innovation, creativity, and entrepreneurial thinking.\nTo bridge the gap between academics and real-world experience.",
    clubsSummary: "Literary Club: Promotes reading, writing, debate, and elocution.\nFine Arts Club: Nurtures artistic talent and cultural programs.\nEco Club: Environmental awareness and sustainability.\nConsumer Protection Club: Educates about consumer rights.\nRotaract Club: Social service, community health, and leadership.\nAnti Drug Club: Substance abuse prevention and youth well-being.",
    objectives: "To provide a co-curricular platform for students to develop skills beyond academics.\nTo cultivate leadership, communication, creativity, and problem-solving abilities.\nTo conduct inter-departmental and inter-collegiate competitions, seminars, and workshops.\nTo promote cultural awareness, environmental responsibility, and social consciousness.\nTo encourage student-led initiatives, events, and community outreach programs.",
    order: 1,
    cards: [
      {
        title: "Literary Club",
        description: "Promotes reading, writing, debate, and elocution among students.",
        image: "/commerce(ca)/CAREER GUIDANCE PROGRAM 19.09.2025.jpg",
        vision: "To cultivate eloquence, intellectual rigor, and cultural literacy through literature, debate, and expressive arts.",
        mission: "Provide regular platforms for debate, elocution, creative writing, and literary appreciation.",
        objectives: "Enhance communication skills\nConduct inter-collegiate debates\nPublish student literary journals"
      },
      {
        title: "Fine Arts Club",
        description: "Nurtures artistic talent, visual and performing arts, and cultural pride.",
        image: "/Bca/Aytha Poojai Celebration - 10-10-2024/IMG_20241010_153153-1024x461.jpg",
        vision: "To celebrate creativity, visual arts, and traditional culture among youth.",
        mission: "Foster student artists across painting, sculpture, drama, and photography.",
        objectives: "Organize cultural fests and art exhibitions\nEncourage folk and modern art forms"
      },
      {
        title: "Rotaract Club",
        description: "Transforming student leaders through community service and global impact.",
        image: "/commerce(ca)/EXTENSION ACTIVITY 19.12.2025.jpg",
        vision: "Service Above Self — where student leaders transform compassion into action.",
        mission: "Identify, design and execute impactful community projects in healthcare, literacy, and environmental care.",
        objectives: "Execute minimum four major community service projects annually\nDeliver professional development and leadership workshops\nFoster international understanding through Rotary networks"
      },
      {
        title: "Voter Literacy Club",
        description: "Transforming eligible students into informed, ethical, and empowered voters.",
        image: "/wec/SAFETY AND AWARENESS  18.10. 2024 -1.jpg",
        vision: "Empowering every eligible citizen with democratic awareness and ethical voting values.",
        mission: "Educate on constitutional voting rights, Form 6 registration, and combat voter apathy.",
        objectives: "Promote awareness of Article 326\nOrganize new voter enrollment camps on campus\nConduct ethical voting workshops"
      },
      {
        title: "Anti Drug Club",
        description: "Building a campus free from substance abuse with health and purpose.",
        image: "/ugcommerce/Legal Awareness Programme on Consequences of Drug Abuse on 10.03.2026.jpg",
        vision: "A 100% drug-free campus fostering physical vitality and mental clarity.",
        mission: "Educate youth on substance abuse risks, peer resistance, and legal consequences.",
        objectives: "Conduct legal awareness workshops\nProvide student counseling support\nPromote healthy and active lifestyle habits"
      },
      {
        title: "Consumer Protection Club",
        description: "Educating students about legal consumer rights, FSSAI quality, and digital safety.",
        image: "/ugcommerce/Awareness on banking, saving and Investment on 23.01.2026.jpg",
        vision: "An empowered society of conscious consumers aware of rights and responsibilities.",
        mission: "Disseminate consumer protection laws, food safety standards, and digital transaction ethics.",
        objectives: "Raise awareness on Consumer Protection Act 2019\nEducate against misleading advertisements and adulteration"
      }
    ]
  },
  {
    category: "SVASC Cells",
    categoryMode: "structured",
    bannerImage: "/cell.JPG",
    intro: "SVASC Cells are dedicated institutional bodies that drive skill development, research, student welfare, gender empowerment, and campus inclusivity.",
    vision: "To empower students with specialized training, research ecosystems, and holistic support for professional and personal excellence.",
    mission: "Facilitate specialized training and entrepreneurship.\nEnsure campus safety, equity, and well-being.\nBridge industry requirements and academic learning.",
    clubsSummary: "Research & Development Cell: Innovation and scholarly publications.\nWomen Empowerment Cell: Gender equity, leadership, and safety.\nPlacement & Training Cell: Corporate readiness and campus recruitments.\nEntrepreneurship Development Cell: Startup incubation and business planning.",
    objectives: "Support research publications, patents, and faculty development.\nProvide comprehensive career guidance and placement opportunities.\nFoster startup culture and self-employment skills.\nEnsure safety, grievance redressal, and women empowerment.",
    order: 2,
    cards: [
      {
        title: "Research and Development Cell",
        description: "Cultivating research, innovation, and interdisciplinary inquiry for societal progress.",
        image: "/hero-students.jpg",
        vision: "Transforming SVASC into a recognized center of scholarly research and innovation.",
        mission: "Support faculty and student publications in Scopus/UGC journals, patent filings, and grant funding.",
        objectives: "Promote inclusive research culture\nEnhance research methodology and statistical skills\nFacilitate academic and industry MoUs"
      },
      {
        title: "Women Empowerment Cell",
        description: "Nurturing confident, independent women leaders through awareness, health, and skill programs.",
        image: "/wec/wec3.jpg",
        vision: "A progressive campus ensuring equal dignity, safety, and leadership opportunities for women.",
        mission: "Conduct self-defense, health hygiene, legal literacy, and entrepreneurship programs for female students.",
        objectives: "Address gender-specific concerns promptly\nCelebrate International Women's Day\nProvide counseling and mentorship"
      },
      {
        title: "Placement and Training Cell",
        description: "Bridging the classroom to corporate corridors with training, aptitude, and job drives.",
        image: "/commerce(ca)/CAREER GUIDANCE PROGRAM 19.09.2025.jpg",
        vision: "Ensuring 100% placement assistance and career readiness for graduating students.",
        mission: "Conduct aptitude, soft-skill, and technical training from Year 1 to final placement.",
        objectives: "Host on-campus and virtual recruitment drives\nEstablish corporate tie-ups and internship pipelines\nDeliver mock interviews and resume workshops"
      },
      {
        title: "Entrepreneurship Development Cell",
        description: "Fostering startup thinking, business planning, and self-employment skills.",
        image: "/ugcommerce/PERSONALITY DEVELOPMENT AND CAREER GUIDANCE PROGRAM  18.09.2025.jpg",
        vision: "Incubating youth-led startups and entrepreneurial leaders for economic growth.",
        mission: "Conduct ideation bootcamps, financial literacy workshops, and mentorship sessions.",
        objectives: "Encourage startup business plan competitions\nConnect student founders with government schemes and seed funding"
      }
    ]
  },
  {
    category: "College Committee",
    categoryMode: "structured",
    bannerImage: "/commities.JPG",
    intro: "College Committees ensure democratic governance, quality assurance, campus harmony, and prompt grievance resolution across SVASC.",
    vision: "To maintain the highest standards of academic integrity, student discipline, and institutional transparency.",
    mission: "Ensure zero tolerance for ragging and harassment.\nMaintain continuous quality improvement in academic and administrative processes.\nProvide fair and transparent dispute resolution mechanisms.",
    clubsSummary: "Internal Quality Assurance Cell (IQAC): Quality benchmarks.\nAnti Ragging Committee: Campus safety and discipline.\nGrievance Redressal Committee: Transparent student support.\nExam Cell: Rigorous and transparent assessment management.",
    objectives: "Ensure smooth and ethical academic functioning.\nUphold NAAC and UGC accreditation standards.\nGuarantee safe and respectful campus life for all stakeholders.",
    order: 3,
    cards: [
      {
        title: "Internal Quality Assurance Cell (IQAC)",
        description: "Driving continuous quality improvement across curriculum, pedagogy, and infrastructure.",
        image: "/hero-campus.jpg",
        vision: "To make quality the defining element of higher education at SVASC.",
        mission: "Develop quality benchmarks for academic and administrative activities.",
        objectives: "Coordinate NAAC accreditation processes\nOrganize faculty development programs\nMonitor student feedback and teaching-learning outcomes"
      },
      {
        title: "Anti Ragging Cell",
        description: "Ensuring a 100% ragging-free, supportive, and dignified educational atmosphere.",
        image: "/commities.JPG",
        vision: "A secure, welcoming campus where every newcomer feels protected and respected.",
        mission: "Implement strict UGC anti-ragging regulations and 24x7 monitoring.",
        objectives: "Spread awareness of anti-ragging laws\nMaintain surveillance across campus and hostels\nEnsure swift action on any reported incidents"
      },
      {
        title: "Grievance Redressal Committee",
        description: "Providing a fair, transparent, and confidential platform for student concerns.",
        image: "/hero-seminar.jpg",
        vision: "Transparent and responsive institutional governance ensuring student peace of mind.",
        mission: "Review and resolve academic, infrastructure, and personal grievances objectively.",
        objectives: "Maintain online and physical suggestion/grievance boxes\nConduct impartial hearings\nImplement corrective solutions swiftly"
      }
    ]
  },
  {
    category: "Professional Wings",
    categoryMode: "structured",
    bannerImage: "/sporthero1.jpg",
    intro: "Professional Wings instill national service, disciplined sportsmanship, health awareness, and global certifications.",
    vision: "To foster patriotism, physical vigor, humanitarian service, and industry-grade competencies.",
    mission: "Engage youth in nation building and rural immersion.\nPromote athletic excellence, yoga, and wellness.\nFacilitate premier national certifications like SWAYAM/NPTEL.",
    clubsSummary: "National Service Scheme (NSS): 'Not Me But You' community outreach.\nYouth Red Cross (YRC): First aid, emergency response, and blood donation.\nSWAYAM / NPTEL Chapter: IIT/IISc online certifications.\nPhysical Education: Sports championships and fitness training.",
    objectives: "Nurture national integration and civic responsibility.\nTrain emergency first responders and regular blood donors.\nScale online credit transfer certifications.\nAchieve university and state sports medals.",
    order: 4,
    cards: [
      {
        title: "National Service Scheme (NSS)",
        description: "Building youth character through community service, rural immersion, and patriotism.",
        image: "/wec/wec3.jpg",
        vision: "Forging youth into agents of change guided by 'Not Me But You'.",
        mission: "Engage in rural development camps, environmental drives, and public health awareness.",
        objectives: "Conduct annual 7-day residential village special camp\nOrganize voluntary blood donation camps\nPromote literacy, sanitation, and environmental care"
      },
      {
        title: "Youth Red Cross (YRC)",
        description: "Humanitarian service, first aid training, blood donation, and youth empowerment.",
        image: "/wec/Health Awareness Program 10.7.25.png",
        vision: "To alleviate human suffering and protect health and life.",
        mission: "Train student volunteers in disaster response, CPR, and community health.",
        objectives: "Conduct certified first-aid training camps\nMaintain 24x7 emergency blood donor registry\nPromote health hygiene awareness in partner villages"
      },
      {
        title: "SWAYAM / NPTEL Local Chapter",
        description: "Bridging the digital education frontier with IIT/IISc online certifications.",
        image: "/hero-students.jpg",
        vision: "Learn Beyond Classrooms, Achieve Beyond Boundaries.",
        mission: "Enable students and faculty to earn premier certifications and university credit transfers.",
        objectives: "Scale NPTEL course enrolments by 20% annually\nProvide student mentorship and doubt-clearing circles\nCelebrate and reward elite certified toppers"
      },
      {
        title: "Physical Education",
        description: "Rigorous sports training, tournaments, yoga, meditation, and athletic facilities.",
        image: "/sporthero1.jpg",
        vision: "Sound mind in a sound body — producing state and national athletic champions.",
        mission: "Provide professional coaching across athletics, cricket, volleyball, badminton, and yoga.",
        objectives: "Host annual inter-departmental sports meet\nTrain student athletes for Bharathiar University tournaments\nConduct daily yoga and fitness sessions"
      }
    ]
  }
];

async function seed() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected! Clearing existing activities...');
    await Activities.deleteMany({});
    
    console.log('Seeding Activities with structured categories & rich cards...');
    for (const item of seedData) {
      await Activities.create(item);
      console.log(`✅ Seeded: ${item.category} (${item.cards.length} cards)`);
    }

    console.log('\n🎉 ALL Activities, Cells, Committees & Clubs successfully seeded into MongoDB Atlas!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seed();
