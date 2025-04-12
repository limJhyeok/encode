import { useState } from "react";
import ChatInterface from "./ChatInterface";

const AIAssistantButton = () => {
    const [showChat, setShowChat] = useState(false);

    return (
        <>
            <button className="primary" style={{ position: "fixed", bottom: "1rem", right: "1rem" }} onClick={() => setShowChat(true)}>
                🤖 Ask AI
            </button>
            {showChat && <ChatInterface onClose={() => setShowChat(false)} />}
        </>
    );
};

export default AIAssistantButton;
