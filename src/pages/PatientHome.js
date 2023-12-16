import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import PatientNavbar from '../components/patient/PatientNavbar';
import TreatmentPlan from '../components/patient/CheckTreatmentPlan'; // Placeholder for the treatment plan component
import ChatWithDoctors from '../components/patient/ChatWithDoctor';
import Footer from '../components/basic/Footer'

import '../css/App.css'
import '../css/pages/PatientHome.css'
// import WelcomeSection from '../components/basic/WelcomeSection'
// import Footer from '../Footer'

function PatientHome() {
    
    const [currentTab, setCurrentTab] = useState('treatmentPlan');

    const onNavigate = (tab) => {
        setCurrentTab(tab);
    };

    return (
        <>
            <div className="content-placement">
                <PatientNavbar onNavigate={onNavigate} current={currentTab} />
                {currentTab === 'treatmentPlan' ? <TreatmentPlan /> : <ChatWithDoctors />}
            </div>
            <Footer />
        </>
    );
}

export default PatientHome