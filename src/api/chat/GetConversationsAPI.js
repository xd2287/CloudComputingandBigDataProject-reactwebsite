function GetConversationsAPI(senderEmail) {
    // return {members:[senderEmail, receiverEmail], conversationId: id, createdAt: createTimeStamp, updatedAt: updateTimeStamp}
    // use await
    const mockConversations = [
        {
            "members": ["patient1@gmail.com", "doctor1@gmail.com"], 
            "conversationId": "001", 
            "createdAt": "2023-12-15T14:20:28.262Z",
            "updatedAt": "2023-12-15T14:20:28.262Z"
        },
        {
            "members": ["patient1@gmail.com", "doctor2@gmail.com"], 
            "conversationId": "002", 
            "createdAt": "2023-12-15T14:20:28.262Z",
            "updatedAt": "2023-12-15T14:20:28.262Z"
        },
        {
            "members": ["patient2@gmail.com", "doctor1@gmail.com"], 
            "conversationId": "003", 
            "createdAt": "2023-12-16T14:20:28.262Z",
            "updatedAt": "2023-12-16T14:20:28.262Z"
        }
    ];
    const conversations = [];
    for (const conversation of mockConversations) {
        if (conversation.members.includes(senderEmail)) {
            conversations.push(conversation);
        }
    }
    return (conversations);
}

export default GetConversationsAPI;