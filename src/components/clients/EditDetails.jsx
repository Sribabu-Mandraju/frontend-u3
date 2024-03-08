import React, { useState, useEffect } from 'react';

const EditDetails = ({ clientData }) => {
    const [loading, setLoading] = useState(false)
    const [edit, setEdit] = useState({
        name: "",
        email: "",
        contact: ""
    })
    console.log(clientData)

    const handleChange = (e) => {
        const formData = { ...createClient }
        formData[e.target.name] = e.target.value
        setEdit(formData)
    }

    return (
        <form className="resource-form shadow d-flex flex-column ps-3 py-3 mx-auto"
            style={{
                width: '97%',
                maxWidth: '450px',
                backgroundColor: '#F7FFFF',
            }}

        >
            <span className="mt-3">
                <label htmlFor="firstname" className="ps-2">First Name</label>
                <input type="text" name="firstname" onChange={handleChange} value={clientData.firstname} required />
            </span>

            <span className="mt-3">
                <label htmlFor="lastname" className="ps-2">Last Name</label>
                <input type="text" name="lastname" onChange={handleChange} value={clientData.lastname} required />
            </span>

            <span className="mt-3">
                <label htmlFor="email" className="ps-2">Email</label>
                <input type="email" name="email" onChange={handleChange} value={clientData.email} required />
            </span>
            <span className="mt-3">
                <label htmlFor="Company" className="ps-2">Company</label>
                <input type="text" name="company" onChange={handleChange} value={clientData.company} required />
            </span>
            <span className="mt-3">
                <input type="submit" value="submit" style={{ backgroundColor: '#006996', color: 'white' }} />
            </span>
        </form>
    )
}

export default EditDetails
