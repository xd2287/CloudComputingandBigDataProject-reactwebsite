// function SetConversationAPI(conversationId, updatedConversation, updatedKey) {
function SetConversationAPI(conversationId, newUpdatedAt, newLastReadAt, senderEmail) {

    // updatedKey keeps the key that is modified in updatedConversation.
    // if updatedKey = "updatedAt", we should put updatedConversation at 0 index of all conversations
    // if updatedKey != "updatedAt", we hsould put updatedCOnversation the same index as its original

    // console.log("update conversation with Id",conversationId);
    // console.log(updatedConversation);
    // console.log(updatedKey);

    const currMockConversations = JSON.parse(localStorage.getItem("mockConversations"));
    const updatedConversation = currMockConversations.filter((c)=>c.conversationId===conversationId)[0]
    if (newUpdatedAt !== null) {
        updatedConversation["updatedAt"] = newUpdatedAt;
    }
    if (newLastReadAt != null) {
        updatedConversation["lastReadAt"] = newLastReadAt;
    }
    const updatedConversations = []
    for (const currMockConversation of currMockConversations) {
        if (currMockConversation.conversationId === conversationId) {
            updatedConversations.push(updatedConversation);
        }
        else {
            updatedConversations.push(currMockConversation);
        }
    }
    // var updatedMockConversations;
    // if (updatedKey==="updatedAt") {
    //     updatedMockConversations = 
    //         [updatedConversation,
    //         ...currMockConversations.filter((c)=>c.conversationId !== conversationId), ];
    //     console.log("update with updatedAt");
    //     console.log(updatedMockConversations);
    // }
    // else {
    //     updatedMockConversations = []
    //     for (const conversation of currMockConversations) {
    //         if (conversation.conversationId !== conversationId) {
    //             updatedMockConversations.push(conversation);
    //         }
    //         else {
    //             updatedMockConversations.push(updatedConversation);
    //         }
    //     }
    // }
    
    localStorage.setItem("mockConversations",JSON.stringify(updatedConversations));
    return (
        updatedConversations
    )
}

export default SetConversationAPI;