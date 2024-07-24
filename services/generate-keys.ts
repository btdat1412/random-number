import { ec as EC } from "elliptic";

export const generateKeys = () => {
    const ec = new EC("secp256k1");

    const keyPair = ec.genKeyPair();

    // Convert the keys to hex strings
    const privateKey = keyPair.getPrivate("hex");
    const publicKey = keyPair.getPublic("hex");

    // Create JSON object
    return {
        privateKey,
        publicKey,
    };
};
