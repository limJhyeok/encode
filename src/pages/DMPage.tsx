import Header from "../layout/Header";
import "../style.css";
import { useEffect, useState } from "react";
import axios from "axios";

type Message = {
    sender: string;
    text: string;
    time: string;
};

type Chat = {
    name: string;
    lastMessage: string;
    time: string;
    messages: Message[];
};

const DMPage = () => {
    const currentUser = localStorage.getItem("walletAddress") || "you.eth";
    const [selectedChat, setSelectedChat] = useState("Zorara (AI Bot)");
    const [messageInput, setMessageInput] = useState("");
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [chats, setChats] = useState<Chat[]>([
        {
            name: "Zorara (AI Bot)",
            lastMessage: "Hey, how can I help you today?",
            time: "10:30 AM",
            messages: [
                { sender: "Zorara (AI Bot)", text: "Hey, how can I help you today?", time: "10:30 AM" },
                { sender: currentUser, text: "Tell me about NFTs!", time: "10:32 AM" },
                { sender: "Zorara (AI Bot)", text: "NFTs are unique digital assets on the blockchain...", time: "10:33 AM" },
            ],
        },
    ]);

    const selectedChatData = chats.find((chat) => chat.name === selectedChat);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    const handleSend = async () => {
        if (!messageInput.trim()) return;

        const now = formatTime(new Date());
        const newMessage: Message = { sender: currentUser, text: messageInput, time: now };

        const updatedChats = chats.map((chat) => {
            if (chat.name === selectedChat) {
                return {
                    ...chat,
                    messages: [...chat.messages, newMessage],
                    lastMessage: messageInput,
                    time: now,
                };
            }
            return chat;
        });

        setChats(updatedChats);
        setMessageInput("");

        if (selectedChat === "Zorara (AI Bot)") {
            setIsBotTyping(true);
            try {
                const res = await axios.post("http://localhost:8000/api/chat", {
                    message: messageInput,
                });

                const reply = res.data.reply || "🤖 (No response)";
                const botMessage: Message = { sender: "Zorara (AI Bot)", text: reply, time: formatTime(new Date()) };

                setChats((prevChats) =>
                    prevChats.map((chat) =>
                        chat.name === "Zorara (AI Bot)"
                            ? {
                                ...chat,
                                messages: [...chat.messages, botMessage],
                                lastMessage: reply,
                                time: formatTime(new Date()),
                            }
                            : chat
                    )
                );
            } catch (err) {
                console.error("❌ Bot reply error:", err);
            } finally {
                setIsBotTyping(false);
            }
        } else {
            // TODO: send to real user via /api/message
        }
    };

    return (
        <div className="main-content">
            <Header />
            <div className="page-container dm-page">
                <div className="dm-container">
                    {/* Chat Sidebar */}
                    <div className="chat-sidebar">
                        <h3>Messages</h3>
                        <div className="chat-list">
                            {chats
                                .sort((a, b) => (a.name === "Zorara (AI Bot)" ? -1 : 1)) // Keep AI pinned on top
                                .map((chat) => (
                                    <div
                                        key={chat.name}
                                        className={`chat-preview ${selectedChat === chat.name ? "active" : ""}`}
                                        onClick={() => setSelectedChat(chat.name)}
                                    >
                                        <div className="chat-info">
                                            <h4>{chat.name}</h4>
                                            <p>{chat.lastMessage}</p>
                                        </div>
                                        <span className="chat-time">{chat.time}</span>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Main Chat Area */}
                    <div className="chat-main">
                        {selectedChatData ? (
                            <>
                                <div className="chat-header">
                                    <h3>{selectedChatData.name}</h3>
                                </div>
                                <div className="chat-messages">
                                    {selectedChatData.messages.map((message: Message, index: number) => (
                                        <div
                                            key={index}
                                            className={`message ${message.sender === currentUser ? "message-right" : "message-left"
                                                }`}
                                        >
                                            <p>
                                                <strong>{message.sender}</strong>: {message.text}
                                            </p>
                                            <span className="message-time">{message.time}</span>
                                        </div>
                                    ))}
                                    {isBotTyping && selectedChat === "Zorara (AI Bot)" && (
                                        <div className="message message-left">
                                            <p>
                                                <strong>Zorara (AI Bot)</strong>: <em>typing...</em>
                                            </p>
                                            <span className="message-time">{formatTime(new Date())}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="chat-input">
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        className="message-input"
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") handleSend();
                                        }}
                                    />
                                    <button className="send-btn" onClick={handleSend}>
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="no-chat-selected">
                                <p>Select a chat to start messaging</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DMPage;
