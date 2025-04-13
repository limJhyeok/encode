import "../style.css";
import Header from "../layout/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAccount } from "wagmi";
import NewChatModal from "../components/NewChatModal";
import { useEnsName } from "wagmi";
import TradeButtons from "../components/TradeButtons";
import toast from "react-hot-toast";

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
    const { address } = useAccount();
    const currentUser =
        address || localStorage.getItem("walletAddress") || "you.eth";
    const { data: ensName } = useEnsName({ address });

    const [selectedChat, setSelectedChat] = useState("Zorara (AI Bot)");
    const [messageInput, setMessageInput] = useState("");
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const containsTradeAction = (text: string) => {
        return text.toLowerCase().includes("buy") || text.toLowerCase().includes("sell");
    };

    useEffect(() => {
        console.log("isModalOpen state changed:", isModalOpen);
    }, [isModalOpen]);

    const [chats, setChats] = useState<Chat[]>(() => {
        const savedChats = localStorage.getItem("chats");
        if (savedChats) {
            return JSON.parse(savedChats);
        }
        return [
            {
                name: "Zorara (AI Bot)",
                lastMessage: "NFTs are unique digital assets on the blockchain...",
                time: "10:33 AM",
                messages: [
                    {
                        sender: "Zorara (AI Bot)",
                        text: "Hey, how can I help you today?",
                        time: "10:30 AM",
                    },
                    {
                        sender: "you.eth",
                        text: "Tell me about NFTs!",
                        time: "10:32 AM",
                    },
                    {
                        sender: "Zorara (AI Bot)",
                        text: "NFTs are unique digital assets on the blockchain...",
                        time: "10:33 AM",
                    },
                    {
                        sender: "you.eth",
                        text: "Cool, how do I buy one?",
                        time: "10:34 AM",
                    },
                ],
            },
            // ... other default chats unchanged
        ];
    });

    useEffect(() => {
        localStorage.setItem("chats", JSON.stringify(chats));
    }, [chats]);

    const selectedChatData = chats.find((chat) => chat.name === selectedChat);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    const handleSend = async () => {
        if (!messageInput.trim()) return;

        const now = formatTime(new Date());
        const newMessage: Message = {
            sender: currentUser,
            text: messageInput,
            time: now,
        };

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
                const res = await axios.post(
                    "http://localhost:8000/api/chat",
                    {
                        message: messageInput,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const reply = res.data.reply || "🤖 (No response)";
                const botMessage: Message = {
                    sender: "Zorara (AI Bot)",
                    text: reply,
                    time: formatTime(new Date()),
                };

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
            try {
                await axios.post("http://localhost:8000/api/message", {
                    sender: currentUser,
                    receiver: selectedChat,
                    message: messageInput,
                });
            } catch (err) {
                console.error("❌ Failed to send real user message:", err);
            }
        }
    };

    const handleNewChat = (address: string) => {
        const now = formatTime(new Date());

        const existingChat = chats.find((chat) => chat.name === address);
        if (!existingChat) {
            const newChat: Chat = {
                name: address,
                lastMessage: "",
                time: now,
                messages: [],
            };
            setChats((prev) => [...prev, newChat]);
        }

        setSelectedChat(address);
    };

    return (
        <div className="main-content">
            <div className="page-container dm-page">
                <div className="dm-container">
                    {/* Chat Sidebar */}
                    <div className="chat-sidebar">
                        <div className="chat-sidebar-header">
                            <h3>Messages</h3>
                            <button
                                onClick={() => {
                                    console.log("Opening modal, setting isModalOpen to true");
                                    setIsModalOpen(true);
                                }}
                                className="add-friend-btn"
                            >
                                +
                            </button>
                        </div>
                        <div className="chat-list">
                            {chats
                                .sort((a, b) => (a.name === "Zorara (AI Bot)" ? -1 : 1))
                                .map((chat) => (
                                    <div
                                        key={chat.name}
                                        className={`chat-preview ${selectedChat === chat.name ? "active" : ""
                                            }`}
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
                                    {selectedChatData.messages.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`message ${message.sender === "you.eth" ||
                                                message.sender === currentUser
                                                ? "message-right"
                                                : "message-left"
                                                }`}
                                        >
                                            <p>
                                                <strong>
                                                    {message.sender === currentUser ||
                                                        message.sender === "you.eth"
                                                        ? "You"
                                                        : message.sender}
                                                </strong>
                                                : {message.text}
                                            </p>
                                            <span className="message-time">{message.time}</span>

                                            {/* ✅ Add Trade Buttons when AI mentions buy/sell */}
                                            {message.sender === "Zorara (AI Bot)" &&
                                                containsTradeAction(message.text) && (
                                                    <TradeButtons
                                                        onBuy={() => toast.success("Buy action (mocked)")}
                                                        onSell={() => toast.success("Sell action (mocked)")}
                                                    />
                                                )}
                                        </div>
                                    ))}
                                    {isBotTyping &&
                                        selectedChat === "Zorara (AI Bot)" && (
                                            <div className="message message-left">
                                                <p>
                                                    <strong>Zorara (AI Bot)</strong>:{" "}
                                                    <em>typing...</em>
                                                </p>
                                                <span className="message-time">
                                                    {formatTime(new Date())}
                                                </span>
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

                <NewChatModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onCreateChat={handleNewChat}
                />
            </div>
        </div>
    );
};

export default DMPage;
