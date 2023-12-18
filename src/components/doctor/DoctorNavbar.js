// PatientNavbar.js
import React from 'react';
import '../../css/components/basic/ContentNavbar.css';

const PatientNavbar = ({ onNavigate, current }) => {
  return (
    <div className="content-navbar">
      <div
        className={`content-nav-item ${current === 'patientInformation' ? 'active' : ''}`}
        onClick={() => onNavigate('patientInformation')}
      >
        Patient Information
      </div>
      {/* <div
        className={`content-nav-item ${current === 'lookForMedicine' ? 'active' : ''}`}
        onClick={() => onNavigate('lookForMedicine')}
      >
        Look for Medicines
      </div> */}
      <div
        className={`content-nav-item ${current === 'chatWithPatient' ? 'active' : ''}`}
        onClick={() => onNavigate('chatWithPatient')}
      >
        Chat with Patients
      </div>
    </div>
  );
};

export default PatientNavbar;