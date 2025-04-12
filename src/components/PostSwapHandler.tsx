import useReferralSwap from "../hooks/useReferralSwap";

const PostSwapHandler = ({ referrer }: { referrer: string }) => {
    const { executeSwap, isLoading, status } = useReferralSwap(referrer);

    return (
        <div style={{ marginTop: "1rem" }}>
            <button className="primary" onClick={executeSwap} disabled={isLoading}>
                {isLoading ? "Swapping..." : "🚀 Auto-Swap This Asset"}
            </button>
            {status && <p style={{ marginTop: "0.5rem" }}>{status}</p>}
        </div>
    );
};

export default PostSwapHandler;
