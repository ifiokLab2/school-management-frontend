'use client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import '../styles/header.css';
import { Link , useParams} from 'react-router-dom';

const Header = ()=>{
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [profile,setprofile] = useState(false);

    const toggleProfile = ()=>{
        setprofile(!profile);
    }

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    }
   

    return(
        <>
            <div className='header-job'>
           <div className='header-box-a'>
                <div className='menu-btn' onClick={toggleSidebar}>
                    <i className="fa-solid fa-bars"></i>
                </div>
                <Link href ='' className='logo'>
                    Logo
                </Link>
                <Link href ='/jobs/' className='job-link'>
                    Jobs
                </Link>
                <Link href ='/user-courses/' className='courses-link'>
                    Courses
                </Link>
           </div>
           <div className='header-box-b'>
               
                <div className='profile-tab' onClick={toggleProfile}>
                    <i className="fa-solid fa-user"></i>
                    <div className={`profile-container ${profile ? 'show' : ''}`}>
                        <div className='user-email'>
                            {user?.email}
                        </div>
                        <Link  href = '/organization/profile/' className='profile-tabs'>
                            <i className="fa-solid fa-address-card"></i>
                            <span>Profile</span>
                        </Link>
                        <Link  href = '/user/jobs/' className='profile-tabs'>
                             <i className="fa-solid fa-bookmark"></i>
                            <span>My Jobs</span>
                        </Link>
                        <Link  href = '' className='profile-tabs'>
                            <i className="fa-solid fa-gear"></i>
                            <span>Settings</span>
                        </Link>
                        <Link  href = '' className='profile-tabs'>
                            <i className="fa-solid fa-circle-question"></i>
                            <span>Help center</span>
                        </Link>
                    </div>
                </div>
                {user?.isLoggedIn ? (
                    <Link href ='/logout/' className='login-link'>
                    Logout
                </Link>
                ):(
                    <Link href ='/login/' className='login-link'>
                        Login
                    </Link>
                )}
                <Link href = '/organization/jobs/create/' className='job-link'>
                    Post Job
                </Link>
           </div>
           
             </div>
            <div className={`sideBar ${sidebarOpen ? 'show':''}`}>
            <div className='sidebar-wrapper'>
                <div className = 'auth-tab' >
                <div className='auth-wrapper'>
                        <Link href =''>Login</Link>
                </div>
                <div className='auth-wrapper'>
                        <Link href =''>signup</Link>
                </div>
                </div>
                <div className='side-body'>
                    <div className='title'>Most Popular</div>
                    <div className='link-btn'>
                        <Link href ='' >
                            <div className='text'>Jobs</div>
                            <div className='icon'>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </Link>  
                    </div>
                    <div className='link-btn'>
                        <Link href ='/user-courses/' >
                            <div className='text'>Courses</div>
                            <div className='icon'>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </Link>  
                    </div>
                    <div className='link-btn'>
                        <Link href ='' >
                            <div className='text'>Post Jobs</div>
                            <div className='icon'>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </Link>  
                    </div>
                    <div className='link-btn'>
                        <Link href ='' >
                            <div className='text'>Help Center</div>
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