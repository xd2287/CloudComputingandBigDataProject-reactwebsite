import React, {useState, useEffect} from 'react';

import '../../css/components/doctor/PatientInformationDashboard.css';

// import Conversation from './Conversation';
// import Message from './Message';

import GetPatientsInfoAPI from '../../api/GetPatientsInfoAPI';
import GetMessagesAPI from '../../api/chat/GetMessagesAPI';
import AddMessageAPI from '../../api/chat/AddMessageAPI';
import GetContactorInfoAPI from '../../api/GetContactorInfoAPI';

function PatientInformationDashboard() {

    const userRole = localStorage.getItem("loggedInUserRole");
    const userInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));

    const [patients, setPatients] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [currentPatient, setCurrentPatient] = useState(null);


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
            setCurrentPatient(updatedPatient);
        }
        getPatients();
    }

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
                                            
                                        </div>
                                        <div className='infoBoxTreatmentPlanContent'>
                                            {currentPatient.treatmentPlan.map(plan => (
                                                <div key={plan.TreatmentId} className="infoBoxTreatmentPlanContent-Container">
                                                    <h3>Treatment Plan Id: {plan.TreatmentId}</h3>
                                                    <div className="infoBoxMedicines-Container">
                                                        <div className="infoBoxMedicines">
                                                            <ol>
                                                                {plan.Medicines.map((medicine, index) => (
                                                                    <li key={index}>
                                                                        <p><strong>Medicine Name:</strong> <span>{medicine.MedicineName}</span></p>
                                                                        <p><strong>Dosage:</strong> {medicine.Dosage}</p>
                                                                        <p><strong>Indications:</strong> {medicine.Indications}</p>
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



// return (
//     <>
//         <div className='messenger'>
//             <div className='chatMenu'>
//                 <div className='chatMenuWrapper'>
//                     <div className='chatMenuInputContainer'>
//                         <input 
//                             placeholder="Search for friends" 
//                             className="chatMenuInput" 
//                             value={searchKeyword}
//                             onChange={(e) => setSearchKeyword(e.target.value)}
//                         />
//                     </div>
//                     {filteredConversations.map((c) => (
//                         <div onClick={()=>setCurrentChat(c)}>
//                             <span className="conversationName">
//                                 {
//                                     JSON.parse(localStorage.getItem(receiverEmail))
//                                         ? JSON.parse(localStorage.getItem(receiverEmail)).name
//                                         : null
//                                 }
//                             </span>

//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className='chatBox'>
//                 <div className='chatBoxWrapper'>
//                     {currentChat && receiverInfo ?
//                         (<>
//                             <div className='chatBoxHead'>
//                                 <h2>{receiverInfo.name}</h2>
//                             </div>
//                             <div className='chatBoxTop'>
//                                 {messages ? messages.map((m) => (
//                                     <div>
//                                         <Message message={m} own={m.sender === userInfo.email} senderName={m.sender === userInfo.email ? userInfo.name : receiverInfo.name}/>
//                                     </div>
//                                 )):null}
//                             </div>
//                             <div className='chatBoxBottom'>
//                                 <textarea 
//                                     className='chatMessageInput' 
//                                     placeholder='write something...'
//                                     onChange={(e)=>setNewMessage(e.target.value)}
//                                     value={newMessage}
//                                 ></textarea>
//                                 <button className='chatSubmitButton' onClick={handleSubmit}>
//                                     Send
//                                 </button>
//                             </div> </>
//                         ) : ( 
//                             <span className='noConversationText'>
//                                 Open a conversation to start a chat.
//                             </span>
//                         )
//                     }
//                 </div>
//             </div>
//         </div>  
//     </>
// );