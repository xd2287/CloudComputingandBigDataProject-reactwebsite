function AddMessageAPI(message, receiverEmail) {
    // API return: {status: whetherAddSuccess}
    // Return: if message.senderRole is patient, return {"status": true, "data": [newMessage, responsedMessage from receiver]}; 
    //         if message.senderRole is doctor, return {}
    const conversation = JSON.parse(localStorage.getItem(message.conversationId));
    const mockDoctorResponseMessage = {
        "sender": receiverEmail,
        "senderRole": "doctor",
        "text": "auto-response to patient",
        "conversationId": message.conversationId,
        "createdAt": message.createdAt,
        "updatedAt": message.updatedAt,
    };
    const newMessages = message.senderRole==="patient" ? [message, mockDoctorResponseMessage] : [message];
    localStorage.setItem(message.conversationId, JSON.stringify([...conversation, ...newMessages]));
    // simulate the deplay of API access
    return new Promise((resolve) => {
        setTimeout(() => {
            const response = { "status": true, "data": newMessages };
            resolve(response);
        }, 2000); // Delay for 2 seconds (2000 milliseconds)
    });
}

export default AddMessageAPI;