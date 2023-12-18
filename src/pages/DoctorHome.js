import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import DoctorNavbar from '../components/doctor/DoctorNavbar';
import PatientInformation from '../components/doctor/PatientInformation'; // Placeholder for the treatment plan component
import LoofForMedicine from '../components/doctor/LoofForMedicine';
import ChatWithPatient from '../components/doctor/ChatWithPatient';
import Footer from '../components/basic/Footer'

import '../css/App.css'
import '../css/pages/PatientHome.css'
// import WelcomeSection from '../components/basic/WelcomeSection'
// import Footer from '../Footer'

function PatientHome() {
    
    const [currentTab, setCurrentTab] = useState('patientInformation');

    const onNavigate = (tab) => {
        setCurrentTab(tab);
    };

    return (
        <>
            <div className="content-placement">
                <DoctorNavbar onNavigate={onNavigate} current={currentTab} />
                {currentTab === 'patientInformation' && <PatientInformation />}
                {/* {currentTab === 'lookForMedicine' && <LoofForMedicine />} */}
                {currentTab === 'chatWithPatient' && <ChatWithPatient />}
            </div>
            <Footer />
        </>
    );
}

export default PatientHome