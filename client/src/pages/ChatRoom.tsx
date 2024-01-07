import React, { useEffect, useState, useRef } from 'react'
import NavTop from '../components/NavTop'
import ChatMain from '../components/ChatMain'
import ChatRoomContext from '../contexts/ChatRoomContext'
import { useContext } from 'react'
import AppContext from '../contexts/AppContext'
import { CustomButtonElement } from '../../interface'
import socket from '../services/socket'


const ChatRoom: React.FC = () => {
  // userref cho scrollbar message
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // state 
  const [listRoom, setListRoom] = useState<[]>([]); // danh dách phòng tất cả phòng chat của user đã tham gia 
  const [messages, setMessages] = useState<any[]>([]); // lưu tất cả tin nhắn của một phòng chat
  const [chatroom_id, setChatroom_id] = useState<string>(''); // lưu chatroom_id sau khi người nào đó bấm vào phòng chat của mình
  const [chatroomuser_id, setChatroomuser_id] = useState<string>(''); // lưu chatroomuser_idd sau khi người nào đó vào phòng chat của mình 
  const [roomInfor, setRoomInfor] = useState<string>(''); // lưu thông tin về chatroom người dùng bấm vào 
  const [messWillBeSent, setMessWillBeSent] = useState<string>('') // lưu tin nhắn sẽ dược gửi
  // url_base
  const base_url: string = "http://localhost:8080";
  // id user
  const { user_id, user_name } = useContext(AppContext);
  // scrollTop
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };
  // list boxchat 
  useEffect(() => {
    const getRoom = async (): Promise<any> => {
      try {
        const res: any = await fetch(`${base_url}/api/chatroom/roomlist/${user_id}`);
        const data: any = await res.json();
        setListRoom(data.data.chatroomusers);
      } catch (error) {
        console.log(error);
      }
    }
    getRoom();

    socket.on('newMess', (data: any) => {
      setMessages(mess => [...mess, data])
      console.log(data);
    })

    return () => {
      socket.off('newMess');
    };

  }, [])

  useEffect(() => {
    // tự kéo xuống bot mỗi khi gửi tin nhắn 
    scrollToBottom();
  }, [messages])


  // hàm lấy tất cả các tn nhắn có trong một box chat 
  const getAllMessages = async (e: React.MouseEvent<CustomButtonElement>): Promise<void> => {
    e.preventDefault();
    const chatroomId = e.currentTarget.dataset.chatroom_id;
    const chatroomUserId = e.currentTarget.dataset.chatroomuser_id;
    const roomInfor = e.currentTarget.dataset.room_infor;

    if (!chatroomId || !chatroomUserId) {
      return;
    }

    setChatroom_id(chatroomId);
    setChatroomuser_id(chatroomUserId);
    setRoomInfor(roomInfor);

    socket.emit('join', { room: chatroomId, user: user_id, user_name: user_name })

    try {
      const res = await fetch(`${base_url}/api/chatroom/getmessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: chatroomId
        })
      });

      const data = await res.json();
      // console.log(data);
      // gán message vừa lấy được vào useState

      setMessages(data.messages)

      // tham gia phòng bằng soket


    } catch (error) {
      console.log(error);
    }

  }
  // hàm gửi tin nhắn đến boxchat
  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    try {
      const res: any = await fetch(`${base_url}/api/chatroom/sendmessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: user_id,
          chatroom_id: chatroom_id,
          content: messWillBeSent,
          chatroomuser_id: chatroomuser_id
        })
      });


      const data: any = await res.json();
      socket.emit('send', data.mess);

      setMessages(mess => [...mess, data.mess])
      console.log(data.mess);
      setMessWillBeSent(''); // xóa bỏ tin nhắn vừa gửi 


    } catch (error) {
      console.log(error);

    }

  }

  // console.log(messages);
  // console.log(chatroom_id);
  // console.log(user_id);
  // console.log(chatroomuser_id);
  // console.log(messWillBeSent);


  return (
    <ChatRoomContext.Provider value={{
      listRoom,
      messages,
      getAllMessages,
      chatroom_id,
      chatroomuser_id,
      roomInfor,
      setMessWillBeSent,
      sendMessage,
      messWillBeSent,
      messagesEndRef
    }}>
      <div className='tw-w-full tw-h-screen tw-bg-[#111827] d-flex flex-column align-items-center'>
        <NavTop />
        <ChatMain />
      </div>
    </ChatRoomContext.Provider>
  )
}

export default ChatRoom