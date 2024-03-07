import React, { useState, useEffect } from "react";
import '../App.css'
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

const CreateClient = () => {
    const Navigate = useNavigate()
    const [createClient, setCreateClient] = useState({
        fistname: "",
        lastname: "",
        address: "",
        company: "",
        province: "",
        postal: "",
        city: "",
        country: "",
        email: "",
        password: "1234",
    })
    const handleChange = (e) => {
        const formData = { ...createClient }
        formData[e.target.name] = e.target.value
        setCreateClient(formData)
        console.log(createClient)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(createClient)
        try {
            const response = await axios.post(
                'https://backend-u3.onrender.com/user/signup',
                createClient,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            if (response.status === 201) {
                toast.success("Job Edited Successfully");
                window.location.reload()
            }
            else {
                alert("error")
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <form className="resource-form shadow d-flex flex-column ps-3 py-3 mx-auto"
                style={{
                    width: '100%',
                    maxWidth: '450px',
                    backgroundColor: '#F7FFFF',
                }}
                onSubmit={handleSubmit}
                method="POST"
            >
                <div className="w-100 row">
                    <div className="col-6">
                        <label htmlFor="fname" className="form-label">First Name</label>
                        <input type="text" name="fistname" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="col-6">
                        <label htmlFor="lname" className="form-label">Last Name</label>
                        <input type="text" name="lastname" className="form-control" onChange={handleChange} required />
                    </div>
                </div>
                <div className="row w-100">
                    <div className="col-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name="email" className="form-control" onChange={handleChange} required />
                    </div>
                </div>
                <div className="row w-100">
                    <div className="col-6">
                        <label htmlFor="company" className="form-label">Company</label>
                        <input type="text" name="company" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="col-6">
                        <label htmlFor="pin" className="form-label">Postal</label>
                        <input type="text" name="postal" className="form-control" onChange={handleChange} required />
                    </div>
                </div>
                <div className="w-100 row">
                    <div className="col-12">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" name="address" className="form-control" onChange={handleChange} required />
                    </div>
                </div>
                <div className="w-100 row">
                    <div className="col-6">
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" name="city" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="col-6">
                        <label htmlFor="province" className="form-label">Provience</label>
                        <input type="text" name="province" className="form-control" onChange={handleChange} required />
                    </div>
                </div>
                <div className="w-100 row">
                    <button type="submit" className="btn btn-primary col-6 mx-auto my-4">
                        Create Client
                    </button>
                </div>

            </form>
        </>
    )
}
export default CreateClient