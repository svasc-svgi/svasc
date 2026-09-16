import React from 'react';
import Leadership from './Leadership';
import styles from './Leadership.module.css';
import principalImg from '../../assets/principal.png';
import svascVideo from '../../assets/svascved.mp4';

import Hero from '../Common/Hero';

const PrincipalProfile = () => {
    return (
        <>
            <Hero
                title="Principal's Message"
                description="A welcome note and vision from Dr. R. Ramkumar, Principal of SVASC."
                video={svascVideo}
            />
            <Leadership
                designation="Principal"
                name="Dr. R. RAMKUMAR"
                qualification="MCA.,M.Phil.,Ph.D.,"
                image={principalImg}
                quote="I wish you all a happy learning experience on the campus and wonderful camaraderie in the spirit of universal brotherhood and mutual academic benefit and progress."
            >
                <p className={styles.introText}>
                    <span className={styles.arrow}>»</span> I have immense pleasure and
                    privilege to reflect on the educational goals and vision set out
                    for this great institution from the desk of principal of 'Shree
                    Venkateshwara Arts and Science (Co-Education) College a baby
                    just born to prosper and flourish to a great level.
                </p>

                <p className={styles.descriptionText}>
                    Education is a man making process with an enrichment of ideas
                    and concepts revolving around reformation of human thoughts and
                    deeds in every aspect of life by virtue of learning. The same
                    is also echoed in the words of our former Chief Minister of
                    Tamilnadu Mr.C. N. Annadurai through his words that "every
                    educational institution is opened only to shut the doors of
                    prison down, permanently". It reiterates very clearly that
                    education is the panacea for all social evils.
                </p>

                <p className={styles.descriptionText}>
                    Better trained minds through education contribute substantially
                    higher rates to the well being and orderly progress of the
                    society. The reach and depth of knowledge treasure in
                    information technology can be tapped into, towards achieving
                    this goal. Student community of today's world is well poised to
                    get the maximum out of it, by developing all sorts of skills
                    including soft skills. Wisdom gained through the process of
                    acquiring knowledge leads to will power to make inner
                    transformations in order to effect societal transformations.
                </p>

                <p className={styles.descriptionText}>
                    This spirit is captured quite aptly by Swami Vivekananda in his
                    words 'Education is the manifestation of perfection already in
                    men'. Taking cue out of it, the innate talents of students are
                    shaped and brought out through interactions in classrooms with
                    teachers, peers to realize the full potential of higher
                    education. Hence, let us all join hands to build a intellectual
                    society by pooling together all our material and intellectual
                    resources at this great institution in order to build a vibrant,
                    healthy and happiest lives.
                </p>
            </Leadership>
        </>
    );
};

export default PrincipalProfile;

