import { useState } from "react";
import { ChatItem } from "./DMList";
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
            const response = await sendMessageToAI(input); // uses your API
            setMessages((prev) => [...prev, `ZoraBot: ${response}`]);
        }

        setInput("");
    };

    const share = () => {
        const link = generateReferralLink("ZOR", "0xYourAddress");
        navigator.clipboard.writeText(link);
        alert("📎 Referral link copied!");
    };

    const sendMessageToAI = async (message: string) => {
        const res = await fetch("http://localhost:8000/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        const data = await res.json();
        return data.reply;
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
