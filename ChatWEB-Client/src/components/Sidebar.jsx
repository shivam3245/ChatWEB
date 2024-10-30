import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APIUrl } from '../../utils';
import { FaBars } from 'react-icons/fa';

const Sidebar = ({ setChatInitiated, setChats, setReceiverId, setSelectedUser }) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [searchUser, setSearchUser] = useState('');
    const [mobileMenu, setMobileMenu] = useState(false);

    const handleLogout = () => {
        window.localStorage.removeItem("chat-token");
        window.localStorage.removeItem("userId");
        navigate('/');
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${APIUrl}/chat/users`, {
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
        { window.localStorage.getItem('chat-token') ? fetchUsers() : navigate('/') }
    }, [navigate]);

    const startChat = async (id, user) => {
        setChatInitiated(true);
        setReceiverId(id);
        setSelectedUser(user);
        setSelectedUserId(id);

        try {
            const response = await axios.get(`${APIUrl}/chat/message/read/` + id, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('chat-token')}`,
                },
            });
            setChats(response.data);
        } catch (err) {
            setChats([]);
            console.log(err);
        }
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchUser.toLowerCase())
    );

    return (
        <div className='sm:w-1/3 md:w-1/4 bg-gradient-to-br from-indigo-700 to-purple-800 text-white p-5 shadow-lg  animate-fade-in flex flex-col h-full'>
            <div className="md:hidden flex justify-between items-center mb-4">
                <button onClick={() => setMobileMenu(!mobileMenu)} className="text-white">
                    <FaBars size={24} />
                </button>
            </div>

            <div className={`${mobileMenu ? 'block' : 'hidden'} md:block flex flex-col h-[90%] justify-between`}>
                <input
                    type="text"
                    placeholder="Search Users..."
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                    className="w-full p-3 mb-4 bg-white bg-opacity-20 rounded-lg text-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-pink-500 outline-none"
                />

                <div className='flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-indigo-700 h-[90%] justify-between'>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <div
                                key={user._id}
                                onClick={() => startChat(user._id, user)}
                                className={`flex items-center p-2 cursor-pointer rounded-lg transition-all duration-200 
                                        ${selectedUserId === user._id ? 'bg-purple-600' : 'hover:bg-purple-500'}`}
                            >
                                <img
                                    src={`${user.image}`}
                                    alt='User'
                                    className='rounded-full w-10 h-10 object-cover border-2 border-indigo-400'
                                />
                                <span className='ml-4 font-semibold'>{user.username}</span>
                            </div>
                        ))
                    ) : (
                        <p className='text-center text-gray-300'>No Users Found</p>
                    )}
                </div>

                <div className="mt-1">
                    <button
                        onClick={handleLogout}
                        className="bg-pink-500 py-2 px-4 mt-5 rounded-full font-semibold hover:bg-pink-600 transition duration-300 w-full"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
