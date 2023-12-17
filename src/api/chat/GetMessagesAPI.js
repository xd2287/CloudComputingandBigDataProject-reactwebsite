function GetMessagesAPI(conversationId) {
    // API return: {messageId, conversationId, senderEmail, text, createdAt, updatedAt}
    var messages = []
    const conversation = JSON.parse(localStorage.getItem(conversationId));
    if (conversation === null) {
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
        else if (conversationId === "003") {
            messages = [
                {
                    "messageId": "003-001",
                    "conversationId": "003",
                    "sender": "patient2@gmail.com",
                    "senderRole": "patient",
                    "text": "Hi, I am patient 2",
                    "createdAt": "2023-12-15T14:30:28.262Z",
                    "updatedAt": "2023-12-15T14:30:28.262Z",
                },
                {
                    "messageId": "003-002",
                    "conversationId": "003",
                    "sender": "doctor1@gmail.com",
                    "senderRole": "doctor",
                    "text": "Hi, I am doctor 1",
                    "createdAt": "2023-12-16T14:30:28.262Z",
                    "updatedAt": "2023-12-16T14:30:28.262Z",
                }]
        }
        localStorage.setItem(conversationId, JSON.stringify(messages));
        return messages;
    }
    else {
        return conversation;
    }
}

export default GetMessagesAPI;