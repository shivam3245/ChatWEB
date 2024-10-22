import React, { useState } from 'react'
import axios from 'axios'

const Register = ({ openLogin }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [file, setFile] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)
        formData.append('image', file)
        try {
            const response = await axios.post('http://localhost:5151/chat/user/register', formData)
            console.log(response)
            if (response.data.msg === "success") {
                openLogin()
            }
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div>
            <h1 className='text-2xl font-bold mb-4'>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700' htmlFor='name'>Username</label>
                    <input onChange={(e) => setUsername(e.target.value)} type='text' className='w-full px-3 py-2 border' placeholder='Enter Username' />
                </div>
                <div>
                    <label className='block text-gray-700y' htmlFor='password'>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type='password' className='w-full px-3 py-2 border' placeholder='Enter Your Password' />
                </div>
                <div>
                    <label className='block text-gray-700'>Upload Image</label>
                    <input
                        type='file'
                        onChange={(e) => setFile(e.target.files[0])}
                        className='border p-2 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold 
                    file:bg-blue-500 file:text-white
                    hover:file:bg-blue-700' />
                </div>
                <div className='mb-4'>
                    <button type='submit' className='w-full bg-red-600 text-white py-2'>SignUp</button>
                </div>
            </form>
            <div className='text-center'>
                <span className='text-gray-700 '>Already have an account?</span>
                <button onClick={openLogin} className='text-red-800'>Login</button>
            </div>
        </div>
    )
}

export default Register
