
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
import { Swiper, SwiperSlide, } from 'swiper/react';
import React, { useState, useEffect } from 'react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
import Header from '../components/header';
import "../styles/home.css";
import axios from 'axios';
import image_file from '../styles/file_m.jpg';
import CTAFooter from '../components/cta-footer';
import Footer from "../components/footer";
import { Link , useParams} from 'react-router-dom';
//const user = useSelector((state) => state.user.user);

export default function Home() {
  const [postList,setPostList] = useState([]);

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
  const slides = [
    
    hero1,
    hero2,
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
            <h2>UST INTERNATIONAL SCHOOL</h2>
            <p>Honesty, Service and Honour</p>
          </div>
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

       <div className="testimonial-container">
          <h2 className="testimonial-heading">Parents Testimonial</h2>

          <div className="testimonial-cards">
            {/* Yellow Card */}
            <div className="testimonial-card yellow">
              <div className="testimonial-content">
                <p className="testimonial-text">
                  "Enrolling my child at UST School was the best decision. The school's commitment to excellence,
                  combined with a nurturing environment, has significantly shaped my child's growth and academic success.
                  I'm impressed!"
                </p>
              </div>
              <div className="testimonial-author">
                <p>Mrs. Ngozi Adeyemi</p>
              </div>
            </div>

            {/* Blue Card */}
            <div className="testimonial-card blue">
              <div className="testimonial-content">
                <p className="testimonial-text">
                  "Choosing UST School for my child was a game-changer. The school's holistic approach to education and
                  the dedicated faculty have fostered not just academic growth but also personal development. Kudos to
                  UST!"
                </p>
              </div>
              <div className="testimonial-author">
                <p>Mr. Emeka Okafor</p>
              </div>
            </div>

            {/* Green Card */}
            <div className="testimonial-card green">
              <div className="testimonial-content">
                <p className="testimonial-text">
                  "I'm delighted with the progress my child has made at UST School. The supportive community,
                  comprehensive curriculum, and various extracurricular activities have contributed immensely to my child's
                  all-around development."
                </p>
              </div>
              <div className="testimonial-author">
                <p>Mrs. Tolu Abubakar</p>
              </div>
            </div>
          </div>
        </div>
        <div className="about-container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="about-heading">About Us</h2>

              <p className="about-paragraph">
                UST International School is a co-educational boarding school founded in 1994, located on a 60-hectare
                campus three hours from Lagos. It provides an international education with a focus on traditional Nigerian
                values. The school attracts students from both Nigeria and abroad, particularly from the US and UK, offering
                a disciplined boarding environment that nurtures academic and personal growth.
              </p>

              <p className="about-paragraph">
                The school emphasizes holistic development, offering a strong academic curriculum alongside extracurricular
                activities such as sports, performing arts, public speaking, and leadership programs. Students also engage
                in community projects and participate in the Duke of Edinburgh Award scheme. The school has its own farm,
                where students cultivate crops and learn practical skills.
              </p>

              <p className="about-paragraph">
                UST's curriculum blends the Nigerian and British systems, preparing students for Cambridge IGCSE, West
                African Senior Secondary Certificate Examinations, and other exams like SAT, JAMB, and IELTS. The use of
                technology is integral to learning, with all students provided an iPad for academic activities. Since
                joining the Council of British International Schools in 2016, UST has earned several awards, including
                British Council Awards for IGCSE performance and the Diana Awards for community service. The school
                continues to uphold high standards in both academic excellence and community involvement.
              </p>

              <h2 className="about-heading">Mission Statement</h2>

              <p className="about-paragraph">
                UST International School is a learning community committed to academic excellence, nurturing each child
                to their full potential in a safe a serene environment, developing leaders for the dynamic global society in
                the 21st century.
              </p>
            </div>

            <div className="about-image">
              <img
                src={image_file}
                alt="UST International School students in uniform"
              />
            </div>
          </div>
        </div>
        {/* lates post */}
        {postList.length > 0 && (
            <section className="latest-posts-section">
            <div className="container">
              <h2 className="section-title">Latest Post</h2>
              <p className="section-subtitle">Stay up-to-date with the latest news and events at our school</p>
  
              <div className="posts-grid">
                {/* Main featured post */}
                <div className="featured-post">
                  <div className="featured-image-container">
                    <div className="logo-overlay">
                      <div className="logo-circle">
                        <img src={music} alt="School logo" className="logo-img" />
                      </div>
                    </div>
                    <img
                      src={music}
                      alt="Digital Innovation Hubs at OIS"
                      className="featured-image"
                    />
                  </div>
                  <div className="featured-content">
                    <h3 className="featured-title">{postList[0].title}</h3>
                    <p className="post-date">{postList[0].date}</p>
                    <Link to={`/news-detail/${postList[0].id}/post/`} className="read-more-btn">
                      Read More
                    </Link>
                  </div>
                </div>
  
                {/* Sidebar news items */}
                <div className="news-sidebar">
                    {postList.map((data)=>(
                        <Link key = {data.id} to={`/news-detail/${data.id}/post/`} className="news-item">
                          <div className="news-item-image-container">
                            <img src={sport} alt="" className="news-item-image" />
                          </div>
                          <div className="news-item-content">
                            <h4 className="news-item-title">{data.title}</h4>
                            <p className="news-item-date">{data.date}</p>
                          </div>
                      </Link>              
                    ))}
                  
                </div>
              </div>
            </div>
          </section>
        )}

       <CTAFooter />



       </div>

      


       <Footer />
    </>
    
  );
}
