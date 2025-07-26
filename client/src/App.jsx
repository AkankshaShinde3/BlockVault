import Upload from "./artifacts/contracts/Upload.sol/Upload.json"; // ABI for the contract
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false); // New state for wallet connection

  useEffect(() => {
    if (isWalletConnected) {
      const provider = new ethers.BrowserProvider(window.ethereum); // Updated for v6

      const loadProvider = async () => {
        if (provider) {
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          await provider.send("eth_requestAccounts", []);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);

          const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
          const contract = new ethers.Contract(
            contractAddress,
            Upload.abi,
            signer
          );

          setContract(contract);
          setProvider(provider);
        } else {
          console.error("MetaMask is not installed");
        }
      };

      loadProvider();
    }
  }, [isWalletConnected]); // Run the effect when wallet is connected manually

  const handleConnectWallet = async () => {
    setIsWalletConnected(true); // Manually trigger the wallet connection
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
      <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-4xl font-semibold tracking-tight">BlockVault</h1>
          <p className="text-lg mt-2">
            {account ? `Connected Wallet: ${account}` : "Please connect your wallet"}
          </p>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-6 py-8">
        {/* Connect Wallet Button */}
        {!isWalletConnected && (
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 mb-4 mr-3"
            onClick={handleConnectWallet}
          >
            Connect Wallet
          </button>
        )}

        {/* Share button */}
        {!modalOpen && (
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={() => setModalOpen(true)}
          >
            Share Your File
          </button>
        )}

        {modalOpen && <Modal setModalOpen={setModalOpen} contract={contract} />}

        {/* File Upload and Display */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <FileUpload account={account} provider={provider} contract={contract} />
          </div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <Display contract={contract} account={account} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
