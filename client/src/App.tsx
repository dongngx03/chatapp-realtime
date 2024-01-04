import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Chat from './pages/Chat'
import ChatRoom from './pages/ChatRoom'
import NotFound from './pages/NotFound'
import AppContext from './contexts/AppContext.ts';


function App() {

  const token = sessionStorage.getItem('token') || '';
  const user_name = sessionStorage.getItem('user_name') || '';
  const user_id = sessionStorage.getItem('user_id') || '';

  return (
    <AppContext.Provider value={{token, user_id, user_name}}>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/chat' element={<Chat />}/>
        <Route path='/chatroom' element={token ? <ChatRoom /> : <NotFound />} />
      </Routes>
    </AppContext.Provider>
  )
}

export default App
