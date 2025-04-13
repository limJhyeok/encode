import "./TradeButtons.css";

type Props = {
    onBuy: () => void;
    onSell: () => void;
};

const TradeButtons = ({ onBuy, onSell }: Props) => {
    return (
        <div className="trade-buttons">
            <button className="buy-btn" onClick={onBuy}>Buy</button>
            <button className="sell-btn" onClick={onSell}>Sell</button>
        </div>
    );
};

export default TradeButtons;
