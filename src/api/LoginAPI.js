// import React from 'react'

function LoginAPI(role, email, password) {
  console.log("role: "+role);
  console.log("email: "+email);
  console.log("password: "+password);
  if (role==="patient" && email==="patient1@gmail.com") {
    return (
      {loginStatus: true, userInfo: {name: "patient 1", email: "patient1@gmail.com", gender: "female"}}
    )
  }
  else if (role==="doctor" && email==="doctor1@gmail.com") {
    return (
      {loginStatus: true, userInfo: {name: "doctor 1", email: "doctor1@gmail.com", gender: "female"}}
    )
  }
  else {
    return ({loginStatus: false, userInfo: null})
  }
}

export default LoginAPI