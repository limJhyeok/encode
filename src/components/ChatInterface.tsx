import { useState } from "react";
import { getAIResponse } from "../ai/chatAssistant";

const ChatInterface = ({ onClose }: { onClose: () => void }) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<string[]>([]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const reply = await getAIResponse(input);
        setMessages([...messages, `You: ${input}`, `Zorabot: ${reply}`]);
        setInput("");
    };

    return (
        <div className="modal">
            <h3>🤖 Zorabot AI</h3>
            <div style={{ maxHeight: "200px", overflowY: "auto", marginBottom: "1rem" }}>
                {messages.map((msg: string, idx: number) => (
                    <p key={idx}>{msg}</p>
                ))}
            </div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "8px",
                    marginBottom: "0.5rem",
                }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button className="primary" onClick={handleSend}>Send</button>
                <button className="primary" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ChatInterface;
