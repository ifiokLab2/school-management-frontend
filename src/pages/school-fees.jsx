
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link , useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import Skeleton from "@mui/material/Skeleton";
import '../styles/organization-dashboard.css';
import '../styles/school-fees.css';
import '../styles/repository.css';
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { PaystackButton } from 'react-paystack';
const SchoolFees = ()=>{
    const [successMessage, setSuccessMessage] = useState('');
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [email, setEmail] = useState('');
    const [term, setTerm] = useState('');
    const [regNo, setRegNo] = useState('');
    const [loading,setLoading] = useState(true);
    
    const [errorMessage, setErrorMessage] = useState('');
    const [studentName, setStudentName] = useState('');
    const [studentNotFound, setStudentNotFound] = useState(false);
    const user = useSelector((state) => state.user.user);
    const publicKey = 'pk_test_b7a5e192b6819320be078de89523311fdbb55ac6'; // Replace this with your Paystack public key
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });
    const handleSnackbarClose = () => {
        setSnackbar({ open: false, message: "", severity: "" });
    };


  const amountInKobo = parseInt(amount) * 100;

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };
    const handlePaystackSuccessAction = async (reference) => {
        try {
         const response =  await axios.post(`${apiUrl}/api/school-fees/pay/`, {
            amount,
            term,
            reg_no: regNo,
            email,
            year:'',
            student:[],
            reference: reference.reference,
          }, {
            headers: {
              Authorization: `Token ${user.auth_token}`,
            }
          });
          setSnackbar({
            open: true,
            message: "success!",
            severity: "success",
        });
          setSuccessMessage("Payment successful!");
          setErrorMessage('');
          setAmount('');
          setEmail('');
          setTerm('');
          setRegNo('');
        } catch (error) {
          setErrorMessage("Payment verification failed.");
        }
      };
    
      const handlePaystackCloseAction = () => {
        console.log('Payment closed');
      };
    
      const componentProps = {
        email,
        amount: amountInKobo,
        metadata: {
          reg_no: regNo,
          term,
          student_name: studentName
        },
        publicKey,
        text: "Pay Now",
        onSuccess: handlePaystackSuccessAction,
        onClose: handlePaystackCloseAction,
     };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/api/school-fees/pay/`, {
                amount,
                term,
                reg_no: regNo,
                email,
            }, {
                headers: {
                    Authorization: `Token ${user.auth_token}`
                }
            });

            setSuccessMessage('Payment successful!');
            setErrorMessage('');
            setAmount('');
            setEmail('');
            setTerm('');
            setRegNo('');
        } catch (error) {
            setErrorMessage('Payment failed or already made for this term.');
            setSuccessMessage('');
        }
    };
    
    useEffect(() => {
        const fetchStudent = async () => {
            if (regNo.length < 3) {
                setStudentName('');
                setStudentNotFound(false);
                return;
            }
            try {
                const res = await axios.get(`${apiUrl}/api/students/by-reg-no/?reg_no=${regNo}`);
                //const res = await axios.get(`${apiUrl}/api/students/by-reg-no/${regNo}/`);
                if (res.data && res.data.name) {
                    setStudentName(res.data.name);
                    setStudentNotFound(false);
                } else {
                    setStudentName('');
                    setStudentNotFound(true);
                }
            } catch (err) {
                setStudentName('');
                setStudentNotFound(true);
            }
        };
    
        fetchStudent();
    }, [regNo]);
    
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
                              Pupils
                            </div>
                           <div></div>
                </div>
                
                <div className='apps-container'>
                    <div className="fee-wrapper">
                        <form className="fee-form" onSubmit={handleSubmit} >
                            <h2>Pay School Fees</h2>

                            <div className='box-tab'>
                                <label>Student Reg No</label>
                                <input type="text" value={regNo} onChange = {(e)=>setRegNo(e.target.value)}  />
                                {/*filter and display the student name here after putting reg no else display no student found */}
                                {studentName && <p className="student-name">Student: {studentName}</p>}
                                 {studentNotFound && <p className="no-student">No student found</p>}
                            </div>

                            <div className='box-tab'>
                                <label>Parent Email</label>
                                <input type="email" value={email} onChange = {(e)=>setEmail(e.target.value)} />

                            </div>
                            
                            <div className='box-tab'>
                                <label>Select Term</label>
                                <select value={term} onChange={(e) => setTerm(e.target.value)} required>
                                <option value="">-- Select Term --</option>
                                <option value="first">First Term</option>
                                <option value="second">Second Term</option>
                                <option value="third">Third Term</option>
                                </select>
                            </div>
                            
                            <div className='box-tab'>
                                <label>Amount:(₦)</label>
                                <input type="text" value={amount} onChange = {(e)=>setAmount(e.target.value)} />

                            </div>
                           
                            <PaystackButton {...componentProps} />

                            
                        </form>
                    </div>  
                </div>
                
                
               
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
    )
};

export default SchoolFees;