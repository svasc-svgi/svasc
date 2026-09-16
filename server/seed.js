// Seed data using native fetch
const defaultAwardData = {
    '2010': [
        ["Sevai Kalappani Selvar Virudhu", "Dr. M. Jasmine Priya"],
        ["Chithirai kavi", "Dr. M. Jasmine Priya"],
        ["Dr. Sarvepalli Radhakrishnan Education Excellence", "Dr. V. Princy Metildah"],
        ["Nari Ratna Award", "Mrs. A. Devika"]
    ],
    '2017': [["Best Librarian Award", "Dr. M. Sethuramasamy"]],
    '2018': [["Best Educationist Award", "Dr. Ajeet Kumar Lal Mohan"]],
    '2019': [
        ["Kalvi Maamani Award", "Dr. Ajeet Kumar Lal Mohan"],
        ["Kongu Thalaimagan Award", "Dr. Ajeet Kumar Lal Mohan"]
    ],
    '2020': [["Best NSS Programme Officer Award", "Dr. M. Jasmine Priya"]],
    '2021': [["Azadi Ka Amrit Award", "Dr. M. Jasmine Priya"]]
};

async function seedData() {
    console.log("Starting seed process...");
    for (const year of Object.keys(defaultAwardData)) {
        for (const award of defaultAwardData[year]) {
            try {
                const response = await fetch('http://localhost:5000/api/about/teacher-awards', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        year: parseInt(year),
                        awardName: award[0],
                        facultyName: award[1]
                    })
                });
                
                if (response.ok) {
                    console.log(`Seeded: ${year} - ${award[0]}`);
                } else {
                    console.error(`Failed to seed ${year} - ${award[0]}`);
                }
            } catch (err) {
                console.error("Error seeding:", err.message);
            }
        }
    }
    console.log("Seeding complete!");
}

seedData();
