import { useState, useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Dashboard from "../components/Dashboard";
import Documentation from "../components/sendDocument";
import Clients from "../components/Clients";
import SendRequest from "../components/SendRequest";
import Documents from "../components/Documents";

import { TbBellRingingFilled } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { PiListFill } from "react-icons/pi";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineGroups } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { AiFillFolder } from "react-icons/ai";
import { MdClose } from "react-icons/md";

import LOGO from "../assets/logo.png";
import Jobs from "../components/Jobs";

const Home = () => {
  const [userToken, setUserToken] = useState("");
  const [userData, setUserData] = useState({});
  const tabs = [
    { tab: "dashboard", tabName: "Dashboard", icon: <AiOutlineDashboard /> },
    { tab: "clients", tabName: "Clients", icon: <MdOutlineGroups /> },
    { tab: "sendRequest", tabName: "Send Request", icon: <MdOutlineGroups /> },
    {
      tab: "sendDocument",
      tabName: "Send Document",
      icon: <MdOutlineGroups />,
    },
    { tab: "jobs", tabName: "Jobs", icon: <FiSearch /> },
  ];
  const [tab, setTab] = useState("dashboard");
  const [width, setWidth] = useState(window.innerWidth);
  const [side, setSide] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleWidth = () => {
    setWidth(window.innerWidth);
  };

  const handleSide = () => {
    if (width < 1000) {
      setSide(false);
    }
    if (width > 1000) {
      setSide(true);
    }

    setSide(!side);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWidth);

    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, [side]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getToken = localStorage.getItem("token");
        setUserToken(getToken);

        const response = await axios.get(
          "https://backend-u3.onrender.com/admin/adminInfo",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${userToken}`,
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }

        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        // error
      }
    };

    fetchData();
  }, [userToken]);

  if (loading) {
    return (
      <>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="">Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <section className="w-100" style={{ height: "100vh" }}>
        <div
          className="d-flex justify-content-between align-items-center shadow w-100"
          style={{ height: "50px", backgroundColor: "#e6f2ff" }}
        >
          <div className="d-flex align-items-center">
            <button className="btn mx-2" onClick={handleSide}>
              <PiListFill />
            </button>
            <img src={LOGO} alt="" style={{ height: "40px" }} />
          </div>
          <div className="d-flex align-items-center">
            {width > 700 ? <></> : <></>}
            <button
              className=" bell-drop"
              style={{
                position: "relative",
                backgroundColor: "#e6f2ff",
                color: "black",
                fontSize: "",
                borderRadius: "",
                border: "none",
              }}
            >
              <TbBellRingingFilled
                className="mx-2 "
                style={{ fontSize: "20px", backgroundColor: "" }}
              />
              <div className="dropdown-menu" style={{}}></div>
            </button>

            <div
              className="prof-icon bg-warning mx-2 d-flex justify-content-center align-items-center"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                position: "relative",
              }}
            >
              <h6>{userData.name[0].toUpperCase()}</h6>
              <div
                className="profile-menu shadow"
                style={{ position: "absolute", top: "25px" }}
              >
                <div className="d-flex w-100 flex-column">
                  <div
                    className="border d-flex justify-content-center align-items-center bg-warning mt-2 mx-auto"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                  >
                    <h3 style={{ fontSize: "70px" }}>
                      {userData.name[0].toUpperCase()}
                    </h3>
                  </div>
                  <div className="w-100 d-flex justify-content-around align-items-center">
                    <button className="btn btn-primary">View profile</button>
                    <button className="btn btn-warning">Edit profile</button>
                  </div>
                  <div className="w-100 d-flex justify-content-center align-items-center mt-3">
                    <button
                      className=" btn btn-danger px-5"
                      style={{ width: "260px" }}
                    >
                      <CiLogin />
                      <span className="px-2">logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {width > 700 ? (
              <>
                <div
                  className="prof-name me-3"
                  style={{ fontWeight: "700", color: "#006996" }}
                >
                  {userData.name}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="w-100 d-flex" style={{ position: "relative" }}>
          {width > 1000 ? (
            <>
              <div
                className="sidebar bg-white justify-content-between  d-flex flex-column shadow "
                style={{
                  height: "94vh",
                  minWidth: "260px",
                  marginLeft: side ? "0px" : "-260px",
                  transitionDuration: "0.3s",
                  zIndex: "200",
                }}
              >
                <div className="d-flex flex-column">
                  {tabs.map((data) => (
                    <div
                      key={data.tab}
                      className={`tab mb-2  ${tab == data.tab ? "tab-actived" : ""
                        }`}
                      onClick={() => {
                        setTab(data.tab);
                      }}
                    >
                      <div className="">
                        <span className="px-3">{data.icon}</span>
                        <span>{data.tabName}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className={`tab mb-2 mb-5 `}
                  style={{
                    backgroundColor: "#b3ecff",
                    border: "2px solid black",
                    borderRadius: "3px",
                  }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <span className="px-3 b-5">
                    <CiLogin />
                  </span>
                  <span>logout</span>
                </div>
              </div>{" "}
            </>
          ) : (
            <>
              <div
                className="sidebar justify-content-between  d-flex flex-column bg-white d-flex flex-column shadow "
                style={{
                  height: "100vh",
                  minWidth: "100%",
                  position: "absolute",
                  left: side ? "0px" : "-100%",
                  top: "-50px",
                  transitionDuration: "0.3s",
                  zIndex: "3",
                }}
              >
                <div className="d-flex flex-column">
                  {width < 1000 ? (
                    <>
                      <div className="w-100 d-flex justify-content-between mt-3 align-items- mb-3">
                        <div className="d-flex flex-column ps-4">
                          <img src={LOGO} alt="" style={{ height: "60px" }} />
                          <div
                            className=""
                            style={{ color: "#006996", fontWeight: "700" }}
                          >
                            U3Tech Pvt Ltd.
                          </div>
                        </div>
                        <div
                          className=" badge text-dark   d-flex  p-3"
                          style={{
                            flexDirection: "row-reverse",
                            cursor: "pointer",
                            marginTop: "-20px",
                            marginRight: "-10px",
                          }}
                          onClick={() => {
                            setSide(false);
                          }}
                        >
                          <MdClose style={{ fontSize: "40px" }} />
                        </div>
                      </div>
                    </>
                  ) : null}
                  {tabs.map((data) => (
                    <div
                      key={data.tab}
                      className={`tab mb-2  text-center ${tab == data.tab ? "" : ""
                        }`}
                      onClick={() => {
                        setTab(data.tab);
                        setSide(false);
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "700",
                          fontSize: "20px",
                          color: "#006996",
                        }}
                      >
                        {data.tabName}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  className={`tab mb-2 mb-5 text-center `}
                  style={{
                    backgroundColor: "#b3ecff",
                    border: "2px solid black",
                    borderRadius: "3px",
                  }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <span className="px-3 b-5">
                    <CiLogin />
                  </span>
                  <span>logout</span>
                </div>
              </div>
            </>
          )}
          <div
            className="px-2 mt-4 mb-2 py-2"
            style={{
              width: "97%",
              height: width < 700 ? "89vh" : "85vh",
              minHeight: "85vh",
              overflowX: "hidden",
              overflowY: "scroll",
            }}
          >
            {tab == "dashboard" && (
              <>
                <Dashboard />
              </>
            )}
            {tab == "clients" && <Clients />}
            {tab == "documentsList" && <Documents />}
            {tab == "sendRequest" && <SendRequest />}
            {tab == "sendDocument" && <Documentation />}
            {tab == "jobs" && <Jobs />}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
