
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


const ParentAttendance = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const user = useSelector((state) => state.user.user);
    const [selectedDate, setSelectedDate] = useState("");
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const {classId,childId} = useParams();
    const [student, setStudent] = useState([]);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

   
    // Fetch teachers list when component mounts
    

    useEffect(() => {
        fetchStudents();
        fetchAttendance();
    }, []);

    // Fetch students in the class
    const fetchStudents = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/child/${childId}/`);
            setStudent(response.data);
        } catch (err) {
            setErrorMessage("Failed to fetch students");
        }
    };

    // Fetch today's attendance records
   

    const fetchAttendance = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/attendance/student/${childId}/`);
            setAttendanceRecords(response.data);
    
        } catch (err) {
            setErrorMessage("Failed to fetch attendance records");
        }
    };
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        filterAttendance();
    };
    const filterAttendance = async () => {
        if(selectedDate !== ""){
            try {
                const response = await axios.get(`${apiUrl}/api/child-attendance-date/${childId}/?date=${selectedDate}`);
                setAttendanceRecords(response.data);
            } catch (err) {
                setErrorMessage("Failed to fetch attendance records");
            }
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
                        <div className="org">Class Attendance</div>
                        <div  className="creat">

                        </div>
                    </div>
                    <div className = 'filter-wrapper' >
                        <label>Filter by Date: </label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                        {selectedDate ? (
                            <button onClick={filterAttendance} >Submit</button>
                        ):(
                            ""
                        )}
                    </div>
                    {/*add a date filter where users can filter the attendance records by date*/}
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Student</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Teacher</th>
                            </tr>
                        </thead>
                        <tbody>
                        {attendanceRecords.length > 0 ? (
                            attendanceRecords.map((record) => (
                                <tr key={record.id}>
                                     <td>{record.id}</td>
                                    <td>{student.first_name} {student.last_name} </td>
                                    <td>{record.date}</td>
                                    <td>{record.status}</td>
                                    <td>{record.teacher}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No records found</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

           
            
        </div>
    );
};

export default ParentAttendance;