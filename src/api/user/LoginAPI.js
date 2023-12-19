import axios from 'axios';

export default async function LoginAPI(role, email, password) {
  // hint 
  console.log("role: "+role);
  console.log("email: "+email);
  console.log("password: "+password);

  if (role === "patient"){
    const response = await axios.post(
      'https://0455gwuqd1.execute-api.us-east-1.amazonaws.com/test/userFunctionality',
      {
        "action": "login",
        "userType": "Patient",
        "email": email,
        "password": password
      }
    );

    console.log(response);
    console.log(response.data);
    console.log(response.data.body);
    const responseJSON = response.data.body;
    console.log("responseJSON");
    console.log(responseJSON);
    if (!responseJSON) {
      return {loginStatus:false, userInfo:{}}
    }
    else {
      console.log("loginStatus", responseJSON[0]);
      return {loginStatus: responseJSON[0], userInfo: {name: responseJSON[1].userName, email:responseJSON[1].email, gender:""}}
    }
  }

  else if (role === 'doctor'){
    const response = await axios.post(
      'https://0455gwuqd1.execute-api.us-east-1.amazonaws.com/test/userFunctionality',
      {
        "action": "login",
        "userType": "Doctor",
        "email": email,
        "password": password
      }
    );
    console.log(response);
    const responseJSON = response.data.body;
    if (!responseJSON) {
      return {loginStatus:false, userInfo:{}}
    }
    else {
      console.log("responseJSON");
      console.log(responseJSON);
      return {loginStatus: responseJSON[0], userInfo : {name: responseJSON[1].userName, email:responseJSON[1].email, gender:""}}
    }
  }
}


// // import React from 'react'

// function LoginAPI(role, email, password) {
//   // hint 
//   console.log("role: "+role);
//   console.log("email: "+email);
//   console.log("password: "+password);
//   if (role==="patient" && email==="patient1@gmail.com") {
//     return (
//       {loginStatus: true, userInfo: {name: "patient 1", email: "patient1@gmail.com", gender: "female"}}
//     )
//   }
//   else if (role==="doctor" && email==="doctor1@gmail.com") {
//     return (
//       {loginStatus: true, userInfo: {name: "doctor 1", email: "doctor1@gmail.com", gender: "female"}}
//     )
//   }
//   else {
//     return ({loginStatus: false, userInfo: null})
//   }
// }

// export default LoginAPI