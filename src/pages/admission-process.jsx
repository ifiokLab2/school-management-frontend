
import 'swiper/swiper-bundle.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero-1.jpg';
import hero2 from '../styles/hero-2.jpg';
import hero3 from '../styles/hero-3.jpg';
import sport from '../styles/sp-3.webp';
import music from '../styles/music-2.webp';
import speaking from '../styles/ps-3.webp';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import CTAFooter from '../components/cta-footer';
import { Swiper, SwiperSlide, } from 'swiper/react';
import React, { useState, useEffect } from 'react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';


import { CheckCircle,Check, ChevronRight } from "lucide-react"
import Header from '../components/header';
import "../styles/admission-process.css";
import "../styles/home.css";
import axios from 'axios';

import Footer from "../components/footer";
import { Link , useParams} from 'react-router-dom';
//const user = useSelector((state) => state.user.user);

export default function AdmissionProcess() {
    const [activeTab, setActiveTab] = useState("aims")
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
            <h2>ADMISSION PROCESS</h2>
            <p>Applying to sit the entrance examination is the first step to gaining admission into Olashore International School</p>
          </div>
        </div>

        <div className="application-container">
      <div className="application-header">
        <h1>Olashore International School Application Process</h1>
        <p>
          Applying to sit the entrance examination is the first step to gaining admission into Olashore International
          School. To apply for the Olashore entrance examination, kindly follow these steps:
        </p>
      </div>

      <div className="application-grid">
        {/* Step 1 */}
        <div className="application-card blue-card">
          <div className="card-header">
            <h2>
              <span className="step-number blue">1</span>
              <span>Application</span>
            </h2>
          </div>
          <div className="card-content">
            <p>
             
              to apply online or pick up application forms from Olashore International School, Iloko-Ijesa, Osun-State
              or from the school's Lagos liaison office at 281 Ajose Adeogun Street, Victoria Island, Lagos.
            </p>
            <p>
              Application fee details are available on the online application form for both local and international
              applicants.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="application-card green-card">
          <div className="card-header">
            <h2>
              <span className="step-number green">2</span>
              <span>Required Documents</span>
            </h2>
          </div>
          <div className="card-content">
            <p>
              The following documents are required for successful application and should be submitted on or before the
              entrance examination date:
            </p>
            <ul className="icon-list">
              <li>
                <span className="icon-wrapper green">
                  <Check size={18} />
                </span>
                <span>Candidate's recent school result.</span>
              </li>
              <li>
                <span className="icon-wrapper green">
                  <Check size={18} />
                </span>
                <span>Copy of candidate's birth certificate.</span>
              </li>
              <li>
                <span className="icon-wrapper green">
                  <Check size={18} />
                </span>
                <span>Evidence of payment for application.</span>
              </li>
              <li>
                <span className="icon-wrapper green">
                  <Check size={18} />
                </span>
                <span>Recent passport photograph of the candidate.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Step 3 */}
        <div className="application-card purple-card">
          <div className="card-header">
            <h2>
              <span className="step-number purple">3</span>
              <span>Entrance Examination</span>
            </h2>
          </div>
          <div className="card-content">
            <p>
              Upon success at the Olashore entrance examination, an offer letter will be issued and this will be
              accompanied by the following:
            </p>
            <ul className="icon-list">
              <li>
                <span className="icon-wrapper purple">
                  <ChevronRight size={18} />
                </span>
                <span>An offer of admission form to be filled by parent/guardian.</span>
              </li>
              <li>
                <span className="icon-wrapper purple">
                  <ChevronRight size={18} />
                </span>
                <span>A guide to fees and charges for the academic session in view.</span>
              </li>
              <li>
                <span className="icon-wrapper purple">
                  <ChevronRight size={18} />
                </span>
                <span>The fee schedule of the academic session in view.</span>
              </li>
              <li>
                <span className="icon-wrapper purple">
                  <ChevronRight size={18} />
                </span>
                <span>A list of required items for new students.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Step 4 */}
        <div className="application-card amber-card">
          <div className="card-header">
            <h2>
              <span className="step-number amber">4</span>
              <span>Acceptance</span>
            </h2>
          </div>
          <div className="card-content">
            <p>
              To accept the admission offer, parents are expected to return the fully completed acceptance form
              accompanied by evidence of payment of the registration fee.
            </p>
            <p>
              All other required fees are expected to be paid according to the Fees Schedule of academic session in
              view.
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
