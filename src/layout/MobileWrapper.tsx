import "../style.css";

const MobileWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={{ maxWidth: "480px", margin: "0 auto", paddingBottom: "5rem" }}>
            {children}
        </div>
    );
};

export default MobileWrapper;
