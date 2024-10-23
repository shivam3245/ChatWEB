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
        setSelectedUserId(id);
    };

    return (
        <div className='w-full md:w-1/4 bg-white p-4 h-[100%] flex flex-col'>
            <input
                type='text'
                placeholder='Search'
                className='w-full p-2 mb-4 border rounded'
            />
            {users.length > 0 ? (
                <div className='space-y-4 overflow-y-auto flex-1'>
                    {users.map(user => (
                        <div
                            key={user._id}
                            onClick={() => startChat(user._id)}
                            className={`flex items-center space-x-4 p-2 hover:bg-gray-300 cursor-pointer 
                                        ${selectedUserId === user._id ? 'bg-gray-400' : ''}`}
                        >
                            <img
                                src={`http://localhost:5151/images/${user.image}`}
                                alt='User Image'
                                className='rounded-full w-12 h-12 object-cover border'
                            />
                            <span className='text-gray-800 text-sm font-bold'>{user.username}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className='text-gray-800 font-bold'>No Users</p>
            )}
            <button
                onClick={handleLogout}
                className=' bg-blue-500 text-white p-2 rounded hover:bg-blue-700'
            >
                Logout
            </button>
        </div>
    );
};

export default Sidebar;
