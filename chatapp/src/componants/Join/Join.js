import React, { useState } from 'react'
import "./join.css";
import logo from "../img/download.png";
import { Link } from "react-router-dom";


let user;


const senduser = () => {
  user = document.getElementById('joininput').value;
  document.getElementById('joininput').value = "";
}
const Join = () => {

  const [name, setname] = useState("");

  



  return (
    <div className='joinpage'>
      <div className='joincontainer'>
        <img src={logo} alt="logo" />
        <h1>ChatApp</h1>
        <input onChange={(e) => setname(e.target.value)} placeholder="Enter your name" type="text" id="joininput" />
        <Link onClick={(e)=>!name ? e.preventDefault() : null} to="/chat"> <button className="joinbtn" onClick={senduser}>Login</button> </Link>
      </div>
    </div>
  )
}

export default Join
export { user }