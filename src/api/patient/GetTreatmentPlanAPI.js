function GetTreatmentPlanAPI(userEmail) {
    return (
      [{"TreatmentId":1, "Medicines":[{"MedicineName":"Aspirin", "quantity":1, "type": "capsule", "location": "mouth", "frequency": "daily", "duration": 4}], "enabledReminder":false, "doctorCreatedBy":"doctor1@gmail.com", "dateModifed": "2023-12-15T14:20:28.262Z"},
       {"TreatmentId":2, "Medicines":[{"MedicineName":"Naproxen","quantity":2, "type": "tablet", "location": "mouth", "frequency": "daily", "duration": 4}], "enabledReminder":true, "doctorCreatedBy":"doctor1@gmail.com", "dateModifed": "2023-12-15T14:20:28.262Z"},
       {"TreatmentId":3, "Medicines":[{"MedicineName":"Naproxen","quantity":2, "type": "tablet", "location": "mouth", "frequency": "daily", "duration": 4}, {"MedicineName":"Aspirin", "quantity":1, "type": "capsule", "location": "mouth", "frequency": "daily", "duration": 4}], "enabledReminder":true, "doctorCreatedBy":"doctor1@gmail.com", "dateModifed": "2023-12-15T14:20:28.262Z"},
       {"TreatmentId":4, "Medicines":[{"MedicineName":"Naproxen","quantity":2, "type": "tablet", "location": "mouth", "frequency": "daily", "duration": 4}], "enabledReminder":true, "doctorCreatedBy":"doctor1@gmail.com", "dateModifed": "2023-12-15T14:20:28.262Z"}]
    )
}

export default GetTreatmentPlanAPI;