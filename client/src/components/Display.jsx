import { useState } from "react";

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");

  const getData = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;

    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        // Retrieves data for the specified address
      } else {
        dataArray = await contract.display(account);
        // Retrieves data for the connected account
      }
    } catch (e) {
      alert("You don't have access !!!");
    }

    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");

      const images = str_array.map((item, i) => {
        const ipfsHash = item.substring(6);
        const ipfsGatewayUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
        console.log(ipfsGatewayUrl)

      return (
        <a
          href={ipfsGatewayUrl}
          key={i}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-2"
        >
          <img
            src={ipfsGatewayUrl}
            alt={`Uploaded #${i + 1}`}
            className="w-48 h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out"
          />
        </a>
      );

      });

      setData(images);
    } else {
      alert("No image to display");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4 bg-gray-800 text-white rounded-lg shadow-lg">
      {/* Input Field */}
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          className="address border border-gray-600 rounded-lg p-3 text-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Wallet Address"
        />
      </div>

      {/* Button */}
      <div className="flex justify-center">
        <button
          onClick={getData}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Get Data
        </button>
      </div>

      {/* Display Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {data}
      </div>
    </div>
  );
};

export default Display;
