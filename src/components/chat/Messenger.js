import React, {useState, useEffect} from 'react';

import '../../css/components/chat/Messenger.css';

import Conversation from './Conversation';
import Message from './Message';

import GetConversationsAPI from '../../api/chat/GetConversationsAPI';
import SetConversationAPI from '../../api/chat/SetConversationAPI';
import GetMessagesAPI from '../../api/chat/GetMessagesAPI';
import AddMessageAPI from '../../api/chat/AddMessageAPI';
import GetContactorInfoAPI from '../../api/chat/GetContactorInfoAPI';

function Messenger() {

    const userRole = localStorage.getItem("loggedInUserRole");
    const userInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [receiverEmail, setReceiverEmail] = useState(null);
    const [receiverInfo, setReceiverInfo] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredConversations, setFilteredConversations] = useState([]);
    // const scrollRef = useRef();

    // console.log("userInfo.email",userInfo.email);
    useEffect(()=>{
        // GetConversationsAPI(userInfo["email"])
        //     .then((getConversationsAPIResponse) => {
        //         console.log('Received returnData:', getConversationsAPIResponse);
        //         for (const conversationResponse of getConversationsAPIResponse) {
        //             const receiverEmail = conversationResponse.members[0] === userInfo.email ? 
        //                                     conversationResponse.members[1] :
        //                                     conversationResponse.members[0]
        //             if (localStorage.getItem(receiverEmail) === null) {
        //                 const currReceiverInfo = GetContactorInfoAPI(userRole, receiverEmail);
        //                 localStorage.setItem(receiverEmail,JSON.stringify(currReceiverInfo));
        //             }
        //         }
    
        //         setConversations(getConversationsAPIResponse);
        //         setFilteredConversations(getConversationsAPIResponse);
        //     })
        //     .catch((error) => {
        //         // Handle errors here
        //         console.error('Error:', error);
        //     });
        const getConversations = async ()=>{
            const getConversationsAPIResponse = await GetConversationsAPI(userInfo["email"]);
            
            // console.log("***************");
            // console.log(getConversationsAPIResponse);

            for (const conversationResponse of getConversationsAPIResponse) {
                const receiverEmail = conversationResponse.members[0] === userInfo.email ? 
                                        conversationResponse.members[1] :
                                        conversationResponse.members[0]
                if (localStorage.getItem(receiverEmail) === null) {
                    const currReceiverInfo = await GetContactorInfoAPI(userRole, receiverEmail);
                    localStorage.setItem(receiverEmail,JSON.stringify(currReceiverInfo));
                }
            }

            setConversations(getConversationsAPIResponse);
            setFilteredConversations(getConversationsAPIResponse);
        };
        getConversations();
    }, [userInfo.email]);

    useEffect(()=>{
        // const getConversations = async ()=>{
        //     // console.log("conversations before update");
        //     // console.log(conversations);
        //     const getConversationsAPIResponse = await GetConversationsAPI(userInfo["email"]);
        //     setConversations(getConversationsAPIResponse);
        //     setFilteredConversations(getConversationsAPIResponse);
        //     // console.log("get conversations from API");
        //     // console.log(conversations);
        // };
        
        const intervalId = setInterval(() => {
            GetConversationsAPI(userInfo["email"])
            .then((getConversationsAPIResponse) => {
                console.log('Received returnData:', getConversationsAPIResponse);
                setConversations(getConversationsAPIResponse);
                setFilteredConversations(getConversationsAPIResponse);
            })
            .catch((error) => {
                // Handle errors here
                console.error('Error:', error);
            });
        }, 10000);
        return () => {
            clearInterval(intervalId);
        };
        
    }, []);

    useEffect(()=>{
        console.log(conversations);
        const getMessages = async ()=> {
            const getMessagesAPIResponse = await GetMessagesAPI(currentChat.conversationId);
            setMessages(getMessagesAPIResponse);
        }
        const getReceiverEmail = ()=> {
            const currReceiverEmail = currentChat.members.find(member=>member !== userInfo.email);
            setReceiverEmail(currReceiverEmail);
        }
        if (currentChat !== null) {
            getMessages();
            getReceiverEmail();
        }
    },[currentChat,conversations]);

    useEffect(()=>{
        console.log("%%%%%%%%%%%%%");
        console.log(receiverEmail);
        setReceiverInfo(JSON.parse(localStorage.getItem(receiverEmail)));
    },[receiverEmail]);

    useEffect(()=>{
        setFilteredConversations(
            conversations.filter((c) =>
                c.members
                    .filter((member)=>member !== userInfo.email)
                    .some((member) =>
                        localStorage.getItem(member) !== null && 
                        JSON.parse(localStorage.getItem(member)).name.toLowerCase().includes(searchKeyword.toLowerCase())
                    )
            )
        );
    }, [searchKeyword]);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const currentTime = new Date().toISOString();
        const message = {
            "sender": userInfo.email,
            "senderRole": userRole,
            "text": newMessage,
            "conversationId": currentChat.conversationId,
            "createdAt": currentTime,
            "updatedAt": currentTime,
        };
        const tempMessage = {
            ...message,
            "createdAt": "sending",
            "updatedAt": "sending",
        };
        const historyMessages = messages;
        setMessages([...historyMessages,tempMessage]);
        setNewMessage("");
        const addMessageAPIResponse = await AddMessageAPI(message, receiverEmail, userRole);
        console.log("addMessageAPIResponse is ")
        console.log(addMessageAPIResponse)
        const index = currentChat.members.indexOf(userInfo.email);
        const updatedConversation = {...currentChat, "updatedAt":new Date().toISOString()};
        // updatedConversation["lastReadAt"][index] = new Date().toISOString();
        const newUpdatedAt = new Date().toISOString();
        var newLastReadAt = updatedConversation["lastReadAt"];
        newLastReadAt[index] = new Date().toISOString();
        const setConversationAPIResponse = await SetConversationAPI(currentChat.conversationId, newUpdatedAt, newLastReadAt, userInfo.email);
        // setMessages([...historyMessages,...addMessageAPIResponse.data]);
        setMessages(addMessageAPIResponse.data)
        setConversations(setConversationAPIResponse);
    };

    return (
        <>
            <div className='messenger'>
                <div className='chatMenu'>
                    <div className='chatMenuWrapper'>
                        <div className='chatMenuInputContainer'>
                            <input 
                                placeholder={userRole==="patient"?"Search for doctors":"Search for patients"}
                                className="chatMenuInput" 
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                            />
                        </div>
                        {filteredConversations.map((c) => (
                            <div onClick={()=>{
                                    const setPreviousConversation = async ()=> {
                                        const index = currentChat.members.indexOf(userInfo.email);
                                        const updatedConversation = conversations.filter((c)=>c.conversationId==currentChat.conversationId)[0];
                                        var newLastReadAt = updatedConversation["lastReadAt"]
                                        newLastReadAt[index] = new Date().toISOString();
                                        // updatedConversation["lastReadAt"][index] = new Date().toISOString();
                                        // const setConversationAPIResponse = await SetConversationAPI(currentChat.conversationId, {...conversations.filter((c)=>c.conversationId==currentChat.conversationId)[0], "lastReadAt":new Date().toISOString()}, "lastReadAt");
                                        // const setConversationAPIResponse = await SetConversationAPI(currentChat.conversationId, updatedConversation, "lastReadAt");

                                        // const newLastReadAt = new Date().toISOString();
                                        const setConversationAPIResponse = await SetConversationAPI(currentChat.conversationId, null, newLastReadAt, userInfo.email);

                                        setConversations(setConversationAPIResponse);
                                    }
                                    if (currentChat !== null && currentChat.conversationId !== c.conversationId) {
                                        // console.log("set last read");
                                        setPreviousConversation();
                                    }
                                    // console.log("current chat is");
                                    // console.log(c);
                                    setCurrentChat(c);
                                }}>
                                <Conversation 
                                    conversation={c} 
                                    currentUser={userInfo} 
                                    currentRole={userRole} 
                                    // receiverEmail={receiverEmail} 
                                    unreadStatus={currentChat!==null && currentChat.conversationId===c.conversationId?false:c.lastReadAt[c.members.indexOf(userInfo.email)]<c.updatedAt}
                                    // unreadStatus={currentChat!==null && currentChat.conversationId===c.conversationId?false:c.lastReadAt[c.members.indexOf(userInfo.email)]<c.updatedAt}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='chatBox'>
                    <div className='chatBoxWrapper'>
                        {currentChat && receiverInfo ?
                            (<>
                                <div className='chatBoxHead'>
                                    <h2>{receiverInfo.name}</h2>
                                </div>
                                <div className='chatBoxTop'>
                                    {messages ? messages.map((m) => (
                                        <div>
                                            <Message message={m} own={m.sender === userInfo.email} senderName={m.sender === userInfo.email ? userInfo.name : receiverInfo.name}/>
                                        </div>
                                    )):null}
                                </div>
                                <div className='chatBoxBottom'>
                                    <textarea 
                                        className='chatMessageInput' 
                                        placeholder='write something...'
                                        onChange={(e)=>setNewMessage(e.target.value)}
                                        value={newMessage}
                                    ></textarea>
                                    <button className='chatSubmitButton' onClick={handleSubmit}>
                                        Send
                                    </button>
                                </div> </>
                            ) : ( 
                                <span className='noConversationText'>
                                    Open a conversation to start a chat.
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>  
        </>
    );
}

export default Messenger