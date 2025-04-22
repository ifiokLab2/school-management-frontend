
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
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [formModal, setFormModal] = useState(false);
    const [loading,setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const user = useSelector((state) => state.user.user);

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };
     const toggleForm = () => {
        setFormModal(!formModal);
    };
     const handleFnameChange = (event) => {
        setFname(event.target.value);
    };
    
    const handleLnameChange = (event) => {
        setLname(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
           const response = await axios.post(`${apiUrl}/teacher/signup/`, {
            first_name: fname,
            last_name: lname,
            email,
            password,
            
            });

            setIsLoading(false);
            fetchTeachers();
           
            console.log("Class created successfully:", response.data);
            //setClassName('');

            
            setFormModal(false);  // Close the form modal after successful creation
        } catch (error) {
            setIsLoading(false);
            setErrorMessage("Error creating TeacheR.");
            
        }
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
                       <div onClick={toggleForm} className="create-btn">
                            Add Teacher
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
        <form className={`organization-form ${formModal ? 'show' : ''}`} onSubmit={handleSubmit}>
                <div className="form-wrapper">
                    <div className="form-header-x">
                        <div className="title">Add student</div>
                        <div className="icon" onClick={toggleForm }>
                            <i className="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="form-body">
                       
                        <div className={`form-group ${fname ? "active":""}`}>
                            <div> first Name:</div>
                            <input type="text" id="fname" value={fname} onChange = {handleFnameChange} required />
                        </div>
                        <div className={`form-group ${lname ? "active":""}`}>
                                <div>Last Name:</div>
                               <input type="text" id="lname" value={lname} onChange = {handleLnameChange} required />
                        </div>
                        <div className={`form-group ${email ? "active":""}`}>
                                <div>Email:</div>
                              <input type="text" id="email" value={email} onChange = {handleEmailChange} required />
                        </div>
                        <div className={`form-group ${password ? "active":""}`}>
                                <div>password:</div>
                              <input type="text" id="password" value={password} onChange = {handlePasswordChange}  required />
                        </div>
                        

                       

                        
                       
                       
                        <div className="btn-wrapper">
                            <button type="submit">
                                Submit
                                {isLoading && <div className="loader"></div>}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        
       </div>
    )
};

export default  TeacherList;