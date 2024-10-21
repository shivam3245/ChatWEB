
import React, { useState } from 'react'
import Model from '../components/Model'
import Register from '../components/Register'
import Login from '../components/Login'

const Home = () => {
    const [isModelOpen, setIsModelOpen] = useState(false)
    const [isLogin, setIsLogin] = useState(true)

    const openSignup = () => {
        setIsModelOpen(true)
        setIsLogin(false)
    }
    const openLogin = () => {
        setIsModelOpen(false)
        setIsLogin(true)
    }

    return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <div style={{ backgroundImage: "url('/BG.png" }}
                className='bg-cover w-2/4 h-[calc(100vh-60px)] rounded-lg flex items-center justify-center'>
                <div>
                    <h1 className='text-6xl p-2 bg-white bg-opacity-80 font-bold text-gray-700 rouded-lg font-Anek'>Welcome <br /> <span>to ChatWEB</span></h1>
                    <button onClick={() => setIsModelOpen(true)} className='p-3 hover:bg-blue-800 rounded-lg mt-2 bg-blue-600 text-white text-3xl'>Login/Register</button>
                </div>
            </div>
            <Model isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}>
                {isLogin ? <Login openSignup={openSignup} /> : <Register openLogin={openLogin} />}
            </Model>
        </div>
    )
}

export default Home
