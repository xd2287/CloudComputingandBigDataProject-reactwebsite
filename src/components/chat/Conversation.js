import React, {useEffect, useState} from 'react';
import '../../css/components/chat/Conversation.css';
import GetContactorInfoAPI from '../../api/GetContactorInfoAPI';

function Conversation({conversation, currentUser, currentRole}) {

    const [contactor, setContactor] = useState(null);

    const contactorEmail = conversation.members.find(m=>m !== currentUser.email);

    useEffect(()=>{
        const getContactor = async ()=>{
            const getContactorInfoAPIReturn = await GetContactorInfoAPI(currentRole, contactorEmail);
            setContactor(getContactorInfoAPIReturn);
        };
        getContactor();
    }, [currentRole, contactorEmail]);
    
    if (contactor !== null) {
        return (
            <>
                <div className='conversation'>
                    <span className="conversationName">{contactor.name}</span>
                </div>
            </>
        );
    }
}

export default Conversation;