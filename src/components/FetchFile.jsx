import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'

const PdfViewer = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const getPdf = async () => {
    try {
      const response = await axios.post("http://localhost:8080/client/getPdfByEmail", { "useremail": email }, { responseType: 'json' });
      const pdfData = response.data[0].pdffile.Data; 
      const decodedPdfData = atob(pdfData);
      const uint8Array = new Uint8Array(decodedPdfData.length);
      for (let i = 0; i < decodedPdfData.length; i++) { 
        uint8Array[i] = decodedPdfData.charCodeAt(i);
      }
      const pdfBlob = new Blob([uint8Array], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch PDF file");
    }
  };

  return (
    <div className="pdf-viewer-container">
      <h1>PDF Viewer</h1>
      <form onSubmit={(e) => { e.preventDefault(); getPdf(); }}>
        <input type="email" value={email} onChange={handleChange} placeholder="Enter your email" />
        <button type="submit">Fetch PDF</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {pdfUrl && <embed className="pdf-embed" target="_blank" src={`${pdfUrl}#toolbar=0`} type="application/pdf" controlsList="nodownload" />}
    </div>
  );
};

export default PdfViewer;
