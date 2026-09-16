import React from 'react'
import HeroSlider from '../components/Home/HeroSlider';
import Marquee from '../components/Home/Marquee';
import Accreditation from '../components/Home/Accreditation';
import AboutHero from '../components/Home/AboutHero';
import StatsCounter from '../components/Home/StatsCounter';
import AcademicProgramsHero from '../components/Home/AcademicProgramsHero';
import AcademicsCards from '../components/Home/AcademicsCards';
import ValuesCarousel from '../components/Home/ValuesCarousel';
import CollegeAboutSection from '../components/Home/CollegeAboutSection';
import PlacementSections from '../components/Home/PlacementSections';
import BlogSection from '../components/Home/BlogSection';
import SvascEvents from '../components/Home/SvascEvents';
import AlumniSlider from '../components/Home/AlumniSlider';

const Home = () => {
  return (
    <div>
      <div className="home-components-wrapper" style={{ overflowX: 'hidden', width: '100%', position: 'relative' }}>
        <HeroSlider />
        <Marquee />
        <Accreditation />
        <AboutHero />
        <StatsCounter />
        <AcademicProgramsHero />
        <AcademicsCards />
        <ValuesCarousel />
        <CollegeAboutSection />
        <PlacementSections />
        <BlogSection />
        <AlumniSlider />
        <SvascEvents />

      </div>

    </div>
  )
}

export default Home