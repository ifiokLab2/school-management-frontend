
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

const  TeacherList = ()=>{
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [loading,setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const user = useSelector((state) => state.user.user);

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };

    const fetchTeachers = async () => {
        try {
          const response = await axios.get(`${apiUrl}/teachers/`, {
            headers: {
              //Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure user is authenticated
            },
          });
          setTeachers(response.data);
        } catch (err) {
            setErrorMessage("Failed to load teachers.");
        } finally {
          setLoading(false);
        }
    };
    useEffect(() => {
        

        fetchTeachers();
    }, [user]);
    
    return(
       <div class = 'home-wrapper'>
        <div className='dashboard-body'>
            
            <div className='sidebar-container-wrapper'>
                <OrganizationSidebar className={sidebarOpen ? 'visible' : ''} toggleSidebar={toggleSidebar}/>
            </div>
            <OrganizationHeader toggleSidebar={toggleSidebar} />
            <div className="job-list-wrapper" id="organization-job-list">
                    <div className="employer-organizations">
                        <div className="org"></div>
                        <div >
                           
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Class</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {/* Populate the table dynamically here */}
                            {teachers.map((data) => (
                                <tr key={data.id}>
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.classes.length > 0 ? (
                                            <ul>
                                            {data.classes.map((cls) => (
                                                <li key={cls.id}>
                                                {cls.name} ({cls.grade})
                                                </li>
                                            ))}
                                            </ul>
                                        ) : (
                                            "No classes assigned"
                                        )}</td>
                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
           
           
            
        </div>
        
       </div>
    )
};

export default  TeacherList;