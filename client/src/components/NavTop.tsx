import React from 'react';
import BtnlogOut from '../components/BtnlogOut'
import { AppContexts } from '../../interface';
import { useContext } from 'react';
import AppContext from '../contexts/AppContext';

const NavTop:React.FC = () => {
  const {user_name} = useContext<AppContexts>(AppContext)
  return (
    <nav className='tw-w-full tw-h-[4.5rem]  tw-bg-[#1F2937] tw-border-b tw-border-[#2F3949] d-flex tw-justify-between align-items-center tw-px-10'>
      <h3 className='tw-text-[#ffff]'>Chat app</h3>
      <div className='d-flex tw-gap-5'>
        <h5 className='tw-text-[#7E8687]'>{user_name}</h5>
        <BtnlogOut />
      </div>
    </nav>
  )
}

export default NavTop