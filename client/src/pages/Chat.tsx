
import React, { useEffect, useState } from 'react';
import socket from '../services/socket';

const Chat: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  useEffect(() => {
    // socket.on('connect', () => {
    //   console.log('Connected to server');
    // });

    // socket.on('chat message', (msg) => {
    //   console.log('Received message: ' + msg);
    // });

    // return () => {
    //   socket.disconnect(); 
    // };
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(value);
    // tham số thứ nhất là tên gói tin
    const id = socket.id;
    socket.emit('join', { mess: value, id, room: room })
  }

  const test1: React.MouseEventHandler<HTMLButtonElement> = (e: any): void => {
    e.preventDefault();
    socket.emit('two', "ok được rồi")
  }
  
  return (
    <div>
      <h1>Chat App</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">phòng</label>
        <input type="text" className='form-control' value={room} onChange={(e) => setRoom(e.target.value)} />
        <label htmlFor="">mes</label>
        <input className='form-control' type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        <button className='btn btn-primary' type='submit'>gửi</button>
      </form>

      <button className='btn btn-danger' onClick={test1}>test</button>
    </div>
  )
}

export default Chat