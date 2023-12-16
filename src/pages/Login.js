import React from 'react'
import '../css/App.css'
import LoginSignupForm from '../components/user/LoginSignupForm';
import Footer from '../components/basic/Footer'

function Login() {
  return (
    <>
        <LoginSignupForm name={"Login"} />
        {/* <Footer /> */}
    </>
  );
}

export default Login