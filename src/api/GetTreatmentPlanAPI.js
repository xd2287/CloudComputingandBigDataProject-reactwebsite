function GetTreatmentPlanAPI(userEmail) {
    return (
      [{"TreatmentId":1, "Medicines":[{"MedicineName":"Aspirin", "quantity":1, "type": "capsule", "location": "mouth", "frequency": "daily", "duration": 4}], "enabledReminder":false},
       {"TreatmentId":2, "Medicines":[{"MedicineName":"Naproxen","quantity":2, "type": "tablet", "location": "mouth", "frequency": "daily", "duration": 4}], "enabledReminder":true},
       {"TreatmentId":3, "Medicines":[{"MedicineName":"Naproxen","quantity":2, "type": "tablet", "location": "mouth", "frequency": "daily", "duration": 4}, {"MedicineName":"Aspirin", "quantity":1, "type": "capsule", "location": "mouth", "frequency": "daily", "duration": 4}], "enabledReminder":true},
       {"TreatmentId":4, "Medicines":[{"MedicineName":"Naproxen","quantity":2, "type": "tablet", "location": "mouth", "frequency": "daily", "duration": 4}], "enabledReminder":true}]
    )
}

export default GetTreatmentPlanAPI;