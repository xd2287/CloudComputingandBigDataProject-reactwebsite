import React from 'react'
import '../css/App.css'
import { useNavigate } from "react-router-dom";

import WelcomeSection from '../components/basic/WelcomeSection'
import Footer from '../components/basic/Footer'
import PatientHome from './PatientHome'
import DoctorHome from './DoctorHome'

function Home() {
  // const navigate = useNavigate();
  const userRole = localStorage.getItem("loggedInUserRole");

  return (
    <>
      {userRole === "patient" 
        ? <PatientHome />
        :
        userRole === "doctor"
        ? <DoctorHome />
        : 
        <>
          <WelcomeSection />
          <Footer />
        </>
      }
    </>
  )
}

export default Home