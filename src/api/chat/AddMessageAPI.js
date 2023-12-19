import getApi from "../getApi";
import axios from 'axios';

function AddMessageAPI(message, receiverEmail, senderRole)  {
    const requestData = {
        body: JSON.stringify({
            action: 'AddMessage',
            data: {message: message, receiverEmail:receiverEmail,senderRole:senderRole},
        }),
    };

    return new Promise((resolve, reject) => {
      axios
        .post(getApi(), requestData)
        .then((response) => {
          if (response.status === 200) {
            console.log("Get response from AddMessageAPI:");
            console.log(response);
            const responseData = JSON.parse(response.data.body);
            const returnData = responseData.returnData;
            console.log("Get return data from AddMessageAPI:");
            console.log(returnData);
            resolve({ "status": true, "data": returnData });
          } else {
            reject(new Error('Request failed with status ' + response.status));
          }
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }

  export default AddMessageAPI;

// function AddMessageAPI(message, receiverEmail, senderRole) {
//     // API return: {status: whetherAddSuccess}
//     // Return: if message.senderRole is patient, return {"status": true, "data": [newMessage, responsedMessage from receiver]}; 
//     //         if message.senderRole is doctor, return {}
//     // message should be formatted in a json
//     const conversation = JSON.parse(localStorage.getItem(message.conversationId));
//     const mockChatbotResponseMessage = {
//         "sender": receiverEmail,
//         "senderRole": "doctor",
//         "text": "auto-response to patient",
//         "conversationId": message.conversationId,
//         "createdAt": message.createdAt,
//         "updatedAt": message.updatedAt,
//         "repliedByChatbot": true,
//     };
//     const newMessages = message.senderRole==="patient" ? [message, mockChatbotResponseMessage] : [message];
//     localStorage.setItem(message.conversationId, JSON.stringify([...conversation, ...newMessages]));
//     // simulate the deplay of API access
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             const response = { "status": true, "data": newMessages };
//             resolve(response);
//         }, 2000); // Delay for 2 seconds (2000 milliseconds)
//     });
// }

// export default AddMessageAPI;