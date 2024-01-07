import React from 'react'
import { UserOutlined } from '@ant-design/icons'

interface propsMessage {
  user : any,
  content: string,
  created_at: string
}

const OtherMessage: React.FC<propsMessage> = (props) => {
  const {user, content, created_at} = props
  return (
    <div className='tw-w-full tw-h-auto tw-p-4 d-flex tw-justify-start tw-gap-3'>
      <div className='tw-w-10 tw-h-10 tw-rounded-full tw-bg-[#374151] d-flex justify-content-center align-items-center'>
        <UserOutlined className='tw-text-lg' />
      </div>
      <div className="tw-w-1/2 tw-px-4 tw-py-3 tw-overflow-hidden tw-border tw-border-[#2F3949] tw-rounded-lg d-flex flex-column gap-2">
        <div>
          <span className='tw-text-white'>{user.username}</span>
        </div>
        <div>
          <span className="tw-break-all tw-text-[#5D7991] tw-font-bold tw-font-mono">{content}</span>
        </div>
        <span className='tw-text-xs tw-text-[#5D7991]'>{created_at}</span>
      </div>
    </div>
  )
}

export default OtherMessage