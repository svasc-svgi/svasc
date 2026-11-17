const PhysicalEducation = require('../../models/sports/physical-education.model');
const fs = require('fs');
const path = require('path');

const INITIAL_SPORTS_DATA = [
  {
    year: "2022-2023",
    game: "CRICKET",
    icon: "fa-baseball-bat-ball",
    color: "#243b53",
    image: "/sports/sport1.png",
    report: "Our college students participated in Bharathiar university inter college D zone Cricket tournament held at Gobi Arts and science college (autonomous),Gobi from 23.02.2023 to 26.02.2023 Fourth position.",
    order: 1
  },
  {
    year: "2023-2024",
    game: "BEST PHYSIQUE",
    icon: "fa-dumbbell",
    color: "#573c2e",
    image: "/sports/sport2.png",
    report: "Our college student Bharathiar university Inter –collegiate tournament Best physique 28.12.2023 (Gold Medal) at Hindusthan arts and science college Coimbatore. Name : Saravanan .S III B.COM",
    order: 2
  },
  {
    year: "2023-2024",
    game: "THROW BALL",
    icon: "fa-volleyball",
    color: "#245b69",
    image: "/sports/sport3.png",
    report: "Our college student particapted in National level Throw Ball Tournament held Punjab Gold medal 2023 2024.",
    order: 3
  },
  {
    year: "2024-2025",
    game: "CRICKET MEN",
    icon: "fa-baseball-bat-ball",
    color: "#344b2e",
    image: "/sports/sport4.png",
    report: "Our college students participated in Bharathiar university inter college D zone Cricket tournament held at Govt Arts and science college Modakurachi from 14.10.2024 to 18.10.2024 Fourth position.",
    order: 4
  },
  {
    year: "2024-2025",
    game: "FOOTBALL MEN",
    icon: "fa-futbol",
    color: "#164b46",
    image: "/sports/sport5.png",
    report: "Our college students participated in Bharathiar university inter college D zone Football tournament held at Gobi Arts and science college Gobi from 30.09.2024 to 01.10.2024.",
    order: 5
  },
  {
    year: "2024-2025",
    game: "KHO-KHO MEN",
    icon: "fa-person-running",
    color: "#67422e",
    image: "/sports/sport6.jpg",
    report: "Our college students particapted in Bharathiar university inter collegiate D-Zone Kho Kho Men tournament held at VET Institute Of Commerce Erode 2024-2025.",
    order: 6
  },
  {
    year: "2024-2025",
    game: "KHO-KHO WOMEN",
    icon: "fa-person-running",
    color: "#623b59",
    image: "/sports/sport7.png",
    report: "Our college students particapted in Bharathiar university inter collegiate Kho Kho tournament held at VET Institute Of Commerce Erode 2024-2025.",
    order: 7
  },
  {
    year: "2024-2025",
    game: "SILAMBAM MEN",
    icon: "fa-medal",
    color: "#67482a",
    image: "/sports/sport8.png",
    report: "Our college student particapted in District level Silambam Tournament held at Tirupur Gold medal 2024 2025.",
    order: 8
  },
  {
    year: "2024-2025",
    game: "CHESS MEN",
    icon: "fa-chess",
    color: "#34405b",
    image: "/sports/sport9.png",
    report: "Our college students participated in Bharathiar university inter collegiate Chess tournament on 9.9.2024 and 10.9.2024 at Sri Krishna arts and science college, Coimbatore.",
    order: 9
  },
  {
    year: "2024-2025",
    game: "WRESTLING WOMEN",
    icon: "fa-medal",
    color: "#663b35",
    image: "/sports/sport10.jpg",
    report: "Our college Student Ms. M.Sankavi has participation In Tamilnadu State Under 17,Under 23, Senior Wrestling Tournament -2024 Held At johindra Sports Academy,Kavery Cross Mettur Dam,Salem. She Won The Gold Medal At 50kg weight category. Our College Student Ms M.Sankavi participated Bharathiar university Level Wrestling Tourntment Contected at All India Inter-University wrestling Guru Kashi University, Bathinda,Punjab.",
    order: 10
  },
  {
    year: "2025-2026",
    game: "YOGA MEN",
    icon: "fa-person",
    color: "#28524c",
    image: "/sports/sport11.jpg",
    report: "This Is to Inform You That Our College Men Yoga Team Has Participated In The Bharathiar University Inter Collegiate (Men) Yoga Tournament Held at NGM Arts and Science College on 06.08.2025. Totally, Thirty Six Various Affiliated Colleges Participated in This Tournament Individual Yoga Competition our college students got position II.",
    order: 11
  },
  {
    year: "2025-2026",
    game: "HANDBALL WOMEN",
    icon: "fa-hand",
    color: "#4a426b",
    image: "/sports/sport12.jpg",
    report: "This Is Inform You That Our College Women Handball Team Has Participated in The CM Trophy (Women) Handball Tournament Held at Kongu Engineering College on 26.08.2025 to 27.08.2025. Our College Students Secured Position IV.",
    order: 12
  },
  {
    year: "2025-2026",
    game: "CHESS MEN",
    icon: "fa-chess",
    color: "#35415b",
    image: "/sports/sport13.jpg",
    report: "This Is Inform You That Our College Men Chess Team Has Participated in The Bharathiar University Inter Collegiate (Men) Chess Tournament Held at Dr.RV Arts and Science College Coimbatore on 18.08.2025 to 19.08.2025. Our College Team Secured 8th Position.",
    order: 13
  },
  {
    year: "2025-2026",
    game: "KARATE MEN",
    icon: "fa-hand-fist",
    color: "#69352f",
    image: "/sports/sport14.jpg",
    report: "Our College Student V.Praveen II-B.Com (B&I) Won the First Place in the 16th State Level Open Karate Championship 2025 Held at Erode.",
    order: 14
  },
  {
    year: "2025-2026",
    game: "SILAMBAM MEN",
    icon: "fa-medal",
    color: "#76502a",
    image: "/sports/sport15.jpg",
    report: "Our College Student A.MATHIYOLI - II BSC AIDS Won the First Place in the GRAND OPEN NATIONAL SILAMBAM-2025 Held at Hindusthan Institutions, Nava India, Coimbatore.",
    order: 15
  },
  {
    year: "2025-2026",
    game: "FOOTBALL MEN",
    icon: "fa-futbol",
    color: "#245448",
    image: "",
    report: "This is to Inform You That Our College Men Football Team Has Participated in The Bharathiar University Inter Collegiate D-Zone (Men) Football Tournament Held at Gobi Arts and Science College Gobi on 15.09.2025 to 16.09.2025.",
    order: 16
  },
  {
    year: "2025-2026",
    game: "CRICKET MEN",
    icon: "fa-baseball-bat-ball",
    color: "#385132",
    image: "",
    report: "This Is Inform You That Our College Men Cricket Team Has Participated in The Bharathiar University Inter Collegiate D-Zone (Men) Cricket Tournament Held at Gobi Arts and Science College Gobi on 25.10.2025 to 30.10.2025.Our College secured II Position.",
    order: 17
  },
  {
    year: "2025-2026",
    game: "ATHLETIC",
    icon: "fa-person-running",
    color: "#4d4266",
    image: "",
    report: "Our College Student ESWARI Participated in Bharathiar University Inter College Athletics 400 M and won the IV-Place.",
    order: 18
  },
  {
    year: "2025-2026",
    game: "SILAMBAM WOMEN",
    icon: "fa-medal",
    color: "#72422c",
    image: "",
    report: "Our College Student M.SUBHASHREE Participated in ERODE District Level Silambam won the II-Place.",
    order: 19
  },
  {
    year: "2025-2026",
    game: "CRICKET MEN",
    icon: "fa-baseball-bat-ball",
    color: "#34513c",
    image: "",
    report: "Our College Student Gokul.C Bharathiar University Intercollegiate Cricket Tournament Best Bowler Award.",
    order: 20
  },
  {
    year: "2025-2026",
    game: "WRESTLING WOMEN",
    icon: "fa-medal",
    color: "#633a48",
    image: "",
    report: "Our College Student M.Sankavi Wrestling All India Inter University Form-III.",
    order: 21
  },
  {
    year: "2026-2027",
    game: "SILAMBAM",
    icon: "fa-medal",
    color: "#694a2b",
    image: "",
    report: "Our College students A. Mathiyoli and M. Subashree have secured First Place in the District-Level Silambam Competition held at Tiruppur.ge Students A.Mathiyoli and M.Subashree.",
    order: 22
  },
  {
    year: "2026-2027",
    game: "SILAMBAM",
    icon: "fa-medal",
    color: "#714a2a",
    image: "",
    report: "Our College Student A. Mathiyoli Secured First place and Won a Gold Medal in the CM Trophy Silambam competition.2026-27.",
    order: 23
  },
  {
    year: "2026-2027",
    game: "KHO-KHO",
    icon: "fa-person-running",
    color: "#62412e",
    image: "",
    report: "Our college students secured THIRD PLACE in the Bharathiar university inter collegiate D-Zone Kho Kho tournament held at Karuppannan Mariappan College Tirupur on 11.11.2026.",
    order: 24
  },
  {
    year: "2026-2027",
    game: "FOOTBALL",
    icon: "fa-futbol",
    color: "#254f45",
    image: "",
    report: "Our college students secured FOURTH PLACE in the Bharathiar university inter collegiate D-Zone Football tournament held at Gobi Arts and Science College, Gobi on 12.11.2026.",
    order: 25
  }
];

const getAll = async () => {
  const count = await PhysicalEducation.countDocuments();
  if (count === 0) {
    try {
      await PhysicalEducation.insertMany(INITIAL_SPORTS_DATA);
    } catch (e) {
      console.warn('Could not seed initial physical education data:', e.message);
    }
  }
  return await PhysicalEducation.find().sort({ order: 1, createdAt: 1 }).lean();
};

const getById = async (id) => {
  return await PhysicalEducation.findById(id).lean();
};

const create = async (data) => {
  const item = new PhysicalEducation(data);
  return await item.save();
};

const update = async (id, data) => {
  return await PhysicalEducation.findByIdAndUpdate(id, data, { new: true });
};

const deleteItem = async (id) => {
  const item = await PhysicalEducation.findById(id);
  if (item && item.image && !item.image.startsWith('http') && !item.image.startsWith('/sports')) {
    const filePath = path.join(__dirname, '..', '..', 'uploads', path.basename(item.image));
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {}
    }
  }
  return await PhysicalEducation.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteItem
};
