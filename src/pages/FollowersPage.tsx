import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import "../style.css";

type User = {
    address: string;
    displayName: string;
};

const FollowersPage: React.FC = () => {
    const { address } = useAccount();

    const [followings, setFollowings] = useState<User[]>([]);
    const [holdings, setHoldings] = useState<User[]>([]);
    const [investors, setInvestors] = useState<User[]>([]);

    useEffect(() => {
        if (!address) return;

        setFollowings([
            { address: "0x123...a01", displayName: "zorb.eth" },
            { address: "0x123...a02", displayName: "artfan.eth" },
            { address: "0x123...a03", displayName: "pixelpete.eth" },
            { address: "0x123...a04", displayName: "nftlover.eth" },
            { address: "0x123...a05", displayName: "cryptoking.eth" },
            { address: "0x123...a06", displayName: "blockqueen.eth" },
            { address: "0x123...a07", displayName: "digitaldreamer.eth" },
            { address: "0x123...a08", displayName: "ethenthusiast.eth" },
            { address: "0x123...a09", displayName: "chainmaster.eth" },
            { address: "0x123...a10", displayName: "web3guru.eth" },
        ]);

        setHoldings([
            { address: "0xaaa...111", displayName: "ethgirl.eth" },
            { address: "0xaaa...112", displayName: "nftqueen.eth" },
            { address: "0xaaa...113", displayName: "artcollector.eth" },
            { address: "0xaaa...114", displayName: "pixelmaster.eth" },
            { address: "0xaaa...115", displayName: "cryptofan.eth" },
            { address: "0xaaa...116", displayName: "blocklord.eth" },
            { address: "0xaaa...117", displayName: "digitalartist.eth" },
            { address: "0xaaa...118", displayName: "ethpro.eth" },
            { address: "0xaaa...119", displayName: "chainexpert.eth" },
            { address: "0xaaa...120", displayName: "web3pro.eth" },
        ]);

        setInvestors([
            { address: "0x333...444", displayName: "0xInvestX" },
            { address: "0x333...445", displayName: "0xCryptoKing" },
            { address: "0x333...446", displayName: "0xNFTInvestor" },
            { address: "0x333...447", displayName: "0xArtFunder" },
            { address: "0x333...448", displayName: "0xPixelBacker" },
            { address: "0x333...449", displayName: "0xCryptoSupporter" },
            { address: "0x333...450", displayName: "0xBlockFunder" },
            { address: "0x333...451", displayName: "0xDigitalInvestor" },
            { address: "0x333...452", displayName: "0xEthBacker" },
            { address: "0x333...453", displayName: "0xWeb3Funder" },
        ]);
    }, [address]);

    return (
        <div className="main-content">
            <div className="page-container followers-page">
                <h2>Your Network</h2>

                {/* 🔐 Sign in section */}
                <div className="zora-signin-section">
                    <button className="zora-signin-btn">Sign in with your Zora account</button>
                </div>

                <div className="followers-grid">
                    <Section title="Followings" users={followings} />
                    <Section title="Holdings" users={holdings} />
                    <Section title="Investors" users={investors} />
                </div>
            </div>
        </div>
    );
};

const Section = ({ title, users }: { title: string; users: User[] }) => (
    <div className="followers-section">
        <h3>{title}</h3>
        {users.length === 0 ? (
            <p className="no-users">No {title.toLowerCase()} found.</p>
        ) : (
            <ul className="user-list">
                {users.map((user, idx) => (
                    <li key={idx} className="user-row">
                        <div className="user-info">
                            <div className="avatar-placeholder"></div>
                            <div className="user-details">
                                <span className="name">{user.displayName}</span>
                                <span className="address">{user.address}</span>
                            </div>
                        </div>
                        <button className="follow-btn">Follow</button>
                        <button className="message-btn">Message</button>
                    </li>
                ))}
            </ul>
        )}
    </div>
);

export default FollowersPage;
