import React, { useState } from 'react';
import axios from 'axios';
import { APIUrl } from '../../utils';

const Register = ({ openLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('image', file);

        try {
            const response = await axios.post(`${APIUrl}/chat/user/register`, formData);
            console.log(response);
            if (response.data.msg === "success") {
                openLogin();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-gray-900 p-5 overflow-hidden'>
            <div className='relative w-full max-w-md bg-white bg-opacity-10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-[0_15px_80px_rgba(0,0,0,0.8)] p-8 md:p-10 flex flex-col justify-center space-y-8 z-20'>
                <h1 className='text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500'>
                    Sign Up
                </h1>
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
                    <div>
                        <label className='block text-gray-300'>Upload Image</label>
                        <input
                            type='file'
                            onChange={(e) => setFile(e.target.files[0])}
                            className='border p-2 block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold 
                                file:bg-blue-500 file:text-white
                                hover:file:bg-blue-700'
                        />
                    </div>
                    <button type='submit' className='w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 rounded-lg hover:scale-105 transition duration-200'>
                        Sign Up
                    </button>
                </form>
                <div className='text-center text-gray-300'>
                    <span>Already have an account?</span>
                    <button onClick={openLogin} className='text-pink-500 hover:underline ml-2'>Login</button>
                </div>
            </div>
        </div>
    );
};

export default Register;
