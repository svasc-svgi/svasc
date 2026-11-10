// 24 Individual Blog Cards across all 6 categories
const DEFAULT_BLOGS = [
    // ─── 1. Campus Life & Community ──────────────────────────────────────────
    {
        title: "Campus Overview",
        category: "Campus Life & Community",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
        description: "<p>A detailed glimpse into the SVASC state-of-the-art campus, modern learning zones, and green open spaces. Our college is committed to sharing experiences and knowledge that enriches the educational journey. From technical tutorials to cultural reflections, from sports highlights to expert interviews, we ensure that every student has access to inspiring content that helps them learn, grow, and connect.</p><p>Explore our vibrant educational ecosystem featuring modern architecture, student recreational areas, botanical gardens, and world-class sports amenities that inspire greatness every day.</p>",
        author: "SVASC Editorial",
        date: "25 May, 2026",
        readTime: "4 min read",
        order: 0
    },
    {
        title: "Student Life",
        category: "Campus Life & Community",
        image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
        description: "<p>Vibrant clubs, daily campus activities, friendship, leadership opportunities, and community fellowship. Student life at SVASC is a balanced blend of academic discipline and co-curricular vibrancy where lifelong friendships and career foundations are built.</p><p>With dozens of student-led clubs, cultural committees, and technical forums, every learner finds their passion, hones soft skills, and experiences the warmth of our welcoming collegiate family.</p>",
        author: "SVASC Editorial",
        date: "25 May, 2026",
        readTime: "4 min read",
        order: 1
    },
    {
        title: "Facilities",
        category: "Campus Life & Community",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
        description: "<p>High-tech laboratories, modern smart classrooms, comprehensive library facilities, and recreational avenues. We provide cutting-edge physical and digital infrastructure to support both theoretical learning and experiential discovery.</p><p>From smart board enabled lecture halls to high-speed campus-wide WiFi and well-maintained hostel amenities, SVASC provides an unmatched learning environment.</p>",
        author: "SVASC Editorial",
        date: "24 May, 2026",
        readTime: "3 min read",
        order: 2
    },
    {
        title: "Activities",
        category: "Campus Life & Community",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",
        description: "<p>Extracurriculars, workshops, seminars, NSS, YRC, and campus celebration days throughout the academic year. Activities at SVASC empower students to step out of their comfort zones, discover hidden talents, and contribute meaningfully to society.</p><p>Participate in annual day functions, sports championships, awareness rallies, and leadership bootcamps that prepare students for tomorrow's challenges.</p>",
        author: "SVASC Editorial",
        date: "24 May, 2026",
        readTime: "4 min read",
        order: 3
    },

    // ─── 2. Academic Events ──────────────────────────────────────────────────
    {
        title: "Guest Lectures",
        category: "Academic Events",
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
        description: "<p>Eminent industry experts, corporate leaders, and university scholars regularly visit SVASC to deliver masterclasses on cutting-edge topics. These lectures bridge the divide between theoretical curricula and contemporary industrial realities.</p><p>Students gain direct exposure to career avenues, emerging market requirements, and personal insights from industry leaders in technology, finance, life sciences, and literature.</p>",
        author: "SVASC Editorial",
        date: "24 May, 2026",
        readTime: "5 min read",
        order: 4
    },
    {
        title: "Seminars",
        category: "Academic Events",
        image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800",
        description: "<p>Interactive departmental seminars providing students with platforms to discuss research innovations, debate recent discoveries, and enhance their academic presentation skills.</p><p>Each department organizes state and national level seminars featuring paper presentations, panel discussions, and collaborative intellectual exchanges.</p>",
        author: "SVASC Editorial",
        date: "23 May, 2026",
        readTime: "4 min read",
        order: 5
    },
    {
        title: "Workshops",
        category: "Academic Events",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800",
        description: "<p>Practical hands-on technical workshops bridging classroom theory with industrial practices. Participants master in-demand tools, experimental techniques, data analysis packages, and creative writing skills.</p><p>Guided by specialized practitioners, students complete live projects, gain certificates, and build strong professional portfolios.</p>",
        author: "SVASC Editorial",
        date: "23 May, 2026",
        readTime: "4 min read",
        order: 6
    },
    {
        title: "Competitions",
        category: "Academic Events",
        image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800",
        description: "<p>Inter-collegiate and intra-departmental academic challenges, hackathons, and quiz tournaments. These competitive platforms instill agility, critical problem solving, and confidence in our students.</p><p>SVASC scholars regularly secure top podium spots in state-wide competitions, bringing pride and distinction to the institution.</p>",
        author: "SVASC Editorial",
        date: "22 May, 2026",
        readTime: "3 min read",
        order: 7
    },

    // ─── 3. Cultural ─────────────────────────────────────────────────────────
    {
        title: "Music Events",
        category: "Cultural",
        image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800",
        description: "<p>Live acoustic sessions, vocal recitals, instrumental jams, and annual musical competitions that capture the vibrant cultural pulse of campus life throughout the year.</p><p>From classical Carnatic and folk melodies to modern band performances, our music club cultivates auditory artistry and stage confidence.</p>",
        author: "SVASC Editorial",
        date: "22 May, 2026",
        readTime: "4 min read",
        order: 8
    },
    {
        title: "Dance Shows",
        category: "Cultural",
        image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800",
        description: "<p>Traditional classical forms like Bharatanatyam, western contemporary dance, and vibrant folk performances celebrating heritage, synchronization, and athletic grace.</p><p>Our dance troupes light up the campus auditorium with mesmerizing choreography and storytelling through motion.</p>",
        author: "SVASC Editorial",
        date: "21 May, 2026",
        readTime: "3 min read",
        order: 9
    },
    {
        title: "Drama & Theater",
        category: "Cultural",
        image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800",
        description: "<p>Thought-provoking theatrical plays, skits on social themes, and mime presentations giving voice to creativity, acting talent, and social consciousness.</p><p>Theater at SVASC teaches voice modulation, emotional expression, script writing, and teamwork that resonates deeply with audiences.</p>",
        author: "SVASC Editorial",
        date: "21 May, 2026",
        readTime: "4 min read",
        order: 10
    },
    {
        title: "Art Exhibitions",
        category: "Cultural",
        image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800",
        description: "<p>Creative oil paintings, digital art, charcoal sketches, and handcrafted sculpture showcases providing aspiring student artists a platform to display their visual imaginations.</p><p>The annual SVASC Art Gallery attracts faculty, peers, and external art lovers who appreciate the delicate craftsmanship and vision of student artists.</p>",
        author: "SVASC Editorial",
        date: "20 May, 2026",
        readTime: "3 min read",
        order: 11
    },

    // ─── 4. Innovations in Education and Technology ───────────────────────────
    {
        title: "Hackathons",
        category: "Innovations in Education and Technology",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
        description: "<p>24-hour non-stop code sprints and solution challenges solving real community problems through software development, AI models, and collaborative teamwork.</p><p>Students develop practical prototypes, cloud-native apps, and machine learning solutions evaluated by seasoned tech industry judges.</p>",
        author: "SVASC Editorial",
        date: "20 May, 2026",
        readTime: "5 min read",
        order: 12
    },
    {
        title: "Tech Fests",
        category: "Innovations in Education and Technology",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
        description: "<p>Annual technical extravaganza featuring project displays, robotics arenas, and tech talks from pioneers in computer science, science, and management.</p><p>Tech fests draw talent from across universities, creating an electric atmosphere of innovation, live challenges, and geek culture.</p>",
        author: "SVASC Editorial",
        date: "19 May, 2026",
        readTime: "4 min read",
        order: 13
    },
    {
        title: "Startup Programs",
        category: "Innovations in Education and Technology",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
        description: "<p>Incubation support, business pitching workshops, and student entrepreneurship guidance fostering commercial viability and startup innovation on campus.</p><p>The Entrepreneurship Development Cell (EDC) provides seed mentorship, legal patent guidance, and investor networking for student founders.</p>",
        author: "SVASC Editorial",
        date: "19 May, 2026",
        readTime: "4 min read",
        order: 14
    },
    {
        title: "Innovation Lab",
        category: "Innovations in Education and Technology",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
        description: "<p>Prototyping equipment, IoT sensors, AI workstations, and creative exploration spaces where students turn theoretical concepts into tangible working prototypes.</p><p>Equipped with modern computing hardware and rapid prototyping tools, the lab serves as an open playground for inventors and researchers.</p>",
        author: "SVASC Editorial",
        date: "18 May, 2026",
        readTime: "4 min read",
        order: 15
    },

    // ─── 5. Student Activities and Achievements ───────────────────────────────
    {
        title: "Awards",
        category: "Student Activities and Achievements",
        image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800",
        description: "<p>State and national accolades, academic distinctions, and leadership recognition honoring outstanding students who demonstrate excellence in studies and co-curriculars.</p><p>Every year, SVASC honors students who raise the benchmark of excellence and represent our core values of dedication and integrity.</p>",
        author: "SVASC Editorial",
        date: "18 May, 2026",
        readTime: "4 min read",
        order: 16
    },
    {
        title: "Sports",
        category: "Student Activities and Achievements",
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800",
        description: "<p>Medals, university championship trophies, and athletic records set by our student athletes across cricket, kabaddi, volleyball, athletics, and chess.</p><p>Our dedicated Department of Physical Education provides professional coaching, state-of-the-art courts, and nutrition support that powers champion teams.</p>",
        author: "SVASC Editorial",
        date: "17 May, 2026",
        readTime: "3 min read",
        order: 17
    },
    {
        title: "Research",
        category: "Student Activities and Achievements",
        image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800",
        description: "<p>Peer-reviewed scientific journals, patents, and faculty-student collaborative papers demonstrating research rigor, curiosity, and academic inquiry.</p><p>Undergraduate and postgraduate scholars receive grants and guidance to publish findings in Scopus, UGC-CARE, and international journals.</p>",
        author: "SVASC Editorial",
        date: "17 May, 2026",
        readTime: "4 min read",
        order: 18
    },
    {
        title: "Community Service",
        category: "Student Activities and Achievements",
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800",
        description: "<p>NSS village adoption drives, blood donation camps, and environmental conservation walks nurturing active civic responsibility and compassionate social leadership.</p><p>Our volunteers plant thousands of saplings, organize health screening clinics, and conduct digital literacy drives across rural neighboring communities.</p>",
        author: "SVASC Editorial",
        date: "16 May, 2026",
        readTime: "4 min read",
        order: 19
    },

    // ─── 6. SVASC News ───────────────────────────────────────────────────────
    {
        title: "Announcements",
        category: "SVASC News",
        image: "https://images.unsplash.com/photo-1586339949216-35c7e6b3c0ab?w=800",
        description: "<p>Official college circulars, examination updates, and academic notifications ensuring clear and timely institutional communication with students and parents.</p><p>Stay informed about university examination schedules, application deadlines, scholarship announcements, and holiday declarations.</p>",
        author: "SVASC Editorial",
        date: "16 May, 2026",
        readTime: "3 min read",
        order: 20
    },
    {
        title: "Updates",
        category: "SVASC News",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
        description: "<p>New curriculum additions, campus upgrades, and student services enhancements reflecting the continuous progress and modern development of SVASC.</p><p>We continually evolve our teaching-learning frameworks to align with NEP guidelines, international academic benchmarks, and industry skill demands.</p>",
        author: "SVASC Editorial",
        date: "15 May, 2026",
        readTime: "3 min read",
        order: 21
    },
    {
        title: "Infrastructure",
        category: "SVASC News",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800",
        description: "<p>Modern campus facilities, sports grounds, cafeteria, and smart classroom expansions built to provide a world-class environment for teaching and learning.</p><p>Recent infrastructure additions include high-capacity computer labs, an extended digital reading room, and eco-friendly solar lighting campus-wide.</p>",
        author: "SVASC Editorial",
        date: "15 May, 2026",
        readTime: "3 min read",
        order: 22
    },
    {
        title: "Achievements",
        category: "SVASC News",
        image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800",
        description: "<p>Institutional rankings, NAAC accreditation distinctions, and university affiliations highlighting SVASC's standing as a leading higher education institution.</p><p>Our faculty, students, and management work hand-in-hand to attain stellar placement records, university gold medals, and state-level institutional awards.</p>",
        author: "SVASC Editorial",
        date: "14 May, 2026",
        readTime: "4 min read",
        order: 23
    }
];

module.exports = { DEFAULT_BLOGS };
