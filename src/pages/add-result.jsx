
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link , useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import Skeleton from "@mui/material/Skeleton";
import '../styles/organization-dashboard.css';
import '../styles/repository.css';
import '../styles/add-result.css';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';


const AddResult = () => {
    const { studentId } = useParams();
    const [student, setStudent] = useState(null);
    const [term, setTerm] = useState("first");

    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [position, setPosition] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [results, setResults] = useState({});
    //const apiUrl = "http://localhost:8000"; // change as needed
    const user = useSelector((state) => state.user.user);
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });
    
    
   
    const handleSnackbarClose = () => {
        setSnackbar({ open: false, message: "", severity: "" });
    };
    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };
  
    useEffect(() => {
      fetchStudent();
      fetchSubjects();
    }, [studentId]);


    const fetchStudent = async () => {
        try {
          const res = await axios.get(`${apiUrl}/api/child/${studentId}/`);
          setStudent(res.data);
        } catch (error) {
          console.error("Error fetching student:", error);
          // Optionally show user-friendly error message
        }
      };
      
      const fetchSubjects = async () => {
        try {
          const res = await axios.get(`${apiUrl}/api/subjects/`);
          const subjectMap = {};
          res.data.forEach((subject) => {
            subjectMap[subject.name] = { grade: "", score: "" };
          });
          setSubjects(res.data);
          setResults(subjectMap);
        } catch (error) {
          console.error("Error fetching subjects:", error);
          // Optionally show user-friendly error message
        }
      };
      
    const handleChange = (subjectName, field, value) => {
      setResults((prev) => ({
        ...prev,
        [subjectName]: {
          ...prev[subjectName],
          [field]: value,
        },
      }));
    };
    const resetResults = () => {
      const cleared = {};
      subjects.forEach(subject => {
        cleared[subject.name] = { grade: "", score: "" };
      });
      setResults(cleared);
    };
  
    const handleSubmit = async () => {
      const resultPayload = Object.entries(results).map(([subjectName, data]) => ({
        subject: subjectName,
        grade: data.grade,
        score: data.score,
      }));
  
      const payload = {
        student: studentId,
        term,
        year,
        position,
        results: resultPayload,
      };
  
      try {
        const response = await axios.post(`${apiUrl}/api/upload-result/`, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
            },
        });
        //await axios.post(`${apiUrl}/api/upload-result/`, payload);
        //alert("Results submitted successfully!");
        setSnackbar({
          open: true,
          message: "success!",
          severity: "success",
      });
        resetResults();
        setPosition("");
      } catch (error) {
        console.error(error);
        setSnackbar({
          open: true,
          message: "Result already exist for the selected year & term!",
          severity: "error",
      });
        //alert("Failed to submit results.");
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
                    <h2>Upload Results for {student?.first_name} {student?.last_name}</h2>
            
                    <div className="term-year">
                    <select value={term} onChange={(e) => setTerm(e.target.value)}>
                        <option value="first">First Term</option>
                        <option value="second">Second Term</option>
                        <option value="third">Third Term</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Year (e.g. 2024)"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                    </div>
            
                    <div className="subjects-grid">
                    {subjects.map((subject) => (
                        <div key={subject.id} className="subject-item">
                        <label>{subject.name}</label>
                        <div className="grade-score-container">
                            <select
                            value={results[subject.name]?.grade || ""}
                            onChange={(e) => handleChange(subject.name, "grade", e.target.value)}
                            >
                            <option value="">Grade</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="F">F</option>
                            </select>
                            <input
                            type="number"
                            placeholder="Score"
                            value={results[subject.name]?.score || ""}
                            onChange={(e) => handleChange(subject.name, "score", e.target.value)}
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
            
                    <div className="card-footer">
                    <button type="button" className="button primary-button" onClick={handleSubmit}>
                        Submit Grades
                    </button>
                    </div>
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
  
  export default AddResult;