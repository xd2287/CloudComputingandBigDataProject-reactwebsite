import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { Button } from './Button';
import '../../css/components/basic/Navbar.css'
import doctor from '../../assets/doctor.png'

function Navbar() {
    // const data = useLocation();

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    console.log(JSON.parse(localStorage.getItem("loggedInUserInfo")));
    const navigate = useNavigate();

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const handleLogout = () => {
        setClick(false);
        // localStorage.removeItem("loggedInUserInfo");
        localStorage.clear();
        navigate('/');
    }

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
    <>
        <nav className='navbar'>
            {JSON.parse(localStorage.getItem("loggedInUserInfo")) === null
                ?
                <div className='navbar-container'>
                    <Link to="/" className='navbar-logo' onClick={closeMobileMenu}>
                        One-Stop Treatment
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
                                Login
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/sign-up' className='nav-links' onClick={closeMobileMenu}>
                                Signup
                            </Link>
                        </li>
                    </ul>
                </div>
                :
                <div className='navbar-container'>
                    <Link to={`/${localStorage.getItem("loggedInUserRole") === "doctor" ? "doctor-home" : "patient-home"}`} className='navbar-logo' onClick={closeMobileMenu}>
                        One-Stop Treatment
                    </Link>
                    {localStorage.getItem("loggedInUserRole") === "doctor" ? <div><img src={doctor}  alt="" style={{ width: '70px', height: '70px' }} /></div> : null}
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to={`/${localStorage.getItem("loggedInUserRole") === "doctor" ? "doctor-home" : "patient-home"}`} className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={handleLogout}>
                                Logout
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to={`/${localStorage.getItem("loggedInUserRole") === "doctor" ? "doctor-profile" : "patient-profile"}`} className='nav-links' onClick={closeMobileMenu}>
                                {JSON.parse(localStorage.getItem("loggedInUserInfo")).name}
                            </Link>
                        </li>
                    </ul>
                {/* {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>} */}
                </div>
            }
        </nav>
    </>
    )
}

export default Navbar