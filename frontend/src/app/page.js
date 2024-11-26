"use client"

import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }
    uploadFile(selectedFile);
  };

  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("http://localhost:3333/parse", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob", // Important: This tells Axios to handle the response as a file (binary data)
      });

      // Create a URL for the downloaded file and trigger a download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${file.name.split(".")[0]}_processed.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      alert("File processed and downloaded successfully!");
    } catch (error) {
      console.error("Error uploading or downloading file:", error);
      alert("Failed to process the file.");
    }
  };

  return (
    <div>
      <div className="mt-20 text-3xl text-center font-bold"> Bukti potong pajak pembelian barang</div>

      <div className="text-center mt-10">
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 mt-5 rounded"
        >
          Upload and Process
        </button>
      </div>
    </div>
  );
}
