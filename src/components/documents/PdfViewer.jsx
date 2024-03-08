import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PdfViewer = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true); // State to control loading indicator
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    setUserToken(getToken);
  }, []);

  useEffect(() => {
    const getPdf = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const response = await axios.get(`http://localhost:8080/client/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${userToken}`
          }
        });
        const pdfData = response.data.pdffile.Data;
        const decodedPdfData = atob(pdfData);
        const uint8Array = new Uint8Array(decodedPdfData.length);
        for (let i = 0; i < decodedPdfData.length; i++) {
          uint8Array[i] = decodedPdfData.charCodeAt(i);
        }
        const pdfBlob = new Blob([uint8Array], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);
        setLoading(false); 
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch PDF file");
        setLoading(false); 
      }
    };

    if (pdfUrl2) {
      getPdf();
    }
  }, [pdfUrl2, userToken]); 

  return (
    
      <>
      {pdfUrl && <>
      <div className="" style={{height:"100%",width:"100%"}}>
        <embed className="pdf-embed" src={`${pdfUrl}#toolbar=0`} type="application/pdf" width="100%"  height="100%" />
      </div>
      </>}</>
  );
};

export default PdfViewer;
