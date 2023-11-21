import React from 'react'
import { useState } from 'react';

import { Button } from '../basic/Button';
import '../../css/components/loginSignup/LoginSignupForm.css';

import user_icon from '../../assets/person.png'
import email_icon from '../../assets/email.png'
import password_icon from '../../assets/password.png'
import SignUpAPI from '../../api/SignUpAPI';
import LoginAPI from '../../api/LoginAPI';

// import { globalUserRole } from './GlobalUserInfo';
// import { globalUserName } from './GlobalUserInfo';
// import { globalUserEmail } from './GlobalUserInfo';


const LoginSignupForm = ({name}) => {

    const [action] = useState(name);

    const [selectedRole, setSelectedRole] = useState("");
    const [inputTextValue, setinputTextValue] = useState("");
    const [inputEmailValue, setinputEmailValue] = useState("");
    const [inputPasswordValue, setinputPasswordValue] = useState("");

    const handleRoleChange = (event) => { setSelectedRole(event.target.value); };
    const handleInputTextChange = (event) => { setinputTextValue(event.target.value); };
    const handleInputEmailChange = (event) => { setinputEmailValue(event.target.value); };
    const handleInputPasswordChange = (event) => { setinputPasswordValue(event.target.value); };

    const handleSubmitSignUp = () => {
        if (
            selectedRole === "" ||
            inputTextValue === "" ||
            inputEmailValue === "" ||
            inputPasswordValue === ""
        ) {
            alert("Please fill in all fields.");
        }
        else {
            const successSignUp = SignUpAPI(selectedRole, inputTextValue, inputEmailValue, inputPasswordValue);
            if (successSignUp) {
                alert("Successfully sign up");
            }
            else {
                alert("Invalid sign up.");
            }
        }
    }

    const handleSubmitLogin = () => {
        if (
            selectedRole === "" ||
            inputEmailValue === "" ||
            inputPasswordValue === ""
        ) {
            alert("Please fill in all fields.");
        }
        else {
            const successLogin = LoginAPI(selectedRole, inputEmailValue, inputPasswordValue);
            if (successLogin) {
                alert("Successfully Login");
            }
            else {
                alert("Invalid email address or incorrect password.");
            }
        }
    }

    return (
    <>
    <div className='container'>
        <div className='header'>
            <div className='text'>
                {action}
            </div>
            <div className='underline'></div>
        </div>
        <div className='inputs'>
            <div className="input">
                <img src={user_icon} alt="" />    
                <select value={selectedRole} onChange={handleRoleChange}>
                    <option value="">Select Role</option>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                </select>
            </div>
            {action==="SignUp"
                ? <div className='input'>
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder='Name' value={inputTextValue} onChange={handleInputTextChange} />
                </div>
                : null
            }
            <div className='input'>
                <img src={email_icon} alt="" />
                <input type="email" placeholder='Email' value={inputEmailValue} onChange={handleInputEmailChange} />
            </div>
            <div className='input'>
                <img src={password_icon} alt="" />
                <input type="password" placeholder='Password' value={inputPasswordValue} onChange={handleInputPasswordChange} />
            </div>
        </div>
        {action==="Login"
            ? <div className='forgot-password'>
                Lost Password?
                <span> Click Here!</span>
            </div>
            : null
        }      
        <div className='submit-container'>
            <Button
            className='btns'
            buttonStyle={action==="Login"?"btn--submit-gray":"btn--submit"}
            buttonSize='btn--large'
            pageLinkedTo='sign-up'
            onClick={action==="SignUp"?handleSubmitSignUp:null}
            >
                Sign Up
            </Button>
            <Button
            className='btns'
            buttonStyle={action==="SignUp"?"btn--submit-gray":"btn--submit"}
            buttonSize='btn--large'
            pageLinkedTo='login'
            onClick={action==="Login"?handleSubmitLogin:null}
            >
                Login
            </Button>
        </div>
    </div>
    </>
  )
}

export default LoginSignupForm;