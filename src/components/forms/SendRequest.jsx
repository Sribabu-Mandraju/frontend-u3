import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'

const SendRequest = () => {
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)

    const Navigate = useNavigate()
    const [token, setToken] = useState('');
    const [clients, setClients] = useState([])
    const [notice, setNotice] = useState({
        name: "",
        short_discription: "",
        discription: "",
        postedTo: "",
        sendto: "",
        link: "",
        status_review: "In Review"
    });

    const handleChange = (e) => {
        const formData = { ...notice };
        formData[e.target.name] = e.target.value;
        setNotice(formData);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getToken = localStorage.getItem("token");
                console.log("Token:", getToken); 
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

            } catch (err) {
                console.error(err);
                setLoading(false)

            }
        };

        fetchData();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading2(true)
        try {
            const response = await axios.post(
                'https://backend-u3.onrender.com/admin/sendRequest',
                notice,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': ` ${token}`,
                    }
                }
            );
            if (response.status === 200) {
                toast.success("request successfully sended")
                setLoading2(false)
                setNotice({
                    name: "",
                    short_discription: "",
                    discription: "",
                    postedTo: "",
                    sendto: "",
                    link: "",
                    status_review: "In Review"
                })
            }
        } catch (err) {
            toast.error("failed to send resquest")
            setLoading2(false)
            setNotice({
                name: "",
                short_discription: "",
                discription: "",
                postedTo: "",
                sendto: "",
                link: "",
                status_review: "In Review"
            })
        }
    };
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="">Loading...</div>
            </div>
        )
    }
    else if (loading2) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="">Uploading...</div>
            </div>
        )
    }

    return (
        <>
            <section className="resource-form w-100"
                style={{
                    width: '97%',
                    maxWidth: '',
                    height: '87vh',
                    overflowY: 'scroll'
                }}
            >
                <div className="text-center h3 bold-2" style={{ color: '#006996' }}>Send Request</div>
                <form className="resource-form shadow d-flex flex-column ps-3 py-3 mx-auto"
                    style={{
                        width: '97%',
                        maxWidth: '450px',
                        backgroundColor: '#F7FFFF',
                    }}
                    onSubmit={handleSubmit}
                >
                    <span className="mt-3">
                        <label htmlFor="name" className="ps-2">Title</label>
                        <input type="text" name="name" placeholder="Title of the request" onChange={handleChange} required />
                    </span>

                    <span className="mt-3">
                        <label htmlFor="shortDiscription" className="ps-2">Send to</label>
                        <select name="sendto" id="" onChange={handleChange}>
                            <option className="pe-4" value="">--SELECT--</option>
                            {
                                clients.map((data) => (
                                    <option value={data.email}>{data.email}</option>
                                ))
                            }
                        </select>
                    </span>

                    <span className="mt-3">
                        <label htmlFor="shortDiscription" className="ps-2">Short Discription</label>
                        <input type="text" name="Short_discription" placeholder="Short discription about Feedback" onChange={handleChange} required />
                    </span>

                    <span className="mt-3">
                        <label htmlFor="longDiscription" className="ps-2">Discription</label>
                        <textarea name="Discription" cols="30" rows="5" placeholder="Full discription" style={{ backgroundColor: 'white' }} onChange={handleChange}></textarea>
                    </span>

                    <span className="mt-3">
                        <label htmlFor="links" className="ps-2">Link (optional)</label>
                        <input type="text" name="Link" placeholder="post link" onChange={handleChange} />
                    </span>

                    <span className="mt-3 w-100">
                        <button className="btn btn-primary px-5" type="submit">Send</button>
                    </span>
                </form>

            </section>
        </>
    );
};

export default SendRequest;
