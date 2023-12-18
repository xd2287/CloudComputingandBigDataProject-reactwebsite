import React, {useState, useEffect} from 'react';

import '../../css/components/doctor/PatientInformationDashboard.css';

// import Conversation from './Conversation';
// import Message from './Message';

import GetPatientsInfoAPI from '../../api/doctor/GetPatientsInfoAPI';
import SetTreatmentPlanAPI from '../../api/doctor/SetTreatmentPlanAPI';
// import GetMessagesAPI from '../../api/chat/GetMessagesAPI';
// import AddMessageAPI from '../../api/chat/AddMessageAPI';
// import GetContactorInfoAPI from '../../api/GetContactorInfoAPI';

function PatientInformationDashboard() {

    const userRole = localStorage.getItem("loggedInUserRole");
    const userInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));

    const [patients, setPatients] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [initalCurrentPatient, setInitialCurrentPatient] = useState(null);
    const [currentPatient, setCurrentPatient] = useState(initalCurrentPatient);

    const [isEditable, setIsEditable] = useState(false);

    useEffect(()=>{
        const getPatients = async ()=>{
            const getPatientsInfoAPIResponse = await GetPatientsInfoAPI(userInfo["email"]);
            setPatients(getPatientsInfoAPIResponse);
            setFilteredPatients(getPatientsInfoAPIResponse);
        };
        getPatients();
    }, [userInfo.email]);

    useEffect(()=>{
        setFilteredPatients(
            patients.filter((p) =>
                p.name.toLowerCase().includes(searchKeyword.toLowerCase())
            )
        );
    }, [searchKeyword]);

    const handleClickPatientSelector = (p) => {
        const getPatients = async ()=>{
            const getPatientsInfoAPIResponse = await GetPatientsInfoAPI(userInfo["email"]);
            setPatients(getPatientsInfoAPIResponse);
            setFilteredPatients(getPatientsInfoAPIResponse);
            const updatedPatient = getPatientsInfoAPIResponse.filter((updatedP) => updatedP.email === p.email)[0];
            setInitialCurrentPatient(updatedPatient);
            setCurrentPatient(updatedPatient);
            setIsEditable(null);
        }
        getPatients();
    }

    const handleChange = (event, treatmentId, medicineName) => {
        const updatedTreatmentPlan = currentPatient.treatmentPlan.map((t) => {
            if (t.TreatmentId === treatmentId) {
              return {
                ...t,
                Medicines: t.Medicines.map((m) => {
                    if (m.MedicineName === medicineName) {
                        return {
                        ...m,
                        [event.target.name]: event.target.value,
                        };
                    }
                  return m; // Return unchanged medicine for other cases
                }),
              };
            }
            return t; // Return unchanged treatment plan for other cases
          });
        setCurrentPatient({
            ...currentPatient,
            treatmentPlan: updatedTreatmentPlan
        });
    };

    function currentTreatmentPlanChanged(json1, json2) {
        const keys1 = Object.keys(json1);
        const keys2 = Object.keys(json2);
        keys1.sort();
        keys2.sort();
        for (let i = 0; i < keys1.length; i++) {
            if (json1[keys1[i]] !== json2[keys2[i]]) {
                return true;
            }
        }
        return false;
    }

    const handleEdit = (currTreatmentId) => {
        const updatedIsEditable = isEditable===null? {} : JSON.parse(JSON.stringify(isEditable));
        if (isEditable===null) {
            currentPatient.treatmentPlan.map((t)=>{
                updatedIsEditable[t.TreatmentId] = false;
            })
            updatedIsEditable[currTreatmentId] = true;
        }
        else {
            updatedIsEditable[currTreatmentId] = !updatedIsEditable[currTreatmentId];
        }
        setIsEditable(updatedIsEditable);

        if (!updatedIsEditable[currTreatmentId] && 
            currentTreatmentPlanChanged(
                initalCurrentPatient.treatmentPlan.filter((t)=>t.TreatmentId===currTreatmentId)[0], 
                currentPatient.treatmentPlan.filter((t)=>t.TreatmentId===currTreatmentId)[0],
            )){
                SetTreatmentPlanAPI(userInfo.email, currentPatient.email, currTreatmentId, currentPatient.treatmentPlan);
                setInitialCurrentPatient(currentPatient);
                alert("Successfully updated the treatment plan with Id "+currTreatmentId);
        }
    };

    return (
        <>
            <div className='dashboard'>
                <div className='infoMenu'>
                    <div className='infoMenuWrapper'>
                        <div className='infoMenuInputContainer'>
                            <input 
                                placeholder="Search for patients" 
                                className="infoMenuInput"
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                            />
                        </div>
                        {filteredPatients.map((p) => (
                            // <div className="patientSelector">
                            <div className="patientSelector" onClick={()=>handleClickPatientSelector(p)}>
                                <span className="patientName">{p.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='infoBox'>
                    <div className='infoBoxWrapper'>
                        {currentPatient
                            ? <>
                                <div className='infoBoxHead'>
                                    <h2>{currentPatient.name}</h2>
                                </div>
                                <div className='infoBoxContent'>
                                    <div className='infoBoxProfile'>
                                        <div className='infoBoxProfileHead'>
                                            <div className='infoBoxHeadTag'>
                                                Personal Information
                                            </div>
                                        </div>
                                        <div className='infoBoxProfileContent'>
                                            <p> <label>Name:</label> {currentPatient.name}</p>
                                            <p> <label>Email:</label> {currentPatient.email}</p>
                                            <p> <label>Phone:</label> {currentPatient.phone}</p>
                                        </div>
                                    </div>
                                    <div className='infoBoxTreatmentPlan'>
                                        <div className='infoBoxTreatmentPlanHead'>
                                            <div className='infoBoxHeadTag'>
                                                Treatment Plan
                                            </div>
                                            <button className='newTreatmentPlan-create-button'>Create New Treatment Plan</button>
                                            {/* <button onClick={handleEdit} className='profile-edit-button'>{isEditable ? 'Save' : 'Edit'}</button> */}
                                        </div>
                                        <div className='infoBoxTreatmentPlanContent'>
                                            {currentPatient.treatmentPlan.map((plan,index) => (
                                                <div key={plan.TreatmentId} className="infoBoxTreatmentPlanContent-Container">
                                                    <div className='infoBoxTreatmentPlanContent-Head'>
                                                        <h3>Treatment Plan Id: {plan.TreatmentId}</h3>
                                                        <button onClick={()=>handleEdit(plan.TreatmentId)} className='treatmentPlan-edit-button'>{isEditable===null ? 'Edit' : (isEditable[plan.TreatmentId] ? 'Save' : 'Edit')}</button>
                                                    </div>
                                                    <div className="infoBoxMedicines-Container">
                                                        <div className="infoBoxMedicines">
                                                            <ol>
                                                                {plan.Medicines.map((medicine, index) => (
                                                                    <li key={index}>
                                                                        <p>
                                                                            <strong>Medicine Name:</strong>
                                                                            <input type="text" name="MedicineName" value={medicine.MedicineName} onChange={(event)=>handleChange(event, plan.TreatmentId, medicine.MedicineName)} disabled={isEditable===null ? true : !isEditable[plan.TreatmentId]} />
                                                                        </p>
                                                                        <p>
                                                                            <strong>Quantity:</strong> 
                                                                            <input type="text" name="quantity" value={medicine.quantity} onChange={(event)=>handleChange(event, plan.TreatmentId, medicine.MedicineName)} disabled={isEditable===null ? true : !isEditable[plan.TreatmentId]} />
                                                                        </p>
                                                                        <p>
                                                                            <strong>Type(liquid, capsule, tablet, etc):</strong> 
                                                                            <input type="text" name="type" value={medicine.type} onChange={(event)=>handleChange(event, plan.TreatmentId, medicine.MedicineName)} disabled={isEditable===null ? true : !isEditable[plan.TreatmentId]} />
                                                                        </p>
                                                                        <p>
                                                                            <strong>Location(mouth, ear, etc):</strong> 
                                                                            <input type="text" name="location" value={medicine.location} onChange={(event)=>handleChange(event, plan.TreatmentId, medicine.MedicineName)} disabled={isEditable===null ? true : !isEditable[plan.TreatmentId]} />
                                                                        </p>
                                                                        <p>
                                                                            <strong>Frequency:</strong> 
                                                                            <input type="text" name="frequency" value={medicine.frequency} onChange={(event)=>handleChange(event, plan.TreatmentId, medicine.MedicineName)} disabled={isEditable===null ? true : !isEditable[plan.TreatmentId]} />
                                                                        </p>
                                                                        <p>
                                                                            <strong>Duration(week):</strong> 
                                                                            <input type="text" name="duration" value={medicine.duration} onChange={(event)=>handleChange(event, plan.TreatmentId, medicine.MedicineName)} disabled={isEditable===null ? true : !isEditable[plan.TreatmentId]} />
                                                                        </p>
                                                                    </li>
                                                                ))}
                                                            </ol>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div> 
                                </div>
                            </>
                            : ( 
                                <span className='noPatientText'>
                                    Select a patient to see the details.
                                </span>
                            )
                        }
                    </div>
                </div>  
            </div>
        </>
    );
}

export default PatientInformationDashboard