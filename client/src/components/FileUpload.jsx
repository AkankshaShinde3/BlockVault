import { useState } from "react";
import axios from "axios";

const FileUpload = ({ account, provider, contract }) => {
  const [fileName, setFileName] = useState("No image selected");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `e9293af9cb7986e66ac1`,
            pinata_secret_api_key: `24995ac6714b0f4c2b7f2589d831eba17e266e3ce176afe8fc3cb685414ca95c`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        contract.add(account, ImgHash);
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (err) {
        console.log("error in pinata", err);
      }
    }
    alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0]; // array of files object
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-800 shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Label and File Upload Input */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="file-upload"
            className="text-lg font-medium text-gray-300"
          >
            Choose image
          </label>
          <input
            disabled={!account}
            type="file"
            id="file-upload"
            name="data"
            onChange={retrieveFile}
            className="file:border file:border-gray-600 file:rounded-lg file:px-4 file:py-2 file:text-sm file:cursor-pointer bg-gray-700 text-gray-300"
          />
          <span className="text-gray-400">Image: {fileName}</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!file}
          className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:bg-gray-600 hover:bg-blue-700 transition duration-300"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
