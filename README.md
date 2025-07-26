# BlockVault  
**Decentralized Image Uploading and Sharing using Blockchain & IPFS**

BlockVault is a decentralized application (dApp) that enables users to securely upload images to IPFS and control access using Ethereum smart contracts. It’s like a decentralized Google Drive where *you* control who gets access to your data.

---

## Features

- **Decentralized Storage**  
  Images are uploaded to IPFS, ensuring tamper-proof and distributed storage.

- **Smart Contract Access Control**  
  Uses Solidity smart contracts deployed on Ethereum to manage permissions and ownership.

- **User-Defined Sharing**  
  Grant or revoke access to your uploaded images to specific Ethereum wallet addresses.

---

## Tech Stack

- **Solidity** – For Ethereum smart contract development  
- **React** – For the front-end interface  
- **Ethers.js** – To interact with Ethereum blockchain from the frontend  
- **IPFS via Pinata** – For decentralized file storage  
- **Hardhat** – Ethereum development and testing framework  

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/AkankshaShinde3/decentralized-image-upload.git 
```

Hardhat Setup (Backend)

# Navigate to the root directory
cd BlockVault

# Install Hardhat dependencies
npm install

# Compile Smart Contracts
npx hardhat compile

Deploy the Smart Contract

# Deploy Smart Contract to a local/test network
npx hardhat run scripts/deploy.js --network <network-name>


React Frontend Setup

# Navigate to the client directory
cd client

# Install React dependencies
npm install

# Start the React application
npm start


