

import getApi from "../getApi";
import axios from 'axios';

function SignUpAPI(role, name, email, password, address, insuranceCompany, insuranceNumber, company) {
    const api = 'https://0455gwuqd1.execute-api.us-east-1.amazonaws.com/test/userFunctionality'
    var requestData = {};
    if(role === 'patient'){
      requestData = {
        "action": "signUp",
        "userType": "Patient",
        "userName": name,
        "email": email,
        "password": password,
        "address": address,
        "insuranceNumber": insuranceNumber,
        "insuranceCompany": insuranceCompany
      };
    }
    else if (role === 'doctor'){
      requestData = {
        "action": "signUp",
        "userType": "Doctor",
        "userName": name,
        "email": email,
        "password": password,
        "address": address,
        "company": company
      }
    }
  
    return new Promise((resolve, reject) => {
      axios
        .post(api, requestData)
        .then((response) => {
          if (response.status === 200) {
            console.log("Get response from SignUpAPI:");
            console.log(response);
            const responseData = JSON.parse(response.data.body);
            console.log("responseData", responseData);
            const returnData = responseData;
            console.log("Get returnData from SignUpAPI:");
            console.log(returnData);
            resolve(returnData);
          } else {
            reject(new Error('Request failed with status ' + response.status));
          }
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }

  export default SignUpAPI;


// import axios from 'axios';

// async function SignUpAPI(role, name, email, password, address, insuranceCompany, insuranceNumber, company) {
//   if(role === 'patient'){
//     const response = await axios.post(
//       'https://0455gwuqd1.execute-api.us-east-1.amazonaws.com/test/userFunctionality',
//         {
//           "action": "signUp",
//           "userType": "Patient",
//           "userName": name,
//           "email": email,
//           "password": password,
//           "address": address,
//           "insuranceNumber": insuranceNumber,
//           "insuranceCompany": insuranceCompany
//         }
//     );
//     return response;
//   }

//   if (role === 'doctor'){
//     const response = await axios.post(
//       'https://0455gwuqd1.execute-api.us-east-1.amazonaws.com/test/userFunctionality',
//         {
//           "action": "signUp",
//           "userType": "Patient",
//           "userName": name,
//           "email": email,
//           "password": password,
//           "address": address,
//           "company": company
//         }
//     );

//   return response;
//   }
// }

// export default SignUpAPI;

// // import React from 'react'

// function SignUpAPI(role, name, email, password, address, insuranceCompany, insuranceNumber, company) {
//   console.log("role: "+role);
//   console.log("name: "+name);
//   console.log("email: "+email);
//   console.log("password: "+password);
//   console.log("address: "+address);
//   console.log("insuranceCompany: "+insuranceCompany);
//   console.log("insuranceNumber: "+insuranceNumber);
//   console.log("company: "+company);
//   return (
//     true
//   )
// }

// export default SignUpAPI