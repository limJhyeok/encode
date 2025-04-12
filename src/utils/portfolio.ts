// src/utils/portfolio.ts
import { createPublicClient, getContract, http } from "viem";
import { mainnet } from "viem/chains";
import erc20Abi from "../erc20_abi.json"; // ✅ Make sure it's the simple ERC20 ABI

const client = createPublicClient({
    chain: mainnet,
    transport: http(),
});

export async function getTokenBalance(
    tokenAddress: `0x${string}`,
    userAddress: `0x${string}`
): Promise<number> {
    const contract = getContract({
        address: tokenAddress,
        abi: erc20Abi,
        client,
    });

    const balance = await contract.read.balanceOf([userAddress] as const);
    const decimals = await contract.read.decimals();

    return Number(balance) / 10 ** Number(decimals);
}
