import axios from 'axios';

async function SetProfileAPI(role, profile) {
    
    if (role == 'patient'){
        response = await axios.post(
            'https://0455gwuqd1.execute-api.us-east-1.amazonaws.com/test/userFunctionality',
            {
                "action": "setProfile",
                "userType": "Patient",
                "userName": profile["name"],
                "email": profile["email"],
                "password": profile["password"],
                "phone": profile["phone"],
                "address": profile["address"],
                "insuranceNumber": profile["insuranceNumber"],
                "insuranceCompany": profile["insuranceCompany"]
              }
          );
    }

    if (role == 'doctor'){
        response = await axios.post(
            'https://0455gwuqd1.execute-api.us-east-1.amazonaws.com/test/userFunctionality',
            {
                "action": "setProfile",
                "userType": "Patient",
                "userName": profile["name"],
                "email": profile["email"],
                "password": profile["password"],
                "phone": profile["phone"],
                "address": profile["address"],
                "company": profile["company"]
            }
          );
    }
}

export default SetProfileAPI;