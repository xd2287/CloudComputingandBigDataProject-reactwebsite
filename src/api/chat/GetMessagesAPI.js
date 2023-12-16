function GetMessagesAPI(conversationId) {
    // API return: {messageId, conversationId, senderEmail, text, createdAt, updatedAt}
    var messages = []
    if (conversationId === "001") {
        messages = [
            {
                "messageId": "001-001",
                "conversationId": "001",
                "sender": "patient1@gmail.com",
                "senderRole": "patient",
                "text": "Hi, I am patient 1",
                "createdAt": "2023-12-15T14:30:28.262Z",
                "updatedAt": "2023-12-15T14:30:28.262Z",
            },
            {
                "messageId": "001-002",
                "conversationId": "001",
                "sender": "doctor1@gmail.com",
                "senderRole": "doctor",
                "text": "Hi, I am doctor 1",
                "createdAt": "2023-12-15T14:35:28.262Z",
                "updatedAt": "2023-12-15T14:35:28.262Z",
            }
        ]
    }
    else if (conversationId === "002") {
        messages = [
            {
                "messageId": "002-001",
                "conversationId": "002",
                "sender": "doctor2@gmail.com",
                "senderRole": "doctor",
                "text": "Hi, I am doctor 2",
                "createdAt": "2023-12-15T14:30:28.262Z",
                "updatedAt": "2023-12-15T14:30:28.262Z",
            }]
    }
    return messages;
}

export default GetMessagesAPI;