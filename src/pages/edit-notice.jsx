
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules'
import Header from '../components/header';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import 'swiper/swiper-bundle.css';
import '../styles/organization-dashboard.css';
import '../styles/create-notice.css';
import logo from '../styles/logo.svg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate,useParams } from 'react-router-dom';
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';

const EditNotice = ()=>{
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [loading,setLoading] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const user = useSelector((state) => state.user.user);
    const [name,setName] = useState("");
    const [overview,setOverview] = useState("");
    const [logo,setLogo] = useState('');
    const [post, setPost] = useState({ title: "", description: "", });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        //setShowSnackbar(false);
        
        try {
            const formData = new FormData();
            formData.append('title', name);
            formData.append('description', overview);
            if(logo != ""){
                formData.append('image', logo);
            }

            //console.log('formData :',apiUrl,formData );
    
            // Check if thumbnail is a file (not a base64 string)
           
    
            const response = await axios.put(`${apiUrl}/posts/${id}/edit/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(isLoading);
                    setName('');
                    setLogo('');
                    setOverview('');
                  
                    //setShowSnackbar(!showSnackbar);
                    navigate('/admin/notice/');
                   
                }, 5000);
                //setsnackbarStatus('success');
                //setShowSnackbar(true);
               
                console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                //setsnackbarStatus('fail');
                //setShowSnackbar(true);
                //setErrorMessage('response.data.message');
                //console.error('Course creation failed:', response.data.message);
                // Handle failed course creation, e.g., show error messages to the user
            }
        } catch (error) {
            console.error('An error occurred during course creation:', error);
            setTimeout(() => {
                setIsLoading(isLoading);
                //setErrorMessage('response.data.message');
               
            }, 2000);
            // Handle unexpected errors
        }
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
    
        if (file && file.type.startsWith('image/')) {
            //const reader = new FileReader();
            //reader.readAsDataURL(file);
            setLogo(file);
        } else {
            setErrorMessage('Invalid file type. please select an image file');
            console.error('Invalid file type or no file selected.');
        }
    };
    const fetchPost = async () => {
        try {
          const response = await axios.get(`${apiUrl}/posts/${id}/edit/`, {
              headers: {
                  'Content-Type': 'multipart/form-data',
                   // Include the user ID in the Authorization header
              },
          });
            setPost(response.data);
            setName(response.data.title);
            setOverview(response.data.description);
        } catch (error) {
          console.error("Error fetching posts:", error);
        } finally {
          setLoading(false);
        }
    };
    useEffect(() => {

        fetchPost();
    }, [user,navigate]);
    
    return(
       <div class = 'home-wrapper'>
        <div className='dashboard-body'>
            
            <div className='sidebar-container-wrapper'>
                <OrganizationSidebar className={sidebarOpen ? 'visible' : ''} toggleSidebar={toggleSidebar}/>
            </div>
            <OrganizationHeader toggleSidebar={toggleSidebar} />
            <div className='job-list-wrapper' id='organization-job-list' >
               <div className='repo-form-wrapper'>
               <form className="form-container" onSubmit={handleSubmit} id = "notice-form"  >
                    <div className='form-header'>
                        <i class="fa-solid fa-chalkboard-user"></i>
                        <span>Create Post</span>
                        
                    </div>
                    <div className={`form-group ${name ? 'active' : ''}`}>
                        <input type="text" id="name" value={name} onChange = {(e)=>setName(e.target.value)} required />
                        <label htmlFor="name">Title</label>
                    </div>
                    <div className={`form-group ${overview ? 'active' : ''}`}>
                        <textarea id="overview" value={overview} onChange = {(e)=>setOverview(e.target.value)} required />
                        <label htmlFor="overview">Description</label>
                    </div>
                    <div className = 'thumbnail-wrapper' >
                        <div className='thumb-label'>Image:</div>
                        <input
                            type="file"
                            id="thumbnail"
                            name="thumbnail"
                            onChange={handleFileChange}
                          
                        />
                    </div>

                    <div className='btn-wrapper'>
                        <button type="submit">
                            Submit
                            {isLoading ? <div className="loader"></div> : '' }
                                
                        </button>
                    </div>
                </form>
               </div>
            </div>
           
            
        </div>
        
       </div>
    )
};

export default EditNotice;