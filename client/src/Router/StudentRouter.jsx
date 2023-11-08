import React from 'react'
import Home from '../pages/Common/home'
import StudentHome from '../pages/Student/StudentHome';


function StudentRouter({role}) {

  return (
    <>
    {
        role.user ? 
        <StudentHome />
        :
        <Home />
    }
    </>
  )
}

export default StudentRouter