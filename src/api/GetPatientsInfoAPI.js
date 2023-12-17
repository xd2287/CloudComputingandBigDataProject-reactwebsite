function GetPatientsInfoAPI(senderEmail) {
    console.log("GetPatientsInfoAPI + 1")
    const mockPatients = [
        {
            name: 'patient 1',
            email: 'patient1@gmail.com',
            phone: '11111111',
            treatmentPlan: [
                {"TreatmentId":1, "Medicines":[{"MedicineName":"Aspirin","Dosage":"one capsule once a day","Indications":"Fever"}], "enabledReminder":false},
                {"TreatmentId":2, "Medicines":[{"MedicineName":"Naproxen","Dosage":"two 500 mg tablets once a day","Indications":"tendonitis"}], "enabledReminder":true},
                // {"TreatmentId":3, "Medicines":[{"MedicineName":"Naproxen","Dosage":"two 500 mg tablets once a day","Indications":"tendonitis"}], "enabledReminder":true},
            ]
        },
        {
            name: 'patient 2',
            email: 'patient2@gmail.com',
            phone: '11111111',
            treatmentPlan: [
                {"TreatmentId":3, "Medicines":[{"MedicineName":"Naproxen","Dosage":"two 500 mg tablets once a day","Indications":"tendonitis"}, {"MedicineName":"Aspirin","Dosage":"one capsule once a day","Indications":"Fever"}], "enabledReminder":true},    
            ]
        },
    ];
    console.log(mockPatients);
    return (mockPatients);
}

export default GetPatientsInfoAPI;