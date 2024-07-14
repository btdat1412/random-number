import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

async function detectProviderAndConnect() {
    try {
        // Detect MetaMask provider
        const detectedProvider: any = await detectEthereumProvider();
        if (!detectedProvider) {
            throw new Error("MetaMask is not installed");
        }

        // Request account access if needed
        await detectedProvider.request({ method: "eth_requestAccounts" });

        // Connect to MetaMask provider
        const provider = new ethers.BrowserProvider(detectedProvider);

        // Get the signer
        const signer = await provider.getSigner();

        return { provider, signer };
    } catch (error: any) {
        console.error("Error connecting to MetaMask: ", error);
        throw error;
    }
}

export { detectProviderAndConnect };
