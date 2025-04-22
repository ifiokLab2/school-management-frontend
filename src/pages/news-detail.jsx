
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
import CTAFooter from '../components/cta-footer';
import Header from '../components/header';
import "../styles/home.css";
import "../styles/news-detail.css";

import axios from 'axios';

import Footer from "../components/footer";
import { Link , useParams} from 'react-router-dom';
//const user = useSelector((state) => state.user.user);

export default function NewsDetail() {
    const [post,setPost] = useState([]);
    const { Id } = useParams();


  const fetchPost = async () => {
      try {
          const response = await axios.get(`${apiUrl}/posts/${Id}/edit/`, {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  //'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
              },
          });
          setPost(response.data);
          //setErrorMessage("");
          console.log('response.data:',response.data);
      } catch (error) {
          setPost([])
          //console.error("Error fetching teachers", error);
          //setErrorMessage("Error fetching teacher list.");
      }
  };
   useEffect(() => {

        fetchPost();
    }, []);
 
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
            <p>Honesty, Service and Honour</p>
          </div>
        </div>
       
    <div className="page-container">

      {/* Main Content */}
      <main className="main-content">
        <article className="article">
        <div className="featured-image-container">
            <img
              src={hero3}
              alt="Students presenting at the Digital Innovation Hub"
              className="featured-image"
            />
          </div>
          {/* Article Header */}
          <div className="article-header">
            <h1 className="article-title">{post.title}</h1>
            <div className="article-date">{post.description}</div>
            <div className="article-author">{post.date}</div>
          </div>

          {/* Featured Image */}
          

         
        </article>
      </main>

      
    </div>

       <CTAFooter />

       </div>

       <Footer />
    </>
    
  );
}
