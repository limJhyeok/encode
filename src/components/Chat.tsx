import React, { useState } from "react";
import { useAccount } from "wagmi";

type Message = {
    from: string;
    text: string;
    timestamp: string;
};

type Chat = {
    id: string;
    name: string;
    participants: string[];
    messages: Message[];
};

const mockChats: Chat[] = [
    {
        id: "group1",
        name: "🌍 Zora Traders",
        participants: ["0xYou", "0x123", "0xabc"],
        messages: [
            { from: "0x123", text: "🚀 Just bought some $ZORA", timestamp: "10:00 AM" },
            { from: "0xabc", text: "Holding for the moon 🌙", timestamp: "10:02 AM" },
        ],
    },
    {
        id: "dm1",
        name: "💬 DM with 0x456",
        participants: ["0xYou", "0x456"],
        messages: [
            { from: "0x456", text: "You check out $ZoraNFT yet?", timestamp: "Yesterday" },
        ],
    },
];

const Chat: React.FC = () => {
    const { address } = useAccount();
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [newMessage, setNewMessage] = useState("");

    const handleSend = () => {
        if (!newMessage.trim() || !selectedChat || !address) return;

        const newMsg: Message = {
            from: address,
            text: newMessage,
            timestamp: new Date().toLocaleTimeString(),
        };

        selectedChat.messages.push(newMsg);
        setNewMessage("");
    };

    return (
        <div style={{ color: "white", padding: "1rem", marginTop: "2rem" }}>
            <h3 style={{ fontSize: "1.2rem" }}>💬 Chat</h3>

            {!selectedChat ? (
                <div>
                    <p>Select a chat to open:</p>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {mockChats.map((chat) => (
                            <li key={chat.id}>
                                <button
                                    onClick={() => setSelectedChat({ ...chat })}
                                    style={{
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid white",
                                        padding: "0.5rem",
                                        borderRadius: "8px",
                                        margin: "0.5rem 0",
                                        cursor: "pointer",
                                        width: "100%",
                                        textAlign: "left",
                                        color: "white",
                                    }}
                                >
                                    {chat.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    <button
                        onClick={() => setSelectedChat(null)}
                        style={{
                            marginBottom: "1rem",
                            background: "transparent",
                            border: "1px solid #fff",
                            color: "white",
                            padding: "0.3rem 0.75rem",
                            borderRadius: "8px",
                        }}
                    >
                        ← Back to chats
                    </button>
                    <h4>{selectedChat.name}</h4>
                    <div
                        style={{
                            background: "rgba(255,255,255,0.08)",
                            padding: "1rem",
                            borderRadius: "8px",
                            maxHeight: "300px",
                            overflowY: "auto",
                            marginBottom: "1rem",
                        }}
                    >
                        {selectedChat.messages.map((msg, idx) => (
                            <p key={idx}>
                                <strong>{msg.from.slice(0, 6)}:</strong> {msg.text}{" "}
                                <span style={{ fontSize: "0.75rem", color: "#ccc" }}>
                                    ({msg.timestamp})
                                </span>
                            </p>
                        ))}
                    </div>

                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message"
                        style={{
                            padding: "0.5rem",
                            width: "70%",
                            borderRadius: "8px",
                            border: "1px solid white",
                            background: "#111",
                            color: "white",
                            marginRight: "0.5rem",
                        }}
                    />
                    <button
                        onClick={handleSend}
                        style={{
                            padding: "0.5rem 1rem",
                            borderRadius: "8px",
                            border: "none",
                            background: "#4CAF50",
                            color: "white",
                        }}
                    >
                        Send
                    </button>
                </div>
            )}
        </div>
    );
};

export default Chat;
