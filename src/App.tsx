
import React, { useEffect, useRef, useState } from 'react';
import './App.css'

type Message = {
  id: string;
  type: "bot" | "user";
  text: React.ReactNode;
}

const ANSWERS = {
  Introduction: (
    <p>Soy simon</p>
  ),
  Experience: (
    <p>Soy experience</p>
  ),
  Contact: (
    <p>Soy Contact</p>
  ),
  Projects: (
    <p>Soy Projects</p>
  ),
  Personal: (
    <p>Soy Personal</p>
  ),
  Unknown: (
    <p>Soy Unknown</p>
  )
}
const EXAMPLES = [{ "text": "Hi", "label": "Introduction" }, { "text": "Who are you?", "label": "Introduction" }, { "text": "Want to work with you", "label": "Introduction" }, { "text": "Where are you from?", "label": "Introduction" }, { "text": "Are you looking a job?", "label": "Introduction" }, { "text": "Wich technology do you use?", "label": "Experience" }, { "text": "What languaje do you know?", "label": "Experience" }, { "text": "Where i can reach you?", "label": "Contact" }, { "text": "How is your LinkedIn profile?", "label": "Contact" }, { "text": "How is your GitHub profile?", "label": "Contact" }, { "text": "When you start programming?", "label": "Experience" }, { "text": "What inspired you to pursue a career in this field?", "label": "Experience" }, { "text": "Can you tell me what\'s your bigges project so far?", "label": "Projects" }, { "text": "What are your strenghts and weaknesses as a developer?", "label": "Personal" }, { "text": "dasdad", "label": "Unknown" }, { "text": "Do you have a resumee?", "label": "Contact" }, { "text": "Age of your cats", "label": "Unknown" }, { "text": "Weak and nesses", "label": "Personal" }, { "text": "Wich projects do you have?", "label": "Projects" }]
const API_KEY = ""

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
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "large",
        inputs: ["question"],
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
