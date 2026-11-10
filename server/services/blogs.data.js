// Standard default blogs covering all 6 categories and all 24 cards
const DEFAULT_BLOGS = [
    {
        category: "Campus Life & Community",
        title: "Campus Life & Community Overview",
        bannerImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
        author: "SVASC Editorial",
        date: "25 May, 2026",
        readTime: "4 min read",
        description: `<p>Welcome to our comprehensive college blogs portal. Here you'll find insightful articles and stories about all aspects of campus life including academic insights, cultural experiences, innovation showcases, student achievements, and official SVASC announcements.</p> <p>Our college is committed to sharing experiences and knowledge that enriches the educational journey. From technical tutorials to cultural reflections, from sports highlights to expert interviews, we ensure that every student has access to inspiring content that helps them learn, grow, and connect.</p><p>Stay updated with all the latest blog posts and stories from our campus. Check back regularly for new articles, insights, and opportunities to contribute to the vibrant narrative of our college community.</p>`,
        order: 0,
        cards: [
            {
                image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
                title: "Campus Overview",
                description: "A detailed glimpse into the SVASC state-of-the-art campus, modern learning zones, and green open spaces."
            },
            {
                image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400",
                title: "Student Life",
                description: "Vibrant clubs, daily campus activities, friendship, leadership opportunities, and community fellowship."
            },
            {
                image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400",
                title: "Facilities",
                description: "High-tech laboratories, modern smart classrooms, comprehensive library facilities, and recreational avenues."
            },
            {
                image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400",
                title: "Activities",
                description: "Extracurriculars, workshops, seminars, NSS, YRC, and campus celebration days throughout the academic year."
            }
        ]
    },
    {
        category: "Academic Events",
        title: "Scholarly Milestones & Departmental Seminars",
        bannerImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800",
        author: "SVASC Editorial",
        date: "24 May, 2026",
        readTime: "5 min read",
        description: `<p>Our Academic Blogs section features insightful articles about scholarly activities including guest lectures, seminars, workshops, research findings, and academic competitions. These blogs are designed to share knowledge and foster intellectual growth among students and faculty.</p> <p>Recent blog posts cover distinguished speaker insights, departmental research highlights, competition experiences, and interdisciplinary explorations. Students share their experiences in music, dance, drama, art, and various traditional and contemporary art forms. These blog posts provide a platform for students to express themselves, appreciate different cultures, and build a sense of community and belonging.</p><p>We encourage all students to read and contribute to these academic blogs to broaden their horizons, develop critical thinking skills, and stay updated with the latest developments in their fields of study.</p>`,
        order: 1,
        cards: [
            {
                image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400",
                title: "Guest Lectures",
                description: "Eminent industry experts and university scholars delivering masterclasses on cutting-edge topics."
            },
            {
                image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400",
                title: "Seminars",
                description: "Interactive departmental seminars providing students with platforms to discuss research innovations."
            },
            {
                image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400",
                title: "Workshops",
                description: "Practical hands-on technical workshops bridging classroom theory with industrial practices."
            },
            {
                image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400",
                title: "Competitions",
                description: "Inter-collegiate and intra-departmental academic challenges, hackathons, and quiz tournaments."
            }
        ]
    },
    {
        category: "Cultural",
        title: "Cultural Diversity & Artistic Celebrations",
        bannerImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
        author: "SVASC Editorial",
        date: "23 May, 2026",
        readTime: "4 min read",
        description: `<p>Cultural blogs at our college celebrate diversity, creativity, and artistic expression. From annual festival recaps to talent showcase features, traditional celebration stories to modern performance reviews, our blogs capture the vibrant cultural pulse of campus life throughout the year.</p> <p>Students share their experiences in music, dance, drama, art, and various traditional and contemporary art forms. These blog posts provide a platform for students to express themselves, appreciate different cultures, and build a sense of community and belonging.</p><p>Our cultural committee regularly publishes stories about festival celebrations, cultural nights, inter-college competitions, and artistic workshops that enrich the campus atmosphere and create lasting memories for all participants.</p>`,
        order: 2,
        cards: [
            {
                image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400",
                title: "Music Events",
                description: "Live acoustic sessions, vocal recitals, instrumental jams, and annual musical competitions."
            },
            {
                image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400",
                title: "Dance Shows",
                description: "Traditional classical forms, western contemporary dance, and vibrant folk performances."
            },
            {
                image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400",
                title: "Drama & Theater",
                description: "Thought-provoking theatrical plays, skits on social themes, and mime presentations."
            },
            {
                image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400",
                title: "Art Exhibitions",
                description: "Creative oil paintings, digital art, charcoal sketches, and handcrafted sculpture showcases."
            }
        ]
    },
    {
        category: "Innovations in Education and Technology",
        title: "Tech Frontiers, AI & Digital Pedagogy",
        bannerImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800",
        author: "SVASC Editorial",
        date: "22 May, 2026",
        readTime: "5 min read",
        description: `<p>Explore the future of education and technology through our innovative blog posts. We cover emerging trends in educational technology, digital learning tools, STEM initiatives, research breakthroughs, and modern teaching methodologies that are transforming higher education.</p> <p>Our contributors discuss artificial intelligence in education, virtual learning environments, innovative classroom practices, student technology projects, and collaborations with tech industry leaders. These blogs offer forward-looking perspectives on how education is evolving.</p><p>Stay ahead of the curve by following our innovation blogs. Discover how our institution is adapting to technological changes and preparing students for the digital future through cutting-edge curricula and state-of-the-art facilities.</p>`,
        order: 3,
        cards: [
            {
                image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400",
                title: "Hackathons",
                description: "24-hour non-stop code sprints and solution development tackling real-world problems."
            },
            {
                image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400",
                title: "Tech Fests",
                description: "Annual technical extravaganza featuring robotics showcases, web coding, and tech gaming."
            },
            {
                image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400",
                title: "Startup Programs",
                description: "Incubation support, business pitching workshops, and entrepreneurship mentoring."
            },
            {
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
                title: "Innovation Lab",
                description: "Prototyping equipment, IoT sensors, AI workstations, and 3D printing equipment."
            }
        ]
    },
    {
        category: "Student Activities and Achievements",
        title: "Student Honors, Sports & Community Action",
        bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",
        author: "SVASC Editorial",
        date: "21 May, 2026",
        readTime: "4 min read",
        description: `<p>Celebrate the accomplishments, talents, and active involvement of our students through these inspiring blog posts. We highlight academic honors, sports victories, club initiatives, leadership experiences, community service projects, and personal growth stories of our dynamic student body.</p> <p>Read about student-led organizations, volunteer efforts, competition wins, entrepreneurship ventures, and impactful campus initiatives. These blogs showcase the diverse ways our students make a difference both on campus and in the broader community.</p><p>Get inspired by the passion, dedication, and creativity of our students. Learn how participation in extracurricular activities contributes to holistic development and prepares students for future success in their careers and personal lives.</p>`,
        order: 4,
        cards: [
            {
                image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400",
                title: "Awards",
                description: "State and national accolades, academic distinctions, and university rank holders."
            },
            {
                image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400",
                title: "Sports",
                description: "Medals, university championship trophies, athletic meets, and tournament victories."
            },
            {
                image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400",
                title: "Research",
                description: "Peer-reviewed scientific journals, patent applications, and conference paper presentations."
            },
            {
                image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400",
                title: "Community Service",
                description: "NSS village adoption drives, blood donation camps, and environmental conservation walks."
            }
        ]
    },
    {
        category: "SVASC News",
        title: "Official Announcements & Campus Updates",
        bannerImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800",
        author: "SVASC Editorial",
        date: "20 May, 2026",
        readTime: "3 min read",
        description: `<p>Stay informed with the latest official announcements, news articles, and blog updates from SVASC. This section includes important notices, policy updates, administrative blog posts, academic calendar information, and institutional development stories.</p> <p>Recent blog posts cover new course launches, infrastructure developments, collaborations with industry partners, accreditation achievements, placement records, and other significant milestones reached by our institution.</p><p>We ensure transparent communication with students, faculty, and stakeholders through regular blog updates about college activities, upcoming initiatives, examination schedules, admission procedures, and other important information that affects the college community.</p>`,
        order: 5,
        cards: [
            {
                image: "https://images.unsplash.com/photo-1586339949216-35c7e6b3c0ab?w=400",
                title: "Announcements",
                description: "Official college circulars, examination updates, and academic notifications."
            },
            {
                image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
                title: "Updates",
                description: "New curriculum additions, campus upgrades, and student services enhancements."
            },
            {
                image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400",
                title: "Infrastructure",
                description: "Modern campus facilities, sports grounds, cafeteria, and smart classroom expansions."
            },
            {
                image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400",
                title: "Achievements",
                description: "Institutional rankings, NAAC accreditation distinctions, and university affiliations."
            }
        ]
    }
];

module.exports = { DEFAULT_BLOGS };
