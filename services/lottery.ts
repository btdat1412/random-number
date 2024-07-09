import { ethers } from "ethers";

// Replace this with your deployed contract address on Ganache
const lotteryAddress: string = "0x2d33fd485214d621C4398C4e8613B5b9aBF125b1";

// ABI of your Lottery contract
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

let provider: ethers.JsonRpcProvider | undefined;
let signer: ethers.Wallet | undefined;
let lotteryContract: ethers.Contract | undefined;

async function initializeContract() {
    try {
        // Connect to the Ganache provider
        provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

        // Use one of Ganache's default accounts
        const privateKey = "0x73d12900ce553f2a7d57850063e2cb868c7f8c0ce404e60c52296fd7ca30f3c3";
        signer = new ethers.Wallet(privateKey, provider);

        // Initialize the contract
        lotteryContract = new ethers.Contract(
            lotteryAddress,
            lotteryABI,
            signer,
        );
        console.log("lotteryContract initialized", lotteryContract);
    } catch (error: any) {
        console.error("Error initializing contract: ", error);
    }

    return lotteryContract;
}

export { initializeContract };
