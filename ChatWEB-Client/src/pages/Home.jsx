import React, { useEffect, useState } from 'react';
import Model from '../components/Model';
import Register from '../components/Register';
import Login from '../components/Login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const openSignup = () => {
        setIsModelOpen(true);
        setIsLogin(false);
    };

    const openLogin = () => {
        setIsModelOpen(true);
        setIsLogin(true);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await axios.get('http://localhost:5151/chat/user/verify', {
                    headers: {
                        "Authorization": `Bearer ${window.localStorage.getItem('chat-token')}`,
                    }
                });
                console.log(response); // Inspect the response here
                if (response.data.msg === "success") {
                    navigate('/chat');
                }
            } catch (error) {
                console.error("Error during user verification:", error);
                if (error.response) {
                    console.log("Server responded with:", error.response.data);
                } else if (error.request) {
                    console.log("No response from server:", error.request);
                } else {
                    console.log("Error setting up request:", error.message);
                }
            }
        };
        {window.localStorage.getItem('chat-token') ? verifyUser() : console.log("Token not found")}
    }, [navigate]);

    return (
        <div className='flex items-center justify-center h-screen'>
            <div
                style={{ backgroundImage: "url('/BG.png')" }}
                className='bg-cover w-full max-w-4xl h-[calc(100vh-60px)] rounded-lg flex items-center justify-center p-4'
            >
                <div className='text-center'>
                    <h1 className='text-4xl md:text-6xl p-2 bg-white bg-opacity-80 font-bold text-gray-700 rounded-lg font-Anek'>
                        Welcome <br /> <span>to ChatWEB</span>
                    </h1>
                    <button
                        onClick={() => setIsModelOpen(true)}
                        className='p-3 hover:bg-blue-800 rounded-lg mt-4 bg-blue-600 text-white text-xl md:text-3xl'
                    >
                        Login/Register
                    </button>
                </div>
            </div>
            <Model isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}>
                {isLogin ? <Login openSignup={openSignup} /> : <Register openLogin={openLogin} />}
            </Model>
        </div>
    );
};

export default Home;
