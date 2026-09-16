import React, { useEffect } from 'react';
import styles from './Statistics.module.css';
import Hero from '../components/Common/Hero';

const Statistics = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const placementData = [
        { year: '2025–2026', strength: 499, percentage: '83%' },
        { year: '2024–2025', strength: 450, percentage: '80%' },
        { year: '2023–2024', strength: 380, percentage: '78%' },
        { year: '2022–2023', strength: 350, percentage: '72%' },
        { year: '2021–2022', strength: 190, percentage: '61%' },
    ];

    const companyData = [
        { sno: 1, name: 'TCS (Tata Consultancy Services)', offers: 48 },
        { sno: 2, name: 'KGIS (KG Information Systems)', offers: 11 },
        { sno: 3, name: 'MRF Tyres Pvt Ltd., Sriperumbudur', offers: 120 },
        { sno: 4, name: 'TVS ES Pvt Ltd., Chennai', offers: 30 },
        { sno: 5, name: 'Smartail Pvt Ltd., Chennai', offers: 11 },
        { sno: 6, name: 'Nokia Network Pvt Ltd., Chennai', offers: 90 },
        { sno: 7, name: 'Motherson Pvt Ltd., Chennai', offers: 22 },
        { sno: 8, name: 'TATA Electronics, Hosur', offers: 70 },
        { sno: 9, name: 'Jilaba Technologies Pvt Ltd., Chennai', offers: 1 },
        { sno: 10, name: 'SCM Garments Pvt Ltd., Tirupur', offers: 15 },
        { sno: 11, name: 'Muthoot Finance Pvt Ltd., Erode', offers: 46 },
        { sno: 12, name: 'Foxconn, Chennai', offers: 60 },
        { sno: 13, name: 'Unitech Plasto Pvt Ltd., Chennai', offers: 29 },
    ];

    const recruiters = [
        { name: "TCS", src: "/comapanies/tcs.jpg" },
        { name: "MRF Tyres", src: "/comapanies/mrf.jpg" },
        { name: "Nokia Networks", src: "/comapanies/nokia.png" },
        { name: "Tata Electronics", src: "/comapanies/tata elctornics.jpg" },
        { name: "Muthoot Finance", src: "/comapanies/muthoot finance.png" },
        { name: "Foxconn", src: "/comapanies/foxconn.png" },
        { name: "Motherson Group", src: "/comapanies/motherson.png" },
        { name: "KGIS", src: "/comapanies/kgis.png" },
        { name: "Smartail", src: "/comapanies/smarttail.png" },
        { name: "Jilaba Technologies", src: "/comapanies/jilaba.png" },
        { name: "SCM Garments", src: "/comapanies/scm.png" },
        { name: "Clarus", src: "/comapanies/clarus.jpg" },
        { name: "Cognizant", src: "/comapanies/cognicent.jpg" },
        { name: "Rinex", src: "/comapanies/rinex.png" },
        { name: "Sakthi Auto", src: "/comapanies/sakthiauto.png" },
        { name: "SP Apparels", src: "/comapanies/spaperals.jpg" }
    ];

    const starPerformers = [
        { name: 'R. Tamilarasan', dept: 'III B.Com B', company: 'TCS', domain: 'Finance' },
        { name: 'B. Devapriyan', dept: 'II B.Com (CA)', company: 'MRF Tyres', domain: 'Technical Sales' },
        { name: 'V. Abinaya', dept: 'II B.Com (CA)', company: 'Muthoot Finance', domain: 'Banking & Advisory' },
        { name: 'M. Dhivagar', dept: 'III B.Com (PA)', company: 'Nokia Network', domain: 'Operations' },
    ];

    return (
        <div className={styles.statisticsApp}>
            {/* Hero Section */}
            <Hero
                title="Placement Statistics"
                description="Excellence • Success • Global Competence"
                image="https://images.unsplash.com/photo-1438109491414-7198515b166b?q=90&fm=jpg"
            />

            {/* Focus Section */}
            <section className={styles.focusSection}>
                <div className={`${styles.container} ${styles.focusContent}`}>
                    <div className={styles.focusImageContent}>
                        <img
                            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1000&auto=format&fit=crop"
                            alt="Student Excellence"
                        />
                    </div>
                    <div className={styles.focusTextContent}>
                        <h2>Bridging Ambition with Opportunity</h2>
                        <p>
                            At Shree Venkateshwara Arts and Science College, our commitment to professional excellence is reflected in our robust placement statistics and industry partnerships. We provide a holistic environment where students are nurtured with both academic rigor and industry-specific skills.
                        </p>
                        <p>
                            Our career development initiatives ensure that every student is equipped to meet the challenges of the global job market, resulting in consistently high placement records across diverse sectors.
                        </p>
                    </div>
                </div>
            </section>

            {/* Placement Statistics Section */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Year-wise Placement Statistics</h2>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Academic Year</th>
                                    <th>Total Student Strength</th>
                                    <th>Placement Percentage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {placementData.map((data, index) => (
                                    <tr key={index}>
                                        <td><strong>{data.year}</strong></td>
                                        <td>{data.strength}</td>
                                        <td><strong>{data.percentage}</strong></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Company-wise Offers Section */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Company-wise Placement Details (2025–2026)</h2>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>S. No</th>
                                    <th>Name of the Company</th>
                                    <th>No. of Offers</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companyData.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.sno}</td>
                                        <td style={{ textAlign: 'left', paddingLeft: '30px' }}>{data.name}</td>
                                        <td><strong>{data.offers}</strong></td>
                                    </tr>
                                ))}
                                <tr style={{ background: '#e2e8f0', fontWeight: 'bold' }}>
                                    <td></td>
                                    <td style={{ textAlign: 'left', paddingLeft: '30px' }}>Total No. of Offers Received</td>
                                    <td>553</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Top Recruiters Section */}
            <section className={`${styles.section} ${styles.bgSurface}`}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Our Hiring Partners</h2>
                    <div className={styles.recruitersGrid}>
                        {recruiters.map((recruiter, index) => (
                            <div key={index} className={styles.recruiterCard}>
                                <img src={recruiter.src} alt={recruiter.name} className={styles.recruiterLogo} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Star Performers Section */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Placement Student Highlights</h2>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Department/Year</th>
                                    <th>Hiring Company</th>
                                    <th>Domain</th>
                                </tr>
                            </thead>
                            <tbody>
                                {starPerformers.map((student, index) => (
                                    <tr key={index}>
                                        <td><strong>{student.name}</strong></td>
                                        <td>{student.dept}</td>
                                        <td><strong>{student.company}</strong></td>
                                        <td>{student.domain}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Recruiter Categories Section */}
            <section className={styles.section}>
                <div className={`${styles.container} ${styles.recruiterCategories}`}>
                    <div className={styles.focusImageContent}>
                        <img
                            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1000&auto=format&fit=crop"
                            alt="Student Group"
                        />
                    </div>
                    <div className={styles.categoryList}>
                        <h2>Recruiter Categories</h2>

                        <div className={styles.categoryItem}>
                            <div className={styles.categoryIcon}>»</div>
                            <div className={styles.categoryText}>
                                <strong>IT & ITES:</strong> Infosys, TCS, Allsec, Hexaware, Wipro, Cognizant
                            </div>
                        </div>

                        <div className={styles.categoryItem}>
                            <div className={styles.categoryIcon}>»</div>
                            <div className={styles.categoryText}>
                                <strong>Banking & Finance:</strong> Axis Bank, HDFC Bank, ICICI Bank, IDBI, Muthoot Finance
                            </div>
                        </div>

                        <div className={styles.categoryItem}>
                            <div className={styles.categoryIcon}>»</div>
                            <div className={styles.categoryText}>
                                <strong>Hospitality:</strong> Marriott, Hyatt, Radisson, Vivanta, Sterling, Hard Rock
                            </div>
                        </div>

                        <div className={styles.categoryItem}>
                            <div className={styles.categoryIcon}>»</div>
                            <div className={styles.categoryText}>
                                <strong>Manufacturing & Electronics:</strong> Foxconn, Nokia Networks, MRF Tyres, Tata Electronics, Motherson
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Statistics;
