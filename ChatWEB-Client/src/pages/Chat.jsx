import React, { useEffect, useState, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import Form from '../components/Form';

const Chat = ({ socket }) => {
    const [chatInitiated, setChatInitiated] = useState(false);
    const [chats, setChats] = useState([]);
    const [receiverId, setReceiverId] = useState();
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
        <div className='flex flex-col lg:flex-row items-center justify-center h-screen bg-gradient-to-br from-purple-700 to-purple-950'>
            <div
                className='bg-cover w-full lg:w-2/4 h-[calc(100vh-30px)] rounded-lg flex relative bg-gradient-to-l from-purple-300 to-purple-00'
                ref={chatContainerRef}
            >
                <Sidebar setChatInitiated={setChatInitiated} setChats={setChats} setReceiverId={setReceiverId} />
                <div className='w-full lg:w-3/4 bg-white flex flex-col bg-opacity-20 relative'>
                    {chatInitiated ? (
                        <>
                            <div className='overflow-y-auto mb-2 px-4 flex-grow text-xs md:text-lg relative custom-scrollbar'>
                                {chats && chats.map((chat, index) => (
                                    <div key={index} className={`flex w-full ${chat.sender === userId ? "justify-end" : "justify-start"}`}>
                                        <div className={`p-2 my-2 max-w-xs rounded-lg break-words ${chat.sender === userId ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white" : "bg-gradient-to-br from-gray-500 to-gray-600 text-white"}`}>
                                            {chat.content}
                                        </div>
                                        <div className={`p-2 my-2 max-w-xs rounded-lg break-words ${chat.sender === userId ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white" : "bg-gradient-to-br from-gray-500 to-gray-600 text-white"}`}>
                                            {chat.createdAt}
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
