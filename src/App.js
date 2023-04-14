import './App.css';
import { Configuration, OpenAIApi } from "openai";
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import userIcon from './assets/user.png';
import botIcon from './assets/tesla.png';

const App = () =>  {
  const [messages, setMessages] = useState([
    {
      isUser: false,
      message: 'Hi there! This is Tesla AI ChatBot, what can I help you?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputSubmit = async (event) => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      return;
    }

    const response = await sendToChatGPT(inputValue)
    const newMessage = {
      isUser: true,
      message: inputValue,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    const newResponseMessage = {
      isUser: false,
      message: response.data.choices[0].message.content,
    };

    setMessages((prevMessages) => [...prevMessages, newResponseMessage]);
    setInputValue('');
  };

  const sendToChatGPT = async (text) => {
    const configuration = new Configuration({
      apiKey: "",
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "system", "content": "You are a Tesla website customer service"},
        {"role": "user", "content": text},
      ],
    });
    return completion
  }

  return (
    <body  className='app'>
      <div> 
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
      <div>
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
