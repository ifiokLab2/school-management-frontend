import React, { useState } from 'react';
import { Link , useParams,useNavigate, useLocation} from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation(); // Get current path

  const handleLogout = () => {
    dispatch(setUser(null));
    navigate("/");
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

        {user?.isAdmin && (
          <div className="tabs">
            {[
              { path: "/admin/dashboard/", label: "Dashboard" },
              { path: "/admin/teachers/", label: "Teachers" },
              { path: "/admin/student/create/", label: "students" },
              { path: "/admin/class/create/", label: "Class" },
              { path: "/admin/notice/", label: "Notice" },
            ].map((link) => (
              <div
                key={link.path}
                className={`main-link ${location.pathname === link.path ? "active-link" : ""}`}
              >
                <div className="icon">{/* icon */}</div>
                <div className="text">
                  <Link to={link.path}>{link.label}</Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {user?.isTeacher && (
          <div className="tabs">
            <div className="main-link">
              <div className="icon">{/* icon */}</div>
              <div className="text">
                  <Link
                  to="/teacher/manage/attendance/"
                  className={location.pathname === "/teacher/manage/attendance/" ? "active-link" : ""}
                >
                  Manage Attendance
                </Link>
              </div>
            </div>
            
          </div>
        )}

        {user?.isParent && (
          <div className="tabs">
            <div className="main-link">
              <div className="icon">{/* icon */}</div>
              <div className="text">
                <Link
                to="/parent/pupils/"
                className={location.pathname === "/parent/pupils/" ? "active-link" : ""}
              >
                Child Attendance
              </Link>
            </div>
            </div>
            
          </div>
        )}
      </div>

      <div className="box-b">
        <div onClick={handleLogout} className="tabs">
          <div className="icon">{/* icon */}</div>
          <div className="text">Logout</div>
        </div>
      </div>
    </div>
  );
};

  
export default OrganizationSidebar;
  
