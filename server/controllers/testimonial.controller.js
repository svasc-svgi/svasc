const Testimonial = require('../models/testimonial.model');

const DEFAULT_TESTIMONIALS = [
    {
        name: "E.Pooja - B.Sc. Computer Science (2023 batch)",
        text: "I am truly grateful for my time at Shree Venkateshwara Arts and Science College.\n\nBeyond academics, this college taught me how to be professional, disciplined, and confident. I got many opportunities to stand in front of people and organize various functions and events, which greatly improved my leadership, communication, and management skills.\n\nThe experience I gained here been extremely useful to me after completing my college life, especially in my professional journey. I will always be thankful to the faculty and management for their guidance and support.\n\nThank you for shaping me into a better person.",
        image: "/testimonials/pooja.jpg",
        department: "B.Sc. Computer Science",
        batch: "2023",
        order: 1
    },
    {
        name: "B.Logitha - B.Sc. Computer Science (2023 batch)",
        text: "Being a pass-out student of Shree Venkateshwara Arts and Science College, I can proudly say that my college days were one of the most beautiful phases of my life. It was not just a place where I gained knowledge, but also a place where I learned valuable life lessons, built beautiful friendships, and created memories that will always stay close to my heart.\n\nThe teachers were always supportive and encouraged us to do better in our studies and personal growth. Every moment spent on campus, from attending classes to spending time with friends, has become a special memory.\n\nI am truly thankful for all the experiences, guidance, and opportunities I received during my time here. No matter where life takes me, a part of my journey will always belong to this college. ❤️\n\nThank you, Shree Venkateshwara Arts and Science College, for giving me beautiful memories, valuable lessons, and experiences that I will cherish forever!",
        image: "/testimonials/logitha.jpg",
        department: "B.Sc. Computer Science",
        batch: "2023",
        order: 2
    },
    {
        name: "P. SOBIYA - B.Sc.(CS) (2022 batch)",
        text: "My experience at your college was very positive. The students were enthusiastic and eager to learn. The faculty and staff were friendly, supportive, and well-coordinated. I truly appreciate their warm hospitality. It was a wonderful opportunity to interact with students and guide them as a mentor.\n\nThank You!",
        image: "/testimonials/sobiya.jpg",
        department: "B.Sc. Computer Science",
        batch: "2022",
        order: 3
    },
    {
        name: "S.manikandan - B.Sc. CS (2019 batch)",
        text: "My journey at Shree Venkateshwara Arts and Science College, Othakuthira, Gobichettipalayam (2019–2022) was a meaningful and valuable experience. The college provided a positive learning environment, excellent academic support, and opportunities to enhance both knowledge and personal skills. The faculty members were knowledgeable, approachable, and supportive, offering proper guidance and encouragement throughout the academic journey. Their dedication to teaching and willingness to share their knowledge played an important role in my learning and development. Overall, my B.Sc. Computer Science experience helped me build confidence, improve my skills, and prepare for future opportunities. I am grateful for the knowledge and experiences gained during my time at this institution.",
        image: "/testimonials/manikandan.jpg",
        department: "B.Sc. Computer Science",
        batch: "2019",
        order: 4
    }
];

exports.getAllTestimonials = async (req, res) => {
    try {
        let items = await Testimonial.find().sort({ order: 1, createdAt: 1 });
        if (!items || items.length === 0) {
            // Seed defaults
            try {
                items = await Testimonial.insertMany(DEFAULT_TESTIMONIALS);
            } catch (seedErr) {
                console.warn('Could not seed default testimonials to DB:', seedErr.message);
                items = DEFAULT_TESTIMONIALS;
            }
        }
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createTestimonial = async (req, res) => {
    try {
        const item = new Testimonial(req.body);
        const saved = await item.save();
        res.status(201).json({ success: true, data: saved });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.updateTestimonial = async (req, res) => {
    try {
        const updated = await Testimonial.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }
        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.deleteTestimonial = async (req, res) => {
    try {
        const deleted = await Testimonial.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }
        res.status(200).json({ success: true, message: 'Testimonial deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
