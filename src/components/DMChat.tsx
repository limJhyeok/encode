import { useState } from "react";
import { ChatItem } from "./DMList";
import { getAIResponse } from "../ai/chatAssistant";
import { generateReferralLink } from "../utils/ReferralLogic";
import "../style.css";

const DMChat = ({ chat }: { chat: ChatItem }) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<string[]>([]);

    const send = async () => {
        if (!input.trim()) return;
        const userMessage = `You: ${input}`;
        setMessages((prev) => [...prev, userMessage]);

        if (chat.type === "bot") {
            const response = await getAIResponse(input);
            setMessages((prev) => [...prev, userMessage, `ZoraBot: ${response}`]);
        }

        setInput("");
    };

    const share = () => {
        const link = generateReferralLink("ZOR", "0xYourAddress");
        navigator.clipboard.writeText(link);
        alert("📎 Referral link copied!");
    };

    return (
        <section className="dm-chatbox">
            <h3 className="chat-title">{chat.name}</h3>
            <div className="chat-log">
                {messages.map((msg, i) => (
                    <p key={i}>{msg}</p>
                ))}
            </div>
            <div className="chat-input-row">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="chat-input"
                    placeholder="Type a message..."
                />
                <button onClick={send} className="primary">Send</button>
                {chat.type === "bot" && (
                    <button onClick={share} className="primary">Share</button>
                )}
            </div>
        </section>
    );
};

export default DMChat;
