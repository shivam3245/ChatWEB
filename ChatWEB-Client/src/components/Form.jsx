import React, { useState } from 'react';
import axios from 'axios';
import Picker from 'emoji-picker-react';

const Form = ({ receiverId, setChats, chats, socket }) => {
    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const userId = window.localStorage.getItem("userId");

    // Update the emoji picker function for the latest version of emoji-picker-react
    const onEmojiClick = (emoji) => {
        setMessage(prevInput => prevInput + emoji.emoji); // Appending emoji correctly
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return; // Prevent sending empty messages
        try {
            const response = await axios.post("http://localhost:5151/chat/message/send/" + receiverId,
                { content: message },
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('chat-token')}`,
                    },
                }
            );
            // Emit the new message
            socket.emit('newMessage', { sender: userId, content: message, receiver: receiverId });
            setChats([...chats, { content: message, sender: userId }]);
            setMessage(''); // Clear the input after sending
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='p-4 bg-white bg-opacity-30'>
            <form onSubmit={sendMessage} className='flex items-center space-x-2'>
                <input
                    type='text'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder='Type your message...'
                    className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button type='button'
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className='p-2 bg-gray-200 rounded-lg'>
                    😊
                </button>
                {showEmojiPicker && (
                    <div className='absolute bottom-16'>
                        <Picker onEmojiClick={onEmojiClick} />
                    </div>
                )}
                <input type="file" className='hidden' id='file-upload' />
                <button className='p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200'>
                    Send
                </button>
            </form>
        </div>
    );
};

export default Form;
