"use client";

import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
} from "react";
import { ethers } from "ethers";
import { detectProviderAndConnect } from "../services/connectWallet";
import { initializeContract } from "../services/lotteryWithWallet";

interface WalletContextProps {
    contract: ethers.Contract | null;
    address: string;
    balance: string;
    provider: ethers.BrowserProvider | null;
    signer: ethers.Signer | null;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [address, setAddress] = useState<string>("");
    const [balance, setBalance] = useState<string>("");
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(
        null,
    );
    const [signer, setSigner] = useState<ethers.Signer | null>(null);

    useEffect(() => {
        async function loadAndConnectWallet() {
            try {
                const { provider, signer } = await detectProviderAndConnect();
                setProvider(provider);
                setSigner(signer);

                const address = await signer.getAddress();
                setAddress(address);

                const balance = await provider.getBalance(address);
                setBalance(ethers.formatEther(balance));

                const lotteryContract = await initializeContract(signer);
                setContract(lotteryContract);
            } catch (error) {
                console.error("Error loading wallet: ", error);
            }
        }
        loadAndConnectWallet();
    }, []);

    return (
        <WalletContext.Provider
            value={{ contract, address, balance, provider, signer }}
        >
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
};
