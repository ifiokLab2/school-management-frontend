
import React, { useState, useEffect } from 'react';
import { Link , useParams} from 'react-router-dom';
import Header from '../components/header';
import '../styles/signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading } from '../actions/user-action'; // Import setUser and setLoading actions
import apiUrl from '../components/api-url';



const AdminLogin = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
    const navigate = useNavigate();

    // Helper to fetch the CSRF token
   

    // Fetch CSRF token on component mount
    useEffect(() => {
        //fetchCSRFToken();
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);

        try {
            dispatch(setLoading(true));
           
            const response = await axios.post(`${apiUrl}/general/login/`, {
            email,
            password,
            });

            if (response.data.success) {
                dispatch(setUser(response.data.user));

                // Redirect to the home page /teacher/manage/attendance/
                setTimeout(() => {
                    if(response.data.user.isAdmin){
                        navigate('/admin/dashboard/');
                    }
                    if (response.data.user.isTeacher){
                        navigate('/teacher/manage/attendance/');
                    }
                    if (response.data.user.isParent){
                        navigate('/parent/pupils/');
                    }
                    //console.log('data:',response.data.user);
                    //navigate('/admin/dashboard/'); // Change '/' to the actual path of your home page
                }, 2000); // 2000 milliseconds (2 seconds) delay
            } else {
                console.error('Signup failed:',response.data.errors);
               
            
            // Handle failed signup, e.g., show error messages to the user
            }
        } catch (error) {
            setTimeout(() => {
                setIsLoading(isLoading);
                setErrorMessage(`Incorrect email or password.`);
               
            }, 2000); // 2000 milliseconds (2 seconds) delay
           
            // Handle unexpected errors
        }
        finally {
            dispatch(setLoading(false));
            //setIsLoading(!isLoading);
        }
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div className="page-wrapper">
            <Header />
            <div className="wrapper">
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="form-header">
                        <i className="fa-solid fa-user"></i>
                        <span>Login</span>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className={`form-group ${email ? 'active' : ''}`}>
                        <input type="text" id="email" value={email} onChange={handleEmailChange} required />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className={`form-group ${password ? 'active' : ''}`}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <div className="eye-icon" onClick={togglePasswordVisibility}>
                            <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </div>
                    </div>

                    <div className="btn-wrapper">
                        <button type="submit">
                            Login
                            {isLoading && <div className="loader"></div>}
                        </button>
                    </div>
                    <Link to ='/admin/signup/' className='link-wrapper'>admin Signup(only for test ,removed later*)</Link><br />
                    <Link to ='/teacher/signup/' className='link-wrapper'>Teacher Signup</Link><br />
                    <Link to ='/parent/signup/' className='link-wrapper'>Parent Signup</Link><br />
                    
                </form>
            </div>
        </div>
    );
};



export default AdminLogin;