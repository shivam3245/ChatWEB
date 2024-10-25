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
                console.log(response);
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
        { window.localStorage.getItem('chat-token') ? verifyUser() : console.log("Token not found") }
    }, [navigate]);

    return (
        <div className='relative flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-gray-900 p-5 overflow-hidden'>


            <div className='absolute inset-0 bg-[url("/BG.png")] bg-cover bg-fixed bg-center opacity-20 z-0 animate-pulse-slow'></div>
            <div className='absolute inset-0 bg-gradient-to-t from-indigo-700 via-transparent to-pink-900 opacity-70 z-10 animate-shift-slow'></div>
            <div className='absolute inset-0 bg-gradient-to-r from-blue-800/40 to-purple-600/30 opacity-50 animate-pulse-slow'></div>


            <div className='absolute inset-0 z-0'>
                <div className='absolute w-3 h-3 bg-blue-500 rounded-full opacity-60 animate-float' style={{ top: '30%', left: '10%' }}></div>
                <div className='absolute w-3 h-3 bg-pink-400 rounded-full opacity-60 animate-float delay-200' style={{ top: '60%', right: '15%' }}></div>
                <div className='absolute w-4 h-4 bg-yellow-400 rounded-full opacity-60 animate-float delay-400' style={{ bottom: '15%', left: '40%' }}></div>
            </div>


            <div className='relative z-20 w-full max-w-5xl h-[80vh] bg-white bg-opacity-10 backdrop-blur-3xl border border-white/20 rounded-3xl shadow-[0_15px_80px_rgba(0,0,0,0.8)] p-10 md:p-20 flex flex-col justify-center items-center space-y-10 transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-[0_10px_60px_rgba(255,105,180,0.7)]'>


                <h1 className='text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 leading-tight tracking-wide drop-shadow-[0_10px_30px_rgba(255,255,255,0.5)] neon-glow'>
                    Dive into <br />
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-blue-700 animate-text-shadow'>
                        Chat<span className='text-purple-300'>WEB</span>
                    </span>
                </h1>


                <p className='text-lg md:text-xl text-center text-white font-medium leading-relaxed max-w-3xl opacity-80 animate-fade-in-delay'>
                    “Connecting minds, sharing words, <br /> and bridging distances one chat at a time.”
                </p>


                <button
                    onClick={() => setIsModelOpen(true)}
                    className='relative px-8 py-3 text-lg md:text-2xl font-semibold rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-[0_15px_80px_rgba(255,105,180,0.6)] transition-transform duration-500 ease-in-out transform hover:scale-110 hover:rotate-1 focus:outline-none'
                >
                    Join the conversation
                </button>
            </div>


            {isModelOpen && (
                <Model isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}>
                    {isLogin ? <Login openSignup={openSignup} /> : <Register openLogin={openLogin} />}
                </Model>
            )}
        </div>
    );
};

export default Home;
