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
import CreateCourse from "./pages/create-course";
import TeacherDashboard from "./pages/teacher-dashboard";
import TeacherLogin from './pages/teacher-login';
import TeacherSignup from './pages/teacher-signup';
import TeacherClasses from './pages/teacher-classes';
import Attendance from './pages/attendance';
import ParentAttendance from './pages/parent-attendance';
import ParentChild from './pages/parent-child';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="teacher/signup/" element={<TeacherSignup />} />
      <Route path="parent/pupils/" element={<ParentChild />} />
      <Route path="parent/attendance/:classId/class/:childId/child/" element={<ParentAttendance />} />
      <Route path="teacher/attendance/:classId/class/" element={<Attendance />} />
      <Route path="teacher/manage/attendance/" element={<TeacherClasses />} />
      <Route path="teacher/login/" element={<TeacherLogin />} />
      <Route path="admin/login/" element={<AdminLogin />} />
      <Route path="parent/login/" element={<ParentLogin />} />
      <Route path="parent/signup/" element={<ParentSignup />} />
      <Route path="teacher/dashboard/" element={<TeacherDashboard />} />
      <Route path="admin/dashboard/" element={<AdminDashboard />} />
      <Route path="admin/class/create/" element={<CreateClass />} />
      <Route path="admin/course/create/" element={<CreateCourse />} />
      <Route path="admin/student/create/" element={<CreateStudents />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
   
  </BrowserRouter>
  );
}

export default App;
