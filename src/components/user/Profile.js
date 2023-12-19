import React, { useEffect, useState } from 'react';
import '../../css/components/user/Profile.css'; // Make sure to create a corresponding CSS file
import SetProfileAPI from '../../api/user/SetProfileAPI';
import GetProfileAPI from '../../api/user/GetProfileAPI';

function Profile() {
    const userInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));
    const userRole = localStorage.getItem("loggedInUserRole");

    const [isEditable, setIsEditable] = useState(false);
    const [initialProfile, setInitialProfile] = useState(null);
    const [profile, setProfile] = useState(null);
    const getProfile = async ()=> {
        const getProfileResponse = await GetProfileAPI(userRole,userInfo["email"]);
        console.log("use for set profile");
        console.log(getProfileResponse);
        setInitialProfile(getProfileResponse);
        setProfile(getProfileResponse);
    }

    useEffect(()=>{
        getProfile();
    }, [])

    const handleChange = (e) => {
        setProfile({
        ...profile,
        [e.target.name]: e.target.value,
        });
    };

    function profileChanged(json1, json2) {
        const keys1 = Object.keys(json1);
        const keys2 = Object.keys(json2);
        keys1.sort();
        keys2.sort();
        for (let i = 0; i < keys1.length; i++) {
            if (json1[keys1[i]] !== json2[keys2[i]]) {
                return true;
            }
        }
        return false;
    }

    const handleEdit = () => {
        console.log("initialProfile");
        console.log(initialProfile);
        console.log("profile");
        console.log(profile);
        setIsEditable(!isEditable);
        if (isEditable && profileChanged(profile, initialProfile)) {
            SetProfileAPI(userRole,profile);
            setInitialProfile(profile);
            alert("Successfully updated the profile");
        }
    };

    return (
        <>
        {profile
            ?<div className="profile-container">
                <div className='profile-head'>
                    <h2>Profile</h2>
                    <button onClick={handleEdit} className='profile-edit-button'>{isEditable ? 'Save' : 'Edit'}</button>
                </div>
                {userRole === "doctor"
                    ?
                    <div className='profile-content'>
                        <label>Name:</label>
                        <input type="text" name="name" value={profile.name} onChange={handleChange} disabled={!isEditable} />
                        <label>Email:</label>
                        <input type="email" name="email" value={profile.email} onChange={handleChange} disabled={true} />
                        <label>Password:</label>
                        <input type="text" name="password" value={profile.password} onChange={handleChange} disabled={!isEditable} />
                        {/* <label>Phone #:</label>
                        <input type="tel" name="phone" value={profile.phone} onChange={handleChange} disabled={!isEditable} /> */}
                        <label>Address:</label>
                        <input type="text" name="address" value={profile.address} onChange={handleChange} disabled={!isEditable} />
                        <label>Company:</label>
                        <input type="text" name="company" value={profile.company} onChange={handleChange} disabled={!isEditable} />
                    </div>
                    :
                    <div className='profile-content'>
                        <label>Name:</label>
                        <input type="text" name="name" value={profile.name} onChange={handleChange} disabled={!isEditable} />
                        <label>Email:</label>
                        <input type="email" name="email" value={profile.email} onChange={handleChange} disabled={true} />
                        <label>Password:</label>
                        <input type="text" name="password" value={profile.password} onChange={handleChange} disabled={!isEditable} />
                        {/* <label>Phone #:</label>
                        <input type="tel" name="phone" value={profile.phone} onChange={handleChange} disabled={!isEditable} /> */}
                        <label>Address:</label>
                        <input type="text" name="address" value={profile.address} onChange={handleChange} disabled={!isEditable} />
                        <label>Insurance Company:</label>
                        <input type="text" name="insuranceCompany" value={profile.insuranceCompany} onChange={handleChange} disabled={!isEditable} />
                        <label>Insurance #:</label>
                        <input type="text" name="insuranceNumber" value={profile.insuranceNumber} onChange={handleChange} disabled={!isEditable} />
                    </div>
                }
            </div>
            : null
        }
        </>
    );
}

export default Profile;
