
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link , useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
//import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { Card, CardContent, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import '../styles/organization-dashboard.css';
import '../styles/repository.css';
import {BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';

const AdminDashboard = ()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [jobs,setJobs] = useState([]);
    const [startDate, setStartDate] = useState(""); // Filter Start Date
    const [endDate, setEndDate] = useState(""); // Filter End Date
    const [loading,setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [attendanceData, setAttendanceData] = useState([]);
    const [totalStudents, setTotalStudents] = useState(0);
    const [postList,setPostList] = useState([]);
    const user = useSelector((state) => state.user.user);

   
    const COLORS = ["#0088FE", "#FF69B4"]; // Blue for Male, Pink for Female
    

    const renderCustomLegend = (props) => {
        const { payload } = props;
        return (
          <div style={{ textAlign: "center", marginTop: "10px", display: "flex", justifyContent: "center", gap: "20px" }}>
            {payload.map((entry, index) => (
              <div key={`item-${index}`} style={{ display: "flex", alignItems: "center", fontSize: "16px" }}>
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: entry.color,
                    marginRight: "8px",
                  }}
                ></div>
                <span style={{ color: "#333", fontWeight: "bold" }}>
                  {entry.value}: {data[index]?.value}
                </span>
              </div>
            ))}
          </div>
        );
      };
    

    const fetchPieChart = async () => {
        try {
            const response = await axios.get(`${apiUrl}/students/gender-count/`); // Adjust the endpoint to match your backend
            setData([
                { name: "Male", value: response.data.male_count },
                { name: "Female", value: response.data.female_count },
              ]);
            setTotalStudents(response.data.total_students);
            
            console.log('response.data:',response.data);
        } catch (error) {
            console.error("Error fetching data", error);
           
        }
    };
    const fetchAttendanceChart = async () => {
        try {
            let url = `${apiUrl}/students/attendance-summary/`;
            if (startDate && endDate) {
                
                url += `?start_date=${startDate}&end_date=${endDate}`;
            }
            const response = await axios.get(url);
            setAttendanceData(response.data);

            
            console.log('response.data:',response.data);
        } catch (error) {
            console.error("Error fetching data", error);
           
        }
    };
    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };
    const fetchPost = async () => {
        try {
            const response = await axios.get(`${apiUrl}/admin-post/create/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
            setPostList(response.data);
            //setErrorMessage("");
            console.log('response.data:',response.data);
        } catch (error) {
            setPostList([])
            console.error("Error fetching teachers", error);
            //setErrorMessage("Error fetching teacher list.");
        }
    };
    useEffect(() => {
        fetchPieChart();
        fetchPost();
        fetchAttendanceChart();
        
    }, [startDate, endDate]);
    
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
                               
                            </div>
                           <Link to ='' className = "create-bt"></Link>
                </div>
                
               <div className = 'admin-wrapper'>
               <div className='apps-container'>
                   
                    <Link to = " " className='cards organization-card' >
                    <div className='icon hrms-icon'>
                        <i className="fa-solid fa-graduation-cap"></i>
                    </div>
                    <div className='text-wrapper'>
                        <div className='title-header'>14</div>
                        <p>Students</p>
                        <div className='employee-count'>
                            
                    
                        </div>
                        
                        
                    </div>
                    
                    </Link>
                    <Link to = " " className='cards organization-card' >
                    <div className='icon hrms-icon'>
                        <i className="fa-solid fa-chalkboard-user"></i>
                    </div>
                    <div className='text-wrapper'>
                        <div className='title-header'>9</div>
                        <p>Teacher</p>
                        <div className='employee-count'>
                            
                    
                        </div>
                        
                        
                    </div>
                    
                    </Link>
                    <Link to = " " className='cards organization-card' >
                    <div className='icon hrms-icon'>
                        <i className="fa-solid fa-user-tie"></i>
                    </div>
                    <div className='text-wrapper'>
                        <div className='title-header'>6</div>
                        <p>Parent</p>
                        <div className='employee-count'>
                            
                    
                        </div>
                        
                        
                    </div>
                    
                    </Link>
                    <Link to = " " className='cards organization-card' >
                    <div className='icon hrms-icon'>
                        <i class="fa-solid fa-money-bill"></i>
                    </div>
                    <div className='text-wrapper'>
                        <div className='title-header'>12</div>
                        <p>Total Fees collected</p>
                        <div className='employee-count'>
                            
                    
                        </div>
                        
                        
                    </div>
                    
                    </Link>
                    
                           
                            
                </div>
                <div className = "chat-wrapper">
                    <div className='container-1'>
                        <div className = "box-1">
                        <div className="attendance-container">
                                <h2 className="title">Total students</h2>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={120}
                                fill="#8884d8"
                                
                                dataKey="value"
                                labelLine={false}
                            >
                                {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Pie>

                            {/* Total Students in the center */}
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize={24}
                                fontWeight="bold"
                                fill="#333"
                            >
                                {totalStudents}
                            </text>

                            <Tooltip />
                            <Legend content={renderCustomLegend} />
                            </PieChart>
                        </ResponsiveContainer>
                        </div> 
                        <div className = "box-2">
                            <div style={{ textAlign: "center" }}>
                            <div className="attendance-container">
                                <h2 className="title">Weekly Attendance</h2>

                                {/* Filter Button to Open Modal */}
                                <button className="filter-btn" onClick={() => setIsModalOpen(true)}>
                                    Filter
                                </button>

                                {/* Filter Modal */}
                                {isModalOpen && (
                                    <div className="modal-overlay">
                                    <div className="modal-content">
                                        <h3>Select Date Range</h3>

                                        <div className="input-group">
                                        <label>Start Date:</label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="input-field"
                                        />
                                        </div>

                                        <div className="input-group">
                                        <label>End Date:</label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="input-field"
                                        />
                                        </div>

                                        <div className="modal-actions">
                                        <button className="apply-btn" onClick={fetchAttendanceChart}>
                                            Apply Filter
                                        </button>
                                        <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                                            Cancel
                                        </button>
                                        </div>
                                    </div>
                                    </div>
                                )}
                                </div>

                                {/* Bar Chart */}
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={attendanceData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="present_count" fill="#0088FE" name="Present" />
                                    <Bar dataKey="absent_count" fill="#FF69B4" name="Absent" />
                                    </BarChart>
                                </ResponsiveContainer>
                                </div>
                            </div>
                    </div>
                    <div className='container-2'>
                        <div className="box-1">
                            <h3>Notice Board</h3>
                            <div className="wrapper">
                               {postList.map((data)=>(
                                     <div className="card">
                                     <img src={data.image} alt = "card-img" />
                                     <div className = "text-wrapper">
                                         <div className='lg'>{data.title}</div>
                                         <div className='sm'>{data.description}</div>
                                         <div className='date'>{data.date}</div>
                                     </div>
                                 </div>
                               ))}
                            </div>
                        </div>
                        
                        <div className="box-2">
                            <Card sx={{ maxWidth: "100%", mx: "auto", mt: 4, p: 2,bgcolor: "#f5f5f5" }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                    Calendar
                                    </Typography>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateCalendar value={selectedDate} onChange={setSelectedDate} />
                                    </LocalizationProvider>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
               </div>
                
                
               
            </div>
           
           
            
        </div>
        
       </div>
    )
};

export default AdminDashboard;