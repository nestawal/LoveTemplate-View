import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

function App() {
  const navigate = useNavigate();

  const handleClick = () =>{
    navigate('/signUp')
  }

  return (
    <div className='container'>  {/* ← THIS MUST BE HERE */}
      <div className='Intro'>
        <p className="main-text">
          Hey,<br/>
          Send a letter <br/>
          to your <br/>
          mpendwa
        </p>
        <button className="andika-btn" onClick={handleClick}>
          Andika
        </button>
      </div>
      <div className='emoji'>
        <img src="/loveEmoji.png" alt="Love emoji"/>
      </div>
    </div>
  )
}

export default App