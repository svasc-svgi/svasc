import React from 'react';
import Leadership from './Leadership';
import styles from './Leadership.module.css';
import secuImg from '../../assets/secu.jpg';
import svascVideo from '../../assets/svascved.mp4';

import Hero from '../Common/Hero';

const SecretaryMessage = () => {
    return (
        <>
            <Hero
                title="Secretary's Message"
                description="Our vision and commitment to excellence by Thiru. A. Sengottaiyan, Secretary of SVASC."
                video={svascVideo}
            />
            <Leadership
                designation="Secretary"
                name="Thiru. K.C. KARUPANAN"
                qualification="Educationist & Philanthropist"
                image={secuImg}
                quote="Our mission is to provide quality education that empowers students to become responsible citizens and future leaders."
            >
                <p className={styles.introText}>
                    <span className={styles.arrow}>»</span> We are set to take the mission of implementing the new education methodologies to enable quality learning. It also encourages independent thinking and helps the student in developing wholesome personality so that he can contribute his best to the society and to the country. Shree Venkateshwara Group of Institutions takes keen interest in updating its infrastructures to meet the technological revolution and new challenges of modern era.
                </p>

                <p className={styles.descriptionText}>
                    SVASC has a reputation as an innovative and dynamic educational institution that maintains the highest standards of instructions and provides complete student support systems using latest developments in instructional technology with utmost care. SVASC’s strong vocational emphasis and its close links with business and industry ensure that our undergraduate programmes keep pace with change and remain firmly linked to the needs of the future.
                </p>

                <p className={styles.descriptionText}>
                   Experience education that works on both the counts only at Shree Venkateshwara Arts and Science (Co – Education) College
                </p>
            </Leadership>
        </>
    );
};

export default SecretaryMessage;
