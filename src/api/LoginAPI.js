// import React from 'react'

function LoginAPI(role, email, password) {
  console.log("role: "+role);
  console.log("email: "+email);
  console.log("password: "+password);
  return (
    {loginStatus: true, userInfo: {name: "patient 1", email: "patient1@gmail.com", gender: "female"}}
  )
}

export default LoginAPI