import axios from 'axios';
async function GetProfileAPI(ownRole, email) {
    if (ownRole === "patient") {

        profile = await axios.post(
            'https://0455gwuqd1.execute-api.us-east-1.amazonaws.com/test/userFunctionality',
            {
                userType: "Patient",
                email: email
            }
          );

        return profile;
    }
    else if (ownRole === "doctor") {
        profile = await axios.post(
            'https://0455gwuqd1.execute-api.us-east-1.amazonaws.com/test/userFunctionality',
            {
                userType: "Doctor",
                email: email
            }
          );

        return profile;
    }
}

export default GetProfileAPI;