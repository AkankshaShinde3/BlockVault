import { useEffect, useRef } from "react";

const Modal = ({ setModalOpen, contract }) => {
  const addressRef = useRef();

  const sharing = async () => {
    const address = addressRef.current.value;
    await contract.allow(address);
  };

  const stopSharing = async () => {
    const address = addressRef.current.value;
    await contract.disallow(address);
  };

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector(`#selectNumber`);
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };

    contract && accessList();
  }, [contract]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-center">Manage Access</h2>

        <div className="flex flex-col space-y-4">
          <input
            ref={addressRef}
            type="text"
            className="address-input border border-gray-600 rounded-lg p-3 text-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter address"
          />

          <select
            id="selectNumber"
            className="address-select border border-gray-600 rounded-lg p-3 text-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option className="address">People with Access</option>
          </select>
        </div>

        <div className="flex justify-between mt-6 space-x-4">
          <button
            onClick={() => setModalOpen(false)}
            className="cancel-btn bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={sharing}
            className="share-btn bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Share
          </button>
          <button
            onClick={stopSharing}
            className="revoke-btn bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Revoke Access
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
