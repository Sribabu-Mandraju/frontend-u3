import { useState ,useEffect} from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal'; 
import CustomModal from './Modal';

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    Email: "",
    Password: "",
  });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal display

  const openModal = () => {
    setShowModal(true);
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


  const handleChange = (e) => {
    const formData = { ...values };
    formData[e.target.name] = e.target.value;
    setValues(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/admin/login", values);

      if (response.status === 200) {
        const token = response.data.token;
        const email = response.data.email
        localStorage.setItem("token", token);
        localStorage.setItem("email",email)
        setLoginSuccess(true);
        setShowModal(true); // Show the modal when login is successful
        navigate("/home");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const closeModal = () => {
    setShowModal(false); 
  };

  return (
    <>
      <section
        className="resource-form w-100 mt-5"
        style={{
          width: "100%",
        }}
      >
        <div className="text-center h3 bold-2" style={{ color: "#006996" }}>
          Login !
        </div>
        <p className="text-center tag-line">
          Lorem ipsum dolor sit amet consectetur adipi
        </p>
        <form
          className="resource-form shadow flex-column ps-3 py-3 mx-auto"
          onSubmit={handleSubmit}
          method="POST" 
          style={{
            width: "97%",
            maxWidth: "450px",
            height: "auto",
            backgroundColor: "#F7FFFF",
            display: "flex",
          }}
        >
          <span className="mt-3">
            <label htmlFor="" className="ps-2">
              User Email
            </label>
            <input
              type="email"
              name="Email"
              placeholder="Enter your Name"
              onChange={handleChange}
              required
            />
          </span>

          <span className="mt-3">
            <label htmlFor="password" className="ps-2">
              Password
            </label>
            <input
              type="password"
              name="Password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </span>

          <span className="mt-3 w-100">
            <input
              type="submit"
              value="submit"
              className="w-100"
              style={{ backgroundColor: "#006996", color: "white" }}
            />
          </span>
        </form>
        {showModal && 
        <CustomModal showModal={showModal} closeModal={closeModal}>
            <p>This is custom content inside the modal.</p>
            <p>Add more elements as needed.</p>
        </CustomModal>} 
      </section>
    </>
  );
};

export default Login;
