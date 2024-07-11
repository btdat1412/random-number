"use client"

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { initializeContract } from "../../../services/lottery";

const Home: React.FC = () => {
  const [players, setPlayers] = useState<string[]>([]);
  const [manager, setManager] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      console.log('Starting fetchData');
      const lotteryContract = await initializeContract();
      if (lotteryContract) {
        const manager = await lotteryContract.manager();
        const players = await lotteryContract.getPlayers();
        console.log("Manager: ", manager);
        console.log("Players: ", players);
        setManager(manager);
        setPlayers(players);
      } else {
        console.log('Lottery contract does not exist');
      }
    }
    fetchData();
  }, []);

  const enterLottery = async () => {
    const lotteryContract = await initializeContract();
    if (lotteryContract) {
      setMessage("Entering the lottery...");
      try {
        const tx = await lotteryContract.enter({ value: ethers.parseUnits("0.011", "ether") });
        await tx.wait(); // Wait for the transaction to be mined
        setMessage("You have entered the lottery!");
      } catch (error) {
        console.error("Error entering lottery: ", error);
      }
    }
  };

  const pickWinner = async () => {
    const lotteryContract = await initializeContract();
    if (lotteryContract) {
      setMessage("Picking a winner...");
      try {
        const tx = await lotteryContract.pickWinner();
        await tx.wait(); // Wait for the transaction to be mined
        setMessage("A winner has been picked!");
      } catch (error) {
        console.error("Error picking winner: ", error);
      }
    }
  };

  return (
    <div>
      <h1>Lottery Contract</h1>
      <p>This contract is managed by {manager}</p>
      <p>There are currently {players.length} players in the lottery.</p>
      <button onClick={enterLottery}>Enter Lottery</button>
      <button onClick={pickWinner}>Pick Winner</button>
      <h2>{message}</h2>
    </div>
  );
}

export default Home;
