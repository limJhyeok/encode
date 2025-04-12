
import { generateReferralLink } from "../utils/ReferralLogic";
import { useAccount } from "wagmi";

const SharePanel = () => {
    const { address } = useAccount();
    const handleShare = () => {
        if (!address) return alert("Connect wallet");
        const link = generateReferralLink("ZORA", address);
        navigator.clipboard.writeText(link);
        alert("Referral link copied!");
    };

    return (
        <div style={{ marginTop: "2rem" }}>
            <h3>🔗 Share & Earn</h3>
            <button className="primary" onClick={handleShare}>Copy Referral Link</button>
        </div>
    );
};

export default SharePanel;
