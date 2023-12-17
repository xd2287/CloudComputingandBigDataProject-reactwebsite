function SetTreatmentPlanAPI(doctorEmail, patientEmail, treatmentPlanId, newTreatmentPlan) {
    // newTreatmentPlan = [{"TreatmentId":1, "Medicines":[{"MedicineName":"Aspirin","Dosage":"one capsule once a day","Indications":"Fever"}]}]
    console.log("updated treatment plan:");
    console.log(newTreatmentPlan);
    return (
        true
    )
}

export default SetTreatmentPlanAPI;