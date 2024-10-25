import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ openSignup }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            const response = await axios.post('http://localhost:5151/chat/user/login', { username, password });
            console.log(response);
            if (response.data.msg === "success") {
                window.localStorage.setItem('chat-token', response.data.token);
                window.localStorage.setItem('userId', response.data.user._id);
                console.log(response.data.user);
                navigate('/chat');
            }
        } catch (err) {
            console.error(err);
            setErrorMessage("Invalid Username or Password. Please try again.");
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-gray-900 p-5 overflow-hidden'>
            <div className='relative w-full max-w-md bg-white bg-opacity-10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-[0_15px_80px_rgba(0,0,0,0.8)] p-8 md:p-10 flex flex-col justify-center space-y-8 z-20'>
                <h1 className='text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500'>
                    Login
                </h1>
                {errorMessage && (
                    <div className='bg-red-500 text-white text-center p-2 rounded-lg mb-4'>
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label className='block text-gray-300' htmlFor='username'>Username</label>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type='text'
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg bg-white bg-opacity-10 focus:outline-none focus:ring focus:ring-pink-500 transition duration-200'
                            placeholder='Enter Username'
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-gray-300' htmlFor='password'>Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type='password'
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg bg-white bg-opacity-10 focus:outline-none focus:ring focus:ring-pink-500 transition duration-200'
                            placeholder='Enter Your Password'
                            required
                        />
                    </div>
                    <div className='flex items-center justify-between mb-4'>
                        <label className='inline-flex items-center text-gray-300'>
                            <input className='form-checkbox' type='checkbox' />
                            <span className='ml-2'>Remember Me</span>
                        </label>
                        <a href="#" className='text-pink-500 hover:underline'>Forgot Password?</a>
                    </div>
                    <button type='submit' className='w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 rounded-lg hover:scale-105 transition duration-200'>
                        Login
                    </button>
                </form>
                <div className='text-center text-gray-300'>
                    <span>Don't Have an Account?</span>
                    <button onClick={openSignup} className='text-pink-500 hover:underline ml-2'>Sign Up</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
