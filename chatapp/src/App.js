// import socketIo from "socket.io-client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Join from "./componants/Join/Join";
import Chat from "./componants/Chat/Chat";
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Join /> }/>
        <Route path='/chat' element={<Chat />}/>
        </Routes>
          
      </Router>
    </div>
  );
}

export default App;
