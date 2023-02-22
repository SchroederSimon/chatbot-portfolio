
import React, { useState } from 'react';
import './App.css'

type Message = {
  id: string;
  type: "bot" | "user";
  text: string;
}

const EXAMPLES = [{ "text": "Hi", "label": "Introduction" }, { "text": "Who are you?", "label": "Introduction" }, { "text": "Want to work with you", "label": "Introduction" }, { "text": "Where are you from?", "label": "Introduction" }, { "text": "Are you looking a job?", "label": "Introduction" }, { "text": "Wich technology do you use?", "label": "Experience" }, { "text": "What languaje do you know?", "label": "Experience" }, { "text": "Where i can reach you?", "label": "Contact" }, { "text": "How is your LinkedIn profile?", "label": "Contact" }, { "text": "How is your GitHub profile?", "label": "Contact" }, { "text": "When you start programming?", "label": "Experience" }, { "text": "What inspired you to pursue a career in this field?", "label": "Experience" }, { "text": "Can you tell me what\'s your bigges project so far?", "label": "Projects" }, { "text": "What are your strenghts and weaknesses as a developer?", "label": "Personal" }, { "text": "dasdad", "label": "Unknown" }, { "text": "Do you have a resumee?", "label": "Contact" }, { "text": "Age of your cats", "label": "Unknown" }, { "text": "Weak and nesses", "label": "Personal" }, { "text": "Wich projects do you have?", "label": "Projects" }]
const API_KEY = ""

function App() {

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      text: "Hola soy un bot"
    },
    {
      id: "2",
      type: "user",
      text: "Hola soy un usuario"
    }
  ]);

  const [question, setQuestion] = useState<string>("")

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    fetch("https://api.cohere.ai/classify", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "large",
        inputs: ["question"],
        examples: EXAMPLES,
      })
    });
  }

  return (
    <div className="chat-container">
      <h1>Chatbot</h1>
      <div className="chat-bot">
        {
          messages.map((message) => (
            <div className={`chat-messages ${message.type === "bot" ? "bot-message" : "user-message"}`} key={message.id}>
              {message.text}
            </div>
          ))
        }
      </div>
      <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        placeholder="Ask me something" 
        name="question"
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default App
