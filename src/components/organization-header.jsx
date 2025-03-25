
import React, { useState } from 'react';
import { Link , useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from '../actions/user-action'; // Import actions
import axios from 'axios';
import '../styles/organization-header.css';

const OrganizationHeader = ({ toggleSidebar })=>{
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
   


    
    
    
    return(
        <div className='organization-header'>
            <div className='box-a-wrapper'>
                <div className='menu-btn' onClick={toggleSidebar} >
                    <i className="fa-solid fa-bars"></i>
                </div>
                <div className='logo'>Logo</div>
            </div>
            <div className='box-b-wrapper'>
               
               <Link to = "" className='card-box'>
                    <div className='icon'>
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <div className='text'>
                        Hi {user?.first_name} {user?.last_name}
                    </div>
               </Link>
            </div>
        </div>
    );
};

export default OrganizationHeader;