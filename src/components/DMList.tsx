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
            <h3 className="dm-header">Messages</h3>
            <ul className="dm-chat-list">
                {chats.map((chat) => (
                    <li
                        key={chat.id}
                        className={`dm-chat-item ${chat.id === selectedId ? "active" : ""}`}
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
