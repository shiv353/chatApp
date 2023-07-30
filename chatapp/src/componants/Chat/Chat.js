import React, { useState } from 'react'
import { user } from "../Join/Join";
import socketio from "socket.io-client";
import { useEffect } from "react";
import "../Chat/chat.css";
import send from "../img/send.png";
import Message from '../message/Message';
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../img/closeIcon.png";



let socket;
const ENDPOINT = "http://localhost:1900/";


const Chat = () => {

    const [id, setid] = useState("");
    const [messages, setMessages] = useState([]);
    const sendmes = () => {
        const message = document.getElementById('chatinput').value;
        socket.emit('message', { message, id });
        document.getElementById('chatinput').value = "";
    }

    console.log(messages);
    useEffect(() => {
        socket = socketio(ENDPOINT, { transports: ['websocket'] });

        socket.on("connect", () => {
            console.log("connected");
            setid(socket.id);
        })
        socket.emit('joined', { user })

        socket.on('welcome', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })

        socket.on('user joined', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })

        socket.on('leave', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [])

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message, data.id);
        })

        return () => {
            socket.off();
        }
    }, [messages])


    return (
        <div className='chatpage'>
            <div className='chatcontainer'>
                <div className='header'>
                    <h2>ChatApp</h2>
                    <a href='/'><img src={closeIcon} alt="close"/></a>
                </div>

                <ReactScrollToBottom className='chatbox'>
                    {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
                </ReactScrollToBottom>

                <div className='inputbox'>
                    <input  onKeyPress={(event)=>event.key==='Enter' ? sendmes():null} type="text" id="chatinput" />
                    <button onClick={sendmes} id="sendbtn"><img src={send} alt="send" /></button>
                </div>
            </div>
        </div>
    )
}

export default Chat