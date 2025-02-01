//import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Layout from "./pages/Layout";
import Home from "./pages/home";
import NoPage from "./pages/NoPage";
import Header from './components/header';
import Footer from './components/footer';
import AdminDashboard from "./pages/admin-dashboard";
import CreateClass from "./pages/create-class";
import ParentLogin from './pages/parent-login';
import ParentSignup from './pages/parent-signup';
import AdminLogin from "./pages/admin-login";
import CreateStudents from "./pages/create-student";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="admin/login/" element={<AdminLogin />} />
      <Route path="parent/login/" element={<ParentLogin />} />
      <Route path="parent/signup/" element={<ParentSignup />} />
      <Route path="admin/dashboard/" element={<AdminDashboard />} />
      <Route path="admin/class/create/" element={<CreateClass />} />
      <Route path="admin/student/create/" element={<CreateStudents />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
   
  </BrowserRouter>
  );
}

export default App;
