import { useState, useEffect } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { RiExpandUpDownFill } from "react-icons/ri";
import { formatDistanceToNow } from "date-fns";
import CustomModal from "./Modal";
import { fetchRequests } from "../store/requestSlice";
import { useSelector, useDispatch } from "react-redux";

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [showModalArray, setShowModalArray] = useState([]);

  const dispatch = useDispatch();
  const requestState = useSelector((state) => state.request.state);
  const requestData = useSelector((state) => state.request.data);
  const requestError = useSelector((state) => state.request.error);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && requestState === "idle") {
      dispatch(fetchRequests(token));
    }
  }, [dispatch, requestState]);

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  useEffect(() => {
    if (requestData) {
      const filteredData = requestData.filter(item => (
        (selectedOption === "ALL" || item.status_review === selectedOption) &&
        item.name?.toLowerCase().includes(search)
      ));
      setFilteredData(filteredData);
    }
  }, [requestData, selectedOption, search]);

  const openModal = (index) => {
    const updatedShowModalArray = [...showModalArray];
    updatedShowModalArray[index] = true;
    setShowModalArray(updatedShowModalArray);
  };

  const closeModal = (index) => {
    const updatedShowModalArray = [...showModalArray];
    updatedShowModalArray[index] = false;
    setShowModalArray(updatedShowModalArray);
  };

  return (
    <>
      <section
        className="dashboard ps-2 mt-3 mx-auto w-100 d-flex flex-column"
        style={{
          width: "97%",
          maxWidth: "1300px",
          height: "87vh",
          overflowY: "scroll",
        }}
      >
        <div
          className="w-100  d-flex align-items-center py-3"
          style={{ color: "#006996" }}
        >
          <AiOutlineDashboard style={{ fontSize: "25px" }} />
          <div className="h4 px-2 pt-2">Dashboard</div>
        </div>
        <div
          className="dashboard-top w-100 d-flex justify-content-between"
          style={{ overflowX: "scroll", height: "80px" }}
        >
          <div className="d-flex align-items-center">
            <div
              className={`px-3 cursor-pointer ${
                selectedOption === "ALL" ? "tab-active" : ""
              }`}
              onClick={() => {
                setSelectedOption("ALL");
              }}
              style={{ cursor: "pointer" }}
            >
              All
            </div>
            <div
              className={`px-3 cursor-pointer ${
                selectedOption === "Approved" ? "tab-active" : ""
              }`}
              onClick={() => {
                setSelectedOption("Approved");
              }}
              style={{ cursor: "pointer" }}
            >
              Approved
            </div>
            <div
              className={`px-3 cursor-pointer ${
                selectedOption === "In Review" ? "tab-active" : ""
              }`}
              onClick={() => {
                setSelectedOption("In Review");
              }}
              style={{ cursor: "pointer", minWidth: "110px" }}
            >
              In Review
            </div>
            <div
              className={`px-3 cursor-pointer ${
                selectedOption === "Rejected" ? "tab-active" : ""
              }`}
              onClick={() => {
                setSelectedOption("Rejected");
              }}
              style={{ cursor: "pointer" }}
            >
              Rejected
            </div>
          </div>
          <div className="search-bar mx-3">
            <FiSearch
              style={{ marginRight: "-23px", zIndex: "1", position: "sticky" }}
            />
            <input
              type="text"
              placeholder="search"
              className="py-1 ps-4"
              value={search}
              onChange={handleSearch}
              style={{ borderRadius: "5px", border: "0.3px solid grey" }}
            />
          </div>
        </div>
        <div
          className="table-responsive  w-100  mt-4"
          style={{ height: "87vh", overflow: "scroll" }}
        >
          <div
            className="d-flex flex-column mx-auto"
            style={{ width: "100%", minWidth: "350px", overflowX: "scroll" }}
          >
            <div
              className="w-100 d-flex align-items-center flex-column justify-content-center"
              style={{ minWidth: "1000px" }}
            >
              <div
                className="d-flex justify-content-around bg-dark text-white align-items-center  mb-2  py-1 shadow"
                style={{ width: "100%", minWidth: "950px", height: "50px" }}
              >
                <div className="">S.no</div>
                <div
                  className="d-flex align-items-center"
                  style={{ minWidth: "200px" }}
                >
                  <span className="">Document Title</span>
                  <RiExpandUpDownFill />
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ minWidth: "140px" }}
                >
                  <span className="">Date</span>
                  <RiExpandUpDownFill />
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ minWidth: "170px" }}
                >
                  <span className="">Send to</span>
                  <RiExpandUpDownFill />
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ minWidth: "100px" }}
                >
                  <span className="" onClick={openModal}>
                    Info
                  </span>
                  <RiExpandUpDownFill />
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ minWidth: "100px" }}
                >
                  <span className="">Status</span>
                  <RiExpandUpDownFill />
                </div>
              </div>
               {requestState === "loading" ? (
  <>
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="">Loading...</div>
    </div>
  </>
) : requestError ? (
  <div
    className="d-flex justify-content-center align-items-center gap-2 flex-column"
    style={{ height: "60vh" }}
  >
    <h2 className="job_errmsg">Error fetching Requests</h2>
    <button
      className="btn btn-primary"
      onClick={() => {
        const token = localStorage.getItem("token");
        dispatch(requestActions.setBack());
        dispatch(fetchRequests(token));
      }}
    >
      Try Again
    </button>
  </div>
) : (
  requestData && (
    <>
      {filteredData && (
        <>
          {filteredData.length === 0 ? (
            <>
              <h5 className="w-100 text-center my-5">
                No Data Found
              </h5>
            </>
          ) : (
            <>
              {filteredData.map((data, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-around align-items-center hover-effect cursor-pointer border  my-2  py-4 shadow"
                  onClick={openModal}
                  style={{
                    width: "100%",
                    minWidth: "950px",
                    height: "50px",
                    cursor: "pointer",
                  }}
                >
                  <div className="">{index + 1}</div>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ minWidth: "200px" }}
                  >
                    {data.name}
                  </div>
                  <div
                    className="d-flex  justify-content-center align-items-center"
                    style={{ minWidth: "140px" }}
                  >
                    {formatDate(data.sended_at)}
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ minWidth: "170px" }}
                  >
                    {data.short_discription}
                  </div>
                  <div
                    className="d-flex align-items-center"
                    style={{ minWidth: "100px" }}
                  >
                    <button
                      className=" badge text-dark btn btn-outline-primary"
                      onClick={() => handleRowClick(data)}
                    >
                      Info
                    </button>
                  </div>

                  <div
                    className={`pe-4 d-flex align-items-center `}
                    style={{ minWidth: "100px" }}
                  >
                    <div
                      className={`badge p-2 ${getStatusBadgeColor(
                        data.status_review
                      )} ${
                        data.status_review === "Approved" ||
                        data.status_review === "approved"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {data.status_review}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </>
  )
)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const getStatusBadgeColor = (status) => {
  switch (status) {
    case "Approved":
      return "bg-success";
    case "In Review":
      return "bg-warning";
    case "Rejected":
      return "bg-danger";
    default:
      return "";
  }
};
export default Dashboard;