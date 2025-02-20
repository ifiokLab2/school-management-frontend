
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

const TeacherClasses = ()=>{
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [jobs,setJobs] = useState([]);
    const [loading,setLoading] = useState(true);
    const [classList, setClassList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const user = useSelector((state) => state.user.user);

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };

    const fetchClasses = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/teacher-classes/`,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${user.auth_token}`,
                },
            }); // Adjust the endpoint to match your backend
            setClassList(response.data);
            setErrorMessage("");
            console.log('response.data:',response.data);
        } catch (error) {
            console.error("Error fetching teachers", error);
            setErrorMessage("Error fetching teacher list.");
        }
    };
    useEffect(() => {
        

        fetchClasses();
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
                               Class List
                            </div>
                           <div></div>
                </div>
                
                <div className='apps-container'>
                      {classList.map((data)=>(
                        <Link key={data.id} to = {`/teacher/attendance/${data.id}/class/`} className='cards organization-card' >
                        <div className='icon hrms-icon'>
                            <i className='fa-solid fa-file'></i>
                        </div>
                        <div className='text-wrapper'>
                            <div className='title-header'>{data.name}</div>
                            <p>{data.grade}</p>
                            <div className='employee-count'>
                                
                        
                            </div>
                            
                            
                        </div>
                        
                        </Link>
                      ))}     
                        
                            
                           
                            
                        </div>
                
                
               
            </div>
           
           
            
        </div>
        
       </div>
    )
};

export default TeacherClasses;