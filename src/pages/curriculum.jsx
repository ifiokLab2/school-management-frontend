
import 'swiper/swiper-bundle.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/curriculum.jpg';

import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import { Swiper, SwiperSlide, } from 'swiper/react';
import React, { useState, useEffect } from 'react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
import { LightbulbIcon } from "lucide-react";
import { CheckCircle } from "lucide-react";
import Header from '../components/header';
import "../styles/curriculum.css";
import "../styles/home.css";
import axios from 'axios';
import CTAFooter from '../components/cta-footer';
import Footer from "../components/footer";
import { Link , useParams} from 'react-router-dom';
//const user = useSelector((state) => state.user.user);

export default function Curriculum() {
    const [activeTab, setActiveTab] = useState("aims")
  const slides = [
    
    hero1,
   
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
            <h2>UST INTERNATIONAL SCHOOL</h2>
            <p>Olashore International School is committed to academic excellence. It offers high calibre education in a wide range of subjects at junior secondary and senior secondary.</p>
          </div>
        </div>
        
        <div className="curriculum-container">
      <div className="content">
       

        <section className="introduction">
          <p>
            The curriculum design for Oakstone International School recognizes that the world of the future will be very
            different to the world of today. The pace of global change increases with the need for flexibility. A
            curriculum defined purely in subject terms is therefore not always well suited to equipping every young
            person with the knowledge, skills and understanding they will need for a fulfilling adult life.
          </p>

          <p>
            Our curriculum is designed to provide a broad and balanced education that meets the needs of all pupils. It
            provides opportunities for pupils to develop key techniques they will face when leaving school, whilst also
            consistently complying with the very best Nigerian curricula or standard standards of achievement. We seek
            to maximize talents of all students and exercise success in a positive environment, whilst offering learning
            opportunities which are differentiated and personalized according to the needs of each individual. We aim to
            create a sense of personal achievement, fulfillment, and enrichment whilst fostering the appropriate use of
            technology as a tool for learning.
          </p>

          <p>
            Our curriculum meets the requirements of both the Nigerian system and the British system, preparing students
            for exams in both.
          </p>
        </section>

        <div className="tabs">
          <div className="tabs-list">
            <button
              className={`tab-button ${activeTab === "aims" ? "active" : ""}`}
              onClick={() => setActiveTab("aims")}
            >
              Our Curriculum Aims
            </button>
            <button
              className={`tab-button ${activeTab === "outcomes" ? "active" : ""}`}
              onClick={() => setActiveTab("outcomes")}
            >
              Our Curriculum Outcomes
            </button>
          </div>

          <div className={`tab-content ${activeTab === "aims" ? "active" : ""}`}>
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Our Curriculum Aims</h2>
                <p className="card-description">
                  The curriculum should inspire and challenge all learners and prepare them for the future. The school's
                  aim is to develop a coherent curriculum that builds on young people's experiences and helps to
                  develop:
                </p>
              </div>
              <div className="card-content">
                <ul className="checklist two-columns">
                  <li className="checklist-item">
                    <CheckCircle className="check-icon" />
                    <span>Achieve high standards in their learning and make excellent progress</span>
                  </li>
                  <li className="checklist-item">
                    <CheckCircle className="check-icon" />
                    <span>
                      Enable those not performing to expectations, based on prior achievement data, to narrow the gap
                      and achieve their full potential
                    </span>
                  </li>
                  <li className="checklist-item">
                    <CheckCircle className="check-icon" />
                    <span>Have and be able to use high quality personal, learning and thinking skills</span>
                  </li>
                  <li className="checklist-item">
                    <CheckCircle className="check-icon" />
                    <span>Have a broad international outlook</span>
                  </li>
                  <li className="checklist-item">
                    <CheckCircle className="check-icon" />
                    <span>
                      Be prepared for a range of external functional skills, including key literacy, numeracy and ICT
                      skills
                    </span>
                  </li>
                  <li className="checklist-item">
                    <CheckCircle className="check-icon" />
                    <span>Be challenged and stretched to achieve their potential</span>
                  </li>
                  <li className="checklist-item">
                    <CheckCircle className="check-icon" />
                    <span>Enjoy and be committed to learning</span>
                  </li>
                  <li className="checklist-item">
                    <CheckCircle className="check-icon" />
                    <span>Value their learning outside the formal academic curriculum</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={`tab-content ${activeTab === "outcomes" ? "active" : ""}`}>
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Our Curriculum Outcomes</h2>
                <p className="card-description">Oakstone International School's curriculum:</p>
              </div>
              <div className="card-content">
                <div className="outcomes-grid">
                  <div className="outcomes-column">
                    <ul className="checklist">
                      <li className="checklist-item">
                        <CheckCircle className="check-icon" />
                        <span>
                          Leads to qualifications that are of value to potential for employers and for entry to higher
                          education, both internationally and within Nigeria
                        </span>
                      </li>
                      <li className="checklist-item">
                        <CheckCircle className="check-icon" />
                        <span>Fulfills the statutory requirements of both Nigerian and British curricula</span>
                      </li>
                      <li className="checklist-item">
                        <CheckCircle className="check-icon" />
                        <span>Enables students to fulfill their potential</span>
                      </li>
                      <li className="checklist-item">
                        <CheckCircle className="check-icon" />
                        <span>Meets the needs of students of all abilities and aptitudes within the school</span>
                      </li>
                      <li className="checklist-item">
                        <CheckCircle className="check-icon" />
                        <span>
                          Provides equal access to the curriculum for all students, regardless of gender, ethnicity or
                          religious affiliation
                        </span>
                      </li>
                      <li className="checklist-item">
                        <CheckCircle className="check-icon" />
                        <span>
                          Prepares students to make informed and appropriate choices for careers at the end of their
                          school
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="outcomes-column">
                    <ul className="checklist">
                      <li className="checklist-item">
                        <CheckCircle className="check-icon" />
                        <span>
                          Helps students to develop skills, enquiring minds and the ability to think critically
                        </span>
                      </li>
                      <li className="checklist-item">
                        <CheckCircle className="check-icon" />
                        <span>
                          Fosters teaching methods which offer and encourage a variety of learning approaches to meet
                          the needs of different types of learners
                        </span>
                      </li>
                      <li className="checklist-item">
                        <CheckCircle className="check-icon" />
                        <span>Helps students to use language and numbers effectively</span>
                      </li>
                      <li className="checklist-item">
                        <CheckCircle className="check-icon" />
                        <span>
                          Helps students develop personal moral values, respect for religious values and tolerance of
                          other races, beliefs and ways of life
                        </span>
                      </li>
                      <li className="checklist-item">
                        <CheckCircle className="check-icon" />
                        <span>Prepares students for a range of external examinations from IGCSE and WASSCE exams</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

        <CTAFooter />

       </div>

       <Footer />
    </>
    
  );
}
