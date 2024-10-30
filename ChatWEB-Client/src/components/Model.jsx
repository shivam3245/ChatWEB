import React from 'react'

const Model = ({ isModelOpen, setIsModelOpen, children }) => {
    if (!isModelOpen) return null
    return (
        <div className='fixed inset-0 bg-gradient-to-br from-purple-700 to-purple-950 bg-opacity-100 flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg shadow-lg w-full max-w-md'>
                <button title='Close' className='absolute right-4 h-max text-5xl font-bold pt-20 md:p-2' onClick={() => setIsModelOpen(false)}>
                    <span className='text-xl rounded-lg pl-2 pr-2 py-0.5 bg-red-600 font-thin text-white'>X</span>
                </button>
                {children}
            </div>
        </div>
    )
}

export default Model
