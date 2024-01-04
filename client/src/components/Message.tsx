import React from 'react'
import MyMessage from './MyMessage'
import OtherMessage from './OtherMessage'

const Message:React.FC = () => {
  
  return (
    <div className=' tw-w-full tw-h-full tw-overflow-y-auto'>
      {/* người khác */}
      <OtherMessage />
  
      {/* mình */}
      <MyMessage />
    </div>
  )
}

export default Message