import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Icon, Input } from '@mui/material';
import { useEffect, useState } from 'react';
import userIcon from './assets/user.png';
import botIcon from './assets/tesla.png';

const App = () =>  {
  const [messages, setMessages] = useState([
    {
      isUser: false,
      message: 'Hi there!',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      return;
    }

    const newMessage = {
      isUser: true,
      message: inputValue,
    };


    const newResponseMessage = {
      isUser: false,
      message: "response hi ",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessages((prevMessages) => [...prevMessages, newResponseMessage]);
    setInputValue('');
  };

  return (
    <div className='app'>
      <div>
        {messages.map((message, index) => (
          <div key={index} className={message.isUser ? "user-message" : "chatbot-message" }>
            <div className="message-container">
              <img src={message.isUser ? userIcon : botIcon} alt={message.isUser ? 'User' : 'Chatbot'} className="icon" style={{ width: '20px', height: '20px', margin: '10px 10px'}} />
              <p style={{alignSelf: "center"}}>{message.message}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleInputSubmit} className="input-form">
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit" className="send-button">
          <SendIcon />
        </button>
      </form>
    </div>
  );
}

export default App;
