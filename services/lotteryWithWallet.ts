import { ethers } from "ethers";

const lotteryAddress: string = process.env.NEXT_PUBLIC_LOTTERY_ADDRESS || "0x2d33fd485214d621C4398C4e8613B5b9aBF125b1";

const lotteryABI = [
    {
        inputs: [],
        name: "enter",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "pickWinner",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "getPlayers",
        outputs: [
            {
                internalType: "address[]",
                name: "",
                type: "address[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "manager",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "players",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];

async function initializeContract(signer: ethers.Signer) {
    try {
        const lotteryContract = new ethers.Contract(lotteryAddress, lotteryABI, signer);
        console.log("lotteryContract initialized", lotteryContract);

        return lotteryContract;
    } catch (error: any) { 
        console.error("Error initializing contract: ", error);
        throw error;
    }
}

export { initializeContract };
