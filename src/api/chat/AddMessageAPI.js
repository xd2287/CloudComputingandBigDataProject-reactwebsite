function AddMessageAPI(message, receiveId) {
    // API return: {status: whetherAddSuccess}
    // return {"status": true, "data": messages};
    const responseMessage = {
        "sender": "doctor1@gmail.com",
        "senderRole": "doctor",
        "text": "hi patient",
        "conversationId": message.conversationId,
        "createdAt": message.createdAt,
        "updatedAt": message.updatedAt,
    };
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate adding the message after the delay
            const response = { "status": true, "data": [message,responseMessage] };
            resolve(response);
        }, 2000); // Delay for 2 seconds (2000 milliseconds)
    });
}

export default AddMessageAPI;