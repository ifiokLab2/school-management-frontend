import React, { useState, useEffect } from 'react';
import axios from 'axios';
import hero3 from '../styles/hero-3.jpg';
import { Link , useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import Skeleton from "@mui/material/Skeleton";
import '../styles/organization-dashboard.css';
import '../styles/post-list.css';
import {BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';
import { useNavigate } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sidebarOpen,setsidebarOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
   const [menuOpen, setMenuOpen] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const toggleMenu = (postId) => {
    setMenuOpen(menuOpen === postId ? null : postId);
  };
  const toggleSidebar = ()=>{
    setsidebarOpen(!sidebarOpen);
    };
    const handleEdit = (postId) => {
        console.log("Edit post:", postId);
        navigate(`/admin/notice/${postId}/edit/`)
        // Implement edit logic (e.g., navigate to an edit form)
      };
    
      const handleDelete = async (postId) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
          try {
            await axios.delete(`${apiUrl}/posts/${postId}/edit/`, {
              headers: {
                'Authorization': `Token ${user.auth_token}`,
              },
            });
            fetchPosts();
            //setPosts(posts.filter((post) => post.id !== postId));
          } catch (error) {
            console.error("Error deleting post:", error);
          }
        }
      };
    
      const fetchPosts = async () => {
        try {
          const response = await axios.get(`${apiUrl}/admin-post/create/`, {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
              },
          });
          setPosts(response.data);
        } catch (error) {
          console.error("Error fetching posts:", error);
        } finally {
          setLoading(false);
        }
      };
    useEffect(() => {
    

    fetchPosts();
  }, [user]);



  return (
    <div class = 'home-wrapper'>
    <div className='dashboard-body'>
        
        <div className='sidebar-container-wrapper'>
            <OrganizationSidebar className={sidebarOpen ? 'visible' : ''} toggleSidebar={toggleSidebar}/>
        </div>
        <OrganizationHeader toggleSidebar={toggleSidebar} />
        <div className='job-list-wrapper' id='organization-job-list' >
        <div className='employer-organizations'>
            <div class = 'org'>
                
            </div>
            <Link to ="/admin/notice/create/" className = "create-btn">Post</Link>
        </div>
            
           <div className = 'admin-wrapper'>
           <div className="postlist-container">
                <h1 className="title">Posts</h1>
                {posts.length === 0 ? (
                    <p>No posts available.</p>
                ) : (
                    <div className="post-grid">
                    {posts.map((post) => (
                        <div key={post.id} className="post-card">
                        <div className="post-header">
                            <h2 className="post-title">{post.title}</h2>
                            <div className="menu-container">
                            <button className="menu-btn" onClick={() => toggleMenu(post.id)}>
                                &#x22EE; {/* Ellipsis button */}
                            </button>
                            {menuOpen === post.id && (
                                <div className="dropdown-menu">
                                <button onClick={() => handleEdit(post.id)}>Edit</button>
                                <button onClick={() => handleDelete(post.id)}>Delete</button>
                                </div>
                            )}
                            </div>
                        </div>
                        {post.image && <img src={hero3} alt={post.title} className="post-image" />}
                        <p className="post-description">{post.description}</p>
                        <p className="post-meta">Created by User ID: {post.created_by} on {post.date}</p>
                        </div>
                    ))}
                    </div>
                )}
                </div>
           </div>
        </div>
    </div>
   </div>


    
  );
};

export default PostList;
