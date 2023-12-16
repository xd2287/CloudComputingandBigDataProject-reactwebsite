import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
// import DoctorProfile from '../components/doctor/DoctorProfile';
import Profile from '../components/user/Profile';
import Footer from '../components/basic/Footer';

import '../css/App.css'
// import '../css/pages/PatientHome.css'
// import WelcomeSection from '../components/basic/WelcomeSection'

function PatientHome() {
    return (
        <>
            {/* <DoctorProfile /> */}
            <Profile />
            <Footer />
        </>
    );
}

export default PatientHome