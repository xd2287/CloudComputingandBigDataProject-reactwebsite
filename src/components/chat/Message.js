import React from 'react';
import '../../css/components/chat/Message.css';
import {format} from "timeago.js";

function getInitials(name) {
    const initials = name.split(' ').map(word => word[0].toUpperCase());
    // console.log(name, initials.join(''));
    return initials.join('');
}

function Message({message, own, senderName}) {
    return (
        <>
            <div className= {own ? 'message own': 'message'}>
                <div className='messageTop'>
                    <div className={own ? 'messageImg own': 'messageImg'}>{getInitials(senderName)}</div>
                    <p className='messageText'>
                        {message.text}
                    </p>
                </div>
                <div className='messageBottom'>
                    {message.createdAt === "sending"? "sending" : format(message.createdAt)}
                </div>
            </div>
        </>
    );
}

export default Message;