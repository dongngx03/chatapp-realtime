import React from 'react'
import MyMessage from './MyMessage'
import OtherMessage from './OtherMessage'
import { useContext } from 'react'
import ChatRoomContext from '../contexts/ChatRoomContext'
import AppContext from '../contexts/AppContext'


const Message: React.FC = () => {
  const { messages, messagesEndRef } = useContext(ChatRoomContext);
  const { user_id } = useContext(AppContext);

  return (
    <div ref={messagesEndRef} className=' tw-w-full tw-h-full tw-overflow-y-auto'>
      {
        messages?.map((mess: any) => {
          return (
            <>
              {
                parseInt(user_id) == parseInt(mess.user_id)
                  ?
                  <MyMessage
                    content={mess.content}
                    created_at={mess.created_at}
                  />
                  :
                  <OtherMessage 
                    user={mess.user}
                    content={mess.content}
                    created_at={mess.created_at}
                  />
              }
            </>
          )
        })
      }
    </div>
  )
}

export default Message