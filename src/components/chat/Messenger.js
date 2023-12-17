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
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredConversations, setFilteredConversations] = useState([]);
    // const scrollRef = useRef();

    // console.log("userInfo.email",userInfo.email);
    useEffect(()=>{
        const getConversations = async ()=>{
            const getConversationsAPIResponse = await GetConversationsAPI(userInfo["email"]);
            
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
        const getConversations = async ()=>{
            const getConversationsAPIResponse = await GetConversationsAPI(userInfo["email"]);
            setConversations(getConversationsAPIResponse);
            setFilteredConversations(getConversationsAPIResponse);
        };
        
        const intervalId = setInterval(() => {
            getConversations();
        }, 60000);
        return () => {
            clearInterval(intervalId);
        };
        
    }, []);

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
        const addMessageAPIResponse = await AddMessageAPI(message, receiverEmail);
        setMessages([...historyMessages,...addMessageAPIResponse.data]);
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