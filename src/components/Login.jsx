import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomModal from './Modal';
import { toast } from 'react-hot-toast'

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [values, setValues] = useState({
    Email: "",
    Password: "",
  });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal display
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message

  const openModal = () => {
    setShowModal(true);
  };

  const handleChange = (e) => {
    const formData = { ...values };
    formData[e.target.name] = e.target.value;
    setValues(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://backend-u3.onrender.com/admin/login", values);

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        toast.success("successfully login")
        navigate("/home");
        setLoading(false)
      }

    } catch (err) {
      console.error(err);
      setErrorMessage("invalid Credentials")
      toast.error("incorrect creddentials")
      setLoading(false)
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <section
        className="resource-form  w-100 d-flex  justify-content- align-items-center "
        style={{
          width: "100%",
          height: "100vh"
        }}
      >
        <div className="d-flex flex-column w-100 ">
          <div className="text-center text-danger">{errorMessage}</div>
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
                value={`${loading ? "Login" : "Loggin in...."}`}
                className="w-100"
                style={{ backgroundColor: "#006996", color: "white" }}
              />
            </span>
          </form>
        </div>
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
