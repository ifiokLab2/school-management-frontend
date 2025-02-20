
import 'swiper/swiper-bundle.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero-1.jpg';
import sport from '../styles/sp-3.webp';
import music from '../styles/music-2.webp';
import speaking from '../styles/ps-3.webp';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
import Header from '../components/header';
import "../styles/home.css";
import Footer from "../components/footer";
import { Link , useParams} from 'react-router-dom';

export default function Home() {
  const slides = [
    logo,
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
              autoplay={{ delay: 500 }}
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
                
        </div>
        
        <div className = "offer-wrapper">
          <div className = "container-1">
            <h2>What we Offer</h2>
          </div>
          <div className = "container-2">
            <div className = "cards">
              <div className = "icon cap">
              <i className="fa-solid fa-graduation-cap"></i>
              </div>
               
               <div className = "text">
                  <h2>ACADEMIC ACTIVITIES</h2>
                  <p>Our International School is made up of the junior and senior secondary schools as well as its leadership programmes.</p>
               </div>
            </div>
            <div className = "cards">
             
               <div className = "icon school">
               <i className="fa-solid fa-school"></i>
               </div>
               <div className = "text">
                  <h2>SCHOOL LIFE</h2>
                  <p>Our students are involved in a wide range of extracurricular activities without compromising their exceptional academic performance.</p>
               </div>
            </div>
            <div className = "cards">
              
               <div className = "icon star">
                <i className="fa-solid fa-star"></i>
               </div>
               <div className = "text">
                  <h2>LEADERSHIP TRAINING</h2>
                  <p>We provide an extensive array of leadership opportunities, including involvement in communities service for all students.</p>
               </div>
            </div>
           
          </div>
          <div className = "container-3"></div>
        </div>

        <div className='info-wrapper'>
          <div className='cards'>
            <div className='num'>400+</div>
            <div className = "text">Students Enrolled</div>
          </div>
          <div className='cards'>
            <div className='num'>60+</div>
            <div className = "text">Acres of Land</div>
          </div>
          <div className='cards'>
            <div className='num'>5+</div>
            <div className = "text">School Buses</div>
          </div>
          <div className='cards'>
            <div className='num'>60+</div>
            <div className = "text">Subjects</div>
          </div>
          <div className='cards'>
            <div className='num'>5+</div>
            <div className = "text">Programmes</div>
          </div>
        </div>
       </div>

       <div className = "activity-wrapper">
          <div className = "container-1">
            <h1>Extracurricular Activities</h1>
          </div>
          <div className='container-2'>
            <div className='cards'>
              <img src={speaking} alt='1' />
              <div className='wrapper'>
              <div className='text'>Public Speaking</div>
              </div>
             
            </div>
            <div className='cards'>
              <img src={sport} alt='1' />
              <div className='wrapper'>
              <div className='text'>Sports</div>
              </div>
             
            </div>
            <div className='cards'>
              <img src={music} alt='1' />
              <div className='wrapper'>
                <div className='text'>Music</div>
              </div>
            </div>
          </div>
       </div>
       <Footer />
    </>
    
  );
}
