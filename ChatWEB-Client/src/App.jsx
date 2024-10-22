import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:5151')

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
