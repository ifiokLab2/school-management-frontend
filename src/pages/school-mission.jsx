
import 'swiper/swiper-bundle.css';

import hero1 from '../styles/school-mission-1.jpg';
import hero2 from '../styles/school-mission-2.jpg';
import { useSelector } from 'react-redux';
import { Book, Award, HandHelping } from "lucide-react"
import apiUrl from '../components/api-url';
import { Swiper, SwiperSlide, } from 'swiper/react';
import React, { useState, useEffect } from 'react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
import Header from '../components/header';
import "../styles/home.css";
import "../styles/school-mission.css";
import CTAFooter from '../components/cta-footer';
import axios from 'axios';

import Footer from "../components/footer";
import { Link , useParams} from 'react-router-dom';
//const user = useSelector((state) => state.user.user);

export default function SchoolMission() {
 
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
          
            <h2>MISSION AND CORE VALUES</h2>
            <p>The UST School Philosophy</p>
          </div>
        </div>
        
        <div className="mission-container">
      {/* Mission Statement Section */}
      <div className="mission-statement">
        <h2 className="section-title">The Mission Statement</h2>

        <div className="mission-content">
          <div className="mission-text">
            <p>
              Olashore International School is a learning community committed to academic excellence, nurturing each
              child to their full potential in a safe and serene environment, and developing leaders for the dynamic
              global society in the 21st century.
            </p>
          </div>

          <div className="mission-image">
            <img
              src={hero2}
              alt="Students and teacher with binoculars"
              className="rounded-image"
            />
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="core-values">
        <h2 className="section-title">Our Core Values</h2>

        <div className="values-grid">
          {/* Honesty */}
          <div className="value-card honesty">
            <Book className="value-icon" />
            <h3 className="value-title">Honesty</h3>
            <p className="value-description">
              We value truthfulness and transparency. Honesty is the cornerstone of our interactions, fostering trust
              among our community members. We prioritize open communication, ethical conduct, and integrity in all our
              endeavors.
            </p>
          </div>

          {/* Service */}
          <div className="value-card service">
            <HandHelping className="value-icon" />
            <h3 className="value-title">Service</h3>
            <p className="value-description">
              Service to others defines our commitment to making a positive impact in our community. We encourage active
              involvement, collaboration, and empathy to create a supportive environment where everyone thrives. Through
              service, we foster a sense of belonging and social responsibility among our students.
            </p>
          </div>

          {/* Honour */}
          <div className="value-card honour">
            <Award className="value-icon" />
            <h3 className="value-title">Honour</h3>
            <p className="value-description">
              Integrity and character lie at the heart of our school's principles. We cultivate a culture of respect,
              moral values, and ethical decision-making. Our focus is on nurturing individuals who embody integrity,
              demonstrating responsible behavior, and upholding honorable conduct in all aspects of life.
            </p>
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
