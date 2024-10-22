import React, { useEffect, useState, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import Form from '../components/Form';

const Chat = ({ socket }) => {
    const [chatInitiated, setChatInitiated] = useState(false);
    const [chats, setChats] = useState([]);
    const [receiverId, setReceiverId] = useState();
    const userId = window.localStorage.getItem("userId");
    const messagesEndRef = useRef(null); // Ref for scrolling to the end of messages

    useEffect(() => {
        socket.emit('join', userId);
    }, [socket, userId]);

    useEffect(() => {
        const handleNewMessages = (message) => {
            // Check if the message is for the current receiver
            if (receiverId === message.sender || receiverId === message.receiver) {
                setChats(state => [...state, { sender: message.sender, content: message.content }]);
            }
        };
        socket.on('newMessage', handleNewMessages);

        // Cleanup function
        return () => {
            socket.off('newMessage', handleNewMessages);
        };
    }, [socket, receiverId]);

    // Function to scroll to the bottom
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Scroll to the bottom when chats update or when the chat is initiated
    useEffect(() => {
        if (chatInitiated) {
            scrollToBottom();
        }
    }, [chats, chatInitiated]); // Runs when chats or chatInitiated changes

    return (
        <div className='flex flex-col lg:flex-row items-center justify-center h-screen bg-black'>
            <div className='bg-cover w-full lg:w-2/4 h-[calc(100vh-60px)] rounded-lg flex relative' style={{ backgroundImage: "url('/BG.png')" }}>
                <Sidebar setChatInitiated={setChatInitiated} setChats={setChats} setReceiverId={setReceiverId} />
                <div className='w-full lg:w-3/4 bg-white flex flex-col bg-opacity-20 relative'>
                    {chatInitiated ? (
                        <>
                            <div className='overflow-y-auto mb-20 px-4 flex-grow'>
                                {chats && chats.map((chat, index) => (
                                    <div key={index} className={`flex w-full ${chat.sender === userId ? "justify-end" : "justify-start"}`}>
                                        <div className={`p-2 my-2 max-w-xs rounded-lg break-words ${chat.sender === userId ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
                                            {chat.content}
                                        </div>
                                    </div>
                                ))}
                                {/* Ref to the end of the messages */}
                                <div ref={messagesEndRef} />
                            </div>
                            <Form receiverId={receiverId} setChats={setChats} chats={chats} socket={socket} />
                        </>
                    ) : (
                        <div className='flex justify-center items-center h-full'>
                            <h1 className='text-2xl md:text-3xl p-4 bg-white bg-opacity-80 font-bold text-gray-700 rounded-lg font-Anek text-center'>
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
