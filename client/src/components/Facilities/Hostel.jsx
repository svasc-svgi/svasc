import React, { useState } from 'react';
import styles from './Hostel.module.css';
import { Sparkles, Scale, ShieldCheck, Star, Quote, Plus, PlayCircle } from 'lucide-react';
import Hero from '../Common/Hero';
import hostelImg from '../../assets/hostel.jpg';

const Hostel = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What are the hostel timings?",
      answer: "The hostel operates 24/7 with strict entry and exit monitoring. Study hours are from 7 PM to 8 PM daily."
    },
    {
      question: "Can parents visit the hostel?",
      answer: "Parents and guardians are welcome during designated visiting hours, but overnight stays are not permitted to ensure safety and comfort of all residents."
    },
    {
      question: "What facilities are available?",
      answer: "The hostel provides secure accommodation, vending machines with digital payment, 24/7 security surveillance, and experienced warden supervision."
    },
    {
      question: "Is cooking allowed in rooms?",
      answer: "No, cooking is strictly prohibited within hostel premises to avoid fire hazards and maintain cleanliness. Electric kettles and portable stoves are not permitted."
    }
  ];

  return (
    <div className={styles.hostelContainer}>
      {/* Hero Section */}
      <Hero
        title="SVASC Hostel"
        description="A Safe, Respectful, and Comfortable Living Environment"
        image={hostelImg}
      />

      {/* ORIGINAL HERO SECTION RESTORED */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            <span className={styles.badgeText}>About SVASC Hostel</span>
          </div>

          <h1 className={styles.heroTitle}>
            Our On <br />
            <span className={styles.heroTitleItalic}>Campus</span> <br />
            Hostel.
          </h1>

          <p className={styles.heroDescription}>
            Our hostel is committed to providing a safe, respectful, and enjoyable living environment for all residents. To achieve this, we have established certain rules and regulations that govern our hostel. Please ensure adherence to these guidelines for a harmonious and comfortable stay.
          </p>

          <div className={styles.heroButtons}>
            <button className={styles.primaryButton}>
              HOSTEL DETAILS
            </button>
            <button className={styles.secondaryButton}>
              <PlayCircle className={styles.buttonIcon} />
              WATCH VIDEO
            </button>
          </div>
        </div>

        <div className={styles.heroImageWrapper}>
         
          <div className={styles.heroImage}>
            <img
              src={hostelImg}
              alt="SVASC Hostel"
            />

            <div className={styles.heroImageBadge}>
              <p>"Full Facility Hostel"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className={styles.valuePropsSection}>
        <div className={styles.valuePropsGrid}>
          <div className={styles.valueProp}>
            <div className={styles.valuePropIcon}>
              <Sparkles />
            </div>
            <h3 className={styles.valuePropTitle}>Cleanliness and Hygiene</h3>
            <p className={styles.valuePropText}>
              Residents must maintain a clean and hygienic environment in their rooms and shared areas, such as hallways and restrooms.
            </p>
          </div>

          <div className={styles.valueProp}>
            <div className={styles.valuePropIcon}>
              <Scale />
            </div>
            <h3 className={styles.valuePropTitle}>Repairs and Decorations</h3>
            <p className={styles.valuePropText}>
              Personalizing rooms with decorations or making repairs is not allowed without prior approval from hostel management.
            </p>
          </div>

          <div className={styles.valueProp}>
            <div className={styles.valuePropIcon}>
              <ShieldCheck />
            </div>
            <h3 className={styles.valuePropTitle}>Furniture and Equipment</h3>
            <p className={styles.valuePropText}>
              All hostel-provided furniture and equipment must be used responsibly. Any damage caused intentionally or accidentally will be charged to the occupant.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutGlow}></div>

          <div className={styles.aboutGrid}>
            <div className={styles.aboutImageWrapper}>
              <div className={styles.aboutImageBorder}></div>
              <img
                src={hostelImg}
                alt="SVASC Girls Hostel"
                className={styles.aboutImage}
              />
            </div>

            <div className={styles.aboutContent}>
              <div className={styles.aboutBadge}>
                <span>Über die Begleiterin</span>
              </div>

              <h2 className={styles.aboutTitle}>
                SVASC Girls Hostel
              </h2>

              <div className={styles.aboutText}>
                <p>The SVASC Girls Hostel provides a fully secure, disciplined, and student-friendly living environment designed to ensure the safety, comfort, and well-being of every resident. The hostel follows a well-structured and transparent administrative system, with continuous supervision by experienced wardens and staff. Entry and exit are closely monitored, and strict adherence to hostel rules is maintained to promote discipline and responsibility among students.</p>
              </div>
              <div className={styles.aboutSignature}>
                <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg" alt="Unterschrift" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className={styles.servicesHeader}>
          <span className={styles.servicesLabel}>SVASC</span>
          <h2 className={styles.servicesTitle}>
            Health and Wealth<br />
            <span className={styles.servicesTitleItalic}>Care Hostel</span>
          </h2>
        </div>

        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <Star className={styles.serviceIcon} />
            <h3 className={styles.serviceTitle}>Cooking</h3>
            <p className={styles.serviceText}>
              Cooking is strictly prohibited within hostel premises to avoid fire hazards and maintain cleanliness. The use of electric kettles, portable stoves, or similar appliances in rooms is not permitted.
            </p>
          </div>

          <div className={`${styles.serviceCard} ${styles.serviceCardBorder}`}>
            <Star className={styles.serviceIcon} />
            <h3 className={styles.serviceTitle}>Valuables</h3>
            <p className={styles.serviceText}>
              Residents are responsible for securing their valuables, such as laptops, mobile phones, and cash. The hostel management will not be held accountable for any loss or theft.
            </p>
          </div>

          <div className={styles.serviceCard}>
            <Star className={styles.serviceIcon} />
            <h3 className={styles.serviceTitle}>Visitor Policy</h3>
            <p className={styles.serviceText}>
              Parents, guardians, and guests are not permitted to stay in the hostel under any circumstances. While we welcome visitors during designated hours, overnight stays are not permitted to ensure the safety and comfort of all residents.
            </p>
          </div>
        </div>

        <div className={styles.permissionsBox}>
          <h3 className={styles.permissionsTitle}>SVASC Permissions:</h3>
          <div className={styles.permissionsGrid}>
            <div className={styles.permissionItem}>
              <div className={styles.permissionDot}></div>
              <p>Leaving the Campus: Residents may leave the campus on Sundays between 9 AM and 6 PM. Parental confirmation and prior approval from the warden are mandatory for safety purposes.</p>
            </div>
            <div className={styles.permissionItem}>
              <div className={styles.permissionDot}></div>
              <p>Emergency Leave: In case of emergencies, residents may leave the hostel after obtaining the warden's permission. This ensures accountability and maintains the safety of all residents.</p>
            </div>
            <div className={styles.permissionItem}>
              <div className={styles.permissionDot}></div>
              <p>Staying in During Working Hours: Residents who are unwell and unable to attend classes may stay in the hostel during working hours. However, they must inform the warden or hostel management in advance and provide valid reasons.</p>
            </div>
            <div className={styles.permissionItem}>
              <div className={styles.permissionDot}></div>
              <p>Study Hours: Designated study hours are from 7 PM to 8 PM daily. During this time, all residents are encouraged to focus on their academic pursuits in a quiet and distraction-free environment.</p>
            </div>
            <div className={styles.permissionItem}>
              <div className={styles.permissionDot}></div>
              <p>Amenities: A vending machine is available on-site, providing snacks and beverages for the residents' convenience. The vending machine supports digital payments via GPay, ensuring ease of access and cashless transactions.</p>
            </div>
            <div className={styles.permissionItem}>
              <div className={styles.permissionDot}></div>
              <p>Support and Assistance: Hostel wardens are always available to address residents' questions or concerns. Residents are encouraged to approach them for support, whether related to accommodation, rules, or personal matters.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className={styles.quoteSection}>
        <Quote className={styles.quoteIcon} />
        <h2 className={styles.quoteText}>
          "Safety is our top priority, <br />
          <span className={styles.quoteTextItalic}>supported by 24/7 security surveillance"</span>
        </h2>
        <p className={styles.quoteSubtext}>
          controlled access, and regular monitoring of hostel premises. A clear permission and attendance system ensures accountability at all times. The hostel also encourages a respectful and peaceful atmosphere that supports academic focus, personal growth, and healthy living.
        </p>
      </section>

      {/* Process Steps Section */}
      <section className={styles.processSection}>
        <div className={styles.processContainer}>
          <div className={styles.processHeader}>
            <div className={styles.processBadge}>
              <span>Wie es funktioniert</span>
            </div>
            <p className={styles.processDescription}>
              Jede Sitzung ist eine Reise in den Raum, in dem du gerade am meisten gebraucht wirst.
            </p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.timelineLine}></div>

            <div className={styles.stepItem}>
              <div className={styles.stepNumberCircle}>
                <span className={styles.stepNumber}>1.</span>
              </div>
              <h3 className={styles.stepTitle}>Vorgespräch</h3>
              <p className={styles.stepContent}>
                Wir besprechen, was du heilen oder verändern möchtest...
              </p>
            </div>

            <div className={styles.stepItem}>
              <div className={styles.stepNumberCircle}>
                <span className={styles.stepNumber}>2.</span>
              </div>
              <h3 className={styles.stepTitle}>Kanalisierung</h3>
              <p className={styles.stepContent}>
                Auswahl der Kanäle...
              </p>
            </div>

            <div className={styles.stepItem}>
              <div className={styles.stepNumberCircle}>
                <span className={styles.stepNumber}>3.</span>
              </div>
              <h3 className={styles.stepTitle}>Process</h3>
              <p className={styles.stepContent}>
                The energy acts spontaneously...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.faqHeader}>
          <span className={styles.faqLabel}>Fragen</span>
        </div>
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <details
              key={index}
              className={styles.faqItem}
              open={openFaq === index}
              onClick={(e) => {
                e.preventDefault();
                toggleFaq(index);
              }}
            >
              <summary className={styles.faqQuestion}>
                <span>{faq.question}</span>
                <Plus className={`${styles.faqIcon} ${openFaq === index ? styles.faqIconOpen : ''}`} />
              </summary>
              <div className={styles.faqAnswer}>
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hostel;