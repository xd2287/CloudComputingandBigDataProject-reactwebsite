import axios from 'axios';

async function SignUpAPI(role, name, email, password, phone, address, insuranceCompany, insuranceNumber, company) {
  if(role == 'patient'){
    response = await axios.post(
      'https://0455gwuqd1.execute-api.us-east-1.amazonaws.com/test/userFunctionality',
        {
          "action": "signUp",
          "userType": "Patient",
          "userName": name,
          "email": email,
          "password": password,
          "phone": phone,
          "address": address,
          "insuranceNumber": insuranceNumber,
          "insuranceCompany": insuranceCompany
        }
    );
    return response;
  }

  if (role == 'doctor'){
    response = await axios.post(
      'https://0455gwuqd1.execute-api.us-east-1.amazonaws.com/test/userFunctionality',
        {
          "action": "signUp",
          "userType": "Patient",
          "userName": name,
          "email": email,
          "password": password,
          "phone": phone,
          "address": address,
          "company": company
        }
    );

  return response;
  }
}

export default SignUpAPI;