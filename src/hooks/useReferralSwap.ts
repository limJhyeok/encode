import { useState } from "react";

const useReferralSwap = (referrer: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("");

    const executeSwap = async () => {
        setIsLoading(true);
        setStatus("");

        try {
            await new Promise((res) => setTimeout(res, 2000)); // Simulate
            setStatus(`✅ Swap executed! 10% sent to referrer: ${referrer.slice(0, 6)}...`);
        } catch (err) {
            setStatus("❌ Swap failed");
        } finally {
            setIsLoading(false);
        }
    };

    return { executeSwap, isLoading, status };
};

export default useReferralSwap;
