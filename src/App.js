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
      message: "As an AI language model, \n I do not have personal preferences, but can provide information on the different Tesla models to help you make a decision base n\nTesla currently has four car models available: \n\n1. Model S: Tesla's luxury sedan, which offers a long range, high performance, and advanced safety features. It has the sengers comfortably. \n\n2. Model 3: Tesla's midsize sedan, which is the most affordable option in the lineup while still offering impressive performance and a long range. n\n3. Model X: Tesla's SUV, which offers impressive performance and can seat up to seven passengers. It also has falcon-wing doors that provide convenient access to the back mpact SUV, which offers balance between range, performance, and cargo space. It seats up to five passengers and has similar features to the Model 3 sedan. In\nUltimately, depend on your individual needs and preferences. Factors to consider include your daily commute, desired range, passenger capacity, and technology features. I suggest visiti learn more about the different models and their features to make an informed decision.",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessages((prevMessages) => [...prevMessages, newResponseMessage]);
    setInputValue('');
  };

  return (
    <body>
      <div className='app'>
        <div style={{backgroundColor: "grey"}}> 
          {messages.map((message, index) => (
            message.isUser ? (
              <div key={index} className="user-message">
                <div className="user-message-container">
                  <img src={message.isUser ? userIcon : botIcon} alt='User' className="icon" style={{ width: '20px', height: '20px', margin: '10px 10px'}} />
                  <p style={{margin: 0}}>{message.message}</p>
                </div>
              </div>
            ) : (
              <div key={index} className="chatbot-message">
                  <div className="chatbot-message-container">
                    <p style={{margin: 0, whiteSpace: "pre-wrap"}}>{message.message}</p>
                    <img src={message.isUser ? userIcon : botIcon} alt='Chatbot' className="icon" style={{ width: '20px', height: '20px', margin: '10px 10px'}} />
                  </div>
              </div>
            )
            
          ))}
        </div>
        <form onSubmit={handleInputSubmit} className="input-form">
          <input className="input" type="text" value={inputValue} onChange={handleInputChange} />
          <button type="submit" className="send-button">
            <SendIcon />
          </button>
        </form>
      </div>
    </body>
  );
}

export default App;
