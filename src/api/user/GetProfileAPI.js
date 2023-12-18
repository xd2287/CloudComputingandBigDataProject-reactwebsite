function GetProfileAPI(ownRole, email) {
    if (ownRole === "patient") {
        return {
            name: 'patient 1',
            email: 'patient1@gmail.com',
            phone: '11111111',
            address: '113 W 112st, NY 10027',
            insuranceCompany: 'Aetna Health',
            insuranceNumber: 'xxxxxxxxxx',
        }
    }
    else if (ownRole === "doctor") {
        return {
            name: 'doctor 1',
            email: 'doctor1@gmail.com',
            phone: '11111111',
            address: '113 W 112st, NY 10027',
            company: 'xxxxxxx'
        }
    }
}

export default GetProfileAPI;