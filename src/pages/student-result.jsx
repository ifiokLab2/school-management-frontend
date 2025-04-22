
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link , useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import Skeleton from "@mui/material/Skeleton";
import '../styles/organization-dashboard.css';
import '../styles/repository.css';
import '../styles/student-result.css';
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';


const StudentResult = () => {
    const { studentId } = useParams();
    const user = useSelector((state) => state.user.user);
    const [results, setResults] = useState([]);
    const [term, setTerm] = useState('first');
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [student, setStudent] = useState({});
    const [position, setPosition] = useState("");
    const [loading, setLoading] = useState(false);
    //const apiUrl = 'http://localhost:8000'; // change to your base URL
    const [sidebarOpen,setsidebarOpen] = useState(false);

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };
  
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/child/${studentId}/`);
        setStudent(res.data);
      } catch (err) {
        console.error("Failed to fetch student", err);
      }
    };
  
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${apiUrl}/api/results/?student_id=${studentId}&term=${term}&year=${year}`
        );
        setResults(res.data.data);
        setPosition(res.data.position);
      } catch (err) {
        console.error("Failed to fetch results", err);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchStudent();
      fetchResults();
    }, [term, year]);
  
    return (
     
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
                         <div>
                            {user.isParent ? (
                                ""
                                ):(
                                <Link to = {`/admin/add/${studentId}/result/`} className = "create-btn">Upload Result</Link>
                            )}

                              
                         </div>
              </div>
              
              <div className='apps-container'>
                    <div className="student-results-page">
                        <h2>Results for {student?.first_name} {student?.last_name}</h2>
                
                        <div className="filters">
                        <select value={term} onChange={(e) => setTerm(e.target.value)}>
                            <option value="first">First Term</option>
                            <option value="second">Second Term</option>
                            <option value="third">Third Term</option>
                        </select>
                
                        <input
                            type="text"
                            placeholder="Year (e.g., 2024)"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                        <button onClick={fetchResults}>Load Results</button>
                        </div>
                
                        {loading ? (
                        <p>Loading results...</p>
                        ) : (
                        <table className="results-table">
                            <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Score</th>
                                <th>Grade</th>
                                {!user.isParent && (
                                        <td>Edit</td>
                                )}

                               
                            </tr>
                            </thead>
                            <tbody>
                            {results.length > 0 ? (
                                results.map((result, index) => (
                                <tr key={index}>
                                    <td>{result.subject_name}</td>
                                    <td>{result.score}</td>
                                    <td>{result.grade}</td>
                                    {!user.isParent && (
                                        <td>
                                            <Link to = {`/update/${studentId}/result/`} >Edit</Link>
                                        </td>
                                        )}
                                   
                                </tr>
                                ))
                                
                            ) : (
                                <tr>
                                <td colSpan="4">No results found for selected term/year.</td>
                                </tr>
                            )}
                           
                                <tr>
                                          
                                <td colSpan="4">Position:{position ?? '-'}</td>
                             </tr>
                          
                            </tbody>
                        </table>
                        )}
                    </div>
              </div>
          </div>
         
         
          
      </div>
      
     </div>
    );
  };
  
  export default StudentResult;