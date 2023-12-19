import axios from 'axios';

async function SetProfileAPI(role, profile) {
    
    if (role === 'patient'){
        const response = await axios.post(
            'https://0455gwuqd1.execute-api.us-east-1.amazonaws.com/test/userFunctionality',
            {
                "action": "setProfile",
                "userType": "Patient",
                "userName": profile["name"],
                "email": profile["email"],
                "password": profile["password"],
                "address": profile["address"],
                "insuranceNumber": profile["insuranceNumber"],
                "insuranceCompany": profile["insuranceCompany"]
              }
          );
        console.log({
            "action": "setProfile",
            "userType": "Patient",
            "userName": profile["name"],
            "email": profile["email"],
            "password": profile["password"],
            "address": profile["address"],
            "insuranceNumber": profile["insuranceNumber"],
            "insuranceCompany": profile["insuranceCompany"]
          });
        console.log("response to set Profile");
        console.log(response);
    }

    if (role === 'doctor'){
        const response = await axios.post(
            'https://0455gwuqd1.execute-api.us-east-1.amazonaws.com/test/userFunctionality',
            {
                "action": "setProfile",
                "userType": "Doctor",
                "userName": profile["name"],
                "email": profile["email"],
                "password": profile["password"],
                "address": profile["address"],
                "company": profile["company"]
            }
          );
        console.log("response to set Profile");
        console.log(response);
    }
}

export default SetProfileAPI;

// function SetProfileAPI(role, profile) {
//     console.log(role);
//     console.log(profile);
// }

// export default SetProfileAPI;