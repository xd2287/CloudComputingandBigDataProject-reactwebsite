
// import React, { Component } from 'react';
// import axios from 'axios';

// class App extends Component {
//   componentDidMount() {
//     const api = 'https://o46dbledt2.execute-api.us-east-1.amazonaws.com/dev/lfchat';
//     const data = {
//       body: JSON.stringify({
//         action: 'GetConversations',
//         data: { senderEmail: 'patient1@gmail.com' },
//       }),
//     };

//     axios
//       .post(api, data)
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   render() {
//     return <div>Medium Tutorial</div>;
//   }
// }

// export default App;









// import logo from './logo.svg';
import './css/App.css';
import React from "react";
import Navbar from './components/basic/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import PatientHome from './pages/PatientHome'
import PatientProfile from './pages/PatientProfile'
import DoctorHome from './pages/DoctorHome'
import DoctorProfile from './pages/DoctorProfile'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact Component={Home} />
          <Route path='/sign-up' Component={SignUp} />
          <Route path='/login' Component={Login} />
          <Route path='/patient-home' Component={PatientHome} />
          <Route path='/patient-profile' Component={PatientProfile} />
          <Route path='/doctor-home' Component={DoctorHome} />
          <Route path='/doctor-profile' Component={DoctorProfile} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
