import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
// import PatientProfile from '../components/patient/PatientProfile';
import Profile from '../components/user/Profile';
import Footer from '../components/basic/Footer'

import '../css/App.css'
// import '../css/pages/PatientHome.css'
// import WelcomeSection from '../components/basic/WelcomeSection'

function PatientHome() {
    
    const [currentTab, setCurrentTab] = useState('treatmentPlan');

    const onNavigate = (tab) => {
        setCurrentTab(tab);
    };

    return (
        <>
            {/* <PatientProfile /> */}
            <Profile />
            <Footer />
        </>
    );
}

export default PatientHome