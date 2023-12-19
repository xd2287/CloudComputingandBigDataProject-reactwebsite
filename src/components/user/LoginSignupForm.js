import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { Button } from '../basic/Button';
import '../../css/components/user/LoginSignupForm.css';

import user_icon from '../../assets/person.png'
import email_icon from '../../assets/email.png'
import password_icon from '../../assets/password.png'
import SignUpAPI from '../../api/user/SignUpAPI';
import LoginAPI from '../../api/user/LoginAPI';

const LoginSignupForm = ({name}) => {

    const navigate = useNavigate();

    const [action] = useState(name);

    const [selectedRole, setSelectedRole] = useState("");
    const [inputNameValue, setinputNameValue] = useState("");
    const [inputEmailValue, setinputEmailValue] = useState("");
    const [inputPasswordValue, setinputPasswordValue] = useState("");
    const [inputAddressValue, setinputAddressValue] = useState("");
    const [inputInsuranceCompanyValue, setinputInsuranceCompanyValue] = useState("");
    const [inputInsuranceNumberValue, setinputInsuranceNumberValue] = useState("");
    const [inputCompanyValue, setinputCompanyValue] = useState("");

    const handleRoleChange = (event) => { setSelectedRole(event.target.value); };
    const handleInputNameChange = (event) => { setinputNameValue(event.target.value); };
    const handleInputEmailChange = (event) => { setinputEmailValue(event.target.value); };
    const handleInputPasswordChange = (event) => { setinputPasswordValue(event.target.value); };
    const handleInputAddressChange = (event) => { setinputAddressValue(event.target.value); };
    const handleInputInsuranceCompanyChange = (event) => { setinputInsuranceCompanyValue(event.target.value); };
    const handleInputInsuranceNumberChange = (event) => { setinputInsuranceNumberValue(event.target.value); };
    const handleInputCompanyChange = (event) => { setinputCompanyValue(event.target.value); };
    

    const handleSubmitSignUp = () => {
        if (
            selectedRole === "" ||
            inputNameValue === "" ||
            inputEmailValue === "" ||
            inputPasswordValue === "" || (
                selectedRole === "patient" &&
                (
                    inputAddressValue === "" ||
                    inputInsuranceCompanyValue === "" ||
                    inputInsuranceNumberValue === ""
                )
            ) || (
                selectedRole === "doctor" && inputCompanyValue === ""
            )
        ) {
            alert("Please fill in all fields.");
        }
        else {
            const successSignUp = SignUpAPI(selectedRole, inputNameValue, inputEmailValue, inputPasswordValue, inputAddressValue, inputInsuranceCompanyValue, inputInsuranceNumberValue, inputCompanyValue);
            if (successSignUp) {
                alert("Successfully sign up");
                console.log("navigate to patient home")
                navigate('/login', { replace: true });
            }
            else {
                alert("Invalid sign up.");
            }
        }
    }

    const handleSubmitLogin = () => {
        console.log(selectedRole)
        console.log(inputEmailValue)
        console.log(inputPasswordValue)
        if (
            selectedRole === "" ||
            inputEmailValue === "" ||
            inputPasswordValue === ""
        ) {
            alert("Please fill in all fields.");
        }
        else {
            const login = async ()=> {
                const loginReturn = await LoginAPI(selectedRole, inputEmailValue, inputPasswordValue);
                // setMessages(getMessagesAPIResponse);
                console.log("loginReturn is");
                console.log(loginReturn);
                if (!loginReturn) {
                    alert("Fail to login")
                }
                else {
                    const successLogin = loginReturn["loginStatus"];
                    const loggedInUserInfo = loginReturn["userInfo"];
                    if (successLogin) {
                        alert("Successfully Login");
                        // appendItemToLocalStorageList("loggedInUsers", inputEmailValue);
                        localStorage.setItem("loggedInUserRole", selectedRole);
                        localStorage.setItem("loggedInUserInfo",JSON.stringify(loggedInUserInfo));
                        console.log(selectedRole);
                        console.log(selectedRole === "doctor");
                        if (selectedRole === "patient") {
                            console.log("navigate to patient home");
                            navigate('/patient-home', { replace: true });
                        }
                        else if (selectedRole === "doctor") {
                            console.log("navigate to doctor home");
                            navigate('/doctor-home', { replace: true });
                        }
                    }
                    else {
                        alert("Invalid email address or incorrect password.");
                    }
                }
            }
            login();
            // const loginReturn = LoginAPI(selectedRole, inputEmailValue, inputPasswordValue);
        }
    }

    const navigateToSignup = () => {navigate('/sign-up')}
    const navigateToLogin = () => {navigate('/login')}

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
                {/* <select ref={selectedRole}> */}
                    <option value="">Select Role</option>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                </select>
            </div>
            {action==="SignUp"
                ? <div className='input'>
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder='Name' value={inputNameValue} onChange={handleInputNameChange} />
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
            {action==="SignUp"
                ? <>
                    {selectedRole==="patient"
                        ?<> 
                            <div className='input'>
                                <img src={user_icon} alt="" />
                                <input type="text" placeholder='Address' value={inputAddressValue} onChange={handleInputAddressChange} />
                            </div>
                            <div className='input'>
                                <img src={user_icon} alt="" />
                                <input type="text" placeholder='InsuranceCompany' value={inputInsuranceCompanyValue} onChange={handleInputInsuranceCompanyChange} />
                            </div>
                            <div className='input'>
                                <img src={user_icon} alt="" />
                                <input type="text" placeholder='InsuranceNumber' value={inputInsuranceNumberValue} onChange={handleInputInsuranceNumberChange} />
                            </div>
                        </>
                        :
                        <>
                        {selectedRole==="doctor"
                            ? <div className='input'>
                                <img src={user_icon} alt="" />
                                <input type="text" placeholder='Company' value={inputCompanyValue} onChange={handleInputCompanyChange} />
                            </div>
                            : null
                        }
                        </>
                    }
                </>
                : null
            }
        </div>
        {/* {action==="Login"
            ? <div className='forgot-password'>
                Lost Password?
                <span> Click Here!</span>
            </div>
            : null
        }       */}
        <div className='submit-container'>
            <Button
            className='btns'
            buttonStyle={action==="Login"?"btn--submit-gray":"btn--submit"}
            buttonSize='btn--large'
            // pageLinkedTo='sign-up'
            onClick={action==="SignUp"?handleSubmitSignUp:navigateToSignup}
            >
                Sign Up
            </Button>
            <Button
            className='btns'
            buttonStyle={action==="SignUp"?"btn--submit-gray":"btn--submit"}
            buttonSize='btn--large'
            // pageLinkedTo='login'
            onClick={action==="Login"?handleSubmitLogin:navigateToLogin}
            >
                Login
            </Button>
        </div>
    </div>
    </>
  )
}

export default LoginSignupForm;