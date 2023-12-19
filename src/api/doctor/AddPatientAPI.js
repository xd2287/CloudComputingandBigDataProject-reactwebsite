// function AddPatientAPI(doctorEmail, patientEmail) {
//     console.log(doctorEmail," add new patient: ",patientEmail);
//     return (
//         true
//     )
// }

// export default AddPatientAPI;

import axios from 'axios';

export default async function AddPatientAPI(doctorEmail, patientEmail) {
  // hint 
  
    const response = await axios.post(
        'https://0455gwuqd1.execute-api.us-east-1.amazonaws.com/test/userFunctionality',
        {
        "action": "updatePatientList",
        "email": doctorEmail,
        "patient": patientEmail
        }
    );
    
    console.log("start AddPatientAPI");
    console.log(response);
    console.log(response.data.body);
    const responseJSON = response.data.body;
    console.log("responseJSON");
    console.log(responseJSON);
    console.log(responseJSON.status);
    return responseJSON.status;
  
}