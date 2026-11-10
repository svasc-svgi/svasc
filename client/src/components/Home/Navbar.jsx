import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
// import Logo from './SVCAS-Logo.jpg'; // Removed to use public PNG
import { navData } from './navData';

const Navbar = ({ className }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    // Prevent background scrolling when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    // Automatically close mobile menu if resized to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024 && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMouseEnter = (index) => {
        if (window.innerWidth > 1024) {
            setActiveDropdown(index);
        }
    };

    const handleMouseLeave = () => {
        if (window.innerWidth > 1024) {
            setActiveDropdown(null);
        }
    };

    const toggleDropdown = (index) => {
        if (window.innerWidth <= 1024) {
            setActiveDropdown(activeDropdown === index ? null : index);
        }
    };

    return (
        <header className={`header ${className || ''}`}>
            <div className="header-wrap">
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                    {/* LEFT */}
                    <div className="left">
                        <img src="/SVCAS-Logo.png" alt="SVASC Logo" />
                        <div className="college-text">
                            <h1>SHREE VENKATESHWARA</h1>
                            <h2>ARTS &amp; SCIENCE (Co-Education) COLLEGE</h2>
                            <span className="college-recognition">Recognized u/s 2(f) of the UGC Act, 1956</span>
                            <span className="college-affiliation">Affiliated to the Bharathiar University, Coimbatore.</span>
                        </div>
                    </div>
                </Link>

                {/* HAMBURGER MENU BUTTON - Mobile & Tablet */}
                <button
                    className="hamburger"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    <span className={isMenuOpen ? 'open' : ''}></span>
                    <span className={isMenuOpen ? 'open' : ''}></span>
                    <span className={isMenuOpen ? 'open' : ''}></span>
                </button>

                {/* Mobile/Tablet Backdrop */}
                {isMenuOpen && (
                    <div
                        className="nav-backdrop"
                        onClick={() => setIsMenuOpen(false)}
                        aria-hidden="true"
                    />
                )}

                {/* RIGHT */}
                <div className={`right ${isMenuOpen ? 'menu-open' : ''}`}>
                    {/* TOP ROW */}
                    <div className="top-nav">
                        {navData.topNav.map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
                                className={item.type === 'pill' ? 'top-pill' : ''}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* BOTTOM ROW */}
                    <div className="bottom-nav">
                        {navData.bottomNav.map((item, index) => (
                            <div
                                key={index}
                                className={`nav-item-container ${item.dropdown ? 'has-dropdown' : ''} ${activeDropdown === index ? 'active' : ''}`}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {item.dropdown ? (
                                    <>
                                        <div
                                            className="nav-link dropdown"
                                            onClick={() => toggleDropdown(index)}
                                        >
                                            {item.label} <span>▾</span>
                                        </div>
                                        <div className={`dropdown-menu ${activeDropdown === index ? 'show' : ''} ${item.dropdown.length > 10 ? 'mega-menu' : ''}`}>
                                            {item.dropdown.map((subItem, subIndex) => (
                                                <Link
                                                    key={subIndex}
                                                    to={subItem.path}
                                                    className="dropdown-item"
                                                    onClick={() => {
                                                        setIsMenuOpen(false);
                                                        setActiveDropdown(null);
                                                    }}
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className="nav-link"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}

                        <div className="cta">
                            {navData.cta.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.path}
                                    className={`btn-${item.type}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

