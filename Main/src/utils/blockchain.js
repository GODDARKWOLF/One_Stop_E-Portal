// src/utils/blockchain.js
const CHAIN_KEY = 'sim_blockchain_v1'

// simple non-crypto "hash" for demo
export const hashBlock = (block) => {
    try {
        // base64-ish fingerprint, trimmed for display
        return btoa(JSON.stringify(block)).replace(/=+$/, '').slice(0, 20)
    } catch {
        return String(Math.random()).slice(2, 14)
    }
}

export function loadChain() {
    try {
        const raw = localStorage.getItem(CHAIN_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

export function saveChain(chain) {
    localStorage.setItem(CHAIN_KEY, JSON.stringify(chain))
}

export function addBlock({ user, action, metadata = {} }) {
    const chain = loadChain()
    const prev = chain.length ? chain[chain.length - 1].hash : '0'
    const block = {
        index: chain.length + 1,
        timestamp: new Date().toISOString(),
        user,
        action,
        metadata,
        previousHash: prev
    }
    block.hash = hashBlock(block)
    const next = [...chain, block]
    saveChain(next)
    return block
}

export function clearChain() {
    localStorage.removeItem(CHAIN_KEY)
}
