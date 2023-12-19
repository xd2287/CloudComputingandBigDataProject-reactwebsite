function SetTreatmentPlanAPI(doctorEmail, patientEmail, treatmentPlanId, originalTreatmentPlans, updatedTreatmentPlans) {
    // updatedTreatmentPlans = [{"TreatmentId":1, "Medicines":[{"MedicineName":"Naproxen","quantity":2, "type": "tablet", "location": "mouth", "frequency": "daily", "duration": 4}]}]
    console.log("originalTreatmentPlans:");
    console.log(originalTreatmentPlans);
    console.log("updated treatment plan:");
    console.log(updatedTreatmentPlans);
    return (
        true
    )
}

export default SetTreatmentPlanAPI;