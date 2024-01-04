import React from 'react'
import Message from './Message'
import { Button } from 'antd'
import { SendOutlined, UserOutlined } from '@ant-design/icons'

const BoxChat:React.FC = () => {
  return (
    <div className='tw-w-full tw-h-full d-flex flex-column align-items-center tw-justify-between'>
        <div className="tw-w-full tw-h-[4rem] tw-border-b tw-border-[#2F3949] d-flex justify-content-start align-items-center tw-gap-1">
          <UserOutlined className='tw-text-2xl tw-text-white' />
          <span className='tw-text-[#7E8687]'>Ngân nguyễn</span>
        </div>

        <Message />

        <div className='tw-w-full tw-h-[4.5rem] tw-border-t tw-border-[#2F3949] d-flex tw-justify-between align-items-center tw-gap-3'>
          <input type="text" className='tw-w-full tw-h-2/3 tw-rounded-lg tw-border tw-border-[#7E8687] tw-bg-[#374151] tw-px-5 tw-text-[#7E8687]' placeholder='Write a message' />
          <Button className='tw-text-[#7E8687] tw-border tw-border-[#7E8687] tw-h-2/3 d-flex justify-content-center align-items-center'><SendOutlined /></Button>
        </div>
    </div>
  )
}

export default BoxChat