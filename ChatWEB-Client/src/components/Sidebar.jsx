import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = ({ setChatInitiated, setChats, setReceiverId }) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null); // New state for selected user

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
        fetchUsers();
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
        setSelectedUserId(id); // Set the selected user ID when starting chat
    };

    return (
        <div className='w-full md:w-1/4 bg-black p-4 bg-opacity-70 relative'>
            <input
                type='text'
                placeholder='Search'
                className='w-full p-2 mb-4 border rounded'
            />
            {users.length > 0 ? (
                <div className='space-y-4 overflow-y-auto max-h-96'>
                    {users.map(user => (
                        <div
                            key={user._id}
                            onClick={() => startChat(user._id)}
                            className={`flex items-center space-x-4 p-2 hover:bg-gray-300 cursor-pointer 
                                        ${selectedUserId === user._id ? 'bg-gray-400' : ''}`} // Conditionally apply bg-gray-400 if selected
                        >
                            <img
                                src={`http://localhost:5151/images/${user.image}`}
                                alt='User Image'
                                className='rounded-full w-12 h-12 object-cover border'
                            />
                            <span className='text-white text-sm font-bold'>{user.username}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className='text-white font-bold'>No Users</p>
            )}
            <button
                onClick={handleLogout}
                className='absolute bottom-1 right-1 left-1 rounded hover:bg-blue-700 bg-blue-500 text-white p-2'
            >
                Logout
            </button>
        </div>
    );
};

export default Sidebar;
