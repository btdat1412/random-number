"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { detectProviderAndConnect } from "../../../services/connectWallet";
import { initializeContract } from "../../../services/lotteryWithWallet";

export default function Home() {
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [address, setAddress] = useState<string>("");
    const [balance, setBalance] = useState<string>("");
    const [players, setPlayers] = useState<string[]>([]);
    const [manager, setManager] = useState<string>("");

    useEffect(() => {
        async function loadAndConnectWallet() {
            try {
                const { provider, signer } = await detectProviderAndConnect();
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

    async function fetchManager() {
        if (contract) {
            try {
                const manager = await contract.manager();
                setManager(manager);
            } catch (error) {
                console.error("Error fetching manager: ", error);
            }
        }
    }

    async function enterLottery() {
        if (contract) {
            try {
                const tx = await contract.enter({
                    value: ethers.parseEther("2"),
                    gasLimit: 300000,
                });
                await tx.wait();
                alert("Entered the lottery successfully!");
            } catch (error) {
                console.error("Error entering lottery:", error);
            }
        }
    }

    async function fetchPlayers() {
        if (contract) {
            try {
                const players = await contract.getPlayers();
                setPlayers(players);
            } catch (error) {
                console.error("Error fetching players: ", error);
            }
        }
    }

    async function pickWinner() {
        if (contract) {
            try {
                const tx = await contract.pickWinner();
                await tx.wait();
                alert("Winner picked successfully!");
            } catch (error) {
                console.error("Error picking winner:", error);
            }
        }
    }

    return (
        <div className="mx-auto max-w-lg p-4">
            <h1 className="mb-4 text-3xl font-bold">Lottery DApp</h1>
            <div className="mb-4">
                <p className="text-sm font-medium text-gray-600">
                    Connected Address:{" "}
                    <span className="text-black">{address}</span>
                </p>
                <p className="text-sm font-medium text-gray-600">
                    Balance: <span className="text-black">{balance} ETH</span>
                </p>
            </div>
            <button
                onClick={fetchManager}
                className="mb-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
                Fetch Manager
            </button>
            <p className="mb-4 text-xl font-semibold">
                Manager: <span className="text-black">{manager}</span>
            </p>
            <div className="mt-4 flex gap-6">
                <button
                    onClick={enterLottery}
                    className="mb-2 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                >
                    Enter Lottery
                </button>
                <button
                    onClick={fetchPlayers}
                    className="mb-2 rounded bg-yellow-500 px-4 py-2 font-bold text-white hover:bg-yellow-700"
                >
                    Get Players
                </button>
                <button
                    onClick={pickWinner}
                    className="mb-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                >
                    Pick Winner
                </button>
            </div>

            <h2 className="mb-2 text-xl font-semibold">Players:</h2>
            <ul className="list-disc pl-5">
                {players.map((player, index) => (
                    <li
                        key={index}
                        className="text-sm font-medium text-gray-800"
                    >
                        {player}
                    </li>
                ))}
            </ul>
        </div>
    );
}
