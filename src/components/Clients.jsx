import React, { useState, useEffect } from "react";
import { MdOutlineGroups } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
// import CustomModal from "./modals/Modal";
import { GoOrganization } from "react-icons/go";
import { GoFileSubmodule } from "react-icons/go";
import { IoMdPersonAdd } from "react-icons/io";
import { FaCircleInfo } from "react-icons/fa6";
// import CustomModal2 from "./modals/Modal2";
import '../App.css'
import { Link, useNavigate } from "react-router-dom"
import c from '../assets/b party.png'
import { RiExpandUpDownFill } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from 'axios'
import CreateClient from "./createClient";
import CustomModal from "./Modal";



const Clients = () => {
  const Navigate = useNavigate()



  const navigate = useNavigate()
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [userToken, setUserToken] = useState("")
  const [clientsData, setClientsData] = useState([])
  const [clientID, setClientID] = useState("")
  const clients = [
    { title: "Name", minWidth: "200px" },
    { title: "Email", minWidth: "120px" },
    { title: "Company", minWidth: "120px" },
    { title: "Created Date", minWidth: "60px" },
    { title: "Phone", minWidth: "70px" },
    { title: "Client Type", minWidth: "120px" },
    { title: "Delete", minWidth: "40px" },

  ]
  const [currentPage, setCurrentPage] = useState(1);
  const [width, setWidth] = useState(window.innerWidth)
  const itemsPerPage = 10;
  const handleWidth = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWidth)

  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getToken = localStorage.getItem("token");
        console.log("Token:", getToken);
        setUserToken(getToken);

        const response = await axios.get("https://backend-u3.onrender.com/admin/client/all-clients", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${userToken}`
          }
        });

        console.log("Response:", response.data);

        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }

        setClientsData(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [userToken]);

  const sortRequestsByTitle = (requests) => {
    return clientsData.slice().sort((a, b) => {
      const titleA = (a.name || '').toLowerCase();
      const titleB = (b.name || '').toLowerCase();
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });
  };
  const sortedData = sortRequestsByTitle(clientsData)
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  useEffect(() => {
    setFilteredData(
      clientsData.filter((client) =>
        client.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.lastname.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, clientsData]);

  if (loading) {
    return (
      <>
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
          <div className="">Loading Clients information...</div>
        </div>
      </>
    );
  }
  return (
    <>
      <section
        className="dashboard ps-2 mx-auto w-100 d-flex flex-column"
        style={{
          overflow: "scroll",
          width: "99%",
        }}
      >
        <div className="w-100  d-flex align-items-center py-3" style={{ color: "#006996" }}>
          <MdOutlineGroups style={{ fontSize: "25px" }} />
          <div className="h4 px-2">Clients</div>
        </div>
        <div className="table-responsive table-striped w-100  mt-4" style={{ height: "auto", overflow: "" }}>
          <div className="d-flex align-items-center justify-content-between mb-3 " >
            <div className="mx-2 d-flex align-items-center">
              <FiSearch style={{ marginRight: "-20px", zIndex: "1" }} />
              <input type="text" placeholder="search......." className="py-1 ps-4" style={{ borderRadius: "5px", border: "0.3px solid grey" }} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <button className="btn btn-primary mx-2  " onClick={openModal} style={{ marginRight: "" }}><IoMdPersonAdd /><span className="px-1">{width > 600 ? "Create Client" : "Add"}</span></button>
          </div>
          <div className={`w-100 d-flex ${width > 700 ? "justify-content-between" : "justify-content-around"} align-items-center flex-wrap`}>
            <div className="d-flex flex-column mx-auto" style={{ width: "100%", minWidth: "350px", overflowX: "scroll" }}>
              <div className="w-100 d-flex align-items-center flex-column   justify-content-center" style={{ minWidth: "1100px" }}>
                <div className="d-flex justify-content-start bg-dark text-white align-items-center  mb-2  py-1 shadow" style={{ width: "100%", minWidth: "950px", height: "50px" }}>
                  <div className="me-5 ps-3">S.no</div>
                  <div className="d-flex align-items-center " style={{ minWidth: "200px" }}>
                    <span className="pe-4">First Name</span>
                    <RiExpandUpDownFill />
                  </div>
                  <div className="d-flex align-items-center" style={{ minWidth: "200px" }}>
                    <span className="pe-4">Last Name</span>
                    <RiExpandUpDownFill />
                  </div>
                  <div className="d-flex align-items-center" style={{ minWidth: "250px" }}>
                    <span className="pe-4">Email</span>
                    <RiExpandUpDownFill />
                  </div>
                  <div className="d-flex align-items-center" style={{ minWidth: "170px" }}>
                    <span className="pe-4">Address</span>
                    <RiExpandUpDownFill />
                  </div>
                  <div className="d-flex align-items-center" style={{ minWidth: "170px" }}>
                    <span className="pe-4">City</span>
                    <RiExpandUpDownFill />
                  </div>


                </div>
                {
                  filteredData.map((data, index) => (
                    <div className="d-flex justify-content-start align-items-center hover-effect cursor-pointer border  my-2  py-4 shadow" style={{ width: "100%", minWidth: "950px", height: "50px", cursor: "pointer" }} onClick={() => {
                      setClientID(data._id)
                      console.log(clientID)
                      if (clientID != "") {
                        navigate(`/clients/${clientID}`)
                      }
                    }}>
                      <div className="me-5 ps-3">{index + 1}</div>
                      <div className="d-flex align-items-center" style={{ minWidth: "200px" }}>
                        <span className="pe-4">{data.firstname}</span>
                      </div>
                      <div className="d-flex align-items-center" style={{ minWidth: "200px" }}>
                        <span className="pe-4">{data.lastname}</span>
                      </div>
                      <div className="d-flex align-items-center" style={{ minWidth: "250px" }}>
                        <span className="pe-4">{data.email}</span>
                      </div>
                      <div className="d-flex align-items-center" style={{ minWidth: "170px" }}>
                        <span className="pe-4">{data.address}</span>
                      </div>
                      <div className="d-flex align-items-center" style={{ minWidth: "170px" }}>
                        <span className="pe-4">{data.province}</span>
                      </div>

                    </div>
                  ))
                }

              </div>
            </div>
          </div>

        </div>
      </section>
      <CustomModal showModal={showModal} closeModal={closeModal}>
        <CreateClient />
      </CustomModal>
    </>
  );
};

const getStatusBadgeColor = (status) => {
  switch (status) {
    case "approved":
      return "bg-success";
    case "pending":
      return "bg-warning";
    case "rejected":
      return "bg-danger";
    default:
      return "";
  }
};

export default Clients;