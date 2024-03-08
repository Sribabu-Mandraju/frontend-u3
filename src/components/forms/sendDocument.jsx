import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import axios from 'axios';
import '../../App.css'
import { Spinner } from 'react-bootstrap';


const Documentation = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([])
  const [fileData, setFileData] = useState(null);
  const [spinner, setSpinner] = useState(false)
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState("")
  const [resourceData, setResourceData] = useState({
    title: '',
    file: null,
    sendTo: ""
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const getToken = localStorage.getItem("token");
        console.log("Token:", getToken); // Log token for debugging
        setToken(getToken);

        const result = await axios.get("https://backend-u3.onrender.com/admin/client/all-clients", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          }
        });
        console.log("Response:", result.data);

        if (result.status !== 200) {
          throw new Error('Network response was not ok');
        }

        setClients(result.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [token]);


  const handleForm = (e) => {
    const newData = { ...resourceData };
    if (e.target.name === 'file') {
      newData[e.target.name] = e.target.files[0];
    } else {
      newData[e.target.name] = e.target.value;
    }
    setResourceData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData();
    formData.append('title', resourceData.title);
    formData.append('user_email', resourceData.sendTo);
    formData.append('pdf_file', resourceData.file);
    console.log(formData)

    try {
      const response = await axios.post("https://backend-u3.onrender.com/admin/client/uploadPdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `${token}`
        }
      })
      if (response.status == 200) {
        setLoading(false)
        console.log("response", response.data)
        toast.success("file successfully uploaded")
        setResourceData({
          title: '',
          file: null,
          sendTo: ""
        })
      }
    }
    catch (err) {
      console.log(err)
      toast.error("failed to upload")
      setLoading(false)
      setResourceData({
        title: '',
        file: null,
        sendTo: ""
      })
    }


  };

  if (loading) {
    return (
      <>
        <div className="w-100 d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
          <div className="text-center">Loading......</div>
        </div>
      </>
    )
  }

  return (
    <section className="resource-form w-100 mt-3" style={{ width: '97%', maxWidth: '1100px', height: '87vh' }}>
      <div className="text-center h3 bold-2 py-3" style={{ color: '#006996' }}>
        Upload Documents!
      </div>
      <p className="text-center tag-line">Lorem ipsum dolor sit amet consectetur adipi</p>
      <form
        className="resource-form d-flex flex-column shadow ps-3 py-3 mx-auto"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        style={{
          width: '97%',
          maxWidth: '450px',
          height: 'auto',
          backgroundColor: '#F7FFFF',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        <span className="mt-3">
          <label htmlFor="title" className="ps-2">
            Title
          </label>
          <input type="text" name="title" placeholder="Title of the book" value={resourceData.title} onChange={handleForm} required />
        </span>

        <span className="mt-3">
          <label htmlFor="sendTo" className="ps-2">Send to</label>
          <select name="sendTo" id="" onChange={handleForm}>
            <option className="pe-4" value="">--SELECT--</option>
            {
              clients.map((data) => (
                <option value={data.email} className="">{data.email}</option>
              ))
            }
          </select>
        </span>


        <span className="mt-3">
          <label htmlFor="bFile" className="ps-2">
            Upload File
          </label>
          <input type="file" name="file" placeholder="Upload file" style={{ border: 'none' }} onChange={handleForm} required />
        </span>

        <div className="row mx-auto" style={{ width: "90%" }}>
          <button className="col-7 btn btn-primary mx-auto " type="submit">
            {spinner == true ? (<><Spinner animation="border" variant="primary" /><span>Uploading</span></>) : (<><span>Upload</span></>)}
          </button>
        </div>
      </form>


    </section>
  );
}
export default Documentation