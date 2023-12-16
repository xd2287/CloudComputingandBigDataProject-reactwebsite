import React from 'react'
import '../css/App.css'
import LoginSignupForm from '../components/user/LoginSignupForm';
import Footer from '../components/basic/Footer'

function SignUp() {
  return (
    <>
        <LoginSignupForm name={"SignUp"} />
        {/* <Footer /> */}
    </>
  );
}

export default SignUp