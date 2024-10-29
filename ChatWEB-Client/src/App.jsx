import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'
import io from 'socket.io-client'
import { APIUrl } from '../utils'

const socket = io.connect(APIUrl)

function App() {

  return (
    <><div
      className="bg-cover h-full w-full justify-center"
    >    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}> </Route>
          <Route path='/chat' element={<Chat socket={socket} />}></Route>
        </Routes>
      </BrowserRouter>
    </div >
    </>
  )
}

export default App
