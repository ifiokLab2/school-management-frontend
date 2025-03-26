
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link , useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import Skeleton from "@mui/material/Skeleton";
import '../styles/signup.css';
import '../styles/organization-dashboard.css';
import '../styles/repository.css';
import '../styles/applicant.css';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';
const CreateClass = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [formModal, setFormModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editFormModal, setEditFormModal] = useState(false);
    const [className, setClassName] = useState('');
    const [classId, setClassId] = useState('');
    const [grade, setGrade] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [selectedTeachers, setSelectedTeachers] = useState([]);
    const [teacherList, setTeacherList] = useState([]);
    const [classList, setClassList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });
    
    
   
    const handleSnackbarClose = () => {
        setSnackbar({ open: false, message: "", severity: "" });
    };
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleForm = () => {
        setFormModal(!formModal);
        
    };
    const toggleDeleteForm = (id) => {
        setClassId(id);
        setDeleteModal(!deleteModal);   
    };
    const closeDeleteForm = () => {
        setClassId("");
        setDeleteModal(!deleteModal);   
    };
    const toggleEditForm = (id,name,grade) => {
        setEditFormModal(!editFormModal);
        setClassId(id);
        setClassName(name);
        setGrade(grade);
        
    };
    const closeEditForm = () => {
        setEditFormModal(!editFormModal);
        setClassId("");
        setClassName("");
        setGrade("");
    };

    // Fetch teachers list when component mounts
    const fetchTeachers = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/teachers/`); // Adjust the endpoint to match your backend
            setTeacherList(response.data);
            setErrorMessage("");
            console.log('response.data:',response.data);
        } catch (error) {
            console.error("Error fetching teachers", error);
            setErrorMessage("Error fetching teacher list.");
        }
    };
    const fetchClasses = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/school-classes/`); // Adjust the endpoint to match your backend
            setClassList(response.data);
            setErrorMessage("");
            console.log('response.data:',response.data);
        } catch (error) {
            console.error("Error fetching teachers", error);
            setErrorMessage("Error fetching teacher list.");
        }
    };
    useEffect(() => {
        

        fetchTeachers();
        fetchClasses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Make the POST request to create the class
            const response = await axios.post(`${apiUrl}/api/school-classes/`, {
                name: className,
                grade,
                teachers: selectedTeachers,
            });

            setIsLoading(false);
            fetchClasses();
            console.log("Class created successfully:", response.data);
            setClassName('');
            setGrade('');
            setSelectedTeachers([]);
            setFormModal(false);  // Close the form modal after successful creation
        } catch (error) {
            setIsLoading(false);
            setErrorMessage("Error creating class.");
            console.error("Error creating class:", error);
        }
    };
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', className);
            formData.append('grade', grade);
            if(selectedTeachers.length > 0){
                formData.append('teachers', selectedTeachers);
            }
            console.log('selectedTeachers:',selectedTeachers);
            const response =  await axios.put(`${apiUrl}/school-classes/${classId}/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setIsLoading(false);
            console.log("Class created successfully:", response.data);
            setClassName('');
            setGrade('');
            setSelectedTeachers([]);
            fetchClasses();
            setSnackbar({
                open: true,
                message: "success!",
                severity: "success",
            });
            closeEditForm();  // Close the form modal after successful creation
        } catch (error) {
            setIsLoading(false);
            setErrorMessage("Error creating class.");
            console.error("Error creating class:", error);
        }
    };
    const handleDelete = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData();
            
            const response =  await axios.delete(`${apiUrl}/school-classes/${classId}/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setIsLoading(false);
            fetchClasses();
            setSnackbar({
                open: true,
                message: "success!",
                severity: "success",
            });
            closeDeleteForm();  // Close the form modal after successful creation
        } catch (error) {
            setIsLoading(false);
            setErrorMessage("Error creating class.");
            console.error("Error creating class:", error);
        }
    };

    return (
        <div className="home-wrapper">
            <div className="dashboard-body">
                <div className="sidebar-container-wrapper">
                    <OrganizationSidebar className={sidebarOpen ? 'visible' : ''} toggleSidebar={toggleSidebar} />
                </div>
                <OrganizationHeader toggleSidebar={toggleSidebar} />
                <div className="job-list-wrapper" id="organization-job-list">
                    <div className="employer-organizations">
                        <div className="org"></div>
                        <div onClick={toggleForm} className="create-btn">
                            Create Class
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Class</th>
                                <th>Teachers</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Populate the table dynamically here */}
                            {classList.map((schoolClass) => (
                                <tr key={schoolClass.id}>
                                    <td>{schoolClass.id}</td>
                                    <td>{schoolClass.name}</td>
                                    <td>{schoolClass.grade}</td>
                                    <td>{schoolClass.teachers.join(', ')}</td>
                                    <td>
                                        {/* admin should be able to delete or edit classes,can you provide updated code */}
                                        <button className = "delete" onClick={()=>toggleDeleteForm(schoolClass.id)}>delete</button>
                                        <button className = "edit-btn" onClick = {()=>toggleEditForm(schoolClass.id,schoolClass.name,schoolClass.grade)}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Form Modal for Creating Class */}
            <form className={`organization-form ${formModal ? 'show' : ''}`} onSubmit={handleSubmit}>
                <div className="form-wrapper">
                    <div className="form-header-x">
                        <div className="title">Create Class</div>
                        <div className="icon" onClick={toggleForm}>
                            <i className="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="form-body">
                        <div className={`form-group ${className ? "active":""}`}>
                            <div> Name</div>
                            <input
                                type="text"
                                id="className"
                                value={className}
                                onChange={(e) => setClassName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                           
                            <select
                                id="grade"
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                                required
                            >
                                <option value="">Select Grade</option>
                                <option value="nursery">Nursery</option>
                                <option value="primary_1">Primary 1</option>
                                <option value="primary_2">Primary 2</option>
                                <option value="primary_3">Primary 3</option>
                                <option value="primary_4">Primary 4</option>
                                <option value="primary_5">Primary 5</option>
                                <option value="jss_1">JSS 1</option>
                                <option value="jss_2">JSS 2</option>
                                <option value="jss_3">JSS 3</option>
                                <option value="sss_1">SSS 1</option>
                                <option value="sss_2">SSS 2</option>
                                <option value="sss_3">SSS 3</option>
                            </select>
                        </div>
                        <div className={`form-group ${selectedTeachers ? 'active' : ""}`}>
                            <div >Assign Teachers</div>
                            <select
                                id="teachers"
                                multiple
                                value={selectedTeachers}
                                onChange={(e) => {
                                    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
                                    setSelectedTeachers(selected);
                                }}
                            >
                                {teacherList.map((teacher) => (
                                    <option key={teacher.id} value={teacher.id}>
                                        {teacher.first_name}  {teacher.last_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="btn-wrapper">
                            <button type="submit">
                                Create Class
                                {isLoading && <div className="loader"></div>}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <form className={`organization-form ${editFormModal ? 'show' : ''}`} onSubmit={handleEditSubmit}>
                <div className="form-wrapper">
                    <div className="form-header-x">
                        <div className="title">Update Class</div>
                        <div className="icon" onClick={closeEditForm}>
                            <i className="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="form-body">
                        <div className={`form-group ${className ? "active":""}`}>
                            <div> Name</div>
                            <input
                                type="text"
                                id="className"
                                value={className}
                                onChange={(e) => setClassName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                           
                            <select
                                id="grade"
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                                required
                            >
                                <option value="">Select Grade</option>
                                <option value="nursery">Nursery</option>
                                <option value="primary_1">Primary 1</option>
                                <option value="primary_2">Primary 2</option>
                                <option value="primary_3">Primary 3</option>
                                <option value="primary_4">Primary 4</option>
                                <option value="primary_5">Primary 5</option>
                                <option value="jss_1">JSS 1</option>
                                <option value="jss_2">JSS 2</option>
                                <option value="jss_3">JSS 3</option>
                                <option value="sss_1">SSS 1</option>
                                <option value="sss_2">SSS 2</option>
                                <option value="sss_3">SSS 3</option>
                            </select>
                        </div>
                        <div className={`form-group ${selectedTeachers ? 'active' : ""}`}>
                            <div >Assign Teachers</div>
                            <select
                                id="teachers"
                                multiple
                                value={selectedTeachers}
                                onChange={(e) => {
                                    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
                                    setSelectedTeachers(selected);
                                }}
                            >
                                {teacherList.map((teacher) => (
                                    <option key={teacher.id} value={teacher.id}>
                                        {teacher.first_name}  {teacher.last_name}
                                    </option>
                                ))}
                            </select>
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
            <form className={`organization-form ${deleteModal ? 'show' : ''}`} onSubmit={handleDelete}>
            <div className="form-wrapper">
                <div className="form-header-x">
                    <div className="title">Delete Class</div>
                    <div className="icon" onClick={closeDeleteForm}>
                        <i className="fa-solid fa-circle-xmark"></i>
                    </div>
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="form-body">
                    <div className={`form-group ${className ? "active":""}`}>
                        <div>Are you sure you want to delete?</div>
            
                        
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

export default CreateClass;