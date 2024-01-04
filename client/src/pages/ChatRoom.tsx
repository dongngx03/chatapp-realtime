import React, { useState } from 'react'
import NavTop from '../components/NavTop'
import ChatMain from '../components/ChatMain'
import ChatRoomContext from '../contexts/ChatRoomContext'
import Swal from 'sweetalert2'

type newFriend = {
  user_id: string,
  username: string,
  email: string
}

const ChatRoom:React.FC = () => {
  const base_url:string = "http://localhost:8080"
  const [email, setEmail] = useState<string>('');
  const [newFriend, setNewFriend] = useState<newFriend>({
    user_id : '',
    username: '',
    email: ''
  })

  // Tìm người dùng
  const handleSearchFriend = async (e:React.FormEvent<HTMLFormElement>):Promise<void> => {
    e.preventDefault();
    try {
      const url:string = `${base_url}/api/auth/${email}`;
      const res = await fetch(url)

      const data = await res.json();

      if(res.status === 400) {
        setNewFriend({
          user_id : '',
          username: '',
          email: ''
        })
        Swal.fire({
          title: 'Lỗi',
          text: 'Không tìm thấy người này ',
          icon: 'error',
          showCancelButton: true,
          cancelButtonText: 'Thoát'
        })

        return data
      }

      if(res.status === 200) {
        console.log(data);
        setNewFriend(data.user)
        return data
      }

    } catch (error) {
      console.log(error);
      
    }
  }
  
  return (
    <ChatRoomContext.Provider value={{
      setEmail,
      handleSearchFriend,
      newFriend
    }}>
      <div className='tw-w-full tw-h-screen tw-bg-[#111827] d-flex flex-column align-items-center'>
          <NavTop />
          <ChatMain />
      </div>
    </ChatRoomContext.Provider>
  )
}

export default ChatRoom