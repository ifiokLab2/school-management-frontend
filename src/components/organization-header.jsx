
import React, { useState } from 'react';
import { Link , useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from '../actions/user-action'; // Import actions
import axios from 'axios';
import '../styles/organization-header.css';

const OrganizationHeader = ({ toggleSidebar })=>{
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
   


    
    
    
    return(
        <div className='organization-header'>
            <div className='box-a-wrapper'>
                <div className='menu-btn' onClick={toggleSidebar} >
                    <i className="fa-solid fa-bars"></i>
                </div>
                <div className='logo'>Logo</div>
            </div>
            <div className='box-b-wrapper'>
               <Link href="" className='card-box'>
                    <div className='icon'>
                        <i className="fa-solid fa-circle-question"></i>
                    </div>
                    <div className='text'>Help</div>
               </Link>
               <Link href="" className='card-box'>
                    <div className='icon'>
                        <i className="fa-solid fa-bell"></i>
                    </div>
                    <div className='text'>Notification</div>
               </Link>
               <Link href="/organization/profile/" className='card-box'>
                    <div className='icon'>
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <div className='text'></div>
               </Link>
            </div>
        </div>
    );
};

export default OrganizationHeader;