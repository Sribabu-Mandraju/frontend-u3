import React, { useState } from "react";
import { MdOutlineGroups } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import CustomModal from "./Modal";

const Clients = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const data = [
    { id: 1, title: "Response one", email: "user1@example.com", postedBy: "u3tech", status: "approved" },
    { id: 2, title: "Response two", email: "user2@example.com", postedBy: "u3tech", status: "pending" },
    { id: 3, title: "Response three", email: "user3@example.com", postedBy: "u3tech", status: "rejected" },
    { id: 4, title: "Response four", email: "user4@example.com", postedBy: "u3tech", status: "approved" },
    { id: 5, title: "Response five", email: "user5@example.com", postedBy: "u3tech", status: "pending" },
    { id: 6, title: "Response six", email: "user6@example.com", postedBy: "u3tech", status: "rejected" },
    { id: 7, title: "Response seven", email: "user7@example.com", postedBy: "u3tech", status: "approved" },
    { id: 8, title: "Response eight", email: "user8@example.com", postedBy: "u3tech", status: "pending" },
    { id: 9, title: "Response nine", email: "user9@example.com", postedBy: "u3tech", status: "rejected" },
    { id: 10, title: "Response ten", email: "user10@example.com", postedBy: "u3tech", status: "approved" },
    { id: 11, title: "Response eleven", email: "user11@example.com", postedBy: "u3tech", status: "pending" },
    { id: 12, title: "Response twelve", email: "user12@example.com", postedBy: "u3tech", status: "rejected" },
    { id: 13, title: "Response thirteen", email: "user13@example.com", postedBy: "u3tech", status: "approved" },
    { id: 14, title: "Response fourteen", email: "user14@example.com", postedBy: "u3tech", status: "pending" },
    { id: 15, title: "Response fifteen", email: "user15@example.com", postedBy: "u3tech", status: "rejected" },
    { id: 16, title: "Response sixteen", email: "user16@example.com", postedBy: "u3tech", status: "approved" },
    { id: 17, title: "Response seventeen", email: "user17@example.com", postedBy: "u3tech", status: "pending" },
    { id: 18, title: "Response eighteen", email: "user18@example.com", postedBy: "u3tech", status: "rejected" },
    { id: 19, title: "Response nineteen", email: "user19@example.com", postedBy: "u3tech", status: "approved" },
    { id: 20, title: "Response twenty", email: "user20@example.com", postedBy: "u3tech", status: "pending" },
  ];
  
      
      

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <section
        className="dashboard ps-2 mx-auto w-100 d-flex flex-column"
        style={{
          overflow: "scroll",
          width: "100%",
        }}
      >
        <div className="w-100  d-flex align-items-center py-3" style={{ color: "#006996" }}>
          <MdOutlineGroups style={{ fontSize: "20px" }} />
          <div className="h4 px-2">Clients</div>
        </div>
        <div className="table-responsive table-striped w-100  mt-4" style={{ height: "auto", overflow: "" }}>
          <div className="d-flex align-items-center mb-3 justify-content-between" style={{position:"sticky",left:"0"}}>
            <div className="mx-2 d-flex align-items-center">
              <FiSearch style={{ marginRight: "-20px", zIndex: "1" }} />
              <input type="text" placeholder="search......." className="py-1 ps-4" style={{ borderRadius: "5px", border: "0.3px solid grey" }} />
            </div>
          </div>
          <table
            className="resource-content table "
            style={{
              width: "97%",
              minWidth: "340px",
              backgroundColor: "#F7FFFF",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <thead className="border" style={{ backgroundColor: " #F4F4F4" }}>
              <tr className="text-center bold-2" style={{ textWrap: "nowrap", color: "#006996" }}>
                <td className="ps-2" style={{ color: "#006996" }}>
                  S.no
                </td>
                <td className="ps-2" style={{ color: "#006996" }}>
                  Name
                </td>
                <td className="ps-2" style={{ color: "#006996" }}>
                  Email
                </td>
                <td className="ps-2" style={{ color: "#006996" }}>
                  Company
                </td>
                <td className="ps-2" style={{ color: "#006996" }}>
                  Details
                </td>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr className=" text-center mt-2 py-2" key={item.id} style={{ testWrap: "nowrap" }}  >
                  <td className="p-2">{item.id}</td>
                  <td className="p-2" style={{ textWrap: "nowrap" }}>
                    {item.title}
                  </td>
                  <td className="p-2">{item.email}</td>
                  <td className="p-2">{item.postedBy}</td>
                  <td className="p-2" >
                    <button className=" btn btn-primary d-flex justify-content-center align-items-center w-100" style={{height:"30px"}} onClick={openModal}>
                        Info
                    </button>
                    <CustomModal showModal={showModal} closeModal={closeModal}>
                        <p>This is custom content inside the modal.</p> 
                        <p>Add more elements as needed.</p>
                    </CustomModal>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination d-flex justify-content-center" style={{position:"sticky",left:"0"}}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index + 1} onClick={() => handlePageChange(index + 1)} className={`${currentPage === index + 1 ? "active mx-2 p-2 " : "mx-2 p-2"} ${currentPage == index +1?"bg-primary":"bg-white"}`} style={{borderRadius:"7px"}}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </section>
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