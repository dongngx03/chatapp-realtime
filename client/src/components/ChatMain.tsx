import React from 'react'
import BoxChat from './BoxChat'
import SideBar from './SideBar'

const ChatMain:React.FC = () => {
  return (
    <div className="row tw-w-full tw-h-5/6 tw-px-5">
      <div className="col-md-4 tw-border-l tw-border-b tw-border-[#2F3949] tw-h-full">
        <SideBar />
      </div>
      <div className="col-md-8 tw-border-l tw-border-b tw-border-r tw-border-[#2F3949] tw-h-full">
        <BoxChat />
      </div>
    </div>
  )
}

export default ChatMain