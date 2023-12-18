function SetTreatmentPlanAPI(doctorEmail, patientEmail, treatmentPlanId, newTreatmentPlans) {
    // newTreatmentPlans = [{"TreatmentId":1, "Medicines":[{"MedicineName":"Naproxen","quantity":2, "type": "tablet", "location": "mouth", "frequency": "daily", "duration": 4}]}]
    console.log("updated treatment plan:");
    console.log(newTreatmentPlans);
    return (
        true
    )
}

export default SetTreatmentPlanAPI;