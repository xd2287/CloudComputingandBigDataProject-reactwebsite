function GetPatientsInfoAPI(doctorEmail) {
    console.log("GetPatientsInfoAPI + 1")
    const mockPatients = [
        {
            name: 'patient 1',
            email: 'patient1@gmail.com',
            phone: '11111111',
            treatmentPlan: [
                {"TreatmentId":1, "Medicines":[{"MedicineName":"Aspirin", "quantity":1, "type": "capsule", "location": "mouth", "frequency": "daily", "duration": 4}]},
                {"TreatmentId":2, "Medicines":[{"MedicineName":"Naproxen","quantity":2, "type": "tablet", "location": "mouth", "frequency": "daily", "duration": 4}]},
                // {"TreatmentId":3, "Medicines":[{"MedicineName":"Naproxen","Dosage":"two 500 mg tablets once a day","Indications":"tendonitis"}]},
            ]
        },
        {
            name: 'patient 2',
            email: 'patient2@gmail.com',
            phone: '11111111',
            treatmentPlan: [
                {"TreatmentId":3, "Medicines":[{"MedicineName":"Naproxen","quantity":2, "type": "tablet", "location": "mouth", "frequency": "daily", "duration": 4}]},    
            ]
        },
    ];
    console.log(mockPatients);
    return (mockPatients);
}

export default GetPatientsInfoAPI;