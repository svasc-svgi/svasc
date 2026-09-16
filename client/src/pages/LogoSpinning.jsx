import React, { useEffect, useRef, useState } from 'react';

const LogoSpinning = ({
  radius = 250,
  maxSpeed = 0.2, // Reduced from 1.5
  centerTitle = 'Our Partners',
  logos = [
    { src: '/comapanies/tcs.jpg', alt: 'TCS', tooltip: 'Tata Consultancy Services' },
    { src: '/comapanies/mrf.jpg', alt: 'MRF Tyres', tooltip: 'MRF Tyres' },
    { src: '/comapanies/nokia.png', alt: 'Nokia', tooltip: 'Nokia Networks' },
    { src: '/comapanies/tata elctornics.jpg', alt: 'Tata Electronics', tooltip: 'Tata Electronics' },
    { src: '/comapanies/muthoot finance.png', alt: 'Muthoot Finance', tooltip: 'Muthoot Finance' },
    { src: '/comapanies/foxconn.png', alt: 'Foxconn', tooltip: 'Foxconn India' },
    { src: '/comapanies/motherson.png', alt: 'Motherson Group', tooltip: 'Motherson Group' },
    { src: '/comapanies/kgis.png', alt: 'KGIS', tooltip: 'KG Information Systems' },
    { src: '/comapanies/smarttail.png', alt: 'Smartail', tooltip: 'Smartail Pvt Ltd' },
    { src: '/comapanies/jilaba.png', alt: 'Jilaba', tooltip: 'Jilaba Technologies' },
    { src: '/comapanies/scm.png', alt: 'SCM Garments', tooltip: 'SCM Garments' },
    { src: '/comapanies/clarus.jpg', alt: 'Clarus', tooltip: 'Clarus' },
    { src: '/comapanies/cognicent.jpg', alt: 'Cognizant', tooltip: 'Cognizant' },
    { src: '/comapanies/rinex.png', alt: 'Rinex', tooltip: 'Rinex' },
    { src: '/comapanies/sakthiauto.png', alt: 'Sakthi Auto', tooltip: 'Sakthi Auto' },
    { src: '/comapanies/spaperals.jpg', alt: 'SP Apparels', tooltip: 'SP Apparels' }
  ]
}) => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const stateRef = useRef({
    rx: 0,
    ry: 0,
    rz: 0,
    mouseX: 0,
    mouseY: 0,
    isHovered: false,
    width: 0,
    height: 0,
    items: [],
    animationId: null,
  });

  // Calculate Fibonacci Sphere Distribution
  const initItems = () => {
    const n = logos.length;
    return logos.map((logo, i) => {
      const phi = Math.acos(-1 + (2 * (i + 0.5)) / n);
      const theta = Math.sqrt(n * Math.PI) * phi;
      return {
        ...logo,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        scale: 1,
        opacity: 1,
        index: i
      };
    });
  };

  useEffect(() => {
    stateRef.current.items = initItems();
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      stateRef.current.width = rect.width;
      stateRef.current.height = rect.height;
    };

    updateDimensions();

    const rotateX = (item, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y = item.y * cos - item.z * sin;
      const z = item.z * cos + item.y * sin;
      return { ...item, y, z };
    };

    const rotateY = (item, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x = item.x * cos - item.z * sin;
      const z = item.z * cos + item.x * sin;
      return { ...item, x, z };
    };

    const animate = () => {
      const state = stateRef.current;

      // Target rotation speed based on mouse relative to center
      const targetSpeedX = (state.mouseY / (state.height / 2)) * maxSpeed * 0.01;
      const targetSpeedY = -(state.mouseX / (state.width / 2)) * maxSpeed * 0.01;

      // Base rotation if not hovered, otherwise mouse controlled
      if (state.isHovered) {
        state.rx = targetSpeedX;
        state.ry = targetSpeedY;
      } else {
        state.rx *= 0.95; // Smooth slow down
        state.ry *= 0.95;
        state.rx += 0.001; // Reduced from 0.002
        state.ry += 0.001; // Reduced from 0.002
      }

      state.items = state.items.map(item => {
        let rotated = rotateX(item, state.rx);
        rotated = rotateY(rotated, state.ry);

        // Perspective / Depth calculations
        const perspective = radius * 1.5;
        const scale = (perspective + rotated.z) / perspective;
        const opacity = (rotated.z + radius) / (2 * radius) * 0.7 + 0.3;

        // Apply transformations to DOM element
        const element = itemsRef.current[rotated.index];
        if (element) {
          element.style.transform = `translate3d(${rotated.x}px, ${rotated.y}px, ${rotated.z}px) scale(${scale})`;
          element.style.opacity = opacity;
          element.style.zIndex = Math.round(rotated.z + radius);
        }

        return { ...rotated, scale, opacity };
      });

      state.animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      stateRef.current.mouseX = e.clientX - (rect.left + rect.width / 2);
      stateRef.current.mouseY = e.clientY - (rect.top + rect.height / 2);
    };

    const handleMouseEnter = () => stateRef.current.isHovered = true;
    const handleMouseLeave = () => {
      stateRef.current.isHovered = false;
      stateRef.current.mouseX = 0;
      stateRef.current.mouseY = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', updateDimensions);

    stateRef.current.animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(stateRef.current.animationId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [logos.length, radius, maxSpeed]);

  return (
    <div className="flex items-center justify-center min-h-[600px] w-full bg-transparent p-4 overflow-hidden">
      <style>{`
        .centertitle{
          color: #001F66;
        }`}
      </style>
      <div
        ref={containerRef}
        className="relative flex items-center justify-center perspective-[1000px] select-none"
        style={{ width: radius * 3, height: radius * 3 }}
      >
        {/* Center Title */}
        <div className="absolute z-0 pointer-events-none text-center">
          <h2 className=" centertitle text-2xl sm:text-4xl font-bold uppercase tracking-widest">
            {centerTitle}
          </h2>
        </div>

        {/* Logos Sphere */}
        {logos.map((logo, i) => (
          <div
            key={i}
            ref={el => itemsRef.current[i] = el}
            className="absolute p-2 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-100 cursor-pointer"
            style={{
              width: '80px',
              height: '80px',
              willChange: 'transform, opacity',
            }}
          >
            <div className="w-full h-full flex items-center justify-center relative group">
              {logo.href ? (
                <a href={logo.href} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                  <img src={logo.src} alt={logo.alt} className="max-w-[70%] max-h-[70%] object-contain" />
                </a>
              ) : (
                <img src={logo.src} alt={logo.alt} className="max-w-[70%] max-h-[70%] object-contain" />
              )}

              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[100]">
                {logo.tooltip || logo.alt}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoSpinning;
