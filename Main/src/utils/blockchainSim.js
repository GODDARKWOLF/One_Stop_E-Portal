// src/utils/blockchainSim.js
export const simulateBlockchainRecord = () => {
    // simple pseudo-hash: timestamp + random hex
    const rand = Math.random().toString(16).substring(2, 10);
    const timeHex = Date.now().toString(16);
    return `0x${rand}${timeHex}`;
};
