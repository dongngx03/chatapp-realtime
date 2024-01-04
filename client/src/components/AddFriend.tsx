import React from 'react'
import { UserOutlined, MessageOutlined } from '@ant-design/icons' 
import { useContext } from 'react'
import ChatRoomContext from '../contexts/ChatRoomContext'
import AppContext from '../contexts/AppContext'

const AddFriend:React.FC = () => {
  const {newFriend} = useContext(ChatRoomContext)
  const {user_id} = useContext(AppContext)
  
  return (
    <div className='tw-w-full tw-h-[6rem] d-flex flex-column tw-justify-between tw-gap-1'>
        <span className='tw-text-white tw-text-lg tw-font-medium'>Add friends</span>
        {
          newFriend.email !== '' && newFriend.user_id != user_id

          ?
          <div className='tw-w-full tw-h-full d-flex tw-gap-4 tw-justify-between align-items-center tw-px-2'>
          <div className='tw-h-full d-flex tw-justify-start align-items-center tw-gap-2'>
            <UserOutlined className='tw-text-2xl tw-text-white' />
            <span className='tw-text-[#54758F] tw-font-medium'>{newFriend.username}</span>
          </div>

          <button><MessageOutlined className='tw-text-2xl tw-text-white' /></button>
          </div>

          :
          <div className='tw-w-full tw-h-full d-flex tw-gap-4 tw-justify-between align-items-center tw-px-2'>
            <span className='tw-text-[#54758F]'>Không có ai -.- </span>
          </div>
        }
    </div>
  )
}

export default AddFriend