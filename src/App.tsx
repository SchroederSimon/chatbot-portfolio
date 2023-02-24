import React, { useEffect, useRef, useState } from 'react';
//style
import './App.css'
//data and interface
import { ANSWERS, EXAMPLES } from './arrays/data';
import { Message } from './interfaces/messageInterface';
//dotenv
import dotenv from 'dotenv';
dotenv.config();



function App() {

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      text: "Hi, im X and i will answer some questions about Simon."
    }
  ]);

  const [question, setQuestion] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const container = useRef<HTMLDivElement>(null);

  async function handleSubmit(event: React.FormEvent) {

    const apiKey = process.env.REACT_APP_API_KEY;


    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setMessages((messages) =>
      messages.concat({ id: String(Date.now()), type: "user", text: question })
    );
    setQuestion("");

    const { classifications } = await fetch("https://api.cohere.ai/classify", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "large",
        inputs: [question],
        examples: EXAMPLES,
      })
    }).then(res => res.json());

    setMessages((messages) =>
      messages.concat({
        id: String(Date.now()),
        type: "bot",
        text: ANSWERS[classifications[0].prediction as keyof typeof ANSWERS] || ANSWERS["Unknown"]
      })
    );
    setLoading(false);
  }

  useEffect(() => {
    container.current?.scrollTo(0, container.current.scrollHeight)
  }, [messages]);

  return (
    <div className="chat-container">
      <h1>Chatbot</h1>
      <div ref={container} className="chat-bot">
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
        <button disabled={loading} type="submit" className={`button-loading ${loading ? "button-loading" : "button"}`}>Send</button>
      </form>
    </div>
  )
}

export default App
