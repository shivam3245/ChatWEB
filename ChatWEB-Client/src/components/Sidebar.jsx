import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = ({ setChatInitiated, setChats, setReceiverId }) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleLogout = () => {
        window.localStorage.removeItem("chat-token");
        window.localStorage.removeItem("userId");
        navigate('/');
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5151/chat/users', {
                    headers: {
                        "Authorization": `Bearer ${window.localStorage.getItem('chat-token')}`,
                    }
                });
                setUsers(response.data.users);
            } catch (err) {
                navigate('/');
                console.log(err);
            }
        };
        {window.localStorage.getItem('chat-token') ? fetchUsers() : navigate('/')}
    }, [navigate]);

    const startChat = async (id) => {
        try {
            const response = await axios.get("http://localhost:5151/chat/message/read/" + id, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('chat-token')}`,
                },
            });
            setChats(response.data);
        } catch (err) {
            if (err.response?.data?.message === "Not Found") {
                setChats([]);
            }
            console.log(err);
        }

        setChatInitiated(true);
        setReceiverId(id);
        setSelectedUserId(id);
    };

    return (
        <div className='w-full md:w-1/4 bg-white shadow-lg p-4 h-full flex flex-col rounded-lg'>
            {/* Search Bar */}
            <input
                type='text'
                placeholder='Search Users...'
                className='w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
            />

            {/* Users List */}
            {users.length > 0 ? (
                <div className='space-y-4 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100'>
                    {users.map(user => (
                        <div
                            key={user._id}
                            onClick={() => startChat(user._id)}
                            className={`flex items-center space-x-4 p-2 hover:bg-gray-300 cursor-pointer transition-all duration-200 rounded-lg 
                                        ${selectedUserId === user._id ? 'bg-blue-100' : ''}`}
                        >
                            <img
                                src={`http://localhost:5151/images/${user.image}`}
                                alt='User'
                                className='rounded-full w-12 h-12 object-cover border'
                            />
                            <span className='text-gray-800 font-medium'>{user.username}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className='text-gray-800 font-semibold'>No Users</p>
            )}

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className='mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300'
            >
                Logout
            </button>
        </div>
    );
};

export default Sidebar;
