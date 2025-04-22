
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link , useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import Skeleton from "@mui/material/Skeleton";
import '../styles/organization-dashboard.css';
import '../styles/repository.css';
import '../styles/subject.css';
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';

const Subject = ()=>{
    const [showModal, setShowModal] = useState(false);
    const [subjectName, setSubjectName] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [editingSubject, setEditingSubject] = useState(null);

    const [sidebarOpen,setsidebarOpen] = useState(false);
    const user = useSelector((state) => state.user.user);
 

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };
    const fetchSubjects = async () => {
        try {
          const response = await axios.get(`${apiUrl}/api/subjects/`);
          setSubjects(response.data);
        } catch (error) {
          console.error("Failed to fetch subjects.");
        }
    };
    const openCreateModal = () => {
        setSubjectName("");
        setEditingSubject(null);
        setShowModal(true);
      };
    
      const openEditModal = (subject) => {
        setSubjectName(subject.name);
        setEditingSubject(subject);
        setShowModal(true);
      };
    
      const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this subject?")) return;
    
        try {
          await axios.delete(`${apiUrl}/api/subjects/${id}/`);
          fetchSubjects();
        } catch (error) {
          console.error("Error deleting subject.");
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
    
        try {
          if (editingSubject) {
            await axios.put(`${apiUrl}/api/subjects/${editingSubject.id}/`, {
              name: subjectName,
            });
            setMessage("Subject updated!");
          } else {
            await axios.post(`${apiUrl}/api/subjects/`, { name: subjectName });
            setMessage("Subject created!");
          }
    
          setSubjectName("");
          setShowModal(false);
          setEditingSubject(null);
          fetchSubjects();
        } catch (error) {
          setMessage("Error saving subject.");
        } finally {
          setLoading(false);
        }
      };
    useEffect(() => {
      fetchSubjects();
    }, [user]);
    
    return(
       <div class = 'home-wrapper'>
        <div className='dashboard-body'>
            
            <div className='sidebar-container-wrapper'>
                <OrganizationSidebar className={sidebarOpen ? 'visible' : ''} toggleSidebar={toggleSidebar}/>
            </div>
            <OrganizationHeader toggleSidebar={toggleSidebar} />
            <div className='job-list-wrapper subject-wrapper ' id='organization-job-list' >
            <div className='employer-organizations'>
                            <div class = 'org'>
                              Subjects
                            </div>
                           <div>
                                <button className="create-btn" onClick={openCreateModal}>
                                    Create Subject
                                </button>
                           </div>
                </div>
                
                <div className='apps-container'>
                <div className="container">
                    

                    {showModal && (
                        <div className="modal-overlay">
                        <div className="modal">
                            <button className="close-btn" onClick={() => setShowModal(false)}>
                            &times;
                            </button>
                            <h2>{editingSubject ? "Edit Subject" : "Create Subject"}</h2>
                            <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={subjectName}
                                onChange={(e) => setSubjectName(e.target.value)}
                                placeholder="Enter subject name"
                                className="input"
                                required
                            />
                            <button type="submit" className="submit-btn" disabled={loading}>
                                {loading ? "Saving..." : editingSubject ? "Update" : "Create"}
                            </button>
                            </form>
                        </div>
                        </div>
                    )}

                    {message && <p className="message">{message}</p>}

                    
                    <ul className="subject-list">
                        {subjects.length === 0 ? (
                        <li>No subjects found.</li>
                        ) : (
                        subjects.map((subject) => (
                            <li key={subject.id} className="subject-item">
                            <span>{subject.name}</span>
                            <div className="action-buttons">
                                <button
                                className="edit-btn"
                                onClick={() => openEditModal(subject)}
                                >
                                Edit
                                </button>
                                <button
                                className="delete-btn"
                                onClick={() => handleDelete(subject.id)}
                                >
                                Delete
                                </button>
                            </div>
                            </li>
                        ))
                        )}
                    </ul>
                    </div>
                </div>
                
                
               
            </div>
           
           
            
        </div>
        
       </div>
    )
};

export default Subject;