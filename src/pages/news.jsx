
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
import CTAFooter from '../components/cta-footer';
import "../styles/home.css";
import "../styles/news.css";

import axios from 'axios';

import Footer from "../components/footer";
import { Link , useParams} from 'react-router-dom';
//const user = useSelector((state) => state.user.user);

export default function News() {
  const [postList,setPostList] = useState([]);
  
  const slides = [
    
    hero3,
   
     // Add more image URLs as needed
    ];
 
    const fetchPost = async () => {
      try {
          const response = await axios.get(`${apiUrl}/admin-post/create/`, {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  //'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
              },
          });
          setPostList(response.data);
          //setErrorMessage("");
          console.log('response.data:',response.data);
      } catch (error) {
          setPostList([])
          console.error("Error fetching teachers", error);
          //setErrorMessage("Error fetching teacher list.");
      }
  };
    useEffect(() => {
      
        fetchPost();
        
    }, []);
      // Simple icon components
      const CalendarIcon = () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="calendar-icon"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      )
    
      const ArrowRightIcon = () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="arrow-right-icon"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      );

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
            <h2>NEWS</h2>
            <p>UST international school news page.</p>
          </div>
        </div>
        <main className="news-page">
            {/* Green header banner */}
            

            {/* Breadcrumb navigation */}
           

            {/* News grid */}
            <div className="container">
                <div className="news-grid">
                {postList.map((item, index) => (
                    <div className="news-card" key={index}>
                    <div className="news-image-container">
                        <img src={hero3} alt={item.title} className="news-image" />
                        <div className="calendar-icon-container">
                        <CalendarIcon />
                        </div>
                    </div>
                    <div className="news-meta">
                        <span>{item.author}</span>
                        <span className="meta-separator">•</span>
                        <span>{item.date}</span>
                    </div>
                    <h3 className="news-title">{item.title}</h3>
                    <p className="news-excerpt post-limit">{item.description}</p>
                    <Link to={`/news-detail/${item.id}/post/`} className="read-more-link">
                        READ MORE
                        <ArrowRightIcon />
                    </Link>
                    </div>
                ))}
                </div>
            </div>
            </main>
       
          <CTAFooter />

       </div>

       <Footer />
    </>
    
  );
}
