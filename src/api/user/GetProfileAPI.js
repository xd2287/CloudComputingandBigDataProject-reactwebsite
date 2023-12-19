import axios from 'axios';
async function GetProfileAPI(ownRole, email) {
    if (ownRole === "patient") {

        const profile = await axios.post(
            'https://0455gwuqd1.execute-api.us-east-1.amazonaws.com/test/userFunctionality',
            {
                action: "getProfile",
                userType: "Patient",
                email: email
            }
          );
        
        // console.log(profile);
        // console.log(profile.data);
        // console.log(profile.data.body);
        // console.log(profile.data.body.Item);
        const profileJSON = profile.data.body.Item
        const returnProfile = {
            name: profileJSON["userName"],
            email: profileJSON["email"],
            phone: "",
            password: profileJSON["password"],
            address: profileJSON["address"],
            insuranceCompany: profileJSON["insuranceCompany"],
            insuranceNumber: profileJSON["insurance"],
        }
        console.log("GetProfileAPI return")
        console.log(returnProfile);
        return returnProfile;
    }
    else if (ownRole === "doctor") {
        const profile = await axios.post(
            'https://0455gwuqd1.execute-api.us-east-1.amazonaws.com/test/userFunctionality',
            {
                action: "getProfile",
                userType: "Doctor",
                email: email
            }
          );
        const profileJSON = profile.data.body.Item
        console.log(profile);
        const returnProfile = {
            name: profileJSON["userName"],
            email: profileJSON["email"],
            phone: '',
            password: profileJSON["password"],
            address: profileJSON["address"],
            company: profileJSON["company"],
        }
        console.log("GetProfileAPI return")
        console.log(returnProfile);
        return returnProfile;
    }
}

export default GetProfileAPI;

// function GetProfileAPI(ownRole, email) {
//     if (ownRole === "patient") {
//         return {
//             name: 'patient 1',
//             email: 'patient1@gmail.com',
//             phone: '11111111',
//             address: '113 W 112st, NY 10027',
//             insuranceCompany: 'Aetna Health',
//             insuranceNumber: 'xxxxxxxxxx',
//         }
//     }
//     else if (ownRole === "doctor") {
//         return {
//             name: 'doctor 1',
//             email: 'doctor1@gmail.com',
//             phone: '11111111',
//             address: '113 W 112st, NY 10027',
//             company: 'xxxxxxx'
//         }
//     }
// }

// export default GetProfileAPI;