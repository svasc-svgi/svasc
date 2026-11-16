const Testimonial = require('../models/testimonial.model');

const DEFAULT_TESTIMONIALS = [
    {
        name: "E.Pooja - B.Sc. Computer Science (2023 batch)",
        text: "I am truly grateful for my transformative time at Shree Venkateshwara Arts and Science College.\nBeyond classroom academics, the college taught me professionalism, discipline, and strong confidence.\nOrganizing various campus events enhanced my leadership, public communication, and management abilities.\nThe practical exposure and values gained here have proven invaluable in my ongoing professional career.\nI will always remain deeply thankful to the encouraging faculty and visionary management for their support.\nThank you, SVASC, for inspiring my growth and shaping me into a competent and capable person!",
        image: "/testimonials/pooja.jpg",
        department: "B.Sc. Computer Science",
        batch: "2023",
        order: 1
    },
    {
        name: "B.Logitha - B.Sc. Computer Science (2023 batch)",
        text: "As a proud alumna of Shree Venkateshwara Arts and Science College, my college days remain unforgettable.\nIt was an enriching environment where I gained deep knowledge, valuable life lessons, and lasting friendships.\nDedicated professors constantly encouraged us to excel in our academic pursuits and personal development.\nEvery moment spent across the vibrant campus provided me with meaningful guidance and bright opportunities.\nNo matter where my career leads, the values, memories, and inspiration gained here stay close to my heart.\nThank you, Shree Venkateshwara Arts and Science College, for memories and lessons I will cherish forever!",
        image: "/testimonials/logitha.jpg",
        department: "B.Sc. Computer Science",
        batch: "2023",
        order: 2
    },
    {
        name: "P. SOBIYA - B.Sc.(CS) (2022 batch)",
        text: "My overall experience at Shree Venkateshwara Arts and Science College was immensely positive.\nThe academic atmosphere is vibrant, with enthusiastic students who are genuinely eager to learn.\nThe faculty members and staff are consistently welcoming, supportive, and exceptionally well-coordinated.\nI truly appreciate the warm institutional hospitality and thoughtful encouragement extended at all times.\nIt was a remarkable opportunity to interact with talented peers, share knowledge, and grow together.\nThank you, SVASC, for creating such an inspiring and empowering environment for all learners!",
        image: "/testimonials/sobiya.jpg",
        department: "B.Sc. Computer Science",
        batch: "2022",
        order: 3
    },
    {
        name: "S.manikandan - B.Sc. CS (2019 batch)",
        text: "My journey at Shree Venkateshwara Arts and Science College (2019–2022) was a deeply valuable experience.\nThe institution provided a positive learning environment paired with exceptional academic support.\nApproachable faculty members offered dedicated guidance and shared immense knowledge with us.\nThe comprehensive B.Sc. Computer Science curriculum significantly strengthened my technical skills.\nThis rigorous training built my self-confidence and thoroughly prepared me for future industry avenues.\nI remain sincerely grateful to SVASC for the knowledge, opportunities, and foundation gifted to my career.",
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
