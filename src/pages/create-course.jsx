
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
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';


const CreateCourse = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [formModal, setFormModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editFormModal, setEditFormModal] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [courseId, setCourseId] = useState('');
    const [teacherList, setTeacherList] = useState([]);
    const [selectedTeachers, setSelectedTeachers] = useState([]);
   
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleForm = () => {
        setFormModal(!formModal);
        
    };
    const toggleDeleteForm = (id) => {
        setCourseId(id);
        setDeleteModal(!deleteModal);   
    };
    const closeDeleteForm = () => {
        setCourseId("");
        setDeleteModal(!deleteModal);   
    };
    const toggleEditForm = (id,name,description) => {
        setEditFormModal(!editFormModal);
        setCourseId(id);
        setName(name);
        setDescription(description);   
    };
    const closeEditForm = () => {
        setEditFormModal(!editFormModal);
        setCourseId("");
        setName("");
        setDescription("");  
    };

    // Fetch teachers list when component mounts
    const fetchteachers = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/teachers/`); // Adjust the endpoint to match your backend
            setTeacherList(response.data);
            setErrorMessage("");
            console.log('response.data:',response.data);
        } catch (error) {
            console.error("Error fetching teachers", error);
            setErrorMessage("Error fetching teachers.");
        }
    };
    const fetchCourses = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/courses/`); // Adjust the endpoint to match your backend
            setCourses(response.data);
            setErrorMessage("");
            console.log('response.data:',response.data);
        } catch (error) {
            console.error("Error fetching ", error);
            setErrorMessage("Error fetching teacher list.");
        }
    };
   
    useEffect(() => {
        

        fetchCourses();
        fetchteachers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Make the POST request to create the class
            const response = await axios.post(`${apiUrl}/api/courses/`, {
                name: name,
                description:description,
                teachers: selectedTeachers,
            });

            setIsLoading(false);
            fetchCourses();
            console.log("Class created successfully:", response.data);
            //setClassName('');

            setSelectedTeachers([]);
            setFormModal(false);  // Close the form modal after successful creation
        } catch (error) {
            setIsLoading(false);
            setErrorMessage("Error creating course.");
            console.error("Error creating class:", error);
        }
    };
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Make the POST request to create the class
            
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            if(selectedTeachers.length > 0){
                formData.append('teachers', selectedTeachers);
            }
            
            const response =  await axios.put(`${apiUrl}/api/courses/${courseId}/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setIsLoading(false);
            closeEditForm();
            fetchCourses();
            console.log("Class created successfully:", response.data);
            

            setSelectedTeachers([]);
            setFormModal(false);  // Close the form modal after successful creation
        } catch (error) {
            setIsLoading(false);
            setErrorMessage("Error editing course.");
            console.error("Error creating class:", error);
        }
    };
    const handleDelete = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData();
            
            const response =  await axios.delete(`${apiUrl}/api/courses/${courseId}/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setIsLoading(false);
            fetchCourses();
            closeDeleteForm();  // Close the form modal after successful creation
        } catch (error) {
            setIsLoading(false);
            setErrorMessage("Error deleting course.");
            //console.error("Error creating class:", error);
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
                            create course
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Teachers</th>
                                 
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Populate the table dynamically here */}
                            {courses.map((data) => (
                                <tr key={data.id}>
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.description}</td>
                                    <td>{data.teachers.map((t) => t.name).join(", ")}</td>
                                   
                                    <td>
                                        {/* admin should be able to delete or edit classes,can you provide updated code */}
                                        <button onClick={()=>toggleDeleteForm(data.id)}>delete</button>
                                        <button onClick = {()=>toggleEditForm(data.id,data.name,data.description)}>Edit</button>
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
                        <div className="title">Create Course</div>
                        <div className="icon" onClick={toggleForm }>
                            <i className="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="form-body">
                        <div className={`form-group ${name ? "active":""}`}>
                            <div>Name:</div>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder='e.g English,mathematics'
                            />
                        </div>
                        <div className={`form-group ${description ? "active":""}`}>
                            <div>Description :</div>
                            
                            <textarea 
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder = "short description about the course."
                            required
                            />
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
            <form className={`organization-form ${editFormModal ? 'show' : ''}`} onSubmit={handleEditSubmit}>
                <div className="form-wrapper">
                    <div className="form-header-x">
                        <div className="title">Update Course</div>
                        <div className="icon" onClick={closeEditForm}>
                            <i className="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="form-body">
                    <div className={`form-group ${name ? "active":""}`}>
                            <div>Name:</div>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder='e.g English,mathematics'
                            />
                        </div>
                        <div className={`form-group ${description ? "active":""}`}>
                            <div>Description :</div>
                            
                            <textarea 
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder = "short description about the course."
                            required
                            />
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
                    <div className="title">Delete Course</div>
                    <div className="icon" onClick={closeDeleteForm}>
                        <i className="fa-solid fa-circle-xmark"></i>
                    </div>
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="form-body">
                    <div className={`form-group ${name ? "active":""}`}>
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
        </div>
    );
};

export default CreateCourse;