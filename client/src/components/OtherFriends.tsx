import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import { useContext } from 'react'
import ChatRoomContext from '../contexts/ChatRoomContext'

const OtherFriends: React.FC = () => {
  const { listRoom, getAllMessages} = useContext(ChatRoomContext);
  
  return (
    <div className='tw-w-full tw-h-2/3 d-flex flex-column tw-gap-1'>
      <span className='tw-text-white tw-text-lg tw-font-medium'>Other Rooms</span>
      <div className='tw-w-full tw-h-full tw-overflow-auto'>
        {
          listRoom?.map((room: any) => {
            return (
              <button
                data-chatroomuser_id = {room.id} //đây là id của chatroomuser
                data-chatroom_id = {room.chatroom.id} // đây là id của chatroom
                data-room_infor = {JSON.stringify(room.chatroom)}
                onClick={getAllMessages}
                className='custom-button tw-px-2 tw-btn-hover tw-w-full tw-h-[4rem] d-flex tw-justify-between align-items-center tw-border-b tw-border-[#2F3949]'
              >
                <div className='tw-h-full d-flex tw-justify-start align-items-center tw-gap-2'>
                  <UserOutlined className='tw-text-2xl tw-text-white' />
                  <span className='tw-text-[#54758F] tw-font-medium'>{room.chatroom.name}</span>
                </div>
                <div className='tw-h-3 tw-w-3 tw-rounded-full tw-bg-green-500'></div>
              </button>
            )
          })
        }
      </div>
    </div>
  )
}

export default OtherFriends