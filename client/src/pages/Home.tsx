import React from 'react'
import BtnSignIn from '../components/BtnSignIn'
import BtnSignUp from '../components/BtnSignUp';

const Home:React.FC = () => {
 
  return (
    <>
      <div className='tw-w-full tw-h-screen tw-bg-gray-100 d-flex justify-content-center align-items-center tw-relative'>
        <BtnSignIn
         className="tw-absolute tw-top-3 tw-right-7 tw-bg-white" 
        />
        <BtnSignUp
          className='tw-absolute tw-top-3 tw-right-36 tw-bg-blue-500 text-white'
        />
        <h1>Chat app real time</h1>
        
      </div>
    </>
  )
}

export default Home