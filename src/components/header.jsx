
import React, { useState } from 'react';

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
                    Logo
                </Link>
                
                
           </div>
           <div className='header-box-c'>
                <div  className='job-link'>
                   <div className='text-card'>
                    <span> About</span>
                    <i className="fa-solid fa-chevron-down"></i>
                   </div>
                   <div className =  'hover-card'>
                    <Link to = ''>Our story</Link>
                    <Link to = ''>Philosophy</Link>
                    <Link to = ''>Mission Statement and core Values</Link>
                   </div>
                </div>
                
                <div  className='job-link'>
                   <div className='text-card'>
                    <span> Admission</span>
                    <i className="fa-solid fa-chevron-down"></i>
                   </div>
                   <div className =  'hover-card'>
                    <Link to = ''>Academics Overview</Link>
                    <Link to = ''>Curriculum</Link>
                    <Link to = ''>Academics Excellence</Link>
                   </div>
                </div>
                <div  className='job-link'>
                   <div className='text-card'>
                    <span>Student Life </span>
                    <i className="fa-solid fa-chevron-down"></i>
                   </div>
                   <div className =  'hover-card'>
                    <Link to = ''>Extracurricular Activities</Link>
                    <Link to = ''>Religious Activities</Link>
                   
                   </div>
                </div>
                <div  className='job-link'>
                   <div className='text-card'>
                    <span>Admission </span>
                    <i className="fa-solid fa-chevron-down"></i>
                   </div>
                   <div className =  'hover-card'>
                    <Link to = ''>Admissions Overview</Link>
                    <Link to = ''>Admission Process</Link>
                    <Link to = ''>School fees</Link>
                   
                   </div>
                </div>
                <div  className='job-link'>
                   <div className='text-card'>
                    <span>Enrichment </span>
                    <i className="fa-solid fa-chevron-down"></i>
                   </div>
                   <div className =  'hover-card'>
                    <Link to = ''>Leadership</Link>
                    <Link to = ''>Innovation Hub</Link>
                    <Link to = ''>Work experience</Link>
                   
                   </div>
                </div>
                <div  className='job-link'>
                   <div className='text-card'>
                    <span>Information </span>
                    <i className="fa-solid fa-chevron-down"></i>
                   </div>
                   <div className =  'hover-card'>
                    <Link to = ''>News & Event</Link>
                    <Link to = ''>Newsletter</Link>
                    <Link to = ''>Work experience</Link>
                   
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
                        <Link to ='' >
                            <div className='text'>Academics Overvieww</div>
                            <div className='icon'>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </Link>  
                    </div>

                    <div className='link-btn'>
                        <Link to ='' >
                            <div className='text'>Curriculum</div>
                            <div className='icon'>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </Link>  
                    </div>
                    <div className='link-btn'>
                        <Link to ='' >
                            <div className='text'>Extra curricular activities</div>
                            <div className='icon'>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </Link>  
                    </div>

                    <div className='link-btn'>
                        <Link to ='' >
                            <div className='text'>Religious Activties</div>
                            <div className='icon'>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </Link>  
                    </div>
                    <div className='link-btn'>
                        <Link to ='' >
                            <div className='text'>Admission Overview</div>
                            <div className='icon'>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </Link>  
                    </div>
                    
                    <div className='link-btn'>
                        <Link to ='' >
                            <div className='text'>Innovation Hub</div>
                            <div className='icon'>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </Link>  
                    </div>
                    <div className='link-btn'>
                        <Link to ='' >
                            <div className='text'>News & Event</div>
                            <div className='icon'>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </Link>  
                    </div>
                    <div className='link-btn'>
                        <Link to ='' >
                            <div className='text'>Work Experience</div>
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