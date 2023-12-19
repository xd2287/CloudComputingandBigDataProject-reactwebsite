import React, {useEffect, useState} from 'react';
import '../../css/components/chat/Conversation.css';
import GetContactorInfoAPI from '../../api/chat/GetContactorInfoAPI';

function Conversation({conversation, currentUser, currentRole, unreadStatus}) {

    const contactorEmail = conversation.members.find(m=>m !== currentUser.email);
    // if (localStorage.getItem(contactorEmail)!==null) {
    //     console.log("local Store: ",localStorage.getItem(contactorEmail));
    //     const contactor = localStorage.getItem(contactorEmail);
    //     if (contactor !== null) {
    //         return (
    //             <>
    //                 <div className='conversation'>
    //                     <span className="conversationName">{contactor.name} ({contactor.email})</span>
    //                     {unreadStatus?<span className="unreadReminder"></span>:null}
    //                 </div>
    //             </>
    //         );
    //     }
    // }
    // else{
    const [contactor,setContactor] = useState(null);
    useEffect(()=>{
        const getContactor = async ()=>{
            const currReceiverInfo = await GetContactorInfoAPI(currentRole, contactorEmail);
            setContactor(currReceiverInfo);
        }
        getContactor()
    },[])

    if (contactor !== null) {
        console.log(contactor);
        return (
            <>
                <div className='conversation'>
                    <span className="conversationName">{contactor.name} ({contactor.email})</span>
                    {unreadStatus?<span className="unreadReminder"></span>:null}
                </div>
            </>
        );
    }
    // }

}

export default Conversation;