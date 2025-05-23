
import React, { useState } from 'react';
import { Link , useParams,useNavigate} from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import '../styles/signup.css';
//import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading } from '../actions/user-action'; // Import setUser and setLoading actions
import apiUrl from '../components/api-url';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";


const Signup = ()=>{
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);
    const [isLoading, setIsLoading] = useState(false);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

     const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        
        if (password !== ConfirmPassword) {
            setTimeout(() => {
                setIsLoading(isLoading);
                setErrorMessage('Please make sure your passwords match.');
               
            }, 2000); // 2000 milliseconds (2 seconds) delay
            return; // Don't proceed with the API call if passwords don't match
        }

        try {
            dispatch(setLoading(true));
           
            const response = await axios.post(`${apiUrl}/teacher/signup/`, {
            first_name: fname,
            last_name: lname,
            email,
            password,
            ConfirmPassword,
            });

            if (response.data.success) {
                dispatch(setUser(response.data.user));

                // Redirect to the home page
                setTimeout(() => {
                    navigate('/teacher/manage/attendance/'); // Change '/' to the actual path of your home page
                }, 2000); // 2000 milliseconds (2 seconds) delay
            } else {
                console.error('Signup failed:',response.data.errors);
               
            
            // Handle failed signup, e.g., show error messages to the user
            }
        } catch (error) {
            setTimeout(() => {
                setIsLoading(isLoading);
                setErrorMessage(`User with this email already exist`);
               
            }, 2000); // 2000 milliseconds (2 seconds) delay
           
            // Handle unexpected errors
        }
        finally {
            dispatch(setLoading(false));
            //setIsLoading(!isLoading);
        }
    };
    const handleFnameChange = (event) => {
        setFname(event.target.value);
    };
    
    const handleLnameChange = (event) => {
        setLname(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };
    return(
       <>
        <div className='page-wrapper'>
            <Header/>
            <div className='wrapper signup-wrapper'>
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className='form-header'>
                    <FontAwesomeIcon icon={faUser} size="1x" color="black" />
                        <span>Teacher signup</span>
                        
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className={`form-group ${fname ? 'active' : ''}`}>
                        <input type="text" id="fname" value={fname} onChange = {handleFnameChange} required />
                        <label htmlFor="fname">First name</label>
                    </div>
                    <div className={`form-group ${lname ? 'active' : ''}`}>
                        <input type="text" id="lname" value={lname} onChange = {handleLnameChange} required />
                        <label htmlFor="lname">last name</label>
                    </div>
                    <div className={`form-group ${email ? 'active' : ''}`}>
                        <input type="text" id="email" value={email} onChange = {handleEmailChange} required />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className={`form-group ${password ? 'active' : ''}`}>
                        <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange = {handlePasswordChange} required />
                        <label htmlFor="password">Password</label>
                        <div className='eye-icon' onClick={togglePasswordVisibility}>
                            <i class={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye' }`}></i>
                        </div>
                    </div>
                    <div className={`form-group ${ConfirmPassword ? 'active' : ''}`}>
                        <input  type={showConfirmPassword ? 'text' : 'password'} id="confirm-password" value={ConfirmPassword} onChange = {handleConfirmPasswordChange} required />
                        <label htmlFor="password">Confirm Password</label>
                        <div className='eye-icon' onClick={toggleConfirmPasswordVisibility}>
                            <i class={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye' }`}></i>
                        </div>
                    </div>

                    <div className='btn-wrapper'>
                        <button type="submit">
                            Signup
                            {isLoading ? <div className="loader"></div> : '' }
                            
                        </button>
                    </div>
                    <Link to ='/login/' className='link-wrapper'>Login</Link><br />
                   
                </form>
            </div>
        </div>
        <Footer />
       </>
    );
};

export default Signup;