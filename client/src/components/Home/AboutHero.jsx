import React from 'react';
import './AboutHero.css';
import img1 from '../../assets/home1.jpg';
import img2 from '../../assets/home3.jpg';
import img3 from '../../assets/DJI_0216 copy 4.JPG';

const AboutHero = () => {
    return (
        <section className="section-hero">
            <div className="hero">
                <h1 className="heading-primary">
                    <span className="welcome">Welcome to</span>
                    <span className="college-name">SVASC</span>
                </h1>
                <div className="hero-text-box">
                    <p className="hero-description">
                        Shree Venkateshwara Arts and Science (Co-Education) College (SVASC) is an institution for achievers, located in the serene surroundings of Othakuthirai, near Gobichettipalayam. Founded in 2019 by the Shree Venkateshwara Educational and Charitable Trust, the institution is committed to providing quality education and fostering academic excellence, holistic development, and the empowerment of young minds.
                        We strive to create an inspiring, inclusive, and supportive learning environment where students can discover their potential, develop essential skills, nurture their talents, and prepare confidently for a successful future.
                    </p>
                    <a href="#" className="btn btn--outline">Learn more ↓</a>
                </div>
                <div className="hero-img-box">
                    <img src={img1} alt="Campus View 1" className="hero-img-1" />
                    <img src={img2} alt="Campus View 2" className="hero-img-2" />
                    <img src={img3} alt="Campus View 3" className="hero-img-3" />
                </div>
            </div>
        </section>
    );
};

export default AboutHero;
