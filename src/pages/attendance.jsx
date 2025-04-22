
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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Attendance = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [students, setStudents] = useState([]);
    const [teacherId, setTeacherId] = useState("");
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState({});
    const user = useSelector((state) => state.user.user);
    const [selectedDate, setSelectedDate] = useState("");
    const {classId,} = useParams();
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });
    
    
   
    const handleSnackbarClose = () => {
        setSnackbar({ open: false, message: "", severity: "" });
    };
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

   
    // Fetch teachers list when component mounts
    const STATUS_OPTIONS = ["present", "absent", ];

    useEffect(() => {
        fetchStudents();
        fetchAttendance();
    }, []);

    // Fetch students in the class
    const fetchStudents = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/students/${classId}/`);
            setStudents(response.data);
        } catch (err) {
            setErrorMessage("Failed to fetch students");
        }
    };

    // Fetch today's attendance records
    const fetchAttendance = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/attendance/${classId}/`);
            setAttendanceRecords(response.data);
        } catch (err) {
            setErrorMessage("Failed to fetch attendance records");
        }
    };

    // Mark attendance for a student
    const markAttendance = async (studentId, status) => {
        try {
            const formData = new FormData();
            formData.append("student", studentId);
            formData.append("school_class", classId);
            //formData.append("teacher", teacherId);
            formData.append("status", status);

            const response = await axios.post(`${apiUrl}/api/attendance/${classId}/`, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${user.auth_token}`,
                },
            });
            fetchAttendance(); // Update UI instantly
            setSnackbar({
                open: true,
                message: "success!",
                severity: "success",
            });
        } catch (err) {
            setErrorMessage("Attendance already recorded for today or failed");
        }
    };

    // Update attendance
    const updateAttendance = async (attendanceId, newStatus) => {
        try {
            const formData = new FormData();
            formData.append("status", newStatus);

            await axios.put(`${apiUrl}/api/attendance/update/${attendanceId}/`, formData);

            // Update state
            fetchAttendance();
            setSnackbar({
                open: true,
                message: "success!",
                severity: "success",
            });
        } catch (err) {
            setErrorMessage("Failed to update attendance");
        }
    };
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        filterAttendance();
    };
    const filterAttendance = async () => {
        if(selectedDate !== ""){
            try {
                const response = await axios.get(`${apiUrl}/api/attendance-date/${classId}/?date=${selectedDate}`);
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
                    <div className = "filter-wrapper" >
                        <label>Filter by Date: </label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                        {selectedDate ? (
                            <button onClick={filterAttendance}>Submit</button>
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
                                
                                <th>Status</th>
                                <th>Action</th>
                                <th>Result</th>
                            </tr>
                        </thead>
                        <tbody>
                        {students.map((student) => {
                        const record = attendanceRecords.find(
                            (att) => att.studentId === student.id
                        );
                       

                        return (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.first_name} {student.last_name}</td>
                                <td>{record ? record.status : "Not Marked"}</td>
                                <td className = 'record' >
                                    {record ? (
                                        <select
                                            value={selectedStatus[record.id] || record.status}
                                            onChange={(e) =>
                                                setSelectedStatus({ ...selectedStatus, [record.id]: e.target.value })
                                            }
                                        >
                                            {STATUS_OPTIONS.map((status) => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <select
                                            onChange={(e) => markAttendance(student.id, e.target.value)}
                                        >
                                            <option value="">Mark Attendance</option>
                                            {STATUS_OPTIONS.map((status) => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    )}

                                    {record && (
                                        <button
                                            onClick={() => updateAttendance(record.id, selectedStatus[record.id] || record.status)}
                                        >
                                            Update
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <Link to =  {`/student/${student.id}/result/`}>View </Link>
                                </td>
                            </tr>
                        );
                    })}
                    
                        </tbody>
                    </table>
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

export default Attendance;