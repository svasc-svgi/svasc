export type Member = {
  name: string;
  role: string;
  phone?: string;
  email?: string;
  extra?: string;
};

export type GalleryItem = {
  title: string;
  category?: string;
  date?: string;
  image: string;
  description?: string;
};

export type Block =
  | { kind: "prose"; title?: string; body: string[] }
  | { kind: "list"; title: string; items: string[] }
  | { kind: "numbered"; title: string; items: string[] }
  | { kind: "cards"; title: string; items: { title: string; body: string }[] }
  | { kind: "members"; title: string; items: Member[] }
  | { kind: "plan"; title: string; items: { when: string; label: string; body: string }[] }
  | { kind: "gallery"; title: string; subtitle?: string; items: GalleryItem[] };

export type PageDef = {
  slug: string;
  nav: string;
  title: string;
  hero: string;
  intro: string;
  image: "campus" | "students" | "service" | "seminar" | string;
  customImage?: string;
  motto?: string;
  blocks: Block[];
};

export const COLLEGE = {
  name: "SVASC College of Arts and Science",
  short: "SVASC",
  place: "Erode, Tamil Nadu",
  email: "principal@svasc.org",
  phone: "+91 96009 66086",
};

export const pages: PageDef[] = [
  {
    slug: "/nss",
    nav: "NSS",
    title: "National Service Scheme",
    hero: "National Service Scheme",
    intro:
      "Forging youth into agents of change — guided by the timeless motto \u2018Not Me But You\u2019 — to serve society with dedication, empathy and purpose.",
    image: "service",
    motto: "Not Me But You",
    blocks: [
      {
        kind: "prose",
        title: "Vision",
        body: [
          "The NSS unit at SVASC College envisions a generation of youth who transcend self-interest to become the backbone of national progress. We seek to build young minds imbued with a spirit of selfless service, social sensitivity and civic responsibility — youth who understand that the true measure of education is its power to transform not just oneself, but the society at large.",
          "Through organized community outreach, rural immersion and awareness campaigns, we aspire to create a lasting movement of educated citizens who serve as bridges between academic knowledge and the lived realities of India's underserved populations. Our vision is rooted in the belief that a student who serves the nation today becomes the leader who shapes it tomorrow.",
        ],
      },
      {
        kind: "prose",
        title: "Mission",
        body: [
          "The National Service Scheme at SVASC operates on the foundational principle that education without social engagement is incomplete. With the guiding motto 'NOT ME BUT YOU,' our mission is to instill in every enrolled volunteer a deep sense of national duty — channeled through experiential learning, community service and participatory development.",
          "We aim to make NSS the premier avenue for character building and leadership development at SVASC, connecting classroom learning with real-world challenges in health, hygiene, environment, governance and rural development. Every programme, camp and outreach activity is designed to transform students into empathetic, socially conscious professionals who carry the ethos of service throughout their careers and lives.",
        ],
      },
      {
        kind: "numbered",
        title: "Broad Objectives of NSS at SVASC",
        items: [
          "Enable students to deeply understand the social, economic and cultural fabric of the communities they serve, fostering genuine empathy and contextual intelligence.",
          "Help volunteers identify their own strengths and limitations in relation to community needs, encouraging self-awareness alongside social awareness.",
          "Equip students to analyze community problems systematically and co-create sustainable, participatory solutions with local stakeholders.",
          "Cultivate a strong sense of civic responsibility, democratic values and constitutional duties that students carry beyond college into their professional lives.",
          "Bridge theoretical academic knowledge with practical community problem-solving, turning textbook concepts into tangible social impact.",
          "Build collaborative competence — the ability to plan, execute and evaluate group projects while sharing responsibilities equitably.",
          "Develop skills in community mobilization, stakeholder engagement and grassroots communication essential for socially impactful leadership.",
          "Strengthen leadership qualities, democratic temperament and the ability to inspire others through ethical action and transparent decision-making.",
          "Prepare students to respond effectively to emergencies, natural calamities and public health crises through trained volunteerism.",
          "Champion national integration, social harmony and the celebration of India's rich cultural and regional diversity.",
        ],
      },
      {
        kind: "list",
        title: "Strategic Objectives of SVASC NSS Unit",
        items: [
          "Work alongside and within communities rather than for them — ensuring local ownership and long-term sustainability of every NSS initiative.",
          "Engage in creative, constructive social action that addresses root causes of poverty, inequality and environmental degradation.",
          "Continuously deepen both self-knowledge and community knowledge through reflective learning, field journals and peer reviews.",
          "Apply scholarly understanding — in science, commerce, arts and humanities — to mitigate real community challenges with evidence-based interventions.",
          "Hone democratic leadership skills through elected roles, committee work and consensus-driven decision-making within the unit.",
          "Develop entrepreneurial and programme-design capabilities that enable self-employment and social enterprise among NSS alumni.",
          "Break educational silos by building strong partnerships between college-educated youth and the broader uneducated or under-educated community.",
          "Champion the rights and welfare of marginalized groups — women, elderly, differently-abled and economically weaker sections — through targeted outreach.",
        ],
      },
      {
        kind: "plan",
        title: "Annual Action Plan 2026–2027",
        items: [
          {
            when: "July 11, 2026",
            label: "World Population Day — Village Survey Initiative",
            body: "NSS volunteers conduct a structured door-to-door survey in an adopted village — collecting comprehensive data on literacy levels, nature of employment, livelihood patterns, health habits and demographic profiles. Findings are compiled into a community development report submitted to local authorities.",
          },
          {
            when: "August 5–15, 2026",
            label: "Independence Day Celebrations — Patriotism Week",
            body: "A week-long celebration of India's independence featuring essay writing competitions on the contributions of lesser-known freedom fighters, patriotic speech contests, drawing and poster competitions on national pride, and a flagship flag-hoisting ceremony with community participation on August 15.",
          },
          {
            when: "September 15, 2026",
            label: "International Peace Day — Peace Rally",
            body: "NSS volunteers organize a vibrant peace rally through Odathurai village carrying placards, singing national songs and distributing pamphlets on the values of global harmony, non-violence and communal coexistence — reaching over 500 community members.",
          },
          {
            when: "September 24, 2026",
            label: "NSS Day — Farmer Awareness Programme",
            body: "A comprehensive awareness programme for the farming community of T.N. Palayam block — covering scientific cultivation techniques, crop marketing strategies, fair-price procurement channels, agricultural loans and the importance of banking habits and financial inclusion for rural households.",
          },
          {
            when: "October 1, 2026",
            label: "National Blood Donation Day — Blood Camp",
            body: "A life-saving voluntary blood donation camp organized jointly with the Siruvalur Primary Health Center. NSS volunteers are trained as blood donation ambassadors and conduct pre-camp awareness drives across departments, targeting a minimum of 80 units donated.",
          },
          {
            when: "October 2, 2026",
            label: "Gandhi Jayanthi — Leadership Webinar",
            body: "An inspiring webinar for all NSS volunteers on Mahatma Gandhi's transformative philosophy ’Be the change you wish to see in the world’ — featuring reflective discussions, quiz competitions and a pledge to champion Gandhian values of truth, non-violence and service in daily life.",
          },
          {
            when: "December 1, 2026",
            label: "World AIDS Day — Health Awareness Drive",
            body: "A comprehensive AIDS/HIV awareness programme featuring expert talks by medical professionals, myth-busting interactive sessions, street plays and distribution of educational materials — targeting both the campus community and nearby villages to reduce stigma and promote prevention.",
          },
          {
            when: "December 25–31, 2026",
            label: "NSS Special Camp — Rural Immersion",
            body: "A transformative seven-day residential special camp at a selected village panchayat. Volunteers engage in physical and social infrastructure work, health check-up camps, literacy workshops, environmental clean-up drives, cultural exchange programs and community storytelling evenings — a defining capstone experience for NSS members.",
          },
          {
            when: "January 12, 2027",
            label: "National Youth Day — Vivekananda Digital Tribute",
            body: "Commemoration of Swami Vivekananda's birth anniversary through creative social media campaigns featuring curated video clippings, motivational graphics and youth-written reflections on his teachings of self-reliance, national pride, universal service and the infinite potential of Indian youth.",
          },
          {
            when: "January 25, 2027",
            label: "National Voters' Day — Electoral Literacy Drive",
            body: "A targeted electoral literacy campaign encouraging first-time and young voters to exercise their democratic right. Volunteers conduct mock voting demonstrations, explain the NOTA option, clarify voter ID procedures and set up booth-level awareness stalls across the campus and surrounding areas.",
          },
          {
            when: "February 4, 2027",
            label: "World Cancer Day — Tobacco-Free Campus Drive",
            body: "An impactful awareness programme linking tobacco and substance use to cancer risks — including expert oncologist talks, anti-tobacco pledge drives, visual exhibitions on cancer statistics and the formal declaration of SVASC as a Tobacco-Free Zone by NSS student volunteers.",
          },
          { when: "March 22, 2027", label: "World Water Day — Save Water Campaign", body: "A campus and community programme on the theme ’Save Water, Secure the Future’ — featuring practical workshops on rainwater harvesting, water conservation techniques, demonstrations of drip irrigation and a signature installation of water-saving pledges from students, faculty and community members." },
          { when: "March 10, 2027", label: "NSS Association Valediction — Annual Celebration", body: "A grand annual valediction ceremony celebrating the achievements of the NSS unit — featuring award distribution to outstanding volunteers, guest address by social leaders, cultural performances by volunteers and the formal induction of the next year's office bearers in an inspiring passing-of-the-torch ceremony." },
        ],
      },
      {
        kind: "members",
        title: "NSS Co-ordinators & Committee Members",
        items: [
          { name: "Dr. R. Ramkumar", role: "Chairperson", email: "principal@svasc.org", phone: "9600966086" },
          { name: "Mr. V. Naveenkumar", role: "Member Secretary", email: "naveenkumar@svasc.org", phone: "9578035138" },
          { name: "Mr. K. S. Sowmiyan", role: "Member", email: "sowmiyanks@svasc.org", phone: "9944902202" },
          { name: "Ms. B. Priya", role: "Member", email: "priyab@svasc.org", phone: "9080010034" },
          { name: "Mrs. K. V. Ranjani", role: "Member", email: "ranjanikv@svasc.org", phone: "9677706154" },
          { name: "Mrs. A. Revathi", role: "Member", email: "revathia@svasc.org", phone: "9597677646" },
          { name: "Mrs. K. Iswarya", role: "Member", email: "iswarya@svasc.org", phone: "9597137819" },
          { name: "P. Dhanavel", role: "Student Member", email: "madhandhanavel@gmail.com", phone: "7708156322" },
          { name: "A. Sanjai", role: "Student Member", email: "sanjay241220072@gmail.com", phone: "6381694505" },
          { name: "K. Pavin", role: "Student Member", email: "savinpavin4@gmail.com", phone: "8072140733" },
          { name: "V. Ruban", role: "Student Member", email: "Roobanr971@gmail.com", phone: "7708132658" },
        ],
      },
    ],
  },
  {
    slug: "/voter-literacy-club",
    nav: "Voter Literacy",
    title: "Voter Literacy Club",
    hero: "Voter Literacy Club",
    intro: "Transforming every eligible citizen into an informed, ethical and empowered voter — because democracy is only as strong as its most engaged participant.",
    image: "seminar",
    motto: "Every Vote Counts",
    blocks: [
      {
        kind: "prose",
        title: "Vision",
        body: [
          "The Voter Literacy Club at SVASC College envisions a campus and community where every eligible citizen is not merely registered to vote, but empowered to vote intelligently — guided by facts, values and a deep understanding of democratic processes. We believe that electoral participation is the most fundamental act of citizenship, and our vision is a society where no voice goes unheard because no voter was left uninformed.",
          "We strive to create a generation of students who serve as ambassadors of democratic awareness — in their families, their communities and their professions — carrying forward the principles of free, fair and fearless electoral participation long after they leave the campus gates. Universal participation in democracy begins with one informed voter at a time.",
        ],
      },
      {
        kind: "list",
        title: "Mission",
        items: [
          "Educate students, teaching staff, non-teaching staff and the wider civil society about the constitutional right to vote and the moral responsibility to exercise it.",
          "Empower first-time voters and upcoming eligible citizens with comprehensive, accurate information about voter registration procedures, Form 6 filing, EPIC cards and booth-level officer contacts.",
          "Champion the twin ethics of electoral participation: 'Every Vote Counts' (value of each individual vote) and 'No Voter to be Left Behind' (inclusivity and accessibility for all demographics).",
          "Combat voter apathy, misinformation and vote-buying through targeted awareness campaigns, peer-to-peer education and ethical voter pledge drives on campus and in partner villages.",
        ],
      },
      {
        kind: "list",
        title: "Objectives",
        items: [
          "Systematically promote awareness of the Constitutional right to vote (Article 326) among students, faculty, families and the broader community through structured outreach programmes.",
          "Create comprehensive voter registration awareness — explaining Form 6, online voter enrollment via voter.eci.gov.in, NVSP portal usage and BLO (Booth Level Officer) access.",
          "Cultivate ethical, informed voting behaviour by educating members on how to critically evaluate candidates, manifestos and electoral promises rather than voting on caste, religion or inducement.",
          "Raise community understanding of the critical importance of free, fair and credible elections as the cornerstone of India's democracy and socio-economic development.",
          "Develop student leaders within the club who can independently design and execute voter awareness campaigns, outreach events and electoral literacy modules for their peer networks.",
          "Document and archive voter literacy resources — pamphlets, videos, training kits — for use by future batches and partner institutions across Tamil Nadu.",
        ],
      },
      {
        kind: "cards",
        title: "Roles & Responsibilities of Club Members",
        items: [
          {
            title: "Monthly Thematic Sessions",
            body: "Club members convene monthly for structured, thematic discussions on electoral issues — ranging from the history of Indian elections and constitutional provisions to contemporary challenges like fake news, booth capture and voter suppression. Sessions alternate between closed study circles and open public forums to maximize campus engagement.",
          },
          {
            title: "Community Outreach Programmes",
            body: "Volunteers organize targeted outreach activities in villages, urban slums and marginalized communities — including door-to-door voter verification drives, awareness street plays, community hall meetings and WhatsApp-based information dissemination to reach voters who may not have physical access to electoral offices.",
          },
          {
            title: "Literature & Documentation",
            body: "The club actively creates, curates and preserves a rich repository of voter literacy literature — including Tamil and English pamphlets, infographics, short films, case studies of model voters and archives of past elections. This material serves as a knowledge base for future campaigns, academic research and government collaboration.",
          },
          {
            title: "New Voter Enrolment Camps",
            body: "Organizes high-impact voter enrolment camps where turning-18 students and community members can complete Form 6, obtain EPIC cards and understand the election calendar — supported by expert officials from the Election Commission. Camp outcomes are tracked and reported to district electoral authorities.",
          },
          {
            title: "Electoral Ethics Training",
            body: "Conducts workshops specifically targeting vote-buying awareness, helping community members recognize and resist inducements from candidates or agents. Participants learn how to report electoral malpractice via the cVIGIL app and understand the Model Code of Conduct.",
          },
          {
            title: "Youth Ambassador Network",
            body: "Trains selected student volunteers as certified Youth Electoral Ambassadors who conduct mini voter literacy workshops in their home districts during election seasons — extending SVASC's civic impact well beyond the campus boundary.",
          },
        ],
      },
      {
        kind: "plan",
        title: "Annual Programme Calendar 2026–2027",
        items: [
          { when: "August 2026", label: "Poster & Slogan Design Competition", body: "A campus-wide creative competition inviting students from all departments to design compelling voter awareness posters and slogans in Tamil and English. Winning entries are printed as college-branded materials and distributed at district-level electoral events with full attribution to student artists." },
          { when: "October 2026", label: "Voter Registration Awareness Campaign", body: "A fortnight-long intensive voter registration campaign — featuring booth-by-booth awareness drives in the college's adopted village, online registration help desks, Form 6 filling assistance stations and a partnership with the district Election Commission for on-the-spot verification of applications." },
          { when: "January 25, 2027", label: "National Voter's Day — Campus Celebration", body: "A flagship annual event marking India's National Voter's Day with the Electoral Literacy Quiz, 'My Vote My Voice' pledge ceremony, keynote by a district-level election official, release of a voter literacy short film produced by student volunteers and felicitation of the most active voter ambassadors of the year." },
          { when: "February 2027", label: "Essay Writing Competition — Democracy & Youth", body: "An inter-departmental essay competition on the theme 'Youth as Guardians of Indian Democracy' — encouraging students to articulate original, well-researched perspectives on electoral reforms, youth voter apathy, digital voting technology and the future of democratic participation in contemporary India." },
        ],
      },
      {
        kind: "members",
        title: "Composition of the Voter Literacy Club",
        items: [
          { name: "Dr. R. Ramkumar", role: "Chair Person", extra: "Principal, SVASC College", phone: "9600966086", email: "principal@svasc.org" },
          { name: "Dr. K. Sureshkumar", role: "Coordinator", extra: "Asst. Professor of Commerce CA", phone: "9688840458", email: "ksureshkumar@svasc.org" },
          { name: "Ms. V. Divyabharathi", role: "Member", extra: "Asst. Professor of English", phone: "9942788441", email: "divyabharathi@svasc.org" },
          { name: "Mrs. K. Susithra", role: "Member", extra: "Asst. Professor of Commerce", phone: "8056591755", email: "susithrak@svasc.org" },
          { name: "Mr. Rajenderakumar", role: "Member", extra: "Asst. Professor of Tamil", phone: "9894094979", email: "rajenderakumar@svasc.org" },
          { name: "M. Priyadharshini", role: "Student Member", extra: "II-Year B.Com (CA)-B", phone: "9566124119", email: "Mmuthuraman145@gmail.com" },
          { name: "P. Rajesh", role: "Student Member", extra: "II-Year B.Com (CA)-B", phone: "9442630982", email: "Rajesh1219728@gmail.com" },
          { name: "M. Vishnupriya", role: "Student Member", extra: "II-Year B.Com-B", phone: "6383323256", email: "Mvishnupriya805615@gmail.com" },
        ],
      },
    ],
  },
  {
    slug: "/rotaract-club",
    nav: "Rotaract",
    title: "Rotaract Club",
    hero: "Rotaract Club",
    intro: "Service Above Self — where student leaders transform compassion into action, and local service into global impact.",
    image: "service",
    motto: "Service Above Self",
    blocks: [
      {
        kind: "prose",
        title: "Vision",
        body: [
          "The Rotaract Club of SVASC College envisions a campus culture where service is not an obligation but a calling — where every student leader understands that their education carries the privilege and responsibility to uplift those less fortunate. We aspire to build the next generation of ethical, globally aware professionals who lead with empathy, serve with integrity and innovate for social good.",
          "Our vision extends beyond campus gates: we seek to create ripples of sustainable, community-rooted change in the areas of health, education, environment and livelihood through purposeful student-driven projects. We believe that Rotaract membership is not a four-year college experience — it is a lifelong identity defined by the motto 'Service Above Self.'",
        ],
      },
      {
        kind: "list",
        title: "Mission",
        items: [
          "Identify, design and execute impactful community projects that address verified, felt needs — not assumed ones — ensuring that every Rotaract initiative creates measurable, documentable social value.",
          "Build multi-dimensional leadership competencies among student members: strategic thinking, public speaking, project management, ethical reasoning and cross-cultural communication through structured training and real-world application.",
          "Cultivate an enduring fellowship culture through collaborative projects, inter-club partnerships with other Rotaract and Rotary units, NGO collaborations and cross-disciplinary student teams.",
          "Inspire every SVASC Rotaractor to internalize the Rotary Principles and carry the philosophy of 'Service Above Self' as a professional and personal compass throughout life.",
          "Connect student initiatives with Rotary International's six areas of focus — peace, disease prevention, water and sanitation, maternal and child health, education and the environment — ensuring alignment with global sustainable development priorities.",
        ],
      },
      {
        kind: "cards",
        title: "Strategic Objectives of the SVASC Rotaract Club",
        items: [
          {
            title: "Community Service & Social Impact",
            body: "Execute a minimum of four major community service projects annually spanning healthcare (free medical camps), environmental stewardship (tree plantation, plastic-free drives), literacy (tutoring underserved children) and sanitation — partnering with at least two local NGOs or Rotary clubs to ensure co-investment and community ownership for lasting, verifiable impact.",
          },
          {
            title: "Professional Development & Employability",
            body: "Deliver six structured skill-building workshops per year covering high-demand competencies: public speaking and leadership, advanced resume and LinkedIn optimization, entrepreneurship ideation and pitch preparation, and corporate interview strategies. Leverage the Rotary Global Network for mentorship connections, internship placements and live project opportunities that bridge academia and industry.",
          },
          {
            title: "Club Service, Culture & Fellowship",
            body: "Sustain a vibrant, participatory club culture with 80%+ member engagement at weekly meetings, bi-monthly leadership team activities and clearly defined rotational service roles. Mark key milestones — Rotaract Week, Charter Anniversary, World Service Day — with fellowship outings and celebration events that reinforce the Rotaract identity and belonging.",
          },
          {
            title: "International Understanding & Global Citizenship",
            body: "Complete at least one internationally themed service project or cultural exchange collaboration annually — aligned with Rotary International's global campaigns. Promote cross-cultural awareness, multilingual communication and global citizenship values among members through international speaker sessions, documentary screenings and collaborative social media campaigns with Rotaract clubs worldwide.",
          },
          {
            title: "Campus & Institutional Contribution",
            body: "Serve as the social conscience of SVASC campus by running student welfare initiatives: voluntary blood donation drives, mental health awareness weeks (in partnership with counselors), zero-waste campus campaigns, peer tutoring programs for academically at-risk students and a student-administration dialogue forum that gives students a structured voice in institutional matters.",
          },
        ],
      },
    ],
  },
  {
    slug: "/research-development-cell",
    nav: "R&D Cell",
    title: "Research and Development Cell",
    hero: "Research & Development",
    intro: "Cultivating a thriving ecosystem of innovation, interdisciplinary inquiry and transformative research that connects academic knowledge to national development.",
    image: "students",
    blocks: [
      {
        kind: "prose",
        title: "Vision",
        body: [
          "The Research and Development Cell of SVASC College envisions a dynamic, innovation-driven academic environment where curiosity is nurtured, questions are celebrated and the pursuit of new knowledge is institutionally championed. We aspire to transform SVASC into a recognized center of scholarly excellence — where every faculty member publishes, every student researches and every department contributes to the knowledge economy.",
          "Our vision is to embed research thinking as a core academic value — not a peripheral activity — ensuring that the spirit of inquiry permeates teaching, curriculum design, student projects and community engagement. We aim to produce graduates who are not just consumers of knowledge but active contributors to it.",
        ],
      },
      {
        kind: "list",
        title: "Mission",
        items: [
          "Systematically encourage and materially support quality research among all faculty members and eligible students across science, commerce and arts disciplines — eliminating the perception that research is reserved for elite institutions alone.",
          "Create a richly resourced environment — through research labs, digital databases, journal access and expert mentorship — that makes innovative, interdisciplinary scholarly inquiry practically feasible at SVASC.",
          "Actively promote cross-departmental and inter-institutional research collaborations, encouraging diverse academic perspectives to converge on complex, multi-dimensional societal challenges.",
          "Facilitate strategic publication of research findings in UGC-listed, Scopus-indexed and peer-reviewed journals and conference proceedings — maximizing the visibility and credibility of SVASC research output.",
          "Build sustained research competencies and an ethical research culture through regular workshops, FDPs, methodology training and stringent anti-plagiarism practices across all academic departments.",
        ],
      },
      {
        kind: "list",
        title: "Objectives",
        items: [
          "Promote a pervasive, inclusive research culture where every faculty member, postgraduate student and interested undergraduate is viewed as a potential knowledge creator.",
          "Encourage and track quality research outputs — peer-reviewed articles, conference papers, book chapters, patents and research-based student projects — against annual institutional targets.",
          "Enhance research methodological skills through targeted seminars, quantitative and qualitative research workshops, statistical software training (SPSS, R, Python) and interdisciplinary Faculty Development Programmes (FDPs).",
          "Support intellectual property creation — filing patents, registering copyrights and applying for trademarks — and conduct regular IPR awareness workshops to cultivate innovation ownership.",
          "Engage students in meaningful research experiences through guided mini-projects, internships at research institutions, national innovation competitions and community-based research partnerships.",
        ],
      },
      {
        kind: "cards",
        title: "Roles and Responsibilities of R&D Cell",
        items: [
          { title: "01 · Research Promotion & Culture", body: "Champion interdisciplinary research by identifying priority research areas annually, facilitating faculty interest-mapping, and motivating eligible faculty to pursue Ph.D., post-doctoral fellowships and externally funded projects with institutional support." },
          { title: "02 · Policy, Strategy & Planning", body: "Develop, update and implement a comprehensive institutional research policy; design a five-year research roadmap with measurable benchmarks; and establish robust systems for monitoring, documenting and showcasing research outcomes." },
          { title: "03 · Funding, Grants & Resources", body: "Proactively identify and communicate government grant opportunities (DST, UGC, DBT, ICSSR, AICTE), support proposal development and budget planning, and strategically strengthen the library, laboratory and digital research infrastructure." },
          { title: "04 · Capacity Building & Training", body: "Organize regular research methodology workshops, literature review training, academic writing clinics, citation management sessions and FDPs tailored to the specific research needs and competency gaps of SVASC faculty and students." },
          { title: "05 · Publications & Scholarly Output", body: "Guide faculty and students toward reputed publication avenues; maintain an institutional publication database; provide manuscript preparation support; and celebrate and publicize each publication milestone to create a vibrant publication culture." },
          { title: "06 · Academic & Industry Collaboration", body: "Establish and nurture strategic MoUs with research institutions, universities and industry partners for collaborative studies, joint publications, student exchange, faculty visits and applied research consultancy that generates both knowledge and revenue." },
          { title: "07 · Innovation, IPR & Entrepreneurship", body: "Foster a patent-filing culture through awareness workshops, one-on-one invention disclosures and assisted patent drafting; support technology transfer processes; and create pathways for student innovators to progress from idea to market-ready startup." },
          { title: "08 · Research Ethics & Academic Integrity", body: "Ensure all institutional research adheres to the highest ethical standards — through plagiarism screening, ethical review committees for human/animal studies, training on data integrity, and strict adherence to NAAC and UGC academic integrity guidelines." },
          { title: "09 · Student Research & Innovation", body: "Create structured research mentorship for undergraduates and postgraduates; fund and guide student mini-projects; nominate students for national innovation competitions (Smart India Hackathon, Avishkar); and document and display student research achievements prominently." },
          { title: "10 · Documentation & Institutional Showcasing", body: "Maintain a meticulous research register; prepare periodic research performance reports for IQAC and management; curate a digital research portfolio for the SVASC website; and showcase institutional research achievements at regional and national academic forums." },
        ],
      },
      {
        kind: "members",
        title: "R&D Cell Committee",
        items: [
          { name: "Dr. S. Manju", role: "Coordinator", email: "manju@svasc.org", phone: "9842032586" },
          { name: "Dr. K. G. Umayambigai", role: "Member", email: "k.g.umayambigai@svasc.org", phone: "8012397770" },
          { name: "Mr. M. Elango", role: "Member", email: "elangom@svasc.org", phone: "8610207246" },
          { name: "Ms. S. Gayathri", role: "Member", email: "gayathrismb@svasc.org", phone: "9380806660" },
          { name: "Mr. A. Ramesh", role: "Member", email: "ramesha@svasc.org", phone: "9942751925" },
        ],
      },
    ],
  },
  {
    slug: "/swayam-nptel",
    nav: "SWAYAM / NPTEL",
    title: "SWAYAM / NPTEL Local Chapter",
    hero: "SWAYAM / NPTEL",
    intro: "Bridging the digital education frontier — empowering SVASC students and faculty with world-class online certifications that redefine career trajectories.",
    image: "students",
    motto: "Learn Beyond Classrooms, Achieve Beyond Boundaries",
    blocks: [
      {
        kind: "prose",
        title: "Vision",
        body: [
          "The SWAYAM / NPTEL Local Chapter at SVASC College stands as a catalyst for democratizing world-class education. Our vision is to make every student — regardless of their background, branch or city of origin — a certified, industry-ready professional who has augmented their academic degree with internationally recognized, IIT/IISc-delivered online certifications.",
          "We envision a SVASC where NPTEL certificates adorn every graduate's resume, where faculty continuously upgrade their domain expertise through SWAYAM FDPs and where the concept of learning has no time, geographic or institutional boundary. Our Local Chapter is the institutional bridge between India's best digital education resources and SVASC's ambitious, motivated student community.",
        ],
      },
      {
        kind: "list",
        title: "Mission",
        items: [
          "Proactively encourage every eligible student and faculty member to explore, enrol and complete at least one NPTEL/SWAYAM course per semester — building a campus-wide culture of continuous, self-directed learning.",
          "Systematically enhance student employability by guiding course selections aligned with current industry demands — in data science, artificial intelligence, financial management, business analytics, environmental science and more.",
          "Strategically integrate SWAYAM course completions with the formal curriculum by working with departments to offer credit transfer for certified completions, incentivizing participation with academic recognition.",
          "Achieve demonstrably higher course completion and certification rates through structured mentoring, batch learning groups, weekly progress tracking and mid-course motivational interventions.",
          "Foster a campus culture of lifelong learning, research curiosity and digital literacy by celebrating certifiers publicly and creating a visible 'Wall of Achievers' showcasing NPTEL toppers and elite scorers.",
          "Strengthen SVASC's institutional quality metrics and NAAC score by maintaining comprehensive records of all SWAYAM/NPTEL enrolments, completions and certifications for accreditation evidence.",
        ],
      },
      {
        kind: "list",
        title: "Objectives",
        items: [
          "Scale student and faculty NPTEL/SWAYAM enrolment year-over-year by 20%, with specific targets set by department and academic year in consultation with HODs.",
          "Significantly improve course completion and certification rates — targeting above 65% certification rate among enrolled learners through structured accountability mechanisms.",
          "Conduct mandatory awareness and orientation sessions at the start of each semester — covering course catalog navigation, registration walkthroughs, proctored exam schedules and certification value.",
          "Deploy a dedicated mentoring system pairing high-performing NPTEL alumni with new enrolees — providing doubt-clearing, motivation and study strategy support throughout the course duration.",
          "Actively promote SWAYAM credit transfer opportunities and interdisciplinary learning — encouraging students from commerce to take data analytics courses, science students to explore entrepreneurship and arts students to upskill in digital communication.",
          "Provide individualized course-selection counseling — matching each student's academic strengths, career aspirations and internship goals with the most appropriate NPTEL/SWAYAM course offerings.",
          "Coordinate with all department heads to formalize SWAYAM/NPTEL learning integration — including course recommendations in syllabi, faculty guidance during advisement sessions and recognition in internal marks.",
          "Maintain a meticulous digital registry of all enrolments, completions, scores and certificate details — organized by batch, department and semester for IQAC, NAAC and management reporting.",
          "Champion faculty professional development through SWAYAM Faculty Development Programmes (FDPs) — encouraging certification in pedagogy, subject matter and research methodology.",
        ],
      },
      {
        kind: "cards",
        title: "Roles and Responsibilities Within the Chapter",
        items: [
          { title: "Learner (Student)", body: "Independently enrols in NPTEL/SWAYAM courses, regularly watches video lectures from IIT/IISc professors, diligently submits weekly graded assignments, prepares rigorously for proctored certification examinations and proudly earns industry-recognized certificates that strengthen their professional portfolio." },
          { title: "Course Instructor (Faculty)", body: "Designs and delivers enriched, assessment-aligned courses on SWAYAM; prepares engaging video lectures, interactive assignments, quizzes and scenario-based assessments; and maintains a dynamic learner community forum that encourages peer discussion and knowledge sharing beyond the lecture." },
          { title: "Mentor (Faculty Guide)", body: "Guides each learner cohort through their NPTEL journey — clarifying content doubts, suggesting study strategies, monitoring weekly assignment submission progress, identifying struggling learners for early intervention and celebrating top performers to sustain motivation and completion rates." },
          { title: "SPOC (Single Point of Contact)", body: "Serves as the official institutional liaison with NPTEL — coordinating all Local Chapter activities, managing bulk registrations, promoting course calendars on campus, assisting with proctored exam logistics and maintaining official communications with NPTEL headquarters and regional office." },
          { title: "Local Chapter Coordinator", body: "Supports the SPOC in all day-to-day chapter operations — tracking participation data, assisting with certification dispatch, preparing monthly performance reports, coordinating awareness events and ensuring seamless information flow between students, faculty mentors and the NPTEL platform." },
        ],
      },
      {
        kind: "members",
        title: "SWAYAM / NPTEL Committee Members",
        items: [
          { name: "Mr. P. Arokyaraj", role: "SPOC", extra: "Mathematics", phone: "9597999898", email: "arokyaraj@svasc.org" },
          { name: "Mr. G. Balasubramaniyan", role: "Member", extra: "BBA", phone: "7904779557", email: "balasubramaniyang@svasc.org" },
          { name: "Ms. N. Malathi", role: "Member", extra: "PG Commerce", phone: "9597622719", email: "malathinsvasc@gmail.com" },
          { name: "Mrs. K. R. Kavitha", role: "Member", extra: "Computer Science", phone: "9942197020", email: "kavithakr@svasc.org" },
          { name: "Mrs. T. Mohanapriya", role: "Member", extra: "Computer Applications", phone: "9944853079", email: "mohanapriyat@svasc.org" },
        ],
      },
    ],
  },
  {
    slug: "/junior-jci-wing",
    nav: "Junior JCI",
    title: "Junior JCI Wing",
    hero: "Junior JCI Wing",
    intro: "Developing tomorrow's ethical, visionary leaders through the proven JCI philosophy of active citizenship, community service and lifelong personal growth.",
    image: "seminar",
    blocks: [
      {
        kind: "prose",
        title: "Vision",
        body: [
          "'To develop socially responsible, value-based young leaders by nurturing leadership, service, entrepreneurship, ethical values and a spirit of lifelong learning for the amelioration of society.' This is not merely a statement on paper — it is the living commitment that every SVASC Junior JCI member makes at the threshold of joining: to be a builder, not a bystander; a leader, not a follower.",
          "The Junior JCI Wing at SVASC sees every student as a leader in waiting — raw talent waiting to be refined through purposeful challenge, structured training and genuine community engagement. We envision a SVASC where graduates emerge not just with academic degrees but with leadership credentials forged in real service, real responsibility and real impact.",
        ],
      },
      {
        kind: "list",
        title: "Mission",
        items: [
          "Create structured, high-quality platforms for students to develop authentic leadership skills — through positions of responsibility, event organization, community initiatives and peer mentoring.",
          "Inspire students to think beyond personal success and engage in meaningful community service, social outreach and public welfare activities that create demonstrable societal impact.",
          "Instill timeless ethical values — integrity, accountability, compassion and humility — through value-based programming, role model interactions and reflective leadership practice.",
          "Foster entrepreneurial mindsets by connecting students with industry leaders, startup mentors and innovation challenges that translate classroom learning into real-world economic value.",
          "Empower students through volunteerism, sustainable development projects and civic participation that build both individual character and collective social capital.",
        ],
      },
      {
        kind: "numbered",
        title: "Core Objectives of SVASC Junior JCI Wing",
        items: [
          "Develop strong, replicable leadership qualities among student members — including strategic thinking, situational decision-making, team motivation and visionary goal-setting.",
          "Enhance oral communication, persuasive public speaking and interpersonal relationship-building skills through regular debates, seminars, group presentations and moderated discussions.",
          "Cultivate a deep personal ethic rooted in integrity, discipline, honesty and responsible citizenship — reinforced through structured value-education workshops and character-building activities.",
          "Drive community service and social responsibility through hands-on outreach activities — rural welfare projects, health camps, educational support for underprivileged children and environmental service.",
          "Build a powerful culture of teamwork, collaborative problem-solving and mutual respect — ensuring that student leaders understand that the greatest achievements are collective, not individual.",
          "Organize international-standard seminars, leadership boot camps, training workshops and residential leadership camps that give SVASC students exposure to best global practices.",
          "Create awareness and engage students in critical contemporary issues: environmental sustainability, public health, digital citizenship, education equity and economic inclusion.",
          "Encourage and facilitate active participation in district, state, national and international JCI events, forums and leadership competitions — elevating SVASC's profile on the global Jaycee map.",
        ],
      },
      {
        kind: "cards",
        title: "Roles and Responsibilities",
        items: [
          { title: "Leadership Development", body: "Design and execute a yearlong leadership development curriculum: structured training programmes, inspirational workshops led by industry leaders, simulation-based leadership challenges and a progressive responsibility system where members graduate from team member to event leader to office bearer." },
          { title: "Personality & Communication Excellence", body: "Conduct intensive personality development and communication excellence programmes — including public speaking drills, debate training, behavioral interview preparation, body language workshops and cross-cultural communication seminars that make SVASC students stand out in every competitive arena." },
          { title: "Community Service Projects", body: "Implement impactful, need-based community service projects: health awareness camps in underserved villages, voluntary blood donation drives, environmental clean-up initiatives, digital literacy programmes for senior citizens and scholarship linkage drives for economically weaker students in nearby schools." },
          { title: "Entrepreneurship & Innovation", body: "Organize entrepreneurship awareness fairs, start-up pitch competitions, industry interaction sessions and entrepreneurship boot camps — connecting student innovators with seed funding information, business incubators, government schemes (like PMEGP, Startup India) and successful local entrepreneur role models." },
          { title: "Ethical Education & Value Integration", body: "Run dedicated value-education programmes — using case studies, moral dilemma discussions, interactions with social leaders and reflective journaling — to help students internalize the JCI Creed: faith in God, brotherhood, democracy, individual freedom and universal brotherhood." },
          { title: "Innovation, Teamwork & Creative Problem-Solving", body: "Foster creative thinking and collaborative innovation through cross-departmental group challenges, design-thinking workshops, social hackathons and collaborative art and media projects that require students to harness both right-brain creativity and left-brain analytical rigor." },
          { title: "Performance Reporting & Impact Measurement", body: "Maintain comprehensive records of all JCI activities — measuring outcomes against set goals, evaluating community impact through beneficiary feedback, preparing annual impact reports for JCI International and Management, and developing an evidence-based action plan that continuously raises the bar for the next year." },
        ],
      },
      {
        kind: "members",
        title: "Faculty Members & Guides",
        items: [
          { name: "Ms. G. Gurulakshmi", role: "Faculty Coordinator", phone: "8220757699", email: "gurulakshmi@svasc.org" },
          { name: "Mr. P. Ramesh", role: "Faculty Member", phone: "9865920954", email: "rameshp@svasc.org" },
          { name: "Mrs. K. Ramya", role: "Faculty Member", phone: "6380858183", email: "veedhunramya@gmail.com" },
          { name: "Mrs. C. Neevetha", role: "Faculty Member", phone: "8870352900", email: "neevethac@svasc.org" },
        ],
      },
      {
        kind: "members",
        title: "Office Bearers 2026–2027",
        items: [
          { name: "Sunith Kumar S", role: "President", extra: "III B.Com (PA)", phone: "9677479109" },
          { name: "Anu K", role: "Vice-President", extra: "III B.Sc (AI&DS)", phone: "9600243246" },
          { name: "Sowmiya R", role: "Secretary", extra: "III B.Sc (Microbiology)", phone: "7397193308" },
          { name: "Shantha Sorooban K. J", role: "Joint Secretary", extra: "III B.Sc (Cyber Security)", phone: "8220960555" },
          { name: "Karanraj T", role: "Director", extra: "III B.Com (CA)", phone: "8667293285" },
          { name: "Priyatharshini M", role: "Director", extra: "III B.Com (B)", phone: "8508078050" },
          { name: "Hari Prasath S", role: "Director", extra: "III B.A (English)", phone: "8838548553" },
          { name: "Harini D", role: "Director", extra: "III B.Sc (CDF)", phone: "8124597687" },
          { name: "Kavin Kumar M", role: "Director", extra: "II B.Com (PA)", phone: "9715352058" },
          { name: "Nithiya Sri M", role: "Director", extra: "II B.Com (CA)", phone: "8807469956" },
          { name: "Sivagiri M", role: "Director", extra: "II BBA", phone: "9087911850" },
        ],
      },
    ],
  },
  {
    slug: "/iqac",
    nav: "IQAC",
    title: "Internal Quality Assurance Cell",
    hero: "IQAC",
    intro: "The institutional nerve center of quality — driving continuous academic excellence, transparent governance and NAAC-aligned best practices across every dimension of SVASC's operations.",
    image: "campus",
    blocks: [
      {
        kind: "prose",
        title: "Vision",
        body: [
          "The Internal Quality Assurance Cell (IQAC) of SVASC College envisions a higher education institution of distinction — one where quality is not a periodic compliance exercise but a deeply embedded institutional value that permeates every classroom, laboratory, administrative office and community engagement activity.",
          "We aspire to create a globally competent, socially responsible institution where students emerge as critical thinkers and ethical professionals, where faculty are lifelong learners and cutting-edge researchers, and where the institution itself exemplifies the highest standards of transparent governance, inclusive development and sustainable operation. IQAC serves as the conscience and compass of SVASC's institutional journey toward excellence.",
        ],
      },
      {
        kind: "numbered",
        title: "Mission",
        items: [
          "Establish and continuously strengthen a robust, multi-layered quality assurance system — from classroom pedagogy to administrative processes — that drives compounding institutional improvement year after year.",
          "Champion innovative, outcome-based teaching-learning practices that keep SVASC's academic delivery aligned with UGC guidelines, industry requirements and the evolving aspirations of Tamil Nadu's student community.",
          "Foster and incentivize research productivity, consultancy services, extension activities, entrepreneurship support and meaningful faculty development that elevate SVASC's academic stature.",
          "Strengthen student-centered services through radical transparency, participatory governance, robust feedback mechanisms and accessible institutional support that places students at the center of every quality decision.",
          "Uphold ethical values, environmental responsibility, social outreach obligations and full compliance with NAAC's seven quality benchmarks — integrating them into the DNA of institutional culture rather than treating them as audit requirements.",
        ],
      },
      {
        kind: "numbered",
        title: "Objectives",
        items: [
          "Develop, implement, monitor and periodically revise comprehensive quality benchmarks for both academic and administrative functions — ensuring that standards rise consistently rather than stagnate.",
          "Continuously enhance teaching-learning processes, assessment design, research initiatives, innovation ecosystems and faculty professional development through structured IQAC-led interventions and programmes.",
          "Strengthen and expand student mentoring systems, counseling services, placement support, progression tracking and alumni engagement through quality-driven, data-backed practices.",
          "Institutionalize regular stakeholder feedback collection — from students, faculty, parents, employers and alumni — and translate feedback data into actionable improvements in curriculum, infrastructure and governance.",
          "Maintain meticulous quality documentation, AQAR submissions, Best Practices reports and benchmark evidence files that support seamless NAAC accreditation processes and drive a culture of institutional pride in quality achievement.",
        ],
      },
      {
        kind: "list",
        title: "Roles and Responsibilities of IQAC Members",
        items: [
          "Attend all IQAC meetings with full preparation — reviewing agendas in advance, bringing data and evidence to discussions and contributing constructively to decisions on quality enhancement initiatives.",
          "Actively assist the IQAC Coordinator in the design, implementation, monitoring and evaluation of quality assurance initiatives across academic, research, administrative and student welfare domains.",
          "Support the preparation, stakeholder communication, implementation and regular review of the Institutional Quality Assurance Plan — ensuring it remains a living, actionable document rather than a shelf item.",
          "Coordinate proactively with departments, clubs, committees and the management team to ensure the timely, resource-efficient execution of all IQAC-mandated quality activities.",
          "Systematically collect, verify, organize and maintain comprehensive documentary evidence required for NAAC accreditation cycles — including best practice write-ups, departmental reports and institutional data.",
          "Proactively take on additional quality enhancement responsibilities assigned by the Principal or IQAC Coordinator, demonstrating institutional commitment and leading by example within their respective domains.",
        ],
      },
      {
        kind: "members",
        title: "IQAC Committee 2026–2027",
        items: [
          { name: "Dr. Chi. Nanjappa", role: "Coordinator" },
          { name: "Dr. V. Sureshkumar", role: "Criteria I Manager" },
          { name: "Mr. P. Arokyaraj", role: "Criteria II Manager" },
          { name: "Dr. P. Krishnakumari", role: "Criteria III Manager" },
          { name: "Dr. M. S. Gomathi", role: "Criteria IV Manager" },
          { name: "Dr. P. Rajasekar", role: "Criteria V Manager" },
          { name: "Dr. V. Siva Guru Vignesh", role: "Criteria VI Manager" },
          { name: "Mrs. B. Kanchanadevi", role: "Criteria VII Manager" },
          { name: "Dr. R. Senthilrani", role: "Criteria VIII Manager" },
          { name: "Dr. S. Manju", role: "Criteria IX Manager" },
          { name: "Dr. A. Savitha", role: "Criteria IX Manager" },
          { name: "Mrs. K. S. Malathi", role: "Criteria X Manager" },
          { name: "Mrs. T. Ayeesha Sumaiya", role: "Criteria X Manager" },
          { name: "Mr. K. Manikandan", role: "Staff Volunteer" },
        ],
      },
    ],
  },
  {
    slug: "/internal-grievances-committee",
    nav: "Grievances",
    title: "Internal Grievances Committee",
    hero: "Grievance Redressal",
    intro: "Ensuring every voice at SVASC is heard, every concern is addressed with fairness, and every stakeholder feels safe, respected and protected by a just institutional system.",
    image: "campus",
    blocks: [
      {
        kind: "prose",
        title: "Vision",
        body: [
          "'To create a fair, transparent, inclusive and grievance-free institutional environment by ensuring timely, impartial and effective redressal of grievances, thereby promoting justice, dignity and harmony among all stakeholders.' This vision reflects SVASC's unwavering commitment to being an institution where no student, faculty member or staff feels powerless when facing injustice.",
          "The Internal Grievances Committee at SVASC College is more than a procedural body — it is a guardian of institutional integrity. We believe that a college community where concerns can be raised safely, investigated thoroughly and resolved justly is one where academic excellence truly flourishes. Our committee embodies the principle that fairness and education are inseparable.",
        ],
      },
      {
        kind: "list",
        title: "Mission",
        items: [
          "Provide a universally accessible, operationally transparent and practically effective grievance redressal mechanism that every student, faculty member and staff can use without hesitation or fear of consequence.",
          "Guarantee the prompt, thorough and strictly unbiased resolution of all grievances — maintaining absolute confidentiality of the complainant's identity and the investigation process throughout.",
          "Uphold the foundational principles of natural justice, equality before institutional authority and full accountability of decision-makers — ensuring no grievance is dismissed without proper inquiry.",
          "Cultivate and protect a safe, mutually respectful and emotionally supportive academic and workplace environment at SVASC — one that recognizes every individual's right to dignity and professional respect.",
          "Build sustained trust and institutional confidence among all stakeholders through consistently efficient, empathetic and outcome-oriented grievance management that visibly improves institutional culture over time.",
        ],
      },
      {
        kind: "list",
        title: "Objectives",
        items: [
          "Provide a multi-channel, universally accessible grievance submission mechanism — through written applications, institutional email, the online grievance portal and physical grievance boxes across campus — ensuring no barrier to reporting.",
          "Guarantee the timely acknowledgment, systematic examination and decisive resolution of all grievances — maintaining strict confidentiality and impartiality at every stage of the process.",
          "Proactively promote and maintain a safe, mutually respectful, culturally sensitive and emotionally supportive academic and professional environment for all members of the SVASC community.",
          "Create a psychologically safe reporting culture where students, faculty and staff can raise genuine grievances without any fear of victimization, discrimination, social ostracism or professional retaliation.",
          "Conduct structured root cause analyses of recurring grievance patterns to identify systemic gaps and recommend evidence-based corrective and preventive institutional measures.",
          "Maintain comprehensive, legally sound records of all grievances received, investigations conducted, decisions rendered and follow-up actions implemented.",
          "Conduct quarterly reviews of the grievance system's effectiveness — including response time metrics, resolution quality assessments and stakeholder satisfaction surveys — and implement improvements.",
        ],
      },
      {
        kind: "plan",
        title: "Grievance Redressal Process — Step by Step",
        items: [
          { when: "Step 01", label: "Receipt of Grievance — Multiple Channels", body: "Grievances may be submitted through written applications submitted to the committee, institutional email, the secure online grievance portal accessible via the college website, or the sealed physical grievance boxes maintained at key locations across campus — ensuring maximum accessibility and anonymity where needed." },
          { when: "Step 02", label: "Registration & Preliminary Review", body: "Upon receipt, each grievance is formally acknowledged within 48 hours — assigned a unique reference number, recorded in the grievance register, and subjected to a preliminary review to determine its nature, severity, urgency, jurisdictional scope and appropriate course of inquiry." },
          { when: "Step 03", label: "Inquiry & Fair Investigation", body: "The Committee conducts a structured, principled inquiry — gathering documentary evidence, reviewing institutional records, holding confidential interviews with the complainant and respondent, and consulting relevant academic or administrative experts to establish a comprehensive, fact-based understanding of the grievance." },
          { when: "Step 04", label: "Resolution & Formal Recommendation", body: "Based on inquiry findings, the Committee recommends specific, proportionate corrective measures — including remediation, process reforms, counseling referrals or disciplinary action as warranted by institutional rules and applicable law — with full written justification submitted to the Principal for final approval." },
          { when: "Step 05", label: "Implementation, Documentation & Follow-Up", body: "Approved recommendations are implemented within defined timelines; the complainant is formally notified of the outcome; the case file is archived with complete documentation; and a structured follow-up review is conducted after 30 days to verify resolution effectiveness and prevent recurrence." },
        ],
      },
      {
        kind: "members",
        title: "Internal Grievances Committee Members",
        items: [
          { name: "Dr. R. Ramkumar", role: "Chairperson", phone: "9600966086", email: "principal@svasc.org" },
          { name: "Dr. Chi. Nanjappa", role: "Member Secretary", phone: "9842761545", email: "drcn@svasc.org" },
          { name: "Dr. M. Kalaivani", role: "Member", phone: "9524063157", email: "kalaivani@svasc.org" },
          { name: "Dr. P. Krishnakumari", role: "Member", phone: "8883462636", email: "library@svasc.org" },
          { name: "Mrs. K. Yasotha", role: "Member", phone: "9578815399", email: "yasotha@svasc.org" },
          { name: "Mrs. S. Bhavani", role: "Member", phone: "9498043572", email: "bhavani@svasc.org" },
          { name: "Mr. Poovendhiran", role: "Member", phone: "9629997231", email: "poovendhiran@svasc.org" },
          { name: "S. Raman", role: "Student Member", phone: "9790332613", email: "kingramlax@gmail.com" },
          { name: "R. Poongodi", role: "Student Member", phone: "8807536964", email: "Poonkodir74@gmail.com" },
          { name: "M. Priyatharshini", role: "Student Member", phone: "9342517951", email: "Priyagowri52@gmail.com" },
        ],
      },
    ],
  },
  {
    slug: "/innovation-entrepreneurship",
    nav: "II & EDC",
    title: "Institution Innovation & Entrepreneurial Development Cell",
    hero: "Innovation & Enterprise",
    intro: "Transforming SVASC students from job-seekers into job-creators — one bold idea, one mentor, one funded venture at a time.",
    image: "seminar",
    blocks: [
      {
        kind: "prose",
        body: [
          "The Institution's Innovation & Entrepreneurial Development Cell (II&EDC) at SVASC College is the institutional heartbeat of creative enterprise. Established to translate the Government of India's Start-Up India and Atal Innovation Mission mandates into campus-level action, the II&EDC provides an integrated ecosystem of mentorship, training, incubation support and industry linkage that takes a student from raw idea to revenue-generating venture.",
          "For the academic year 2026–2027, the II&EDC has designed a rich, multi-month programme calendar spanning entrepreneurship education, digital skills development, financial literacy, social innovation challenges and live industry exposure visits — ensuring that students across all 20+ departments of SVASC encounter meaningful, hands-on entrepreneurship learning experiences that reshape their career mindsets.",
        ],
      },
      {
        kind: "prose",
        title: "Vision",
        body: [
          "To be a premier, nationally recognized hub of innovation, creativity and entrepreneurial excellence — one that systematically transforms SVASC students into visionary, socially conscious leaders, job-creators and change-makers who drive sustainable economic growth and meaningful social progress in Tamil Nadu, India and beyond.",
          "We envision SVASC producing graduates who don't wait for opportunity but create it — who see problems as business opportunities, who use technology as a lever for social good and who build enterprises that create dignified employment, advance sustainable development and contribute to the knowledge economy of a New India.",
        ],
      },
      {
        kind: "prose",
        title: "Mission",
        body: [
          "Cultivating a deeply ingrained innovation-driven mindset among students across all disciplines — through experiential learning, design-thinking workshops, mentorship from successful entrepreneurs and immersive industry exposure that makes entrepreneurship feel achievable, not abstract.",
          "Promoting comprehensive awareness of Intellectual Property Rights, digital innovation, social entrepreneurship and sustainability-aligned business practices — empowering students to build ventures that are legally protected, technology-enabled and ethically grounded.",
        ],
      },
      {
        kind: "numbered",
        title: "Strategic Objectives of II&EDC",
        items: [
          "Foster a pervasive campus culture of innovation and entrepreneurial thinking where creativity is celebrated, failure is treated as a learning opportunity and bold ideas are systematically resourced and mentored.",
          "Identify, evaluate and nurture student innovators through structured idea-screening processes — providing progressive mentorship, prototyping resources and incubation support matched to each stage of the innovation journey.",
          "Design and execute a high-quality annual programme of workshops, national-level hackathons, ideathons, boot camps and industry exposure visits that make abstract entrepreneurship education viscerally real and practically actionable.",
          "Establish strategic linkages and formal MoUs with industry partners, startup ecosystems, venture capital networks, government bodies (MSME, SIDCO, SIPCOT) and national incubators for pipeline mentorship and funding access.",
          "Provide structured guidance on Intellectual Property Rights — patent drafting and filing, trademark registration, copyright protection and technology licensing — so that student innovations are legally protected from ideation to market.",
          "Champion social entrepreneurship and sustainability-focused innovation — encouraging students to build enterprises aligned with the UN Sustainable Development Goals and India's priority sectors in healthcare, agriculture, education and clean energy.",
          "Build SVASC's first student-led interdisciplinary innovation lab where teams from commerce, science, arts and computer applications collaborate to develop holistic, scalable solutions to real societal challenges.",
          "Develop and grow an engaged alumni entrepreneur network — featuring founder talks, mentorship hours and seed-round introductions — that creates a virtuous cycle of inspiration and investment for current students.",
        ],
      },
      {
        kind: "cards",
        title: "Roles and Responsibilities of II&EDC",
        items: [
          { title: "Promote Innovation Culture", body: "Systematically build campus-wide awareness of design thinking, lean startup methodology, innovation management and entrepreneurship — through seminars, posters, social media campaigns and department-level sessions that make every student see themselves as a potential innovator." },
          { title: "Support & Mentor Student Innovators", body: "Identify students with promising ideas through a structured idea competition; pair them with faculty and industry mentors; provide access to maker spaces, prototype funding and co-working facilities; and guide them through the SVASC Innovation Pipeline from concept to validated business model." },
          { title: "Capacity Building & Skill Events", body: "Organize a rigorous calendar of workshops, hackathons, boot camps and ideathons led by successful entrepreneurs, industry experts and venture capitalists — building specific, marketable skills in pitching, financial modeling, digital marketing, product development and team leadership." },
          { title: "Incubation & Startup Launch Support", body: "Guide serious student entrepreneurs through business model canvas development, market validation research, investor pitch preparation and legal structure setup — and connect them with SVASC's partner incubation centers, government startup schemes (Startup India, MUDRA Loan) and seed funding opportunities." },
          { title: "Industry & Ecosystem Collaboration", body: "Establish and nurture formal MoUs with local industries, startups, MSME clusters, research institutions and government bodies — creating pathways for student internships, live project assignments, industrial visits and co-mentorship that ground entrepreneurship education in market reality." },
          { title: "Research-Based Product Innovation", body: "Motivate and resource student teams to conduct market-gap research, build functional prototypes, seek expert technical guidance and pursue product validation — creating a pipeline of potentially commercializable student innovations that reflect SVASC's research and development capabilities." },
        ],
      },
      {
        kind: "members",
        title: "II&EDC Cell Members",
        items: [
          { name: "Mrs. A. Kowshika", role: "Member", phone: "9025464343", email: "kowshika@svasc.org" },
          { name: "Mr. S. Mohamed Yashin", role: "Member", phone: "9629392692", email: "mohamedyashin@svasc.org" },
        ],
      },
    ],
  },
  {
    slug: "/fine-arts-club",
    nav: "Fine Arts",
    title: "Fine Arts Club",
    hero: "Fine Arts Club",
    intro: "Where talent meets tradition, and creativity transcends boundaries — SVASC's Fine Arts Club is the soul of campus culture, artistic expression and cultural pride.",
    image: "seminar",
    blocks: [
      {
        kind: "prose",
        title: "Vision",
        body: [
          "To inspire boundless creativity, lovingly nurture every form of artistic talent and deepen cultural appreciation by providing SVASC students with a vibrant, inclusive platform where they can explore every dimension of human expression — visual arts, performing arts, literary arts and digital creativity — and transform that expression into personal growth, cultural richness and institutional pride.",
          "The Fine Arts Club envisions a SVASC campus that is not just academically excellent but culturally alive — where art exhibitions fill corridors, music fills common rooms, performances move audiences and student creativity is treated as an institutional asset equal in value to academic achievement. We believe a student who can create is a student who can lead.",
        ],
      },
      {
        kind: "list",
        title: "Mission",
        items: [
          "Systematically identify, celebrate and provide tailored development support for students with artistic talents across all genres: painting, sculpture, classical music, dance, theatre, photography, creative writing and digital design.",
          "Actively nominate and prepare talented SVASC students for intercollegiate, regional, state and national-level art and cultural competitions — building competitive excellence alongside participatory joy.",
          "Foster a campus environment of deep creativity, uninhibited artistic experimentation and genuine aesthetic appreciation — where every form of artistic expression, from folk art to contemporary digital media, is respected and encouraged.",
          "Provide diverse, professionally supported opportunities for artistic expression: annual art exhibitions, music concerts, drama productions, dance recitals, literary magazines and short film screenings that showcase the full spectrum of student talent.",
          "Develop collaborative, life-enriching skills through club engagement: teamwork in production, leadership in event management, communication in curation and the resilience that comes from creative critique and continuous artistic refinement.",
        ],
      },
      {
        kind: "cards",
        title: "Core Roles of the Fine Arts Club",
        items: [
          { title: "Discover & Develop Artistic Talent", body: "Through structured talent hunts, department auditions, art appreciation sessions and genre-specific workshops, the club identifies and provides targeted development support for students with exceptional or emerging talent in any artistic form — ensuring no genuine talent goes unnoticed at SVASC." },
          { title: "Ignite and Sustain Creativity", body: "Create a permission-giving campus culture where creative risk-taking is celebrated, unconventional artistic ideas are welcomed and students feel genuinely free to experiment across artistic boundaries — supported by club mentors, faculty advisors and peer encouragement rather than judgment." },
          { title: "Celebrate Cultural Heritage", body: "Preserve, promote and celebrate the extraordinary cultural heritage of Tamil Nadu and India — its classical art forms, folk traditions, ancient architectural heritage, regional music and dance styles — while simultaneously exposing students to the best of global contemporary artistic practice." },
          { title: "Drive Holistic Personal Development", body: "Art does what no textbook can: build emotional intelligence, cultivate empathy, develop creative problem-solving and forge authentic self-expression. The club consciously positions artistic participation as a pathway to holistic personal development that complements academic and professional growth." },
          { title: "Represent SVASC with Distinction", body: "Prepare, nominate and support SVASC student artists for prestigious intercollegiate competitions, university cultural festivals, state arts competitions and national exhibitions — with dedicated preparation sessions, travel coordination and post-competition celebrations that acknowledge every participant's courage and effort." },
        ],
      },
      {
        kind: "list",
        title: "Annual Responsibilities & Activities",
        items: [
          "Organize an annual Fine Arts Exhibition showcasing the best student artworks in painting, photography, sculpture, digital art and craft — open to the public and the broader college community.",
          "Conduct regular art workshops led by professional artists — covering painting techniques, classical dance forms, musical instrument training, drama exercises and creative writing — across all academic departments.",
          "Organize the flagship SVASC Cultural Fest — a multi-day celebration featuring competitions, performances, guest artist showcases and cultural exchange activities that draw students and audiences from partner institutions.",
          "Arrange guest lectures and live demonstrations by accomplished working artists, acclaimed cultural performers and creative industry professionals who provide authentic, inspiring insights into creative careers.",
          "Identify students with exceptional artistic potential and connect them with specialized training opportunities: classical dance academies, music conservatories, art residencies and design mentorship programmes.",
          "Represent SVASC at local, regional, state and national art and cultural competitions — maintaining a competitive record that enhances the institution's cultural reputation and enriches students' competitive experience.",
          "Responsibly manage and maintain all club art materials, instruments, performance equipment, costumes, stage sets and exhibition infrastructure — ensuring resources are available, well-maintained and equitably accessible to all club members.",
        ],
      },
      {
        kind: "cards",
        title: "Office Roles",
        items: [
          { title: "Event Coordinator", body: "Oversees the end-to-end logistics, scheduling, participant coordination, venue management and post-event documentation for all Fine Arts Club events, exhibitions and festivals — ensuring every programme runs seamlessly and every student participant has a world-class experience." },
          { title: "Public Relations & Communications Coordinator", body: "Manages the club's complete communications ecosystem — maintaining the SVASC Fine Arts social media presence, designing promotional materials, writing press releases, coordinating photography and videography for all events and building relationships with local media, partner colleges and art communities." },
        ],
      },
    ],
  },
  {
    slug: "/consumer-protection-club",
    nav: "Consumer Club",
    title: "Consumer Protection Club",
    hero: "Consumer Protection",
    intro: "Empowering every student and community member to become a vigilant, informed and legally aware consumer in an era of complex markets and digital commerce.",
    image: "students",
    blocks: [
      {
        kind: "prose",
        body: [
          "The Consumer Protection Club of SVASC College is one of Tamil Nadu's most proactive college-level consumer awareness initiatives. Established under the guidance of the Department of Commerce, the Club educates SVASC students, their families and surrounding communities about the full spectrum of consumer rights guaranteed under the Consumer Protection Act 2019 — from the right to safety and information to the right to seek grievance redressal in modern consumer courts.",
          "In an era where marketplace transactions have migrated from corner shops to global e-commerce platforms, from cash to digital wallets, from physical to virtual, the risk of consumer exploitation has multiplied. The SVASC Consumer Protection Club prepares students to navigate this complex marketplace with confidence, knowledge and the legal literacy to protect their rights and the rights of those around them.",
        ],
      },
      {
        kind: "prose",
        title: "Vision",
        body: [
          "To create a generation of aware, responsible and genuinely empowered consumers who fully understand their rights and responsibilities — and who actively contribute to the construction of fairer, more ethical and more sustainable markets in India. The SVASC Consumer Protection Club envisions a society where no consumer is exploited, no complaint goes unaddressed and no market manipulation goes unchallenged.",
          "Our vision is rooted in the belief that consumer literacy is a form of civic power. When consumers are educated, markets become more honest. When students become consumer ambassadors, entire communities become more protected. SVASC is committed to being the source of that knowledge and that power.",
        ],
      },
      {
        kind: "list",
        title: "Mission",
        items: [
          "Provide comprehensive, accessible and practical consumer rights education — covering the six fundamental consumer rights enshrined in the Consumer Protection Act and the remedies available through District, State and National Consumer Commissions.",
          "Build widespread awareness of critical consumer protection laws and landmark consumer court judgments — making students and community members capable of asserting their rights in real marketplace situations.",
          "Cultivate intelligent, deliberate consumer behaviour — encouraging members to always check quality certifications (ISI, AGMARK, Hallmark, FSSAI), verify prices against MRP, read product labels meticulously and make sustainability-conscious purchasing decisions.",
          "Develop strong consumer leadership and social responsibility among club members through awareness campaigns, legal literacy drives and the satisfaction of helping community members successfully exercise their consumer rights.",
        ],
      },
      {
        kind: "numbered",
        title: "Objectives",
        items: [
          "Create comprehensive, multi-generational consumer awareness about the six consumer rights (Safety, Information, Choice, Hearing, Redressal and Consumer Education) and corresponding responsibilities through targeted outreach.",
          "Educate members and the broader community on key consumer protection laws — the Consumer Protection Act 2019, the Essential Commodities Act, the Legal Metrology Act — and landmark consumer court judgments that have shaped consumer jurisprudence.",
          "Promote responsible purchasing habits: checking ISI marks and certifications, verifying MRP compliance, reading ingredient labels, checking expiry dates and understanding warranty and guarantee terms before any purchase decision.",
          "Empower consumers to confidently seek legal redressal for defective products, deficient services, unfair trade practices and adulteration through consumer complaint portals (consumerhelpline.gov.in) and District Consumer Commissions.",
          "Organize impactful public awareness campaigns, seminars, street plays, rallies, legal literacy workshops and consumer protection competitions that reach both campus and community audiences.",
          "Promote digital consumer safety — educating members on safe online shopping practices, recognizing phishing attempts, understanding digital payment rights, protecting personal data and reporting cyberfraud effectively.",
          "Collaborate with Tamil Nadu State Consumer Disputes Redressal Commission, district Consumer Protection Councils, FSSAI regional offices and local NGOs to amplify consumer protection impact.",
          "Celebrate World Consumer Rights Day (March 15), National Consumer Day (December 24) and Consumer Awareness Week with campus events that achieve measurable public awareness impact.",
        ],
      },
      {
        kind: "cards",
        title: "Roles and Responsibilities",
        items: [
          { title: "Consumer Rights Education", body: "Conduct structured educational sessions covering all six consumer rights, national consumer helpline numbers, consumer court procedures and the right to file complaints against manufacturers, service providers and retailers — making legal literacy accessible to every student and community member." },
          { title: "Market Intelligence Training", body: "Train members to independently evaluate product quality — verifying ISI, Hallmark, AGMARK and FSSAI certifications; detecting adulterated food products; understanding standardized packaging and labeling requirements; and comparing product specifications against marketing claims before purchase." },
          { title: "Fair Trade & Ethics Advocacy", body: "Conduct targeted awareness campaigns urging businesses, local shops and online sellers to maintain transparent pricing, honest product descriptions, genuine quality standards and ethical advertising — and equipping consumers with tools to report non-compliance to appropriate authorities." },
          { title: "Consumer Complaint Guidance", body: "Provide one-on-one guidance to students and community members on filing consumer complaints — from drafting an effective complaint letter to navigating the e-Daakhil online filing portal, understanding compensation claims and representing themselves effectively before District Consumer Commissions." },
          { title: "Awareness Events & Campaigns", body: "Organize impactful public-facing events: consumer awareness rallies, street plays dramatizing consumer exploitation scenarios, quiz competitions on consumer laws, poster exhibitions, essay contests and social media campaigns on digital consumer safety — reaching audiences beyond campus boundaries." },
          { title: "Digital Consumer Safety", body: "Conduct specialized workshops on e-commerce consumer protection — covering secure online payment methods, recognizing counterfeit products on e-commerce platforms, understanding return and refund rights, protecting Aadhaar and banking data online and reporting digital fraud through the Cyber Crime Portal." },
          { title: "Responsible Consumer Behaviour", body: "Promote mindful consumption practices: buying locally produced goods, choosing eco-certified products, reducing single-use plastics, understanding the real cost of cheap counterfeits and adopting the mantra of 'Buy Less, Buy Better' — connecting consumer education with environmental responsibility." },
          { title: "Community Consumer Support", body: "Actively extend the club's consumer protection work into the broader community — organizing village-level consumer awareness camps, reaching out to women's self-help groups, senior citizens and first-generation urban consumers who are particularly vulnerable to marketplace exploitation and digital fraud." },
        ],
      },
      {
        kind: "members",
        title: "Consumer Protection Club Members",
        items: [
          { name: "Dr. M. S. Gomathi", role: "Co-ordinator", phone: "9790627469", email: "gomathims@svasc.org" },
          { name: "Mr. R. Selvakumar", role: "Member", phone: "6379656116", email: "rselvakumar@svasc.org" },
          { name: "Ms. N. Sangeerthana", role: "Member", phone: "9344502120", email: "sangeerthanan@svasc.org" },
          { name: "Mrs. K. Sangeetha", role: "Member", phone: "9500241640", email: "sangeethak@svasc.org" },
          { name: "Mrs. J. Lavanya", role: "Member", phone: "8610072390", email: "jlavanya@svasc.org" },
          { name: "R. Tamilarasan", role: "Student Member", extra: "III B.Com B", phone: "9342219642", email: "tamilkavitha93422@gmail.com" },
          { name: "B. Devapriyan", role: "Student Member", extra: "II B.Com (CA)", phone: "7708549202", email: "ddevapriyan997@gmail.com" },
          { name: "V. Abinaya", role: "Student Member", extra: "II B.Com (CA)", phone: "9087667413", email: "abinayav353@gmail.com" },
          { name: "M. Dhivagar", role: "Student Member", extra: "III B.Com (PA)", phone: "9566361253", email: "dhivagar24072007@gmail.com" },
        ],
      },
    ],
  },
  {
    slug: "/placement-training-cell",
    nav: "Placement",
    title: "Placement & Training Cell",
    hero: "Placement & Training",
    intro: "Engineering career breakthroughs — from classroom to boardroom — through world-class training, relentless industry partnerships and personalized placement support.",
    image: "students",
    blocks: [
      {
        kind: "prose",
        title: "Vision",
        body: [
          "The Placement & Training Cell of SVASC College envisions every graduate stepping out of campus gates not just with a degree, but with a validated set of professional competencies, a polished career narrative and a confirmed employment offer in hand — prepared not merely for the job market of today but for the dynamic, technology-driven workplace of tomorrow.",
          "We aspire to be the institutional bridge between SVASC's academic rigor and the ever-evolving expectations of India's leading employers — building graduates who are not only knowledgeable but also adaptable, communicative, ethical and genuinely ready to create value from Day One of their professional careers.",
        ],
      },
      {
        kind: "list",
        title: "Mission",
        items: [
          "Deliver a structured, progressive three-year training roadmap that systematically builds each student's aptitude strength, technical knowledge, communication confidence and professional readiness — aligned with the actual requirements of campus recruitment drives.",
          "Establish and actively nurture an expanding network of corporate partnerships — including MNC recruiters, SME employers, IT companies and public sector organizations — to create a robust, diverse pipeline of on-campus and off-campus placement opportunities.",
          "Prepare students comprehensively for every stage of recruitment: aptitude testing, group discussion, technical rounds, HR interviews and salary negotiation — through realistic, high-frequency mock sessions that build performance under pressure.",
          "Promote an industry-oriented, future-ready learning culture where students proactively upskill in trending technologies, certifications and domain knowledge throughout their academic journey.",
          "Achieve maximum and meaningful placement outcomes — prioritizing not just placement rates but role quality, salary benchmarks and long-term career alignment for every SVASC graduate.",
        ],
      },
      {
        kind: "numbered",
        title: "Objectives of the Placement & Training Cell",
        items: [
          "Deliver comprehensive, curriculum-aligned training in quantitative aptitude, logical reasoning, data interpretation, verbal ability and domain-specific technical skills through structured semester-wise modules.",
          "Prepare students rigorously for the complete campus recruitment pipeline — timed aptitude assessments, group discussion scenarios, case-based technical interviews and behavioral HR rounds — through high-volume, high-fidelity mock practice.",
          "Build and continuously expand a strategic industry partnership network — recruiting new corporate partners from IT, BFSI, FMCG, logistics, healthcare and manufacturing sectors annually.",
          "Organize a comprehensive programme of career-readiness events: industry expert seminars, corporate guest lectures, career fairs, employer-on-campus visits and sector-specific recruitment workshops.",
          "Systematically close the academia-industry gap through targeted curriculum input from industry advisors, guest faculty from corporates and live case studies that make education practically relevant.",
          "Build professional ethics, leadership presence, teamwork skills and creative problem-solving capability alongside technical skills — ensuring SVASC graduates are valued not just as skilled workers but as emerging leaders.",
          "Facilitate industry-validated experiential learning through structured internships, paid apprenticeships and live project partnerships that give students pre-employment professional credentials.",
          "Provide personalized, faculty-mentored career counseling to help each student identify their strongest career pathway and build a targeted, differentiated professional profile.",
          "Create awareness of competitive examination opportunities (UPSC, TNPSC, Banking, GATE, CAT) and higher education pathways — ensuring every student has a well-considered, informed post-graduation strategy.",
          "Achieve ambitious, year-on-year improvement in campus placement rates, salary packages and employer satisfaction scores — making SVASC's placement outcomes a source of institutional pride and reputation.",
        ],
      },
      {
        kind: "plan",
        title: "Semester-Wise Placement Readiness Training Plan",
        items: [
          {
            when: "I Year · II Semester",
            label: "Foundation: Aptitude, Reasoning & Communication",
            body: "Building the essential foundation: quantitative aptitude covering percentage, ratio & proportion, average, profit & loss, time & work; logical reasoning covering number series, coding-decoding, blood relations and direction sense; paired with an intensive communication module covering reading comprehension, vocabulary building, grammar mastery, paragraph writing, public speaking fundamentals, self-introduction and professional presentation skills. Semester closes with a comprehensive mixed aptitude mock test and structured communication proficiency assessment.",
          },
          {
            when: "II Year · III Semester",
            label: "Development: Advanced Aptitude, Employability & Interview Basics",
            body: "Deepening aptitude mastery: percentage, ratio, average, profit & loss, time & work, problems on ages, coding-decoding, blood relations, direction sense, ranking and statement & conclusion analysis. Simultaneously building critical employability skills: ATS-optimized resume building, professional business email writing, reading comprehension, sentence correction, group discussion fundamentals and an HR interview introduction module covering personality, motivation and body language.",
          },
          {
            when: "II Year · IV Semester",
            label: "Advanced: Placement Readiness & Company-Specific Preparation",
            body: "Tackling advanced aptitude domains: time-speed-distance problems, train and boat problems, permutations & combinations, probability and advanced data interpretation from tables, charts and graphs. Complemented by advanced career skills: ATS-friendly, role-specific resume writing, LinkedIn profile optimization for recruiter visibility, company-specific preparation strategies tailored to top campus recruiters, and mock technical and HR interview sessions.",
          },
        ],
      },
      {
        kind: "members",
        title: "Placement & Training Committee",
        items: [
          { name: "Mr. G. Kamalakannan", role: "Placement Coordinator", phone: "9626361387", email: "kamalakannang@svasc.org" },
          { name: "Mr. C. Madhankumar", role: "Placement Trainer", phone: "9965816281", email: "madhanoff123@gmail.com" },
          { name: "Ms. S. M. Swetha Sri", role: "Placement Trainer", phone: "9345175483" },
          { name: "Mrs. G. Subbulakshmi", role: "Placement Trainer", phone: "9444311488", email: "slakshmisvv@gmail.com" },
          { name: "Mrs. K. Nathiya", role: "Placement Trainer", phone: "9894347890", email: "nathiyakutty629@gmail.com" },
          { name: "Ms. V. Divyabharathi", role: "Asst. Professor of English", phone: "9942788441", email: "divyabharathi@svasc.org" },
          { name: "Mr. L. Sridhar", role: "Asst. Professor of Mathematics", phone: "6369870746", email: "sridhar@svasc.org" },
          { name: "Ms. S. Shanmugapriya", role: "Asst. Professor of Chemistry", phone: "9342465615", email: "shanmugapriyachem@svasc.org" },
          { name: "Ms. S. Gayathri", role: "Asst. Professor of Microbiology", phone: "9380806660", email: "gayathrimb@svasc.org" },
          { name: "Mrs. K. Dhenmozhi", role: "Asst. Professor of CDF", phone: "8608174533", email: "dhenmozhi@svasc.org" },
          { name: "Ms. G. Gurulakshmi", role: "Asst. Professor of BBA", phone: "8220757699", email: "gurulakshmigobal@gmail.com" },
          { name: "Mrs. S. Ramyadevi", role: "Asst. Professor of Commerce", phone: "6380343243", email: "ramyadevis@svasc.org" },
          { name: "Dr. M. Kalaivani", role: "Asst. Professor of Commerce", phone: "9524063157", email: "dkalaisasmi@gmail.com" },
          { name: "Ms. Kanya", role: "Asst. Professor of Commerce CA", phone: "9715012282", email: "kanyamca07@gmail.com" },
          { name: "Mrs. T. Bhuvaneswari", role: "Asst. Professor of Commerce CA", phone: "9344015773", email: "bhuvaneswarit@svasc.org" },
          { name: "Mrs. J. Lavanya", role: "Asst. Professor of PG Commerce", phone: "8610072390", email: "jlavanya@svasc.org" },
          { name: "Mr. N. Malathi", role: "Asst. Professor of PG Commerce", phone: "9597622719", email: "thimalathi1112@gmail.com" },
          { name: "Mr. V. Ruthrakumar", role: "Asst. Professor of PG Commerce", phone: "9486316074", email: "ruthrakumarv@svasc.org" },
          { name: "Ms. S. Devi", role: "Asst. Professor of Computer Science", phone: "9994694149", email: "deviscs14@svasc.org" },
          { name: "Ms. K. Iswarya", role: "Asst. Professor of Computer Science", phone: "9597137819", email: "iswaryakcs@svasc.org" },
          { name: "Mrs. T. Mohanapriya", role: "Asst. Professor of Computer Applications", phone: "9944853079", email: "mohanapriyat@svasc.org" },
          { name: "Mrs. C. Neevetha", role: "Asst. Professor of Computer Applications", phone: "8870352900", email: "neevethac@svasc.org" },
          { name: "Ms. D. Sathyarubha", role: "Asst. Professor of Computer Applications", phone: "7395881163", email: "sathyarubhad@svasc.org" },
        ],
      },
    ],
  },
  {
    slug: "/exam-cell",
    nav: "Exam Cell",
    title: "Exam Cell",
    hero: "Exam Cell",
    intro: "Upholding Integrity, Ensuring Transparency, Driving Excellence.",
    image: "students",
    motto: "Upholding Integrity, Ensuring Transparency, Driving Excellence",
    blocks: [
      {
        kind: "prose",
        title: "Overview",
        body: [
          "The Examination Cell at SVASC College of Arts and Science is the central authoritative body responsible for the seamless planning, execution, and management of all academic evaluations. Serving as the vital bridge between the college and the affiliated university, the Exam Cell ensures that every assessment process is conducted with the highest degree of academic integrity and administrative efficiency.",
          "Our dedicated team works tirelessly to implement robust evaluation mechanisms, securely manage student records, and foster a disciplined environment that enables students to demonstrate their true academic potential without any administrative hurdles."
        ]
      },
      {
        kind: "prose",
        title: "Vision",
        body: [
          "We strive to conduct examinations fairly, securely, and efficiently, thereby supporting the holistic development of knowledgeable, ethical, and highly responsible graduates who are prepared to face global challenges.",
          "We envision an evaluation framework that is entirely transparent and technologically advanced, ensuring that academic merit is the sole determinant of success."
        ]
      },
      {
        kind: "list",
        title: "Mission",
        items: [
          "To conduct both internal and university examinations in a highly transparent, systematic, and organized manner.",
          "To provide timely, student-centric examination services, ensuring that timetables, notifications, and results are published promptly.",
          "To maintain absolute confidentiality, precision, and accuracy in all examination-related activities and documentation.",
          "To integrate modern digital technologies and software solutions for more effective and error-free examination management.",
          "To uphold rigorous ethics, prevent malpractices, and instill a strong sense of academic integrity among the student community."
        ]
      },
      {
        kind: "list",
        title: "Primary Objectives",
        items: [
          "To ensure the smooth execution of internal assessments, practical exams, and final external university examinations without any disruptions.",
          "To guarantee strict fairness and transparency in all evaluation processes, building trust among students and faculty members.",
          "To coordinate closely with academic departments to publish accurate examination schedules, seating arrangements, and result declarations on time.",
          "To systematically maintain and archive sensitive examination records, academic transcripts, and official documentation securely.",
          "To deliver quick, effective, and responsive support services to address the examination-related queries of students and staff members.",
          "To strictly enforce disciplinary guidelines inside examination halls to entirely prevent academic malpractices.",
          "To support a culture of continuous learning, self-assessment, and sustained academic excellence throughout the academic year.",
          "To ensure 100% compliance with all statutory rules, regulations, and guidelines mandated by Bharathiar University."
        ]
      },
      {
        kind: "list",
        title: "Core Functionality",
        items: [
          "Strategic planning, scheduling, and conducting of all internal model examinations and end-semester university examinations.",
          "Meticulous preparation of detailed examination timetables, dynamic seating arrangements, and invigilation duty charts for faculty.",
          "Securing and maintaining the strict confidentiality of question papers, answer scripts, and official examination records.",
          "Efficient processing of student examination applications, fee collections, and verification of eligibility criteria.",
          "Timely generation and distribution of student hall tickets and official examination notifications.",
          "Updating and maintaining comprehensive digital and physical student examination records.",
          "Deploying flying squads and invigilators to prevent malpractices and maintain an atmosphere of strict discipline during exams.",
          "Acting as the primary liaison coordinating with Bharathiar University regarding syllabus changes, examination protocols, and administrative matters."
        ]
      },
      {
        kind: "list",
        title: "Roles and Responsibilities",
        items: [
          "Conduct internal and university examinations smoothly, ensuring an entirely stress-free environment for the candidates.",
          "Enforce transparency, confidentiality, and absolute fairness in every step of the examination process.",
          "Prepare, verify, and maintain all necessary examination records, attendance sheets, and academic performance reports.",
          "Coordinate seamlessly with all academic departments to align teaching schedules with internal assessment activities.",
          "Distribute crucial examination-related information, circulars, and university updates promptly to students and faculty members.",
          "Ensure total compliance with the complex regulatory frameworks and guidelines established by the affiliated university.",
          "Promptly address, investigate, and resolve examination-related grievances submitted by students to provide necessary administrative support.",
          "Promote ethical practices, character development, and academic integrity as core values of the institution."
        ]
      },
      {
        kind: "members",
        title: "Exam Cell Members",
        items: [
          { name: "Dr. P. Rajasekar", role: "Exam Cell Member", extra: "Management", email: "rajasekar@svasc.org", phone: "7871111105" },
          { name: "Dr. A. Savitha", role: "Exam Cell Member", extra: "Commerce", email: "savitha@svasc.org", phone: "9788654463" },
          { name: "Mr. L. Sridhar", role: "Exam Cell Member", extra: "Mathematics", email: "sridhar@svasc.org", phone: "6369870746" },
          { name: "Ms. D. Sathyaruba", role: "Exam Cell Member", extra: "BCA", email: "sathyaruba@svasc.org", phone: "7395881163" }
        ]
      }
    ]
  },
  {
    slug: "/red-ribbon-club",
    nav: "Red Ribbon Club",
    title: "Red Ribbon Club",
    hero: "Red Ribbon Club",
    intro: "Empowering youth to lead a healthy, informed, and responsible life.",
    image: "campus",
    motto: "Serve with Compassion, Act with Purpose",
    blocks: [
      {
        kind: "prose",
        title: "Overview",
        body: [
          "The Red Ribbon Club (RRC) at SVASC is a vibrant and highly active student movement dedicated to raising awareness about public health issues, specifically focusing on HIV/AIDS prevention, blood donation, and youth empowerment. We believe that the youth are the most powerful catalysts for social change, and through the RRC, we channel their energy toward creating a healthier, more compassionate society.",
          "By engaging in continuous community outreach, health seminars, and peer-education programs, the club equips young minds with the necessary life skills and scientific knowledge to protect themselves and actively contribute to the well-being of the nation."
        ]
      },
      {
        kind: "prose",
        title: "Vision",
        body: [
          "Our vision is to empower young people to lead a healthy, deeply informed, and socially responsible life by promoting widespread awareness on HIV/AIDS, encouraging regular voluntary blood donation, fostering healthy lifestyle choices, advocating for gender equality, and building social responsibility.",
          "We strive to contribute to the creation of a stigma-free, inclusive, and healthy society where every individual is treated with dignity and compassion."
        ]
      },
      {
        kind: "prose",
        title: "Mission",
        body: [
          "To passionately educate and motivate the youth through structured awareness programs, peer-led education initiatives, mega voluntary blood donation camps, and comprehensive life skills training.",
          "We conduct continuous health campaigns and dedicated community outreach activities that promote HIV/AIDS prevention, encourage positive health practices, and build profound compassion towards people living with HIV."
        ]
      },
      {
        kind: "list",
        title: "Objectives of RRC",
        items: [
          "To promote extensive awareness about HIV/AIDS, Sexually Transmitted Infections (STIs), and critical preventive measures among the youth.",
          "To encourage consistent voluntary blood donation and create widespread awareness about the life-saving importance of safe blood donation practices.",
          "To develop healthy lifestyles and essential life skills designed to prevent risky behaviours and substance abuse among college students.",
          "To actively eliminate social stigma and discrimination against people living with HIV/AIDS through scientific education, open dialogue, and community sensitization.",
          "To promote gender equality, mutual respect, and responsible social behaviour among the youth in all aspects of life.",
          "To systematically organize impactful health education programmes, public awareness rallies, expert seminars, interactive workshops, and targeted health campaigns.",
          "To foster a strong peer education network so that trained students can effectively educate, mentor, and support their fellow students.",
          "To develop robust leadership qualities, exceptional teamwork, personal discipline, and a deep sense of social responsibility among volunteers.",
          "To collaborate actively with government bodies, NGOs, and global health organizations in implementing effective HIV/AIDS prevention and health promotion programmes.",
          "To build a dynamic generation of socially responsible youth who are deeply committed to public health, community welfare, and progressive national development."
        ]
      },
      {
        kind: "prose",
        title: "Impact and Future Goals",
        body: [
          "These foundational objectives help shape our dedicated Red Ribbon Club volunteers into highly knowledgeable, compassionate, responsible, and socially committed young citizens.",
          "Our volunteers do not just learn; they actively contribute to HIV/AIDS prevention, drive regional health promotion initiatives, and ensure sustainable community well-being."
        ]
      },
      {
        kind: "members",
        title: "Committee Members",
        items: [
          { name: "Mr. C. SURESH", role: "COORDINATOR", extra: "MATHEMATICS", email: "sureshc@svasc.org", phone: "7904617100" },
          { name: "Mr. A. ARUN KUMAR", role: "MEMBER", extra: "ENGLISH", email: "arunkmar@svasc.org", phone: "9524914269" },
          { name: "Ms. S. MYVIZHI", role: "MEMBER", extra: "TAMIL", email: "myvizhi@svasc.org", phone: "9597188105" },
          { name: "Ms. S. SHANMUGAPRIYA", role: "MEMBER", extra: "CHEMISTRY", email: "lllavenil2022@gmail.com", phone: "9342465615" }
        ]
      },
      {
        kind: "members",
        title: "Students Volunteers",
        items: [
          { name: "S. BHAVANI", role: "MEMBER", extra: "III B.Sc MATHS", email: "s.bha900@gmail.com", phone: "9080132883" },
          { name: "K. RITHIKA", role: "MEMBER", extra: "I B.Sc MATHS", email: "rithuma2008@gmail.com", phone: "9080132843" },
          { name: "S. POONTHAMIL", role: "MEMBER", extra: "III.B.Sc CHEMISTRY", email: "poonthamil63@gmail.com", phone: "9942088938" },
          { name: "T. SARATH", role: "MEMBER", extra: "III.B.Sc CHEMISTRY", email: "ss6051633@gmail.com", phone: "9360423585" },
          { name: "R. SOUNDHARARAJAN", role: "MEMBER", extra: "III.B.Sc CHEMISTRY", email: "soundhrsoundhar717@gmail.com", phone: "6369991750" },
          { name: "S. KRISHNAN", role: "MEMBER", extra: "I BBA", email: "krishnanskrishnan09@gmail.com", phone: "6385158176" },
          { name: "S. SACHIN", role: "MEMBER", extra: "I BBA", email: "sachin161804@gmail.com", phone: "6379329975" },
          { name: "A. KAVIN", role: "MEMBER", extra: "I BBA", email: "kavin7639783594@gmail.com", phone: "7639783594" },
          { name: "S. VAISHNAVI", role: "MEMBER", extra: "II BBA", email: "vaishnavivisowndar@gmail.com", phone: "8940735696" },
          { name: "M. DEVADHARSHINI", role: "MEMBER", extra: "II BBA", email: "ddvadhashinideva@gmail.com", phone: "9994180233" }
        ]
      }
    ]
  },
  {
    slug: "/literary-club",
    nav: "Literary Club",
    title: "Literary Club",
    hero: "Literary Club",
    intro: "Promoting reading, writing, debate, elocution, and critical thinking among students to cultivate strong communication and literary excellence.",
    image: "seminar",
    motto: "Reading, Writing, Reflection",
    blocks: [
      {
        kind: "prose",
        title: "Vision",
        body: [
          "To build a vibrant community of passionate readers, eloquent speakers, and creative writers who engage deeply with literature and articulate ideas with clarity, confidence, and impact.",
          "The Literary Club envisions a campus where words empower, literature inspires, and critical thinking guides academic and personal leadership."
        ]
      },
      {
        kind: "prose",
        title: "Mission",
        body: [
          "To provide a creative forum for students to develop literary skills, encourage critical analysis of contemporary and classic literature, and organize inter-collegiate competitions that foster intellectual growth.",
          "Through regular workshops, book reviews, and public speaking forums, we empower students to articulate their thoughts effectively."
        ]
      },
      {
        kind: "numbered",
        title: "Objectives",
        items: [
          "Promote reading habits, creative writing, and literary appreciation among students across all disciplines.",
          "Organize structured book discussions, poetry recitations, and essay competitions.",
          "Conduct elocution, debate, and quiz competitions to hone communication and critical reasoning skills.",
          "Encourage student participation in inter-collegiate, regional, and national literary festivals."
        ]
      }
    ]
  },
  {
    slug: "/eco-club",
    nav: "Eco Club",
    title: "Eco Club",
    hero: "Eco Club",
    intro: "Creating an environmentally conscious and sustainable campus by inspiring students to protect nature, conserve resources, and promote eco-friendly practices.",
    image: "service",
    motto: "Go Green, Save Earth",
    blocks: [
      {
        kind: "prose",
        title: "Vision",
        body: [
          "To create an environmentally conscious and sustainable campus by inspiring students to protect nature, conserve resources, and promote eco-friendly practices."
        ]
      },
      {
        kind: "list",
        title: "Mission",
        items: [
          "To develop environmental awareness among students and staff.",
          "To encourage active participation in environmental conservation activities.",
          "To promote sustainable practices such as waste management, energy conservation, and tree plantation.",
          "To create responsible citizens committed to protecting the environment."
        ]
      },
      {
        kind: "numbered",
        title: "Objectives of the Eco Club",
        items: [
          "To create awareness about environmental issues such as pollution, climate change, and biodiversity conservation.",
          "To encourage students to participate in tree plantation and campus greening activities.",
          "To promote waste segregation, recycling, and proper waste management.",
          "To conserve natural resources like water and electricity.",
          "To organize seminars, workshops, rallies, and awareness campaigns on environmental protection.",
          "To celebrate environmental days such as World Environment Day and Earth Day.",
          "To encourage the use of eco-friendly products and reduce plastic usage.",
          "To develop leadership, teamwork, and social responsibility among students.",
          "To make the college campus clean, green, and sustainable."
        ]
      },
      {
        kind: "cards",
        title: "Role of the Eco Club & Responsibilities",
        items: [
          { title: "Environmental Awareness", body: "Organize awareness programs, rallies, and campaigns on environmental conservation." },
          { title: "Tree Plantation", body: "Conduct tree plantation drives and ensure proper care of planted trees." },
          { title: "Waste Management", body: "Promote waste segregation, recycling, composting, and reduction of plastic use." },
          { title: "Water Conservation", body: "Create awareness on saving water and organize activities like rainwater harvesting campaigns." },
          { title: "Energy Conservation", body: "Encourage energy-saving practices such as switching off lights and using renewable energy." },
          { title: "Clean Campus Initiative", body: "Organize campus and community cleanliness drives to maintain a clean environment." },
          { title: "Biodiversity Conservation", body: "Protect local flora and fauna by conducting biodiversity surveys and awareness activities." },
          { title: "Climate Change Awareness", body: "Educate students about climate change, its impacts, and sustainable practices." }
        ]
      },
      {
        kind: "members",
        title: "Composition of Eco Club",
        items: [
          { name: "Mrs. K. S. MALATHI", role: "Coordinator", phone: "6383021694", email: "malathiks@svac.org" },
          { name: "Mrs. M. KAVITHA", role: "Member", phone: "8012470308", email: "Kavitha@svasc.org" },
          { name: "Mr. P. KARTHIKEYAN", role: "Member", phone: "9840083468", email: "karthikeyanp@svasc.org" },
          { name: "Mrs. K. GAYATHRI", role: "Member", phone: "9171934382", email: "gayathrik@svasc.org" },
          { name: "L. MOHAN", role: "Student Member", phone: "7904960075", email: "janakidevippm@gmail.com" },
          { name: "M. SUBINRAJ", role: "Student Member", phone: "8681890021", email: "subinraj2708@gmail.com" },
          { name: "R. SUDHARSHAN", role: "Student Member", phone: "967744410", email: "sudharshan28092007@gmail.com" },
          { name: "T. MUNEESHWARAN", role: "Student Member", phone: "6369085370", email: "Mugi13106@gmail.com" }
        ]
      }
    ]
  },
  {
    slug: "/anti-drug-club",
    nav: "Anti Drug Club",
    title: "Anti Drug Club",
    hero: "Anti Drug Club",
    intro: "Building a campus free from substance abuse where every student chooses health, purpose, and a drug-free future.",
    image: "campus",
    motto: "Say No to Drugs, Say Yes to Life",
    blocks: [
      {
        kind: "prose",
        title: "Vision",
        body: [
          "To build a campus free from substance abuse where every student chooses health, purpose, and a drug-free future."
        ]
      },
      {
        kind: "list",
        title: "Mission",
        items: [
          "Create awareness about the harmful effects of drugs through campaigns and workshops.",
          "Empower students to make informed, healthy choices.",
          "Provide peer support and guidance for those seeking help.",
          "Collaborate with experts and authorities to promote a safe campus environment."
        ]
      },
      {
        kind: "numbered",
        title: "Objectives of Anti Drug Club",
        items: [
          "Create Awareness: Conduct regular seminars, workshops, and campaigns to educate students about the physical, mental, and social effects of drug abuse.",
          "Prevent First Use: Equip students with life skills to resist peer pressure and make informed decisions through interactive sessions and role plays.",
          "Promote Healthy Alternatives: Encourage sports, arts, yoga, and cultural activities as positive outlets to reduce stress and prevent drug experimentation.",
          "Build Support Systems: Establish peer support groups and confidential counseling channels for students seeking help or information.",
          "Early Identification & Intervention: Train club members to identify early warning signs and guide at-risk students to professional help without stigma."
        ]
      },
      {
        kind: "members",
        title: "Composition of Anti Drug Club",
        items: [
          { name: "Mr. K. Manikandan", role: "Coordinator", extra: "Physical Director" },
          { name: "Mr. V. Ashok Kumar", role: "Member", extra: "AP / English" },
          { name: "Ms. M. Miruthila", role: "Member", extra: "AP / PG Commerce" },
          { name: "Mr. D. Shyamsundar", role: "Member", extra: "AP / BCA" }
        ]
      }
    ]
  },
  {
    slug: "/youth-red-cross",
    nav: "Youth Red Cross",
    title: "Youth Red Cross",
    hero: "Youth Red Cross",
    intro: "Health, Service, Friendship — mobilizing youth to inspire humanitarian activities and alleviate human suffering.",
    image: "service",
    motto: "Health, Service, Friendship",
    blocks: [
      {
        kind: "prose",
        title: "Vision",
        body: [
          "To inspire and empower young people to become responsible, compassionate, and active citizens who serve humanity, promote health, uphold human dignity, and contribute to building a peaceful and resilient society."
        ]
      },
      {
        kind: "prose",
        title: "Mission",
        body: [
          "To mobilize and empower youth through voluntary service, health education, first aid training, blood donation awareness, disaster preparedness, and community welfare activities, guided by the Fundamental Principles of the Red Cross."
        ]
      },
      {
        kind: "numbered",
        title: "Objectives of YRC",
        items: [
          "Promote health and hygiene through awareness programs and healthy lifestyle practices.",
          "Develop the spirit of humanitarian service and voluntary action among youth.",
          "Provide first aid and emergency care training to prepare volunteers for emergencies.",
          "Encourage voluntary blood donation and create awareness about the importance of safe blood.",
          "Prepare youth for disaster response and support relief and rehabilitation activities.",
          "Develop leadership qualities, discipline, teamwork, and social responsibility.",
          "Serve vulnerable and needy communities without discrimination based on race, religion, caste, gender, or nationality.",
          "Promote peace, friendship, and national integration through community service.",
          "Encourage environmental protection through tree plantation, cleanliness drives, and conservation activities.",
          "Uphold the Fundamental Principles of the Red Cross—Humanity, Impartiality, Neutrality, Independence, Voluntary Service, Unity, and Universality."
        ]
      },
      {
        kind: "members",
        title: "YRC Committee Members",
        items: [
          { name: "Mr. C. SURESH", role: "Coordinator", extra: "MATHEMATICS", phone: "7904617100", email: "sureshc@svasc.org" },
          { name: "Mr. A. ARUN KUMAR", role: "Member", extra: "ENGLISH", phone: "9524914269", email: "arunkmar@svasc.org" },
          { name: "Ms. S. MYVIZHI", role: "Member", extra: "TAMIL", phone: "9597188105", email: "myvizhi@svasc.org" },
          { name: "Ms. S. SHANMUGAPRIYA", role: "Member", extra: "CHEMISTRY", phone: "9342465615", email: "lllavenil2022@gmail.com" }
        ]
      },
      {
        kind: "members",
        title: "YRC Student Volunteers",
        items: [
          { name: "M. PAVITHRAN", role: "Student Member", extra: "III B.Sc MATHS", phone: "6374534078", email: "ppavi0624@gmail.com" },
          { name: "K. RITHIKA", role: "Student Member", extra: "I B.Sc MATHS", phone: "9080132843", email: "rithuma2008@gmail.com" },
          { name: "S. ABI", role: "Student Member", extra: "III B.Sc CHEMISTRY", phone: "8667394661", email: "abisasikumar86@gmail.com" },
          { name: "M. KEERTHANA", role: "Student Member", extra: "III B.Sc CHEMISTRY", phone: "9952303653", email: "keerthanam212007@gmail.com" },
          { name: "K. DENCY", role: "Student Member", extra: "III B.Sc CHEMISTRY", phone: "9345333857", email: "dencykumar2007@gmail.com" },
          { name: "P. HARINI", role: "Student Member", extra: "III B.Sc CHEMISTRY", phone: "7810052964", email: "harini082007@gmail.com" },
          { name: "S. AMARNATH", role: "Student Member", extra: "II BBA", phone: "985996477", email: "amarnathbk271@gmail.com" },
          { name: "M. GREESAN", role: "Student Member", extra: "II BBA", phone: "8760884306", email: "raghulgreesano@gmail.com" },
          { name: "M. DHARANIDHARAN", role: "Student Member", extra: "II BBA", phone: "7200883235", email: "dharanidharan5254350@gmail.com" },
          { name: "A. LLIYOUSHPAM", role: "Student Member", extra: "II BBA", phone: "9025885221", email: "nancylillynancyy@gmail.com" }
        ]
      }
    ]
  },
  {
    slug: "/women-empowerment-cell",
    nav: "WEC",
    title: "Women Empowerment Cell",
    hero: "Women Empowerment Cell",
    intro: "Empowering women with knowledge, leadership, confidence, and social responsibility to foster an equitable and progressive society.",
    image: "/wec/wec1.jpg",
    customImage: "/wec/wec1.jpg",
    motto: "Empower Woman, Empower Future",
    blocks: [
      {
        kind: "prose",
        title: "Vision",
        body: [
          "To empower women with knowledge, leadership, confidence, and social responsibility, enabling them to become self-reliant individuals who contribute to an equitable and progressive society."
        ]
      },
      {
        kind: "list",
        title: "Mission",
        items: [
          "To promote leadership and personality development among women.",
          "To create awareness about gender equality, women's rights, and legal protection.",
          "To provide skill development and career-oriented training.",
          "To organize programs for physical, mental, and social well-being.",
          "To foster a safe, inclusive, and respectful academic environment."
        ]
      },
      {
        kind: "numbered",
        title: "Objectives of Women Empowerment Cell",
        items: [
          "To promote self-confidence, leadership qualities, and decision-making skills among girl students.",
          "To create awareness about gender equality, women's rights, legal literacy, health, safety, and self-defense.",
          "To enhance employability through skill development, entrepreneurship, career guidance, and personality development programmes.",
          "To encourage the active participation of women in academic, co-curricular, cultural, sports, and community service activities.",
          "To empower women to become independent, socially responsible, and confident individuals while ensuring a safe, inclusive, and supportive campus environment."
        ]
      },
      {
        kind: "cards",
        title: "Expected Outcomes & Key Roles",
        items: [
          { title: "Self-Confidence & Leadership", body: "Students develop confidence, leadership qualities, communication skills, and decision-making abilities." },
          { title: "Awareness of Rights", body: "Increased understanding of gender equality, women's rights, legal provisions, cyber safety, health, hygiene, and self-defense." },
          { title: "Improved Employability", body: "Students acquire career-oriented skills, entrepreneurial abilities, and professional competencies that enhance employability." },
          { title: "Safe & Inclusive Campus Environment", body: "Promotion of a gender-sensitive, respectful, and discrimination-free campus where women feel safe and supported." }
        ]
      },
      {
        kind: "gallery",
        title: "Activities & Photo Gallery",
        subtitle: "Glimpses of dynamic seminars, awareness drives, skill training, and student empowerment initiatives organized by the Women Empowerment Cell.",
        items: [
          {
            title: "WEC Leadership & Inaugural Session",
            category: "Leadership & Inauguration",
            date: "Academic Year 2024–2025",
            image: "/wec/wec1.jpg",
            description: "Orientation and motivational assembly empowering young women to cultivate self-confidence, leadership values, and career ambition."
          },
          {
            title: "Health & Adolescent Wellness Awareness Program",
            category: "Health & Hygiene",
            date: "10.07.2025",
            image: "/wec/Health Awareness Program 10.7.25.png",
            description: "Specialized health counseling session covering physical well-being, dietary nutrition, and personal hygiene for female students."
          },
          {
            title: "Women Safety & Legal Rights Awareness Programme",
            category: "Safety & Legal Rights",
            date: "18.10.2024",
            image: "/wec/SAFETY AND AWARENESS  18.10. 2024 -1.jpg",
            description: "In-depth workshop educating participants on constitutional rights, cyber security, campus safety norms, and legal helpline support."
          },
          {
            title: "Awareness Campaign on Prevention of Sexual Harassment",
            category: "Awareness & Competition",
            date: "17.10.2025",
            image: "/wec/Sexual Harassment And Violence Against Women & Girls-competition 17.10.25.png",
            description: "Inter-departmental oratorical, essay, and poster competition championing zero-tolerance against harassment and violence against women."
          },
          {
            title: "Special Health Awareness & Guidance Session",
            category: "Health & Hygiene",
            date: "24.09.2024",
            image: "/wec/health awareness program 24.9.24.jpg",
            description: "Medical expert lecture providing actionable guidance on mental wellness, fitness routines, and stress management."
          },
          {
            title: "Interactive Health & Wellness Workshop",
            category: "Health & Hygiene",
            date: "24.09.2024",
            image: "/wec/health awareness program 24.9.24.jpg 2.jpg",
            description: "Hands-on wellness workshop focused on preventive healthcare, holistic nutrition, and emotional resilience."
          },
          {
            title: "Infosys Springboard Skill Training Programme",
            category: "Skill Development",
            date: "01.09.2025 – 13.09.2025",
            image: "/wec/infosys trainning 1.9.25-13.9.25-1.png",
            description: "Intensive 13-day career-oriented digital training and soft-skills certification conducted in collaboration with Infosys Springboard."
          },
          {
            title: "National Webinar on Women Empowerment & Career Growth",
            category: "Webinars & Seminars",
            date: "03.03.2025",
            image: "/wec/webinar 3.3.2025.jpg",
            description: "Virtual conference featuring prominent women achievers discussing entrepreneurship, equal opportunity, and professional leadership."
          },
          {
            title: "WEC Student Development & Interactive Forum",
            category: "Student Forum",
            date: "Academic Session",
            image: "/wec/wec2.jpg",
            description: "Peer discussion forum and collaborative activities fostering teamwork, public speaking, and community involvement."
          },
          {
            title: "WEC Awareness Drive & Student Felicitation",
            category: "Felicitation & Outreach",
            date: "Campus Outreach",
            image: "/wec/wec3.jpg",
            description: "Felicitation ceremony recognizing outstanding student volunteers and student leaders contributing to WEC mission."
          }
        ]
      },
      {
        kind: "members",
        title: "WEC Committee Members",
        items: [
          { name: "Dr. R. Senthilrani", role: "Coordinator", phone: "9952137812", email: "senthilranir@svasc.org" },
          { name: "Mrs. B. Kanchanadevi", role: "Member", phone: "7904853505", email: "kanchanadevibcs08@svasc.org" },
          { name: "Mrs. H. S. Prabha Shankar", role: "Member", phone: "9789441141", email: "Prabhahs2242@gmail.com" },
          { name: "Mrs. R. J. Sadhana", role: "Member", phone: "6358210577", email: "sadhana@svasc.org" },
          { name: "Gobika. S", role: "Student Member", extra: "II BBA", phone: "9344088546", email: "gobika7332@gmail.com" },
          { name: "Sivaranjani S", role: "Student Member", extra: "II B.Sc CDF", phone: "6382486286", email: "jayarani3864@gmail.com" },
          { name: "Dharani P", role: "Student Member", extra: "II B.Sc CS (AI&DS)", phone: "9600890463", email: "dharadharu24@gmail.com" },
          { name: "Gracy S", role: "Student Member", extra: "II B.Sc CS (AI&DS)", phone: "9360555676", email: "gracygrace131@gmail.com" }
        ]
      }
    ]
  },
  {
    slug: "/media-cell",
    nav: "Media Cell",
    title: "Social Media & Media Cell",
    hero: "Media Cell",
    intro: "Managing SVASC's digital presence and community engagement through transparent communication, event coverage, and creative storytelling.",
    image: "seminar",
    blocks: [
      {
        kind: "prose",
        title: "Vision",
        body: [
          "To create a connected digital world where people can communicate, collaborate, share knowledge, and access information instantly, fostering innovation, learning, and global relationships."
        ]
      },
      {
        kind: "list",
        title: "Mission",
        items: [
          "To enable seamless communication among people across the world.",
          "To provide a platform for sharing information, ideas, and experiences.",
          "To support learning, collaboration, and community engagement."
        ]
      },
      {
        kind: "numbered",
        title: "Objectives of Media Cell",
        items: [
          "Promote the college's activities, achievements, and events through social media platforms.",
          "Serve as a bridge between the institution, students, alumni, parents, and the wider community.",
          "Ensure timely and transparent communication of academic milestones and campus news."
        ]
      }
    ]
  },
  {
    slug: "/anti-ragging-cell",
    nav: "Anti Ragging",
    title: "Anti Ragging Cell & Committee",
    hero: "Anti Ragging Cell",
    intro: "Fostering a safe, disciplined, inclusive, and ragging-free campus environment that promotes ethical values and mutual respect.",
    image: "campus",
    motto: "Zero Tolerance to Ragging",
    blocks: [
      {
        kind: "prose",
        title: "Vision",
        body: [
          "To foster a safe, disciplined, inclusive, and ragging-free campus environment that promotes ethical values, mutual respect, and holistic development among students."
        ]
      },
      {
        kind: "list",
        title: "Mission",
        items: [
          "To maintain discipline and uphold the rules and regulations of the institution.",
          "To prevent ragging through awareness, vigilance, and strict implementation of anti-ragging measures.",
          "To promote self-discipline, responsibility, and ethical conduct among students."
        ]
      },
      {
        kind: "numbered",
        title: "Objectives",
        items: [
          "To maintain discipline and ensure adherence to institutional rules.",
          "To prevent ragging and create awareness about its harmful physical, psychological, and legal consequences.",
          "To provide a safe, secure, inclusive environment for all new and continuing students."
        ]
      },
      {
        kind: "members",
        title: "Key Leadership",
        items: [
          { name: "Mr. G. Gowtham", role: "Chairperson", extra: "CEO" },
          { name: "Dr. Chi. Nanjappa", role: "Coordinator", extra: "Vice-Principal" }
        ]
      }
    ]
  },
  {
    slug: "/grievance-redressal-committee",
    nav: "Grievance Redressal",
    title: "Grievance Redressal Committee",
    hero: "Grievance Redressal",
    intro: "Providing a structured, confidential platform for students to raise academic, administrative, and personal concerns.",
    image: "campus",
    blocks: [
      {
        kind: "prose",
        title: "Overview",
        body: [
          "The Grievance Redressal Committee provides a structured, confidential platform for students to raise academic, administrative, and personal concerns. All complaints are handled promptly, fairly, and impartially by designated committee members."
        ]
      },
      {
        kind: "list",
        title: "Core Functions",
        items: [
          "Receive and evaluate student complaints regarding academic, administrative, or facility issues.",
          "Conduct impartial inquiries maintaining absolute confidentiality.",
          "Recommend prompt corrective measures to administration."
        ]
      }
    ]
  },
  {
    slug: "/physical-education",
    nav: "Sports & PE",
    title: "Department of Physical Education",
    hero: "Physical Education",
    intro: "Empowering athletes and sports enthusiasts through rigorous coaching, state-of-the-art facilities, and competitive excellence.",
    image: "students",
    motto: "Fit Body, Focused Mind",
    blocks: [
      {
        kind: "prose",
        title: "Overview",
        body: [
          "Our college students actively participate in various sports tournaments including Kabaddi, Weight Lifting, Kho-Kho, Chess, Silambam, Football, Cricket, and Volleyball at inter-collegiate, university, and national levels.",
          "The Physical Education department provides rigorous training and coaching apart from theory classes to enlighten students about the rules of games. Students have bagged winning records at inter-departmental, inter-collegiate, University and National level.",
          "Our college has excellent sports facilities with routine physical exercises, yoga and meditation which strengthens the concentration and contribution of players."
        ]
      },
      {
        kind: "list",
        title: "Key Features & Facilities",
        items: [
          "Professional coaching for team and individual sports.",
          "Regular physical exercises, yoga, and meditation sessions.",
          "Annual inter-departmental sports meet and athletic events.",
          "Excellent sports infrastructure and training equipment."
        ]
      }
    ]
  },
  {
    slug: "/entrepreneurship-development-cell",
    nav: "EDC",
    title: "Entrepreneurship Development Cell",
    hero: "Entrepreneurship Development Cell",
    intro: "Fostering startup thinking, business planning, self-employment skills, and entrepreneurial leadership.",
    image: "seminar",
    blocks: [
      {
        kind: "prose",
        title: "Overview",
        body: [
          "The Entrepreneurship Development Cell (EDC) fosters startup thinking and self-employment skills across all academic departments. It organizes structured workshops on Life Skills Development, business planning, financial literacy, and pitching — bridging the gap between academic knowledge and real-world entrepreneurial success."
        ]
      },
      {
        kind: "list",
        title: "Objectives",
        items: [
          "Encourage creative ideas and startup planning among students.",
          "Conduct workshops on business modeling, financial literacy, and pitching.",
          "Connect student innovators with incubators and funding schemes."
        ]
      }
    ]
  }
];

export const pageBySlug = (slug: string) => pages.find((p) => p.slug === slug)!;

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  ...pages.map((p) => ({ to: p.slug, label: p.nav })),
  { to: "/contact", label: "Contact" },
];
