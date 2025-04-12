// src/swap.ts
import { parseUnits } from 'viem';
import { writeContract, waitForTransactionReceipt } from '@wagmi/core';
import { config } from '../wagmiConfig';
import { erc20Abi } from 'viem';

import {
    AlphaRouter,
    SwapType,
    SwapOptionsSwapRouter02,
} from '@uniswap/smart-order-router';

import {
    Token,
    CurrencyAmount,
    TradeType,
    Percent,
    ChainId,
} from '@uniswap/sdk-core';

import { ethers } from 'ethers'; // ✅ Correct for Ethers v6

// ✅ Use JsonRpcProvider directly with Ethers v6
const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');

// ✅ AlphaRouter still expects a compatible provider object
const router = new AlphaRouter({
    chainId: ChainId.MAINNET,
    provider: provider as any, // 👈 Cast to 'any' to satisfy AlphaRouter’s typing
});

export async function getSwapRoute(
    tokenIn: Token,
    tokenOut: Token,
    amountIn: string,
    slippageTolerance: number,
    recipient: string
) {
    const amount = CurrencyAmount.fromRawAmount(
        tokenIn,
        parseUnits(amountIn, tokenIn.decimals).toString()
    );

    const options: SwapOptionsSwapRouter02 = {
        recipient,
        slippageTolerance: new Percent(slippageTolerance, 10000),
        deadline: Math.floor(Date.now() / 1000 + 1800),
        type: SwapType.SWAP_ROUTER_02,
    };

    const route = await router.route(amount, tokenOut, TradeType.EXACT_INPUT, options);
    return route;
}

export type SwapResult = {
    hash: `0x${string}`;
    simulated?: boolean;
};

export const performSwap = async ({
    tokenAddress,
    amount,
    userAddress,
    real = false,
}: {
    tokenAddress: `0x${string}`;
    amount: string;
    userAddress: `0x${string}`;
    real?: boolean;
}): Promise<SwapResult> => {
    const value = parseUnits(amount, 18);

    if (!real) {
        return {
            hash: `0xfake${Math.floor(Math.random() * 100000).toString(16)}` as `0x${string}`,
            simulated: true,
        };
    }

    const txHash = await writeContract(config, {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'transfer',
        args: [userAddress, value],
    });

    await waitForTransactionReceipt(config, {
        hash: txHash,
    });

    return {
        hash: txHash,
    };
};
