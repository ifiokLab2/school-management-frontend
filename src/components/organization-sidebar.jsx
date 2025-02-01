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
  
    const handleLogout = async () => {
      try {
        const response = await axios.post(`${apiUrl}/logout/`);
        if (response.data.success) {
          dispatch(setUser(null));
        } else {
          console.error('Logout failed:', response.data.message);
        }
      } catch (error) {
        console.error('An error occurred during logout:', error);
      }
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
          {2 > 1 ? (
            <>
              <div className="tabs">
                <div
                  className="main-link"
                  onClick={() => toggleSublink('organization')}
                >
                  <div className="icon">
                    
                  </div>
                  <div className="text">Organization</div>
                  {openSublinks['organization'] ? (
                    <ExpandMore className="chevron-icon" />
                  ) : (
                    <ChevronRight className="chevron-icon" />
                  )}
                </div>
                {openSublinks['organization'] && (
                  <div className="sub-links">
                    <Link to="/admin/class/create/">Manage class</Link>
                    <Link to="/admin/student/create/">Manage students</Link>
                    <Link to="/organization/settings/">Settings</Link>
                  </div>
                )}
              </div>
  
              <div className="tabs">
                <div className="main-link" onClick={() => toggleSublink('jobs')}>
                  <div className="icon">
                   {/* icon */}
                  </div>
                  <div className="text">Jobs</div>
                  {openSublinks['jobs'] ? (
                    <ExpandMore className="chevron-icon" />
                  ) : (
                    <ChevronRight className="chevron-icon" />
                  )}
                </div>
                {openSublinks['jobs'] && (
                  <div className="sub-links">
                    <Link href="/organization/jobs/create/">Create Jobs</Link>
                    <Link href="/organization/job/list/">Job List</Link>
                  </div>
                )}
              </div>
  
              <Link href="/organization/employee/list/" className="tabs">
                <div className="icon">
                   {/* icon */}
                </div>
                <div className="text">Employees</div>
              </Link>
  
             
            </>
          ) : (
            <>
              <div className="tabs">
                <div
                  className="main-link"
                  onClick={() => toggleSublink('user-jobs')}
                >
                  <div className="icon">
                     {/* icon */}
                  </div>
                  <div className="text">Jobs</div>
                  {openSublinks['user-jobs'] ? (
                    <ExpandMore className="chevron-icon" />
                  ) : (
                    <ChevronRight className="chevron-icon" />
                  )}
                </div>
                {openSublinks['user-jobs'] && (
                  <div className="sub-links">
                    <Link href="/user/jobs/list/">Job List</Link>
                  </div>
                )}
              </div>
  
              <Link href="/organization/employee/repository/" className="tabs">
                <div className="icon">
                  {/* icon */}
                </div>
                <div className="text">Repository</div>
              </Link>
            </>
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
  
