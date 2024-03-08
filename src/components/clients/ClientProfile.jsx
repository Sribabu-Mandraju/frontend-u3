import React, { useState, useEffect } from 'react';

import { FaRegUser, FaEnvelope, FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';


import ClientInfo from './ClientProfile';

const ClientProfile = ({ clientData }) => {
    const clientDataInfo = [
        { title: "Name", icon: <FaRegUser />, value: clientData.firstname + " " + clientData.lastname },
        { title: "Email", icon: <FaEnvelope />, value: clientData.email },
        { title: "Country", icon: <FaEnvelope />, value: clientData.country },
        { title: "Address", icon: <FaMapMarkerAlt />, value: clientData.address },
        { title: "City", icon: <FaMapMarkerAlt />, value: clientData.city },
        { title: "Company", icon: <FaBuilding />, value: clientData.company },
        { title: "Postal", icon: <FaBuilding />, value: clientData.postal },
        { title: "Created Account", icon: <FaEnvelope />, value: clientData.created_at },
    ];
    return (
        <div className="w-100 d-flex flex-column">
            {
                clientDataInfo.map((data) => (
                    <div className="row w-100 ps-3 py-2">
                        <div className="col-12 col-sm-5 col-md-4 d-flex align-items-center" style={{ color: "grey" }}>{data.icon}<span className="ps-2" style={{ minWidth: "120px" }}>{data.title}</span> </div>
                        <div className="col-12 col-sm-7 col-md-8" style={{ color: "#006996", fontWeight: "700" }}>{data.value}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default ClientProfile
