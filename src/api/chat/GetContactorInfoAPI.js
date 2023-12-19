import axios from 'axios';
async function GetContactorInfoAPI(ownRole, email) {
    if (ownRole === "patient") {

        const info = await axios.post(
            'https://0455gwuqd1.execute-api.us-east-1.amazonaws.com/test/userFunctionality',
            {
                action: "getContactorInfo",
                userType: "Patient",
                email: email
            }
          );
        
        console.log("GetContactorInfoAPI return")
        console.log(info);

        const name = info.data.body.userName;
        return name;
    }
    else if (ownRole === "doctor") {
        const profile = await axios.post(
            'https://0455gwuqd1.execute-api.us-east-1.amazonaws.com/test/userFunctionality',
            {
                action: "getContactorInfo",
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
        console.log("GetContactorInfoAPI return")
        console.log(returnProfile);
        return returnProfile;
    }
}

export default GetContactorInfoAPI;

// // patient get doctor info, doctor get patient info (API should hide some personal information)
// function GetContactorInfoAPI(ownRole, email) {
//     console.log("call GetContactorInfoAPI + 1");
//     if (ownRole === "patient") {
//         return {
//             "name": email==="doctor1@gmail.com" ? "doctor 1" : "doctor 2",
//             "email": email,
//             "phone": '11111111',
//         }
//     }
//     else if (ownRole === "doctor") {
//         return {
//             "name": email==="patient1@gmail.com" ? "patient 1" : "patient 2",
//             "email": email,
//             "phone": '11111111',
//         }
//     }
// }

// export default GetContactorInfoAPI;