// src/components/DMChat.tsx
import { useState } from "react";
import { ChatItem } from "./DMList";
import { getAIResponse } from "../ai/chatAssistant";
import { generateReferralLink } from "../utils/ReferralLogic";
import "../style.css";

const DMChat = ({ chat }: { chat: ChatItem }) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState("");

    const send = async () => {
        if (!input.trim()) return;
        const userMsg = `You: ${input}`;
        setMessages((m) => [...m, userMsg]);

        if (chat.type === "bot") {
            const reply = await getAIResponse(input);
            setMessages((m) => [...m, userMsg, `ZoraBot: ${reply}`]);
        }

        setInput("");
    };

    const shareIdea = () => {
        const ref = generateReferralLink("ZOR", "0xYourAddrHere");
        navigator.clipboard.writeText(ref);
        alert("🔗 Referral link copied!");
    };

    return (
        <div className="dm-chatbox">
            <h4>{chat.name}</h4>
            <div className="chat-log">
                {messages.map((m, i) => (
                    <p key={i}>{m}</p>
                ))}
            </div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="chat-input"
            />
            <div style={{ display: "flex", gap: "0.5rem" }}>
                <button className="primary" onClick={send}>
                    Send
                </button>
                {chat.type === "bot" && (
                    <button className="primary" onClick={shareIdea}>
                        Share Idea 💡
                    </button>
                )}
            </div>
        </div>
    );
};

export default DMChat;
