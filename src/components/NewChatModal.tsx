// src/components/NewChatModal.tsx

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useEnsAddress } from "wagmi";

type NewChatModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreateChat: (address: string) => void;
};

export default function NewChatModal({
    isOpen,
    onClose,
    onCreateChat,
}: NewChatModalProps) {
    const [input, setInput] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const shouldResolve = submitted && input.endsWith(".eth");

    const { data: ensResolvedAddress, isLoading, isError } = useEnsAddress({
        name: shouldResolve ? input : undefined,
    });

    const handleSubmit = () => {
        setSubmitted(true);

        if (input.startsWith("0x") && input.length === 42) {
            onCreateChat(input);
            onClose();
        } else if (ensResolvedAddress) {
            onCreateChat(ensResolvedAddress);
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                    <Dialog.Title className="text-lg font-bold mb-2">
                        Start a new chat
                    </Dialog.Title>
                    <input
                        type="text"
                        placeholder="Enter wallet or ENS (e.g. vitalik.eth)"
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            setSubmitted(false);
                        }}
                        className="w-full border px-3 py-2 rounded mb-4"
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800"
                    >
                        {isLoading ? "Resolving ENS..." : "Start Chat"}
                    </button>

                    {submitted && isError && input.endsWith(".eth") && (
                        <p className="text-red-500 mt-2 text-sm">❌ ENS not found</p>
                    )}
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
