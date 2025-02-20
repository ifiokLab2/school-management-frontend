
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link , useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import Skeleton from "@mui/material/Skeleton";
import '../styles/organization-dashboard.css';
import '../styles/repository.css';
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';

const TeacherDashboard = ()=>{
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [jobs,setJobs] = useState([]);
    const [loading,setLoading] = useState(true);
    
    const user = useSelector((state) => state.user.user);

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };
    useEffect(() => {
        

        
    }, []);
    
    return(
       <div class = 'home-wrapper'>
        <div className='dashboard-body'>
            
            <div className='sidebar-container-wrapper'>
                <OrganizationSidebar className={sidebarOpen ? 'visible' : ''} toggleSidebar={toggleSidebar}/>
            </div>
            <OrganizationHeader toggleSidebar={toggleSidebar} />
            <div className='job-list-wrapper' id='organization-job-list' >
            <div className='employer-organizations'>
                            <div class = 'org'>
                               
                            </div>
                           <Link href ='/organization/jobs/create/' className = "create-btn"></Link>
                </div>
                
                <div className='apps-container'>
                            <Link href = "" className='cards organization-card' >
                            <div className='icon hrms-icon'>
                                <i className='fa-solid fa-message'></i>
                            </div>
                            <div className='text-wrapper'>
                                <div className='title-header'>3600</div>
                                <p>Fees collected</p>
                                <div className='employee-count'>
                                    { /*<i class="fa-solid fa-users"></i>
                                    <span>dept</span> */  }
                            
                                </div>
                                
                                
                            </div>
                            
                            </Link>
                            <Link href = "" className='cards organization-card' >
                            <div className='icon hrms-icon'>
                                <i className='fa-solid fa-file'></i>
                            </div>
                            <div className='text-wrapper'>
                                <div className='title-header'>14</div>
                                <p>Students</p>
                                <div className='employee-count'>
                                    
                            
                                </div>
                                
                                
                            </div>
                            
                            </Link>
                            <Link href = "" className='cards organization-card' >
                            <div className='icon hrms-icon'>
                                <i className='fa-solid fa-file'></i>
                            </div>
                            <div className='text-wrapper'>
                                <div className='title-header'>9</div>
                                <p>Teacher</p>
                                <div className='employee-count'>
                                    
                            
                                </div>
                                
                                
                            </div>
                            
                            </Link>
                            <Link href = "" className='cards organization-card' >
                            <div className='icon hrms-icon'>
                                <i className='fa-solid fa-file'></i>
                            </div>
                            <div className='text-wrapper'>
                                <div className='title-header'>6</div>
                                <p>Todays Attendance</p>
                                <div className='employee-count'>
                                    
                            
                                </div>
                                
                                
                            </div>
                            
                            </Link>
                            <Link href = "" className='cards organization-card' >
                            <div className='icon hrms-icon'>
                                <i className='fa-solid fa-file'></i>
                            </div>
                            <div className='text-wrapper'>
                                <div className='title-header'>12</div>
                                <p>Parents</p>
                                <div className='employee-count'>
                                    
                            
                                </div>
                                
                                
                            </div>
                            
                            </Link>
                            <Link href = "" className='cards organization-card' >
                            <div className='icon hrms-icon'>
                                <i className='fa-solid fa-file'></i>
                            </div>
                            <div className='text-wrapper'>
                                <div className='title-header'>4</div>
                                <p>Alvailable classes</p>
                                <div className='employee-count'>
                                    
                            
                                </div>
                                
                                
                            </div>
                            
                            </Link>
                            <Link href = "" className='cards organization-card' >
                            <div className='icon hrms-icon'>
                                <i className='fa-solid fa-file'></i>
                            </div>
                            <div className='text-wrapper'>
                                <div className='title-header'>2</div>
                                <p>Unpaid Fees</p>
                                <div className='employee-count'>
                                    
                            
                                </div>
                                
                                
                            </div>
                            
                            </Link>
                           
                            
                        </div>
                
                
               
            </div>
           
           
            
        </div>
        
       </div>
    )
};

export default TeacherDashboard;