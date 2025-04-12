// src/components/DMList.tsx
import "../style.css";

export type ChatItem = {
    id: string;
    name: string;
    type: "user" | "bot" | "group";
};

const DMList = ({
    chats,
    selectedId,
    onSelect,
}: {
    chats: ChatItem[];
    selectedId: string;
    onSelect: (c: ChatItem) => void;
}) => {
    return (
        <aside className="dm-sidebar">
            <h3>💬 Messages</h3>
            <ul className="chat-list">
                {chats.map((chat) => (
                    <li
                        key={chat.id}
                        className={`chat-item ${selectedId === chat.id ? "active" : ""}`}
                        onClick={() => onSelect(chat)}
                    >
                        {chat.name}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default DMList;
