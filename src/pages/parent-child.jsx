
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

const ParentChild = ()=>{
    const [sidebarOpen,setsidebarOpen] = useState(false);
    //const [student,setStudent] = useState([]);
    const [loading,setLoading] = useState(true);
    const [classList, setClassList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const user = useSelector((state) => state.user.user);

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };

    const fetchChild = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/parent-child/`,{
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
        

        fetchChild();
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
                              Pupils
                            </div>
                           <div></div>
                </div>
                
                <div className='apps-container'>
                      {classList.map((data)=>(
                        <Link key={data.id} to = {`/parent/attendance/${data.school_class}/class/${data.id}/child/`} className='cards organization-card' >
                        <div className='icon hrms-icon'>
                            <i className='fa-solid fa-user'></i>
                        </div>
                        <div className='text-wrapper'>
                            <div className='title-header'>{data.first_name} {data.last_name}</div>
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

export default ParentChild;