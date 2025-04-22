
import React, { useState } from 'react';
import logo2 from '../styles/logo-2.webp';
import '../styles/header.css';
import { Link , useParams,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading } from '../actions/user-action'; // Import setUser and setLoading actions
import apiUrl from '../components/api-url';


const Header = ()=>{
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [profile,setprofile] = useState(false);
    const navigate = useNavigate();
    const toggleProfile = ()=>{
        setprofile(!profile);
    }

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    }
    const handleLogout =() => {
        dispatch(setUser(null));
        navigate('/login/');
      };
    
   

    return(
        <>
            <div className='header-job'>
           <div className='header-box-a'>
                <div className='menu-btn' onClick={toggleSidebar}>
                    <i className="fa-solid fa-bars"></i>
                </div>
                <Link to ='/' className='logo'>
                   <img src = {logo2} alt = "logo" />
                </Link>
                
                
           </div>
           <div className='header-box-c'>
                <div  className='job-link'>
                   <div className='text-card'>
                    <span> About</span>
                    <i className="fa-solid fa-chevron-down"></i>
                   </div>
                   <div className =  'hover-card'>
                    
                    <Link to = '/school-mission/'>Mission Statement and core Values</Link>
                   </div>
                </div>
                
                <div  className='job-link'>
                   <div className='text-card'>
                    <span> Admission</span>
                    <i className="fa-solid fa-chevron-down"></i>
                   </div>
                   <div className =  'hover-card'>
                    <Link to = '/academic-overview/'>Academics Overview</Link>
                    <Link to = '/curriculum/'>Curriculum</Link>
                   
                   </div>
                </div>
                <div  className='job-link'>
                   <div className='text-card'>
                    <span>Student Life </span>
                    <i className="fa-solid fa-chevron-down"></i>
                   </div>
                   <div className =  'hover-card'>
                    <Link to = '/public-speaking/'>Public Speaking</Link>
                   
                   
                   </div>
                </div>
                <div  className='job-link'>
                   <div className='text-card'>
                    <span>Admission </span>
                    <i className="fa-solid fa-chevron-down"></i>
                   </div>
                   <div className =  'hover-card'>
                    
                    <Link to = '/admission-process/'>Admission Process</Link>
                    
                   
                   </div>
                </div>
              
                <div  className='job-link'>
                   <div className='text-card'>
                    <span>Information </span>
                    <i className="fa-solid fa-chevron-down"></i>
                   </div>
                   <div className =  'hover-card'>
                    <Link to = '/news/'>News & Event</Link>
                    
                   
                   </div>
                </div>
                
           </div>
           <div className='header-box-b'>
               
                <div className='profile-tab' onClick={toggleProfile}>
                    <i className="fa-solid fa-user"></i>
                    <div className={`profile-container ${profile ? 'show' : ''}`}>
                        <div className='user-email'>
                            {user?.email}
                        </div>
                        
                        {user ? (
                            <>
                                <div onClick = {handleLogout}   className='profile-tabs'>
                                    
                                    <span>Logout</span>
                                </div>
                            </>
                        ):(
                            <>
                                <Link  to = '/login/' className='profile-tabs'>
                                   
                                    <span>Login</span>
                                </Link>
                               
                            </>
                        )}


                    </div>
                </div>
                {user? (
                    <div onClick={handleLogout} className='login-link'>
                        Logout
                    </div>
                ):(
                    <Link to ='/login/' className='login-link'>
                        Login
                    </Link>
                )}
               
           </div>
           
             </div>
            <div className={`sideBar ${sidebarOpen ? 'show':''}`}>
            <div className='sidebar-wrapper'>
                <div className = 'auth-tab' >
               {user === null ? (
                    <div className='auth-wrapper'>
                    <Link to='/login/'>Login</Link>
                </div>
               ):(
                    <div onClick = {handleLogout} className='auth-wrapper'>
                        <div  >logout</div>
                    </div>
               )}
               
                </div>
                <div className='side-body'>
                    <div className='title'></div>
                    <div className='link-btn'>
                        <Link to ='/news/' >
                            <div className='text'>News & Event</div>
                            <div className='icon'>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </Link>  
                    </div>
                    <div className='link-btn'>
                        <Link to ='/academic-overview/' >
                            <div className='text'>Academics Overvieww</div>
                            <div className='icon'>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </Link>  
                    </div>


                    <div className='link-btn'>
                        <Link to ='/curriculum/' >
                            <div className='text'>Curriculum</div>
                            <div className='icon'>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </Link>  
                    </div>
                    <div className='link-btn'>
                    
                        <Link to ='/school-mission/' >
                            <div className='text'>Mission Statement</div>
                            <div className='icon'>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </Link>  
                    </div>

                    <div className='link-btn'>
                    
                        <Link to ='/public-speaking/' >
                            <div className='text'>Public Speaking</div>
                            <div className='icon'>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </Link>  
                    </div>
                    <div className='link-btn'>
                        <Link to ='/admission-process/' >
                            <div className='text'>Admission process</div>
                            <div className='icon'>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </Link>  
                    </div>
                    
                    
                    <div className='link-btn'>
                        <Link to ='/news/' >
                            <div className='text'>News & Event</div>
                            <div className='icon'>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </Link>  
                    </div>
                    

                    
                    
                </div>
            </div>
            <div className='close-btn' onClick={toggleSidebar}>
                <i className="fa-solid fa-x"></i>
            </div>
            </div>
            
        </>
    );
};

export default Header;