import { useState } from "react";
import CoinList from "../components/CoinList";
import Navbar from "../layout/Navbar";
import ZoraTabBar from "../layout/ZoraTabBar";
import "../style.css";

const AIBotPanel = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState("");

    const handleSend = async () => {
        if (!input.trim()) return;
        const reply = `Zorabot thinks about: ${input}`; // TODO: Replace with real AI
        setMessages((prev) => [...prev, `You: ${input}`, `🤖 Zorabot: ${reply}`]);
        setInput("");
    };

    return (
        <>
            <Navbar />
            <div className="ai-panel">
                <h2>🤖 Zorabot AI</h2>

                <div className="ai-messages">
                    {messages.map((msg, idx) => (
                        <p key={idx}>{msg}</p>
                    ))}
                </div>

                <input
                    className="ai-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Zorabot anything..."
                />
                <button className="primary" onClick={handleSend}>
                    Send
                </button>

                <div style={{ marginTop: "2rem" }}>
                    <CoinList />
                </div>
            </div>
            <ZoraTabBar />
        </>
    );
};

export default AIBotPanel;
