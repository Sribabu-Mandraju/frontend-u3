import React from 'react';
import { useParams } from 'react-router-dom';


const ViewClientPdf = () => {
const {pdfUrl} = useParams()
  return (
    <div>
      <embed src={`${pdfUrl}`} type="application/pdf" width="100%" height="600px" />
    </div>
  );
};

export default ViewClientPdf;