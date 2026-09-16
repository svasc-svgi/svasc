import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Laboratory.module.css';
import Hero from '../Common/Hero';
import labheroImg from '../../assets/labhero.jpg';

gsap.registerPlugin(ScrollTrigger);

const Laboratory = () => {
    const labs = [
        {
            id: 'computer-lab',
            header: 'Computer Lab',
            desc: 'Our state-of-the-art computer lab features fully air-conditioned facilities with Intel Core i3 systems, 8GB RAM, and 24/7 high-speed internet connectivity. Students benefit from LAN-connected workstations and digital learning platforms for both theoretical and practical sessions.',
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
            index: 7
        },
        {
            id: 'sewing-lab',
            header: 'Sewing Laboratory',
            desc: 'A comprehensive facility equipped with modern sewing machines including single-needle, overlock, and flatlock systems. Students master garment construction, precision stitching, and innovative design under expert faculty supervision.',
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
            index: 6
        },
        {
            id: 'construction-lab',
            header: 'Advanced Construction Lab',
            desc: 'Features high-speed industrial machines and computerized embroidery systems for advanced garment construction. Students gain hands-on experience in precision stitching, pattern making, and creative embroidery techniques.',
            image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80",
            index: 5
        },
        {
            id: 'dyeing-lab',
            header: 'Dyeing & Processing Lab',
            desc: 'Equipped with modern testing instruments and dyeing facilities for analyzing fabric quality. Students learn eco-friendly dyeing practices, colourfastness testing, and sustainable fashion techniques through practical application.',
            image: "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=800&q=80",
            index: 4
        },
        {
            id: 'microbiology-lab',
            header: 'Microbiology Lab',
            desc: 'Features advanced equipment including laminar airflow chambers, microscopes, incubators, and spectrophotometers. Electronic classrooms with LCD projectors support computer-aided teaching for comprehensive microbiology studies.',
            image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80",
            index: 3
        },
        {
            id: 'ai-lab',
            header: 'AI & Machine Learning Lab',
            desc: 'The AI Lab focuses on understanding the nature of brainpower and engineering intelligent computer systems. Students practice neural network technology and explore AI systems that play major roles across various industries and applications.',
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
            index: 2
        },
        {
            id: 'cyber-security-lab',
            header: 'Cyber Security Lab',
            desc: 'Equipped with advanced security tools and penetration testing environments. Students learn ethical hacking, network security, cryptography, and threat analysis to protect digital infrastructure against cyber attacks and vulnerabilities.',
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
            index: 1
        }
    ];
    const containerRef = useRef(null);
    const rightSideRef = useRef(null);
    const imagesRef = useRef([]);
    const sectionRefs = useRef([]);

    useEffect(() => {
        const bgColors = ["#FFF9E6", "#ffffff", "#FFF9E6", "#ffffff", "#FFF9E6", "#ffffff", "#FFF9E6"];
        const ctx = gsap.context(() => {

            // Handle Desktop Animation
            ScrollTrigger.matchMedia({
                "(min-width: 769px)": function () {
                    const mainTimeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: `.${styles.arch}`,
                            start: "top top",
                            end: "bottom bottom",
                            pin: `.${styles.archRight}`,
                            scrub: true,
                        }
                    });

                    const imgs = imagesRef.current.map(el => el.querySelector('img'));

                    gsap.set(imgs, {
                        clipPath: "inset(0)",
                        objectPosition: "0px 0%"
                    });

                    imgs.forEach((_, index) => {
                        const currentImage = imgs[index];
                        const nextImage = imgs[index + 1] ? imgs[index + 1] : null;

                        const sectionTimeline = gsap.timeline();

                        if (nextImage) {
                            sectionTimeline
                                .to(
                                    "body",
                                    {
                                        backgroundColor: bgColors[index],
                                        duration: 1.5,
                                        ease: "power2.inOut"
                                    },
                                    0
                                )
                                .to(
                                    currentImage,
                                    {
                                        clipPath: "inset(0px 0px 100%)",
                                        objectPosition: "0px 60%",
                                        duration: 1.5,
                                        ease: "none"
                                    },
                                    0
                                )
                                .to(
                                    nextImage,
                                    {
                                        objectPosition: "0px 40%",
                                        duration: 1.5,
                                        ease: "none"
                                    },
                                    0
                                );
                        }

                        mainTimeline.add(sectionTimeline);
                    });
                },

                // Handle Mobile Animation
                "(max-width: 768px)": function () {
                    const imgs = imagesRef.current.map(el => el.querySelector('img'));
                    gsap.set(imgs, {
                        objectPosition: "0px 60%"
                    });

                    imgs.forEach((image, index) => {
                        const innerTimeline = gsap.timeline({
                            scrollTrigger: {
                                trigger: image,
                                start: "top-=70% top+=50%",
                                end: "bottom+=200% bottom",
                                scrub: true
                            }
                        });

                        innerTimeline
                            .to(image, {
                                objectPosition: "0px 30%",
                                duration: 5,
                                ease: "none"
                            })
                            .to("body", {
                                backgroundColor: bgColors[index],
                                duration: 1.5,
                                ease: "power2.inOut"
                            });
                    });
                }
            });
        }, containerRef);

        return () => {
            ctx.revert();
            // Reset body background on unmount
            gsap.set("body", { backgroundColor: "#ffffff" });
        };
    }, []);
    return (
        <>
            <Hero
                title="Research & Laboratories"
                description="State-of-the-art facilities for practical learning and innovation"
                image={labheroImg}
            />
            <div ref={containerRef} className={styles.laboratoryContainer}>

                <div className={styles.innerContainer}>
                    <div className={styles.spacer}></div>

                    <div className={styles.arch}>
                        <div className={styles.archLeft}>
                            {labs.map((lab, idx) => (
                                <div
                                    key={lab.id}
                                    id={lab.id}
                                    className={styles.archInfo}
                                    ref={el => sectionRefs.current[idx] = el}
                                    style={{ order: idx * 2 }}
                                >
                                    <div className={styles.content}>
                                        <h2 className={styles.header}>{lab.header}</h2>
                                        <p className={styles.desc}>{lab.desc}</p>
                                        <a className={styles.link} href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none">
                                                <path fill="currentColor" d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z" />
                                            </svg>
                                            <span>Explore Lab</span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div ref={rightSideRef} className={styles.archRight}>
                            {labs.map((lab, idx) => (
                                <div
                                    key={`img-${lab.id}`}
                                    className={styles.imgWrapper}
                                    data-index={lab.index}
                                    ref={el => imagesRef.current[idx] = el}
                                    style={{
                                        zIndex: lab.index,
                                        order: idx * 2 + 1
                                    }}
                                >
                                    <img src={lab.image} alt={lab.header} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.spacer}></div>
                </div>
            </div>
        </>
    );
};

export default Laboratory;
