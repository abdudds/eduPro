import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Common/home';
import SignUpPage from '../pages/Auth/signUpPage';
import BecomeTutor from '../pages/Common/BecomeTutor'
import LoginPage from '../pages/Auth/loginPage';
import TutorSignUp from '../pages/Auth/TutorSignUp'
import TutorRequest from '../pages/Common/TutorRequest'; 
import StudentRouter from './StudentRouter';

function UserRouter() {

    const user = useSelector(state=>state.auth)
  return (
    <>
      <Routes>
        <Route exact path="/" element={<StudentRouter role={user} /> }/>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/tutorsignup" element={<TutorSignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/becomeTutor" element={<BecomeTutor />} />
        <Route path="/tutorrequest" element={<TutorRequest />} />
      </Routes>
    </>
  );
}

export default UserRouter