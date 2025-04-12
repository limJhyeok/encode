// src/pages/DMPage.tsx
import { useState } from "react";
import DMList, { ChatItem } from "../components/DMList";
import DMChat from "../components/DMChat";
import "../style.css";

const mockChats: ChatItem[] = [
    { id: "ai", name: "ZoraBot AI", type: "bot" },
    { id: "fr1", name: "0xFriendA", type: "user" },
    { id: "gr1", name: "Alpha Traders", type: "group" },
    { id: "fr2", name: "0xZoraMaxi", type: "user" },
];

const DMPage = () => {
    const [selectedChat, setSelectedChat] = useState<ChatItem>(mockChats[0]);

    return (
        <div className="dm-page">
            <DMList chats={mockChats} selectedId={selectedChat.id} onSelect={setSelectedChat} />
            <DMChat chat={selectedChat} />
        </div>
    );
};

export default DMPage;
