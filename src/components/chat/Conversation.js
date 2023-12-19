import React, {useEffect, useState} from 'react';
import '../../css/components/chat/Conversation.css';
import GetContactorInfoAPI from '../../api/chat/GetContactorInfoAPI';

function Conversation({conversation, currentUser, currentRole, unreadStatus}) {

    const contactorEmail = conversation.members.find(m=>m !== currentUser.email);
    const contactor = JSON.parse(localStorage.getItem(contactorEmail));
    
    if (contactor !== null) {
        return (
            <>
                <div className='conversation'>
                    <span className="conversationName">{contactor.name} ({contactor.email})</span>
                    {unreadStatus?<span className="unreadReminder"></span>:null}
                </div>
            </>
        );
    }
}

export default Conversation;