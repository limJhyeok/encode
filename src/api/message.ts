// src/api/message.ts
const API_BASE = "http://localhost:8000/api";

export async function getChats(userId: string) {
    const res = await fetch(`${API_BASE}/message/${userId}`);
    return res.json();
}

export async function getChatWith(userId: string, receiverId: string) {
    const res = await fetch(`${API_BASE}/message/${userId}/${receiverId}`);
    return res.json();
}

export async function sendMessage(sender: string, receiver: string, message: string) {
    const res = await fetch(`${API_BASE}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender, receiver, message }),
    });
    return res.json();
}
