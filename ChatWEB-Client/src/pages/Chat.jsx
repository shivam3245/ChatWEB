import React, { useEffect, useState, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import Form from '../components/Form';
import { format, isToday } from 'date-fns';
import { APIUrl } from '../../utils';

const Chat = ({ socket }) => {
    const [chatInitiated, setChatInitiated] = useState(false);
    const [chats, setChats] = useState([]);
    const [receiverId, setReceiverId] = useState();
    const [selectedUser, setSelectedUser] = useState(null);
    const userId = window.localStorage.getItem("userId");
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        socket.emit('join', userId);
    }, [socket, userId]);

    useEffect(() => {
        const handleNewMessages = (message) => {
            if (receiverId === message.sender || receiverId === message.receiver) {
                setChats(state => [...state, { sender: message.sender, content: message.content }]);
            }
        };
        socket.on('newMessage', handleNewMessages);

        return () => {
            socket.off('newMessage', handleNewMessages);
        };
    }, [socket, receiverId]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (chatInitiated) {
            scrollToBottom();
        }
    }, [chats, chatInitiated]);

    return (
        <div className='flex flex-col lg:flex-row items-center justify-center h-screen bg-gradient-to-l from-purple-700 to-purple-950'>
            <div
                className='bg-cover w-full lg:w-2/4 h-[calc(100vh-30px)] pb-10 md:pb-0 rounded-lg flex relative bg-gradient-to-l from-purple-700 to-purple-950'
                ref={chatContainerRef}
            >
                <Sidebar setChatInitiated={setChatInitiated} setChats={setChats} setReceiverId={setReceiverId} setSelectedUser={setSelectedUser} />
                <div className='w-full lg:w-3/4 bg-purple-400 flex flex-col bg-opacity- relative'>
                    {chatInitiated ? (
                        <>
                            <div className='bg-violet-800 text-white p-2 flex items-center'>
                                <img
                                    src={`${APIUrl}/images/${selectedUser.image}`}
                                    alt=''
                                    className='rounded-full w-10 h-10 object-cover mr-2 border-2 border-white'
                                />
                                {selectedUser.username}
                            </div>
                            <div className='overflow-y-auto mb-2 px-4 flex-grow text-xs md:text-lg relative custom-scrollbar'>
                                {chats && chats.map((chat, index) => (
                                    <div key={index} className={`flex w-full ${chat.sender === userId ? "justify-end" : "justify-start"}`}>
                                        <div className={`p-2 my-2 max-w-xs text-sm rounded-lg break-words ${chat.sender === userId ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white" : "bg-gradient-to-br from-gray-500 to-gray-600 text-white"}`}>
                                            {chat.content}
                                            <br />
                                            <p className='text-xs text-gray-400'>
                                                {isToday(new Date(chat.createdAt))
                                                    ? format(new Date(chat.createdAt), 'hh:mm a')
                                                    : format(new Date(chat.createdAt), 'MMM dd, hh:mm a')
                                                }
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="relative">
                                <Form receiverId={receiverId} setChats={setChats} chats={chats} socket={socket} containerWidth={chatContainerRef.current?.offsetWidth} />
                            </div>
                        </>
                    ) : (
                        <div className='flex justify-center items-center h-full'>
                            <h1 className='text-sm md:text-xl p-4 m-2 bg-gradient-to-r from-purple-700 to-red-600 bg-opacity-80 font-bold text-white rounded-lg font-Anek text-center'>
                                Welcome to chatWEB, start Chatting...
                            </h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chat;
