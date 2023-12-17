function GetTreatmentPlanAPI(userEmail) {
    return (
      [{"TreatmentId":1, "Medicines":[{"MedicineName":"Aspirin","Dosage":"one capsule once a day","Indications":"Fever"}], "enabledReminder":false},
       {"TreatmentId":2, "Medicines":[{"MedicineName":"Naproxen","Dosage":"two 500 mg tablets once a day","Indications":"tendonitis"}], "enabledReminder":true},
       {"TreatmentId":3, "Medicines":[{"MedicineName":"Naproxen","Dosage":"two 500 mg tablets once a day","Indications":"tendonitis"}, {"MedicineName":"Aspirin","Dosage":"one capsule once a day","Indications":"Fever"}], "enabledReminder":true},
       {"TreatmentId":4, "Medicines":[{"MedicineName":"Naproxen","Dosage":"two 500 mg tablets once a day","Indications":"tendonitis"}], "enabledReminder":true}]
    )
}

export default GetTreatmentPlanAPI;