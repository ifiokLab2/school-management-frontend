
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
const CreateStudents = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [formModal, setFormModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editFormModal, setEditFormModal] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [regNumber, setRegNumber] = useState('');
    const [classId, setClassId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [selectedClass, setSelectedClass] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [selectedParents, setSelectedParents] = useState([]);
    const [parentList, setParentList] = useState([]);
    const [classList, setClassList] = useState([]);
    const [studentList, setStudentList] = useState([]);
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
    const toggleEditForm = (id,fname,lname,reg_no,phone_number) => {
        setEditFormModal(!editFormModal);
        setStudentId(id);
        setFirstName(fname);
        setLastName(lname);
        setRegNumber(reg_no);
        setPhoneNumber(phone_number);
        //setClassName(name);
        //setGrade(grade);
        
    };
    const closeEditForm = () => {
        setEditFormModal(!editFormModal);
        setStudentId("");
        setFirstName("");
        setLastName("");
        setRegNumber("");
        setPhoneNumber("");
    };

    // Fetch teachers list when component mounts
    const fetchParents = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/parents/`); // Adjust the endpoint to match your backend
            setParentList(response.data);
            setErrorMessage("");
            console.log('response.data:',response.data);
        } catch (error) {
            console.error("Error fetching teachers", error);
            setErrorMessage("Error fetching parent list.");
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
    const fetchStudents = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/student-create/`); // Adjust the endpoint to match your backend
            setStudentList(response.data);
            setErrorMessage("");
            console.log('response.data:',response.data);
        } catch (error) {
            console.error("Error fetching teachers", error);
            setErrorMessage("Error fetching teacher list.");
        }
    };
    useEffect(() => {
        

        fetchParents();
        fetchClasses();
        fetchStudents();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Make the POST request to create the class
            const response = await axios.post(`${apiUrl}/api/student-create/`, {
                first_name: firstName,
                last_name:lastName,
                reg_no:regNumber,
                school_class:selectedClass,
                parent_phone_number:phoneNumber,
                parents: selectedParents,
            });

            setIsLoading(false);
            fetchClasses();
            fetchStudents();
            console.log("Class created successfully:", response.data);
            //setClassName('');

            setSelectedParents([]);
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
            // Make the POST request to create the class
            
            const formData = new FormData();
            formData.append('first_name', firstName);
            formData.append('last_name', lastName);
            formData.append('reg_no', regNumber);
            formData.append('parent_phone_number', phoneNumber);
            if(selectedParents.length > 0){
                formData.append('parents', selectedParents);
            }
            if(selectedClass.length > 0){
                formData.append('school_class', selectedClass);
            }
            
            const response =  await axios.put(`${apiUrl}/student-detail/${studentId}/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setIsLoading(false);
            fetchClasses();
            setSnackbar({
                open: true,
                message: "success!",
                severity: "success",
            });
            console.log("Class created successfully:", response.data);
            //setClassName('');

            setSelectedParents([]);
            setFormModal(false);  // Close the form modal after successful creation
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
                            Add student
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Parent</th>
                                <th>Class</th>
                                 <th>Parent Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Populate the table dynamically here */}
                            {studentList.map((schoolClass) => (
                                <tr key={schoolClass.id}>
                                    <td>{schoolClass.id}</td>
                                    <td>{schoolClass.first_name} {schoolClass.last_name}</td>
                                    <td>{schoolClass.parents}</td>
                                    <td>{schoolClass.school_class}</td>
                                    <td>{schoolClass.parent_phone_number}</td>
                                    <td>
                                        {/* admin should be able to delete or edit classes,can you provide updated code */}
                                        <button onClick={()=>toggleDeleteForm(schoolClass.id)}>delete</button>
                                        <button onClick = {()=>toggleEditForm(schoolClass.id,schoolClass.first_name,schoolClass.last_name,schoolClass.reg_no,schoolClass.parent_phone_number)}>Edit</button>
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
                        <div className="title">Add student</div>
                        <div className="icon" onClick={toggleForm }>
                            <i className="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="form-body">
                    <div className={`form-group ${firstName ? "active":""}`}>
                            <div> first Name:</div>
                            <input
                                type="text"
                                id="lastname"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className={`form-group ${lastName ? "active":""}`}>
                            <div>Last Name:</div>
                            <input
                                type="text"
                                id="lastname"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <div className={`form-group ${phoneNumber ? "active":""}`}>
                            <div>Phone Number:</div>
                            <input
                                type="text"
                                id="phone"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className={`form-group ${regNumber ? "active":""}`}>
                            <div>Reg Number:</div>
                            <input
                                type="text"
                                id="reg-number"
                                value={regNumber}
                                onChange={(e) => setRegNumber(e.target.value)}
                                required
                            />
                        </div>
                       
                        <div className={`form-group ${selectedClass ? 'active' : ""}`}>
                            <div >Class:</div>
                            <select
                                id="classes"
                                
                                value={selectedClass}
                               onChange = {(e)=>setSelectedClass(e.target.value)}
                            >
                                 <option value="">Select Class</option>
                                {classList.map((data) => (
                                    <option key={data.id} value={data.id}>
                                        {data.grade}  
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={`form-group ${selectedParents ? 'active' : ""}`}>
                            <div >Parent:</div>
                            <select
                                id="parents"
                                
                                value={selectedParents}
                               onChange = {(e)=>setSelectedParents(e.target.value)}
                            >
                                 <option value="">Select Parent</option>
                                {parentList.map((data) => (
                                    <option key={data.id} value={data.id}>
                                        {data.first_name}  {data.last_name}
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
                        <div className="title">Update Student</div>
                        <div className="icon" onClick={closeEditForm}>
                            <i className="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="form-body">
                    <div className={`form-group ${firstName ? "active":""}`}>
                            <div> first Name:</div>
                            <input
                                type="text"
                                id="lastname"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className={`form-group ${lastName ? "active":""}`}>
                            <div>Last Name:</div>
                            <input
                                type="text"
                                id="lastname"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <div className={`form-group ${phoneNumber ? "active":""}`}>
                            <div>Phone Number:</div>
                            <input
                                type="text"
                                id="phone"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className={`form-group ${regNumber ? "active":""}`}>
                            <div>Reg Number:</div>
                            <input
                                type="text"
                                id="reg-number"
                                value={regNumber}
                                onChange={(e) => setRegNumber(e.target.value)}
                                required
                            />
                        </div>
                       
                        <div className={`form-group ${selectedClass ? 'active' : ""}`}>
                            <div >Class:</div>
                            <select
                                id="classes"
                                
                                value={selectedClass}
                               onChange = {(e)=>setSelectedClass(e.target.value)}
                            >
                                 <option value="">Select Class</option>
                                {classList.map((data) => (
                                    <option key={data.id} value={data.id}>
                                        {data.grade}  
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={`form-group ${selectedParents ? 'active' : ""}`}>
                            <div >Parent:</div>
                            <select
                                id="parents"
                                
                                value={selectedParents}
                               onChange = {(e)=>setSelectedParents(e.target.value)}
                            >
                                 <option value="">Select Parent</option>
                                {parentList.map((data) => (
                                    <option key={data.id} value={data.id}>
                                        {data.first_name}  {data.last_name}
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
                    <div className={`form-group ${firstName ? "active":""}`}>
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

export default CreateStudents;