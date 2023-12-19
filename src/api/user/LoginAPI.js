import axios from 'axios';

async function LoginAPI(role, email, password) {
  // hint 
  console.log("role: "+role);
  console.log("email: "+email);
  console.log("password: "+password);

  if (role == "patient"){
    response = await axios.post(
      'https://0455gwuqd1.execute-api.us-east-1.amazonaws.com/test/userFunctionality',
      {
        "action": "login",
        "userType": "Patient",
        "email": email,
        "password": password
      }
    );

    return {loginStatus: response[0], userInfo : response[1]}
  }

  if (role == 'doctor'){
    response = await axios.post(
      'https://0455gwuqd1.execute-api.us-east-1.amazonaws.com/test/userFunctionality',
      {
        "action": "login",
        "userType": "Doctor",
        "email": email,
        "password": password
      }
    );

    return {loginStatus: response[0], userInfo : response[1]}
  }

export default LoginAPI