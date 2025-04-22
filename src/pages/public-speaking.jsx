
import 'swiper/swiper-bundle.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero-1.jpg';
import hero2 from '../styles/hero-2.jpg';
import hero3 from '../styles/hero-3.jpg';
import sport from '../styles/sp-3.webp';
import music from '../styles/music-2.webp';
import speaking from '../styles/ps-3.webp';
import { useSelector } from 'react-redux';
import { Book, Award, HandHelping } from "lucide-react"
import apiUrl from '../components/api-url';
import { Swiper, SwiperSlide, } from 'swiper/react';
import React, { useState, useEffect } from 'react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
import Header from '../components/header';
import "../styles/home.css";
import CTAFooter from '../components/cta-footer';
import "../styles/public-speaking.css";

import axios from 'axios';

import Footer from "../components/footer";
import { Link , useParams} from 'react-router-dom';
//const user = useSelector((state) => state.user.user);

export default function PublicSpeaking() {
 
  const slides = [
    
    hero3,
   
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
            <h2>PUBLIC SPEAKING</h2>
            <p>Every term, students are involved in inter-house quiz, debate and public-speaking competitions.</p>
          </div>
        </div>
        
        <div className="public-speaking-page">
      {/* Breadcrumb Navigation */}
      

      {/* Main Content */}
      <div className="main-content">
        <div className="content-container">
          {/* Left Column - Text Content */}
          <div className="text-content">
            <p>
              Every term, students are involved in inter-house quiz, debate and public-speaking competitions. This is
              done primarily to engender healthy competition among the students and also to be able identify and develop
              students who go to represent the school in external competitions.
            </p>

            <p>
              By engaging in debate and public speaking, students are able to develop their speaking and listening
              skills, build confidence by speaking and defending ideas in front of an audience. The importance of this
              is seen in our students as they anchor programme at public functions, deliver sermons at religious events,
              reading news on radio stations and serving as television personalities.
            </p>

            <p>
              Olashore has won several laurels from our participation in external competitions in these speech and
              intellectual events.
            </p>
          </div>

          {/* Right Column - Image */}
          <div className="image-container">
            <img src={speaking} alt="Student speaking at a podium with microphone" className="content-image" />
          </div>
        </div>
      </div>

      {/* Yellow Bar at Bottom */}
     
    </div>


      <CTAFooter />

       </div>

       <Footer />
    </>
    
  );
}
