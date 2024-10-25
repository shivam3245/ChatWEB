import React from 'react'

const Model = ({ isModelOpen, setIsModelOpen, children }) => {
    if (!isModelOpen) return null
    return (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg shadow-lg w-full max-w-md'>
                <button className='absolute right-4 h-max text-5xl font-bold' onClick={() => setIsModelOpen(false)}>
                    <span className='text-xl rounded-lg p-1 bg-red-600 font-medium text-white'>Close</span>
                </button>
                {children}
            </div>
        </div>
    )
}

export default Model
