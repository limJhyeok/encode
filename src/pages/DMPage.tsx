// src/pages/DMPage.tsx
import React, { useState } from "react";
import Header from "../layout/Header";
import "../style.css";

const DMPage = () => {
    const [selectedChat, setSelectedChat] = useState("Zorara (AI Bot)");

    const chats = [
        {
            name: "Zorara (AI Bot)",
            lastMessage: "Hey, how can I help you today?",
            time: "10:30 AM",
            messages: [
                { sender: "Zorara (AI Bot)", text: "Hey, how can I help you today?", time: "10:30 AM" },
                { sender: "You", text: "Tell me about NFTs!", time: "10:32 AM" },
                { sender: "Zorara (AI Bot)", text: "NFTs are unique digital assets on the blockchain...", time: "10:33 AM" },
            ],
        },
        {
            name: "alex.eth",
            lastMessage: "Check out this new NFT drop!",
            time: "9:15 AM",
            messages: [
                { sender: "alex.eth", text: "Check out this new NFT drop!", time: "9:15 AM" },
                { sender: "You", text: "Looks awesome, I’ll take a look!", time: "9:20 AM" },
            ],
        },
        {
            name: "nina.eth",
            lastMessage: "Are you joining the auction?",
            time: "Yesterday",
            messages: [
                { sender: "nina.eth", text: "Are you joining the auction?", time: "Yesterday" },
                { sender: "You", text: "Yeah, I’ll be there!", time: "Yesterday" },
            ],
        },
        {
            name: "NFT Collectors",
            lastMessage: "Group: New event announced!",
            time: "2 days ago",
            messages: [
                { sender: "alex.eth", text: "New event announced!", time: "2 days ago" },
                { sender: "nina.eth", text: "I’m in! Who else?", time: "2 days ago" },
                { sender: "You", text: "Count me in!", time: "2 days ago" },
            ],
        },
    ];

    const selectedChatData = chats.find((chat) => chat.name === selectedChat);

    return (
        <div className="main-content">
            <Header />
            <div className="page-container dm-page">
                <div className="dm-container">
                    {/* Left Sidebar: Chat Previews */}
                    <div className="chat-sidebar">
                        <h3>Messages</h3>
                        <div className="chat-list">
                            {chats.map((chat) => (
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

                    {/* Right Main Area: Selected Chat */}
                    <div className="chat-main">
                        {selectedChatData ? (
                            <>
                                <div className="chat-header">
                                    <h3>{selectedChatData.name}</h3>
                                </div>
                                <div className="chat-messages">
                                    {selectedChatData.messages.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`message ${message.sender === "You" ? "message-right" : "message-left"
                                                }`}
                                        >
                                            <p>
                                                <strong>{message.sender}</strong>: {message.text}
                                            </p>
                                            <span className="message-time">{message.time}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="chat-input">
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        className="message-input"
                                    />
                                    <button className="send-btn">Send</button>
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