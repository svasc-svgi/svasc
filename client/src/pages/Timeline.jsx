import React, { useState } from 'react';
import Hero from '../components/Common/Hero';
import './Timeline.css';
import mileImg from '../assets/mile.jpg';

const TimelineEvent = ({ year, title, description, date, isOrange = true, isLeft = false, isCenter = false, isSmallDate = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const containerClass = `
    steps-container
    ${isOrange ? 'bg-orange' : 'bg-white'}
    ${isLeft ? 'left' : ''}
    ${isCenter ? 'center' : ''}
  `.trim();

  const dateClass = `date ${isSmallDate ? 'small' : ''}`;

  return (
    <div className={containerClass}>
      <div className="content">
        <div className="year">{year}</div>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className={`hidden-elements-box ${isExpanded ? 'expanded' : ''}`}>
          <figure>
            <img src="https://images.unsplash.com/photo-1523050853064-8521a308975b?q=80&w=800" alt={title} />
          </figure>
        </div>
        <button
          className={`icon-toggle-box ${isExpanded ? 'clicked' : ''}`}
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </div>
      <i className="step-line"></i>
      <div className={dateClass}>{date}</div>
    </div>
  );
};

export default function Timeline() {
  const timelineData = [
    {
      id: 1,
      year: '2004',
      title: 'Sri Venkateshwara Vidhyalayaa Higher Secondary School',
      description: 'Establishment of Sri Venkateshwara Vidhyalayaa Higher Secondary School, laying the foundation stone for Shree Venkateshwara Educational Institutions with 147 initial students.',
      date: '2004',
      isOrange: true,
    },
    {
      id: 2,
      year: '2005',
      title: 'Sri Venkateshwara College of Education',
      description: 'Foundation of Sri Venkateshwara College of Education, committed to training future educators and shaping academic leadership.',
      date: '2005',
      isOrange: false,
      isLeft: true,
    },
    {
      id: 3,
      year: '2008',
      title: 'Shree Venkateshwara Hi - Tech Engineering College',
      description: 'Inauguration of Shree Venkateshwara Hi-Tech Engineering College to provide world-class technical and engineering education.',
      date: '2008',
      isOrange: true,
    },
    {
      id: 4,
      year: '2009',
      title: 'Shree Venkateshwara Hi - Tech Polytechnic College',
      description: 'Expansion with Shree Venkateshwara Hi-Tech Polytechnic College offering specialized technical and vocational engineering diplomas.',
      date: '2009',
      isOrange: false,
      isLeft: true,
    },
    {
      id: 5,
      year: '2011',
      title: 'Sri Venkateshwara International School (CBSE)',
      description: 'Establishment of Sri Venkateshwara International School offering world-class CBSE school education.',
      date: '2011',
      isOrange: true,
    },
    {
      id: 6,
      year: '2011',
      title: 'Sri Venkateshwara Vidhyalayaa Nursery and Primary School',
      description: 'Launch of Sri Venkateshwara Vidhyalayaa Nursery and Primary School providing strong early childhood education.',
      date: '2011',
      isOrange: false,
      isLeft: true,
    },
    {
      id: 7,
      year: '2017',
      title: 'Shree Venkateshwara College of Paramedical Sciences (D.Pharm & B.Pharm)',
      description: 'Establishment of Paramedical Sciences College offering D.Pharm & B.Pharm professional pharmaceutical courses.',
      date: '2017',
      isOrange: true,
    },
    {
      id: 8,
      year: '2018',
      title: 'College of Physiotherapy, Occupational Therapy, Allied Health & Nursing',
      description: 'Establishment of Shree Venkateshwara College of Physiotherapy, Occupational Therapy, Allied Health Sciences, School of Nursing & Health Inspector (HI).',
      date: '2018',
      isOrange: false,
      isLeft: true,
    },
    {
      id: 9,
      year: '2019',
      title: 'Shree Venkateshwara Arts and Science College',
      description: 'Establishment of Shree Venkateshwara Arts and Science College (SVASC) providing comprehensive arts and science degree programs.',
      date: '2019',
      isOrange: true,
    },
    {
      id: 10,
      year: '2019',
      title: 'Shree Venkateshwara College of Nursing',
      description: 'Establishment of Shree Venkateshwara College of Nursing, contributing to total institution strength growing from 147 students in 2004 to over 12,085 students by 2025.',
      date: '2019',
      isOrange: false,
      isLeft: true,
    }
  ];

  return (
    <div className="bg-gradient_solid">
      <Hero
        title="Historical Milestones"
        description="Explore the journey of Shree Venkateshwara Educational Institutions, growing from 147 students in 2004 to over 12,085+ students today."
        image={mileImg}
      />

      <div className="container" style={{ marginTop: '2rem' }}>
        <div className="steps">
          {timelineData.map((item) => (
            <TimelineEvent
              key={item.id}
              year={item.year}
              title={item.title}
              description={item.description}
              date={item.date}
              isOrange={item.isOrange}
              isLeft={item.isLeft}
              isSmallDate={item.isSmallDate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}