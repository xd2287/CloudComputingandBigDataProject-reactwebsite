function AddTreatmentPlanAPI(doctorEmail, patientEmail, newTreatmentPlan) {
    // newTreatmentPlan = {"TreatmentId":1, "Medicines":[{"MedicineName":"Naproxen","quantity":2, "type": "tablet", "location": "mouth", "frequency": "daily", "duration": 4}]}
    console.log("new treatment plan:");
    console.log(newTreatmentPlan);
    return (
        true
    )
}

export default AddTreatmentPlanAPI;