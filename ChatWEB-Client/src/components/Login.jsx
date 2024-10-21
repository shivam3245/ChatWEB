import React, { useState } from 'react'

const Login = ({ openSignup }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <h1 className='text-2xl font-bold mb-4'>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700' htmlFor='name'>Username</label>
                    <input onChange={(e) => setUsername(e.target.value)} type='text' className='w-full px-3 py-2 border' placeholder='Enter Username' />
                </div>
                <div>
                    <label onChange={(e) => setPassword(e.target.value)} className='block text-gray-700y' htmlFor='password'>Password</label>
                    <input type='password' className='w-full px-3 py-2 border' placeholder='Enter Your Password' />
                </div>
                <div className='mb-4 flex items-center justify-between'>
                    <label className='inline-flex items-center ' htmlFor='rememberme'>
                        <input className='form-checkbox' type='checkbox' />
                        <span className='ml-2 text-gray-700'>Remember Me</span>
                    </label>
                    <a href="#" className='text-red-800'>Forgot Password?</a>
                </div>
                <div className='mb-4'>
                    <button type='submit' className='w-full bg-red-600 text-white py-2'> Login</button>
                </div>
            </form>
            <div className='text-center'>
                <span className='text-gray-700 '>Don't Have an Account?</span>
                <button onClick={openSignup} className='text-red-800'>Sign Up</button>
            </div>
        </div>
    )
}

export default Login
