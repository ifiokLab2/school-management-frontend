
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link , useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import Skeleton from "@mui/material/Skeleton";
import '../styles/organization-dashboard.css';
import '../styles/repository.css';
import '../styles/update-result.css';
import '../styles/add-result.css';
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const UpdateResult = () => {
    const { studentId } = useParams();
    const [term, setTerm] = useState("first");
    const [year, setYear] = useState("2024");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [student, setStudent] = useState({});
    const [position, setPosition] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    //const apiUrl = "http://localhost:8000"; // change as needed
    const user = useSelector((state) => state.user.user);
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });
    
    
   
    const handleSnackbarClose = () => {
        setSnackbar({ open: false, message: "", severity: "" });
    };

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };
  
    useEffect(() => {
        fetchResults();
      }, [studentId, term, year]);


    const fetchStudent = async () => {
        try {
          const res = await axios.get(`${apiUrl}/api/child/${studentId}/`);
          setStudent(res.data);
        } catch (error) {
          console.error("Error fetching student:", error);
          // Optionally show user-friendly error message
        }
      };
      
      const fetchResults = async () => {
        setLoading(true);
        try {
          const res = await axios.get(
            `${apiUrl}/api/results/?student_id=${studentId}&term=${term}&year=${year}`
          );
          setResults(res.data.data);
          setPosition(res.data.position)
        } catch (err) {
          console.error("Failed to fetch results", err);
        } finally {
          setLoading(false);
        }
      };
      const handleInputChange = (index, field, value) => {
        const updated = [...results];
        updated[index][field] = value;
        setResults(updated);
      };
    
      const handleSubmit = async () => {
        setLoading(true);
        try {
          await Promise.all(
            results.map((result) =>
              axios.put(`${apiUrl}/api/update-result/${result.id}/`, {
                grade: result.grade,
                score: result.score,
                position,
                student_id:studentId,
                term,
                year,
              })
            )
          );
          setSnackbar({
            open: true,
            message: "success!",
            severity: "success",
        });
          setSuccessMsg("Results updated successfully.");
        } catch (err) {
          console.error("Error updating results", err);
          setSnackbar({
            open: true,
            message: "Error updating results",
            severity: "error",
        });
        } finally {
          setLoading(false);
        }
      };
  
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
                            Subjects
                          </div>
                         <div>
                              
                         </div>
              </div>
              
              <div className='apps-container'>
              <div className="result-wrapper">
                    <h2>Update Student Results</h2>
                    <div className = "term-year filters">
                        <label>Term:</label>
                        <select value={term} onChange={(e) => setTerm(e.target.value)}>
                        <option value="first">First Term</option>
                        <option value="second">Second Term</option>
                        <option value="third">Third Term</option>
                        </select>

                        <label>Year:</label>
                        <input
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        />
                    </div>

                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="subjects-grid">
                        {results.map((result, index) => (
                            <div key={result.id} className="subject-item">
                            <h4>{result.subject_name}</h4>
                            <div className="grade-score-container">
                            
                                <select
                                    value={result.grade}
                                    onChange={(e) =>
                                    handleInputChange(index, "grade", e.target.value)
                                    }
                                >
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="F">F</option>
                                </select>
                               
                                <input
                                    type="number"
                                    value={result.score}
                                    onChange={(e) =>
                                    handleInputChange(index, "score", e.target.value)
                                    }
                                />
                              </div>

                                
                            </div>
                        ))}
                         <div  className="subject-item">
                        <label>Position:</label>
                        <div className="grade-score-container">
                        <input
                          required
                            type="number"
                            placeholder="Position"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            />
                        </div>
                      </div>
                        </div>
                    )}

                    
                    <div className="card-footer">
                      <button type="button" className="button primary-button" onClick={handleSubmit}>
                        Update Results
                      </button>
                    </div>

                    {successMsg && <p className="success-msg">{successMsg}</p>}
                    </div>
              </div>
          </div>
         
         
          
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        >
        <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleSnackbarClose}
        severity={snackbar.severity}
        >
        {snackbar.message}
        </MuiAlert>
        </Snackbar>
     </div>
    );
  };
  
  export default UpdateResult;