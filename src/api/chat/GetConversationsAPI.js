function GetConversationsAPI(senderEmail) {
    // return {members:[senderEmail, receiverEmail], conversationId: id, createdAt: createTimeStamp, updatedAt: updateTimeStamp}
    // use await
    return ( [
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
        }
    ] )
}

export default GetConversationsAPI;