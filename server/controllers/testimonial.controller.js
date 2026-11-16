const Testimonial = require('../models/testimonial.model');

const DEFAULT_TESTIMONIALS = [
    {
        name: "E.Pooja - B.Sc. Computer Science (2023 batch)",
        text: "SVASC taught me discipline, leadership, and confidence through quality academics and active event opportunities. The practical skills and faculty mentorship I received here have been invaluable in my career. I am truly grateful to SVASC for shaping me into a better person!",
        image: "/testimonials/pooja.jpg",
        department: "B.Sc. Computer Science",
        batch: "2023",
        order: 1
    },
    {
        name: "B.Logitha - B.Sc. Computer Science (2023 batch)",
        text: "My college days at SVASC were the most memorable phase of my life. The supportive professors encouraged both our academic excellence and personal growth. I will always cherish the valuable life lessons, friendships, and experiences I gained here!",
        image: "/testimonials/logitha.jpg",
        department: "B.Sc. Computer Science",
        batch: "2023",
        order: 2
    },
    {
        name: "P. SOBIYA - B.Sc.(CS) (2022 batch)",
        text: "My experience at SVASC was immensely positive. The vibrant environment, enthusiastic students, and welcoming, supportive faculty made learning a wonderful experience. Thank you, SVASC, for creating such an empowering atmosphere!",
        image: "/testimonials/sobiya.jpg",
        department: "B.Sc. Computer Science",
        batch: "2022",
        order: 3
    },
    {
        name: "S.manikandan - B.Sc. CS (2019 batch)",
        text: "My journey at SVASC (2019–2022) provided excellent academic support and approachable mentors. The curriculum strengthened my technical skills and built the confidence needed for my career. I am deeply thankful to the institution for this solid foundation!",
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
