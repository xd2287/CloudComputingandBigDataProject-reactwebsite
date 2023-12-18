import React, { useState } from 'react'
// import { useLocation, useNavigate,Link } from "react-router-dom";
import GetTreatmentPlanAPI from '../../api/patient/GetTreatmentPlanAPI';
import SetTreatmentPlanReminder from '../../api/patient/SetTreatmentPlanReminder';
import enabled_alarm from '../../assets/enabled_alarm.png'
import disabled_alarm from '../../assets/disabled_alarm.png'

import '../../css/App.css';
import '../../css/components/patient/CheckTreatmentPlan.css';


function CheckTreatmentPlan() {
    const userInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));
    const fetchedTreatmentPlans = GetTreatmentPlanAPI(userInfo["email"]);

    const [treatmentPlans, setTreatmentPlans] = useState(fetchedTreatmentPlans);
    const toggleReminder = (treatmentId) => {
        setTreatmentPlans(treatmentPlans.map(plan => {
            if (plan.TreatmentId === treatmentId) {
                SetTreatmentPlanReminder(userInfo["email"], plan.TreatmentId, !plan.enabledReminder);
                return { ...plan, enabledReminder: !plan.enabledReminder };
            }
            return plan;
        }));
    };

    return (
        <>
            <div className="TreatmentPlans-Container">
                {treatmentPlans.map(plan => (
                    <div key={plan.TreatmentId} className="TreatmentPlan-Container">
                        <h3>Treatment Plan Id: {plan.TreatmentId}</h3>
                        <div className="Medicines-Container">
                            <div className="Medicines">
                                <ol>
                                    {plan.Medicines.map((medicine, index) => (
                                        <li key={index}>
                                            <p><strong>Medicine Name:</strong> <span>{medicine.MedicineName}</span></p>
                                            <p><strong>Quantity:</strong> {medicine.quantity}</p>
                                            <p><strong>Type(liquid, capsule, tablet, etc):</strong> {medicine.type}</p>
                                            <p><strong>Location(mouth, ear, etc):</strong> {medicine.location}</p>
                                            <p><strong>Frequency:</strong> {medicine.frequency}</p>
                                            <p><strong>Duration(week):</strong> {medicine.duration}</p>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                            <div className="Reminder">
                                <img src={plan.enabledReminder ? enabled_alarm : disabled_alarm}  
                                     alt="Reminder Icon" 
                                     className="alarm-icon"
                                     style={{ width: '50px', height: '50px' }} 
                                     onClick={() => toggleReminder(plan.TreatmentId)}/>
                                <p className="reminder-hint"> {plan.enabledReminder ? "reminder on" : "reminder off"}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default CheckTreatmentPlan