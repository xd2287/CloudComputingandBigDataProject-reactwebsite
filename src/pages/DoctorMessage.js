import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
// import DoctorProfile from '../components/doctor/DoctorProfile';
import MessageHint from '../components/doctor/MessageHint';
import Footer from '../components/basic/Footer';

import '../css/App.css'
// import '../css/pages/PatientHome.css'
// import WelcomeSection from '../components/basic/WelcomeSection'

function DoctorProfile() {
    return (
        <>
            {/* <DoctorProfile /> */}
            <MessageHint />
            <Footer />
        </>
    );
}

export default DoctorProfile