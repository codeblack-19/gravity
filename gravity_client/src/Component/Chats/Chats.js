/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./chat.css";
import queryString from "query-string";
import io from "socket.io-client";


var socket;

export default function Chat({ location }) {
    const [_name, setname] = useState('');
    const [_room, setroom] = useState('');
    const [messages, setmessages] = useState([]);
    const [message, setmessage] = useState('')
    const ENDPOINT = 'localhost:3001';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)

        socket = io(ENDPOINT, { transports: ['websocket'] })

        setname(name);
        setroom(room);

        socket.emit('join', { name : name, room : room}, () => {})

        return () => {
            socket.emit('disconnect');
            
            socket.off();
        }

    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setmessages([...messages, message])
            var ms = document.querySelector('._ms_area')
            ms.scrollTop = ms.scrollHeight;
        })
    }, [messages]);


    const sendMessage = (e) => {
        e.preventDefault();

        if(message){
            socket.emit('sendMessage', message, () => setmessage(''));

            document.getElementById('input_bx').value = '';
            var ms =  document.querySelector('._ms_area')
            ms.scrollTop = ms.scrollHeight;
        }
    }

    
    return(
        <div className="_ch_wrapper">
            <div className="_ms_bx">
                <div className="header">
                    <p>{_room}</p>
                    <p><a href="/">X</a></p>
                    <p>members</p>
                </div>
                <div className="_ms_area">
                    {
                        messages.map((message, i) => {
                            return(
                                <Message key={i} message={message} name = {_name}/>
                            )
                        })
                    }
                </div>
                <div className="_input_area">
                    <input className="_ms_input" type="text" onChange={(e) => setmessage(e.target.value)} onKeyPress={(e) => {
                        if(e.key === 'Enter'){
                            sendMessage(e);
                        }
                    }} id="input_bx" />
                    <button className="_ms_button" onClick={(e) => sendMessage(e)}>
                        send
                    </button>
                </div>
            </div>
        </div>
    )

}

export function Message({message, name}){

    const tname = name.trim().toLowerCase();

    if(message.user === tname){
        return(
            <div className="ms_mai">
                <div className="_text_me">
                    <p className="_m_user_name">you</p>
                    <p className="text_m">
                        {message.text}
                    </p>
                </div>
            </div>
        )
    }else{
        return (
            <div className="ms_mai">
                <div className="_text_other">
                    <p className="_m_user_name">{message.user}</p>
                    <p className="text_m">
                        {message.text}
                    </p>
                </div>
            </div>
        )
    }
}