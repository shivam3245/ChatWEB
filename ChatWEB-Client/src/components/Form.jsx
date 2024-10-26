import React, { useState } from 'react';
import axios from 'axios';
import Picker from 'emoji-picker-react';

const Form = ({ receiverId, setChats, chats, socket, containerWidth }) => {
    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const userId = window.localStorage.getItem("userId");

    const onEmojiClick = (emoji) => {
        setMessage(prevInput => prevInput + emoji.emoji);
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        try {
            const response = await axios.post("http://localhost:5151/chat/message/send/" + receiverId,
                { content: message },
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('chat-token')}`,
                    },
                }
            );
            socket.emit('newMessage', { sender: userId, content: message, receiver: receiverId });
            setChats([...chats, { content: message, sender: userId }]);
            setMessage('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='p-2 bg-white bg-opacity-30 relative'>
            <form onSubmit={sendMessage} className='flex items-center space-x-'>
                <button
                    type='button'
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className='p-2 mr-1 bg-gray-200 rounded-lg'>
                    😊
                </button>

                {showEmojiPicker && (
                    <div
                        className='absolute z-50 bottom-14 left-0 w-full'
                        style={{
                            left: '50%',
                            transform: 'translateX(-50%)',
                            maxWidth: `${containerWidth}px`,
                            overflowY: 'auto',
                        }}
                    >
                        <Picker
                            onEmojiClick={onEmojiClick}
                            pickerStyle={{
                                width: '100%',
                                height: '250px',
                            }}
                        />
                    </div>
                )}

                <input
                    type='text'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder='Type your message...'
                    className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 text-sm focus:ring-blue-500'
                />
                <input type="file" className='hidden' id='file-upload' />
                <button className='p-2 ml-2 bg-red-600 text-xs md:text-md text-white rounded-lg hover:bg-yellow-600 transition duration-200'>
                    Send
                </button>
            </form>
        </div>
    );
};

export default Form;
