
import 'swiper/swiper-bundle.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero-1.jpg';
import hero2 from '../styles/academice-overview.jpg';
import hero3 from '../styles/hero-3.jpg';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import { Swiper, SwiperSlide, } from 'swiper/react';
import React, { useState, useEffect } from 'react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
import { LightbulbIcon } from "lucide-react"
import Header from '../components/header';
import "../styles/academice-overview.css";
import "../styles/home.css";
import "../styles/school-mission.css";
import axios from 'axios';
import CTAFooter from '../components/cta-footer';
import Footer from "../components/footer";
import { Link , useParams} from 'react-router-dom';
//const user = useSelector((state) => state.user.user);

export default function AcademicOverview() {
 
  const slides = [
    
    hero2,
   
     // Add more image URLs as needed
 ];
  return (
    <>
       <div class = 'home-wrapper'>
        <Header />
        <div className='hero-container'>
          <Swiper
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3500 }}
              modules={[Autoplay, Pagination, Navigation]}
              >
              {slides.map((slide, index) => (
                  <SwiperSlide key={index}>
                      <img 
                        src={slide}
                        alt={`Slide ${index + 1}`}
                       />
                      
                  </SwiperSlide>
              ))}
          </Swiper>
          <div className = "hero-text-wrapper">
            <h2>ACADEMIC OVERVIEW</h2>
            <p>UST School is committed to academic excellence. It offers high calibre education in a wide range of subjects at junior secondary and senior secondary.</p>
          </div>
        </div>
        
        <div className="academic-container">
            

            <div className="content-grid">
                {/* Text Content */}
                <div className="text-content">
                <div className="content-section">
                    <p>
                    In its six year collegiate structure, Olashore follows the West African Examination Council (WAEC)
                    curriculum and the Cambridge International Examination (CIE) curriculum.
                    </p>
                    <p>
                    The school submits students for Basic Education Curriculum Examination at the end of Year 9 (JSS 3). The
                    students also sit for West African Senior Secondary Certificate Examination (WASSCE) and International
                    General Certificate of Secondary Education (IGCSE) at the end of Year 12 (SS3). Students that sit for
                    IGCSE have the opportunity to earn the International Certificate of Education (ICE) at distinction, merit
                    or pass levels.
                    </p>
                </div>
                </div>

                {/* Image */}
                <div className="image-container">
                <img
                    src={hero3}
                    alt="Students at academic presentation"
                    className="featured-image"
                />
                </div>
            </div>

            {/* Highlight Box */}
            <div className="highlight-box">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lightbulb-icon"
                >
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                <path d="M9 18h6" />
                <path d="M10 22h4" />
                </svg>
                <p>
                In both national and international curricula, the school seeks to develop in each student a mastery of the
                skills of communication and learning, and strives to achieve internationally recognized standards of
                excellence.
                </p>
            </div>

            {/* Additional Content */}
            <div className="additional-content">
                <div className="content-section">
                <p>
                    The school's results in the two examinations have always being very great which have resulted in influx of
                    students since inception. Over 1,500 students have graduated from the school and proceeded into notable
                    prestigious higher institution of learning in Nigeria and the diaspora. Majority of the school's graduates
                    are now captains of privately owned companies while others have reputable jobs all over the world.
                </p>
                </div>

                <div className="content-section">
                <p>
                    Directorate of Academics has 5 departments under it: Humanities, Languages, Mathematics, ICT and Science and
                    Vocational Education. These departments facilitate learning by the students with 21st century technology.
                    The students are taught based on academic ability.
                </p>
                </div>

                <div className="content-section">
                <p>
                    Olashore International School prepares students for Unified Tertiary Matriculation Examination (UTME)
                    organised by Joint Admission Matriculation Board (JAMB) and it is also a test centre, and has the mandate to
                    register students, administer and supervise selected America College Board test like PSAT, SAT, ACT.
                </p>
                </div>

                <div className="content-section">
                <p>
                    The school provides facilities to support twenty-first century teaching and learning in quest for students
                    to meet the dynamic twenty-first global society. Teachers are regularly trained and re-trained in-house and
                    outside the school to equip them for facilitating the twenty-first century learning.
                </p>
                </div>
            </div>
            </div>

       <CTAFooter />

       </div>

       <Footer />
    </>
    
  );
}
