import React, {useState, useEffect} from 'react';

import '../../css/components/chat/Messenger.css';

import Conversation from './Conversation';
import Message from './Message';

import GetConversationsAPI from '../../api/chat/GetConversationsAPI';
import GetMessagesAPI from '../../api/chat/GetMessagesAPI';
import AddMessageAPI from '../../api/chat/AddMessageAPI';
import GetContactorInfoAPI from '../../api/GetContactorInfoAPI';

function Messenger() {

    const userRole = localStorage.getItem("loggedInUserRole");
    const userInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [receiverEmail, setReceiverEmail] = useState(null);
    const [receiverInfo, setReceiverInfo] = useState(null);

    // const scrollRef = useRef();

    // console.log("userInfo.email",userInfo.email);
    useEffect(()=>{
        const getConversations = async ()=>{
            const GetConversationsAPIResponse = await GetConversationsAPI(userInfo["email"]);
            setConversations(GetConversationsAPIResponse)
        };
        getConversations();
    }, [userInfo.email]);

    useEffect(()=>{
        const getConversations = async ()=>{
            const GetConversationsAPIResponse = await GetConversationsAPI(userInfo["email"]);
            setConversations(GetConversationsAPIResponse)
        };
        
        const intervalId = setInterval(() => {
            getConversations();
        }, 60000);
        return () => {
            clearInterval(intervalId);
        };
        
    }, []);

    // console.log("Set conversations");
    // console.log(conversations);

    useEffect(()=>{
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
    },[currentChat]);

    useEffect(()=>{
        const getReceiverInfo = async ()=> {
            const currReceiverInfo = await GetContactorInfoAPI(userRole, receiverEmail);
            setReceiverInfo(currReceiverInfo);
            localStorage.setItem(receiverEmail,JSON.stringify(currReceiverInfo));
        }
        if (localStorage.getItem(receiverEmail) === null) {
            getReceiverInfo();
        }
        else {
            setReceiverInfo(JSON.parse(localStorage.getItem(receiverEmail)));
        }
    },[receiverEmail]);

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
        const addMessageAPIResponse = await AddMessageAPI(message, receiverEmail);
        setMessages([...historyMessages,...addMessageAPIResponse.data]);
    };

    return (
        <>
            <div className='messenger'>
                <div className='chatMenu'>
                    <div className='chatMenuWrapper'>
                        <input placeholder="Search for friends" className="chatMenuInput" />
                        {conversations.map((c) => (
                            <div onClick={()=>setCurrentChat(c)}>
                                <Conversation conversation={c} currentUser={userInfo} currentRole={userRole} receiverEmail={receiverEmail}/>
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