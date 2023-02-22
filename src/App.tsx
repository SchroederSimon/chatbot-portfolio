
import { useState } from 'react';
import './App.css'

type Message = {
  id: string;
  type: "bot" | "user";
  text: string;
}


function App() {

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      text: "Hola soy un bot"
    }, {
      id: "2",
      type: "user",
      text: "Hola soy un usuario"
    }
  ]);

  return (
    <div className="chat-container">
      <h1>Chatbot</h1>
      <div className="chat-bot">
        {
          messages.map((message) => (
            <div className={`chat-messages ${message.type === "bot" ? "bot-message" : "user-message" }`} key={message.id}>
              {message.text}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
