import getApi from "../getApi";
import axios from 'axios';

function GetConversationsAPI(senderEmail) {
    // const api = 'https://o46dbledt2.execute-api.us-east-1.amazonaws.com/dev/lfchat';
    const requestData = {
        body: JSON.stringify({
            action: 'GetConversations',
            data: { senderEmail: senderEmail },
        }),
    };
    console.log("email for GetConversationsAPI",senderEmail);
    // Return a new Promise
    return new Promise((resolve, reject) => {
      axios
        .post(getApi(), requestData)
        .then((response) => {
          // Check if the response status is successful (e.g., 200)
        //   console.log("&&&&&&");
        //   console.log(response);
          if (response.status === 200) {
            // Parse the response data
            console.log("get response from API");
            console.log(response)
            const responseData = JSON.parse(response.data.body);
            const returnData = responseData.returnData;
            console.log("get returnData from API");
            console.log(returnData);
            // Resolve the Promise with the returnData
            resolve(returnData);
          } else {
            // If the response status is not successful, reject the Promise with an error
            reject(new Error('Request failed with status ' + response.status));
          }
        })
        .catch((error) => {
          console.error(error);
          // Reject the Promise with the error
          reject(error);
        });
    });
  }

  export default GetConversationsAPI;

// function GetConversationsAPI(senderEmail) {
//     // return {members:[senderEmail, receiverEmail], conversationId: id, createdAt: createTimeStamp, updatedAt: updateTimeStamp, lastReadAt: lastReadTimeStamp}
//     // initial state: updatedAt=lastReadAt=createdAt
//     // use await


//     // const mockConversations = [
//     //     {
//     //         "members": ["patient1@gmail.com", "doctor1@gmail.com"], 
//     //         "conversationId": "001", 
//     //         "createdAt": "2023-12-15T14:20:28.262Z",
//     //         "updatedAt": "2023-12-15T14:20:28.262Z",
//     //         "lastReadAt": ["2023-12-15T14:20:28.262Z", "2023-12-15T14:20:28.262Z"],
//     //     },
//     //     {
//     //         "members": ["patient1@gmail.com", "doctor2@gmail.com"], 
//     //         "conversationId": "002", 
//     //         "createdAt": "2023-12-15T14:20:28.262Z",
//     //         "updatedAt": "2023-12-15T14:20:28.262Z",
//     //         "lastReadAt": ["2023-12-15T14:20:28.262Z", "2023-12-15T14:20:28.262Z"],
//     //     },
//     //     {
//     //         "members": ["patient2@gmail.com", "doctor1@gmail.com"], 
//     //         "conversationId": "003", 
//     //         "createdAt": "2023-12-16T14:20:28.262Z",
//     //         "updatedAt": "2023-12-16T14:20:28.262Z",
//     //         "lastReadAt": ["2023-12-16T14:20:28.262Z", "2023-12-16T14:20:28.262Z"],
//     //     }
//     // ];
//     // if (localStorage.getItem("mockConversations") === null) {
//     //     localStorage.setItem("mockConversations",JSON.stringify(mockConversations));
//     // }
//     // const conversations = [];
//     // for (const conversation of JSON.parse(localStorage.getItem("mockConversations"))) {
//     //     if (conversation.members.includes(senderEmail)) {
//     //         conversations.push(conversation);
//     //     }
//     // }
//     // return (conversations);

//     const api = 'https://o46dbledt2.execute-api.us-east-1.amazonaws.com/dev/lfchat';
//     const data = {
//         body: JSON.stringify({
//         action: 'GetConversations',
//         data: { senderEmail: 'patient1@gmail.com' },
//         }),
//     };

//     axios
//         .post(api, data)
//         .then((response) => {
//             console.log("get response from api");
//             // const responseJSON = JSON.parse(response);
//             const data = response.data;
//             console.log(data);
//             console.log(JSON.parse(data.body));
//             const body = JSON.parse(data.body);
//             const returnData = body["returnData"];
//             console.log(returnData);
//             return (returnData);
//         })
//         .catch((error) => {
//             console.log(error);
//         });
    
// }

// export default GetConversationsAPI;
