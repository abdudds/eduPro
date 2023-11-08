import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar/navbar'
import Footer from '../components/Footer';

function UserLayout() {
  return (
    <>
      <Navbar />
      <div className=" max-w-screen-xl mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default UserLayout