// src/components/NewChatModal.tsx
import React from "react";
import "../style.css";

type User = {
    address: string;
    displayName: string;
};

type NewChatModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreateChat: (address: string) => void;
};

const NewChatModal: React.FC<NewChatModalProps> = ({ isOpen, onClose, onCreateChat }) => {
    // Demo list of users to display in the modal
    const demoUsers: User[] = [
        { address: "0x789...c01", displayName: "ArtFan.eth" },
        { address: "0x789...c02", displayName: "PixelPete.eth" },
        { address: "0x789...c03", displayName: "NFTLover.eth" },
        { address: "0x789...c04", displayName: "CryptoKing.eth" },
        { address: "0x789...c05", displayName: "BlockQueen.eth" },
        { address: "0x789...c06", displayName: "DigitalDreamer.eth" },
        { address: "0x789...c07", displayName: "EthEnthusiast.eth" },
        { address: "0x789...c08", displayName: "ChainMaster.eth" },
        { address: "0x789...c09", displayName: "Web3Guru.eth" },
        { address: "0x789...c10", displayName: "CryptoPro.eth" },
    ];

    if (!isOpen) return null;

    const handleUserSelect = (address: string) => {
        onCreateChat(address);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="new-chat-modal">
                <div className="modal-header">
                    <h3>New Chat</h3>
                    <button className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>
                <div className="user-list-container">
                    <ul className="user-list">
                        {demoUsers.map((user, idx) => (
                            <li
                                key={idx}
                                className="user-row"
                                onClick={() => handleUserSelect(user.address)}
                            >
                                <div className="user-info">
                                    <div className="avatar-placeholder"></div>
                                    <div className="user-details">
                                        <span className="name">{user.displayName}</span>
                                        <span className="address">{user.address}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NewChatModal;