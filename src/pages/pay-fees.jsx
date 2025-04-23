
import 'swiper/swiper-bundle.css';
import { PaystackButton } from 'react-paystack';
import hero1 from '../styles/school-mission-1.jpg';
import hero2 from '../styles/school-mission-2.jpg';
import { useSelector } from 'react-redux';
import { Book, Award, HandHelping } from "lucide-react"
import apiUrl from '../components/api-url';
import { Swiper, SwiperSlide, } from 'swiper/react';
import React, { useState, useEffect } from 'react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
import Header from '../components/header';
import "../styles/home.css";
import "../styles/school-mission.css";
import CTAFooter from '../components/cta-footer';
import axios from 'axios';
import '../styles/school-fees.css';
import Footer from "../components/footer";
import { Link , useParams} from 'react-router-dom';
//const user = useSelector((state) => state.user.user);

export default function PayFees() {
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
    
  
  return (
    <>
       <div class = 'home-wrapper'>
        <Header />
        
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
      

       <CTAFooter />

       </div>

       <Footer />
    </>
    
  );
}
