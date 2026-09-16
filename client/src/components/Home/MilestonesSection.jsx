import React from 'react';
import './MilestonesSection.css';

const milestonesData = [
    {
        year: '2004',
        title: 'Sri Venkateshwara Vidhyalayaa Higher Secondary School',
        color: 'linear-gradient(135deg, #ab47bc, #8e24aa)',
        position: 'top'
    },
    {
        year: '2005',
        title: 'Sri Venkateshwara College of Education',
        color: 'linear-gradient(135deg, #2196f3, #1565c0)',
        position: 'bottom'
    },
    {
        year: '2008',
        title: 'Shree Venkateshwara Hi - Tech Engineering College',
        color: 'linear-gradient(135deg, #4caf50, #2e7d32)',
        position: 'top'
    },
    {
        year: '2009',
        title: 'Shree Venkateshwara Hi - Tech Polytechnic College',
        color: 'linear-gradient(135deg, #fbc02d, #f57f17)',
        position: 'bottom'
    },
    {
        year: '2011',
        title: 'Sri Venkateshwara International School (CBSE)',
        color: 'linear-gradient(135deg, #ef5350, #c62828)',
        position: 'top'
    },
    {
        year: '2011',
        title: 'Sri Venkateshwara Vidhyalayaa Nursery and Primary School',
        color: 'linear-gradient(135deg, #ec407a, #ad1457)',
        position: 'bottom'
    },
    {
        year: '2017',
        title: 'Shree Venkateshwara College of Paramedical Sciences D.Pharm & B.Pharm Courses',
        color: 'linear-gradient(135deg, #ba68c8, #7b1fa2)',
        position: 'top'
    },
    {
        year: '2018',
        title: 'Shree Venkateshwara College of Physiotherapy, Occupational Therapy, Allied Health Sciences, School of Nursing & Health Inspector (HI)',
        color: 'linear-gradient(135deg, #1e88e5, #0d47a1)',
        position: 'bottom'
    },
    {
        year: '2019',
        title: 'Shree Venkateshwara Arts and Science College',
        color: 'linear-gradient(135deg, #66bb6a, #1b5e20)',
        position: 'top'
    },
    {
        year: '2019',
        title: 'Shree Venkateshwara College of Nursing',
        color: 'linear-gradient(135deg, #ffca28, #ff6f00)',
        position: 'bottom'
    }
];

const MilestonesSection = () => {
    return (
        <section className="milestonesWrapper">
            <div className="milestonesContainer">
                {/* HEADER BANNER WITH LEADERS */}
                <div className="milestonesBanner">
                    <div className="leaderCard">
                        <div className="leaderAvatarFallback">KC</div>
                        <span className="leaderName">Mr. K.C. Karupanan</span>
                        <span className="leaderRole">Secretary</span>
                    </div>

                    <div className="bannerTitleBox">
                        <h2>SHREE VENKATESHWARA EDUCATIONAL INSTITUTIONS</h2>
                        <p>Gobichettipalaiyam, Erode (D.T), Tamilnadu.</p>
                    </div>

                    <div className="leaderCard">
                        <div className="leaderAvatarFallback">PV</div>
                        <span className="leaderName">Mr. P. Venkatachalam</span>
                        <span className="leaderRole">Chairman</span>
                    </div>
                </div>

                {/* TIMELINE TRACK */}
                <div className="timelineTrackWrapper">
                    <div className="connectingLine"></div>

                    <div className="horizontalTimeline">
                        {/* 2004 START BADGE */}
                        <div className="sideBadge startBadge">
                            <div className="sideYearCircle">2004</div>
                            <div className="sideCountPill">
                                147
                                <span>Students</span>
                            </div>
                        </div>

                        {/* MILESTONE PILLARS */}
                        {milestonesData.map((item, index) => (
                            <div key={index} className={`milestonePillar ${item.position}`}>
                                <div className="pillarCard">
                                    <span className="cardTitle">{item.title}</span>
                                    <div className="yearBadge" style={{ background: item.color }}>
                                        {item.year}
                                    </div>
                                </div>
                                <div className="cardConnector"></div>
                            </div>
                        ))}

                        {/* 2025 GROWTH BADGE */}
                        <div className="sideBadge endBadge">
                            <div className="sideYearCircle" style={{ background: 'linear-gradient(135deg, #ff6b00, #d32f2f)' }}>
                                2025
                            </div>
                            <div className="sideCountPill">
                                12085
                                <span>Students</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MilestonesSection;
