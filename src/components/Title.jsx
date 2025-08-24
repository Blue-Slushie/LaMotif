import React from 'react'

const Title = ({text1, text2, text3, text4}) => {
    return (
        <div className=' inline-flex gap-2 items-center mb-3'>
            <p className='text-gray-500 font-medium'>{text1} <span className='text-gray-700 font-medium'>{text2}</span> <span className='text-white font-medium'>{text3}</span> <span className='text-[#001f3f] font-medium'>{text4}</span></p>
        </div>
    )
}
export default Title
