import React from 'react';
import './Marquee.css';

const Marquee = () => {
    const handlePointerOver = (e) => {
        const target = e.target;
        if (target.classList.contains('marquee')) {
            target.classList.add('animate');
        }
    };

    const handleAnimationIteration = (e) => {
        const target = e.target;
        // Check if element is still hovered
        // The CSS sets --hov: 1 on hover.
        const style = getComputedStyle(target);
        const isHovered = style.getPropertyValue('--hov').trim() === '1';

        // Or simpler check:
        // const isHovered = target.matches(':hover'); 

        if (!isHovered) {
            target.classList.remove('animate');
        }
    };

    const handleClick = (text) => {
        console.log('Clicked:', text);
    };

    return (
        <div className="marquee-section">
            <div className="row-container">
                <div className="marquee-row">
                    <div className="text-content">Apply Now For 2026 Admission</div>
                    <button
                        className="marquee"
                        onPointerOver={handlePointerOver}
                        onAnimationIteration={handleAnimationIteration}
                        onClick={(e) => handleClick(e.target.textContent)}
                    >
                        Limited Seats
                    </button>
                </div>
                <div className="marquee-row">
                    <div className="text-content">Scholarship Form</div>
                    <button
                        className="marquee"
                        onPointerOver={handlePointerOver}
                        onAnimationIteration={handleAnimationIteration}
                        onClick={(e) => handleClick(e.target.textContent)}
                    >
                        Click Here
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Marquee;
