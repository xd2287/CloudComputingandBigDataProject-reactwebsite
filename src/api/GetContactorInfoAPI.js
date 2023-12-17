// patient get doctor info, doctor get patient info (API should hide some personal information)
function GetContactorInfoAPI(ownRole, email) {
    console.log("call GetContactorInfoAPI + 1");
    if (ownRole === "patient") {
        return {
            "name": email==="doctor1@gmail.com" ? "doctor 1" : "doctor 2",
            "email": email,
            "phone": '11111111',
        }
    }
    else if (ownRole === "doctor") {
        return {
            "name": email==="patient1@gmail.com" ? "patient 1" : "patient 2",
            "email": email,
            "phone": '11111111',
        }
    }
}

export default GetContactorInfoAPI;