import React from 'react';
import './Accreditation.css';
import ugcLogo from '../../assets/UGC_India_Logo.png';
import buLogo from '../../assets/bu_logo_icon.png';
import svgiLogo from '../../assets/svgi_logo.jpeg';

const Accreditation = () => {
    return (
        <section className='accreditation'>
            <span className='accreditation-span'>Quality You Can Trust</span>
            <h2>Accreditation and academic Recognitions</h2>
            <p>
                SVASC College of Arts & Science is accredited by top educational bodies as a trusted and certified arts and science college , ensuring high academic standards and quality education. Our certifications reflect our commitment to excellence, innovation, and student success.,
            </p>
            <span className="bg-watermark">SVASC</span>
            <div className="cards">
                <div className="card">
                    <img
                        src={ugcLogo}
                        alt="UGC Recognition"
                    />
                    <div className="card-content">
                        <h3>UGC Recognition</h3>
                        <p>Our institution is recognized by the University Grants Commission (UGC) under Section 2(f) of the UGC Act, 1956.</p>
                    </div>
                </div>
                <div className="card">
                    <img
                        src={buLogo}
                        alt="Affiliated to Bharathiar University"
                    />
                    <div className="card-content">
                        <h3>Affiliated to Bharathiar University</h3>
                        <p>Affiliated to Bharathiar University, Coimbatore, ensuring academic standards and a recognized university framework.</p>
                    </div>
                </div>
                <div className="card">
                    <img
                        src={svgiLogo}
                        alt="Shree Vengadeshwara Group of Institutions"
                    />
                    <div className="card-content">
                        <h3>Shree Vengadeshwara Group of Institutions</h3>
                        <p>SVASC is under the Shree Vengadeshwara Group of Institutions, dedicated to academic excellence and holistic student development.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Accreditation;
