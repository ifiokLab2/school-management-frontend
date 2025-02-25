import React, { useState } from 'react';
import { Link , useParams} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { setUser } from '../actions/user-action'; // Import actions
import axios from 'axios';
import '../styles/organization-sidebar.css';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import apiUrl from '../components/api-url';
import { ChevronRight, ExpandMore } from '@mui/icons-material';


const OrganizationSidebar = ({ className, toggleSidebar }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
  
    const [openSublinks, setOpenSublinks] = useState({});
  
    const toggleSublink = (link) => {
      setOpenSublinks((prev) => ({
        ...prev,
        [link]: !prev[link],
      }));
    };
  
    const handleLogout =() => {
      dispatch(setUser(null));
      navigate('/');
    };
  
    return (
      <div className={`organization-sidebar ${className}`}>
        <div className="box-a">
          <div className="header-tab">
            <div className="text">Logo</div>
            <div className="icon" onClick={toggleSidebar}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
          {user?.isAdmin ? (
            <>
              <div className="tabs">
                <div
                  className="main-link"
                  
                >
                  <div className="icon">
                    
                  </div>
                  <div className="text">Organization</div>
                
                </div>
                <div className="sub-links">
                    <Link to="/admin/class/create/">Manage class</Link>
                    <Link to="/admin/student/create/">Manage students</Link>
                    <Link to="/organization/settings/">Settings</Link>
                  </div>
              </div>
  
             
  
             
            </>
          ) : (
            ""
          )}

          {user?.isTeacher ? (
              <>
              <div className="tabs">
                <div
                  className="main-link"
                  
                >
                  <div className="icon">
                     {/* icon */}
                  </div>
                  <div className="text">Dashboard</div>
                  
                </div>
                <div className="sub-links">
                    <Link to="/teacher/manage/attendance/">Manage Attendance</Link>
                   
                    
                    
                  </div>
              </div>
  
            </>
          ):(
            ""
          )}

          {user?.isParent ? (
            <>
            <div className="tabs">
              <div
                className="main-link"
                
              >
                <div className="icon">
                   {/* icon */}
                </div>
                <div className="text">Dashboard</div>
                
              </div>
              <div className="sub-links">
                  <Link to="/parent/pupils/">Child Attendance</Link>
                 
                  
                  
                </div>
            </div>

          </>
          ):(
            ""
          )}
        </div>
        <div className="box-b">
          <div onClick={handleLogout} className="tabs">
            <div className="icon">
               {/* icon */}
            </div>
            <div className="text">Logout</div>
          </div>
        </div>
      </div>
    );
  };
  
export default OrganizationSidebar;
  
