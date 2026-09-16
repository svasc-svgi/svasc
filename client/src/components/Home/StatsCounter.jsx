import React, { useEffect, useState, useRef } from 'react';
import './StatsCounter.css';

const CounterItem = ({ max, label, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const duration = 1500; // ms

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    let startTime = null;
                    const animate = (currentTime) => {
                        if (!startTime) startTime = currentTime;
                        const progress = currentTime - startTime;
                        const percentage = Math.min(progress / duration, 1);

                        setCount(Math.floor(percentage * max));

                        if (progress < duration) {
                            requestAnimationFrame(animate);
                        } else {
                            setCount(max);
                        }
                    };
                    requestAnimationFrame(animate);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [max]);

    return (
        <div className="stat-number" ref={ref}>
            <span className="main-counter">
                <span className="number-inc">{count}</span>{suffix}
            </span>
            <h4 className="stat-number-label">{label}</h4>
        </div>
    );
};

const StatsCounter = () => {
    return (
        <div className="numbers-counter">
            <ul>
                <li>
                    <CounterItem max={100} label="Placement Assistants" suffix="%" />
                </li>
                <li>
                    <CounterItem max={35} label="Academic Programmes" suffix="+" />
                </li>
                <li>
                    <CounterItem max={50} label="Prestigious Awards" suffix="+" />
                </li>
                <li>
                    <CounterItem max={20} label="Advanced Labs" suffix="+" />
                </li>
            </ul>
        </div>
    );
};

export default StatsCounter;
