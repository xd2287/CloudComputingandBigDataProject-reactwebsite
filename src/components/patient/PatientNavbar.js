// PatientNavbar.js
import React from 'react';
import '../../css/components/basic/ContentNavbar.css';

const PatientNavbar = ({ onNavigate, current }) => {
  return (
    <div className="content-navbar">
      <div
        className={`content-nav-item ${current === 'treatmentPlan' ? 'active' : ''}`}
        onClick={() => onNavigate('treatmentPlan')}
      >
        Check Treatment Plan
      </div>
      <div
        className={`content-nav-item ${current === 'chatWithDoctors' ? 'active' : ''}`}
        onClick={() => onNavigate('chatWithDoctors')}
      >
        Chat with Doctors
      </div>
    </div>
  );
};

export default PatientNavbar;