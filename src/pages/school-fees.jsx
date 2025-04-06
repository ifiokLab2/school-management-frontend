
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link , useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import Skeleton from "@mui/material/Skeleton";
import '../styles/organization-dashboard.css';
import '../styles/school-fees.css';
import '../styles/repository.css';
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';

const SchoolFees = ()=>{
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [email, setEmail] = useState('');
    const [term, setTerm] = useState('');
    const [regNo, setRegNo] = useState('');
    const [loading,setLoading] = useState(true);
    const [classList, setClassList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [studentName, setStudentName] = useState('');
    const [studentNotFound, setStudentNotFound] = useState(false);
    const user = useSelector((state) => state.user.user);

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };

    
    useEffect(() => {
        const fetchStudent = async () => {
            if (regNo.length < 3) {
                setStudentName('');
                setStudentNotFound(false);
                return;
            }
            try {
                const res = await axios.get(`${apiUrl}/api/students/by-reg-no/${regNo}/`);
                if (res.data && res.data.name) {
                    setStudentName(res.data.name);
                    setStudentNotFound(false);
                } else {
                    setStudentName('');
                    setStudentNotFound(true);
                }
            } catch (err) {
                setStudentName('');
                setStudentNotFound(true);
            }
        };
    
        fetchStudent();
    }, [regNo]);
    
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
                    <div className="fee-wrapper">
                        <form className="fee-form" >
                            <h2>Pay School Fees</h2>

                            <div className='box-tab'>
                                <label>Student Reg No</label>
                                <input type="text" value={regNo} onChange = {(e)=>setRegNo(e.target.value)}  />
                                {/*filter and display the student name here after putting reg no else display no student found */}
                                {studentName && <p className="student-name">Student: {studentName}</p>}
                                 {studentNotFound && <p className="no-student">No student found</p>}
                            </div>

                            <div className='box-tab'>
                                <label>Parent Email</label>
                                <input type="email" value={email} onChange = {(e)=>setEmail(e.target.value)} />

                            </div>
                            
                            <div className='box-tab'>
                                <label>Select Term</label>
                                <select value={term} onChange={(e) => setTerm(e.target.value)} required>
                                <option value="">-- Select Term --</option>
                                <option value="first">First Term</option>
                                <option value="second">Second Term</option>
                                <option value="third">Third Term</option>
                                </select>
                            </div>
                            
                            <div className='box-tab'>
                                <label>Amount</label>
                                <input type="text" value={`₦${amount}`} onChange = {(e)=>setAmount(e.target.value)} />

                            </div>
                           
                            <button type="submit">Pay Now</button>

                            
                        </form>
                    </div>  
                </div>
                
                
               
            </div>
           
           
            
        </div>
        
       </div>
    )
};

export default SchoolFees;