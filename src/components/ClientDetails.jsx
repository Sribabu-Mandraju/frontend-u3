import React,{useState,useEffect} from 'react';
import { useParams ,Link} from 'react-router-dom';
import { MdKeyboardBackspace } from "react-icons/md";
import logo from '../assets/logo.png'
import { Breadcrumb } from 'react-bootstrap';
import c1 from '../assets/b party.png'
import { FaDownload } from "react-icons/fa6";
import { PiCaretUpDownThin } from "react-icons/pi";
import image404 from "../assets/404.png"
import { FaRegUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserTag, FaCalendarAlt, FaBuilding, FaFileAlt } from 'react-icons/fa';
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios"
import { RiExpandUpDownFill } from "react-icons/ri";






const ClientDetails = () => {
    const [right,setRight]  = useState("details")
    const [dataArray,setDataArray] = useState([])
    const [userToken,setUserToken] = useState("")
    const [clientData,setClientData] = useState({})
    const [loading, setLoading] = useState(true); 
    const {  clientId } = useParams(); 

    const [pdfUrls, setPdfUrls] = useState([]);
    const [error, setError] = useState(null);
    const [email,setEmail] = useState("")

    const [edit,setEdit] = useState({
        name:"",
        email:"",
        contact:""
    })

    const openPdfInNewTab = (pdfUrl) => {
        window.open(`${pdfUrl}#toolbar=0`, '_blank');
      };
    const handleChange = (e) => {
        const formData = {...createClient}
        formData[e.target.name] = e.target.value
        setCreateClient(formData)
      }
      useEffect(() => {
        const fetchData = async () => {
            try {
                const getToken = localStorage.getItem("token");
                setUserToken(getToken);
    
                const response = await axios.get(`http://localhost:8080/admin/client/${clientId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${userToken}`
                    }
                });
    
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
    
                setClientData(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        };
    
        fetchData();
    }, [userToken]);
    
    useEffect(() => {
        if (clientData.email) {
            getPdf();
        }
    }, [clientData.email]);

    useEffect(() => {
        console.log(email);
    }, [email]);
      console.log(clientId)

      const getPdf = async () => {
        try {
          const response = await axios.post("http://localhost:8080/client/getPdfByEmail", { "useremail": clientData.email }, { responseType: 'json' });
          const responseArray = response.data
          setDataArray(responseArray)
          const pdfDataArray = response.data.map(pdf => {
            const pdfData = pdf.pdffile.Data;
            const decodedPdfData = atob(pdfData);
            const uint8Array = new Uint8Array(decodedPdfData.length);
            for (let i = 0; i < decodedPdfData.length; i++) {
              uint8Array[i] = decodedPdfData.charCodeAt(i);
            }
            const pdfBlob = new Blob([uint8Array], { type: 'application/pdf' });
            return URL.createObjectURL(pdfBlob);
          });
          setPdfUrls(pdfDataArray);
          setLoading(false);
        } catch (error) {
          console.error("Error:", error);
          setError("Failed to fetch PDF files");
          setLoading(false); 
        }
      };
    
      useEffect(()=> {
        getPdf()
        window.addEventListener('contextmenu', function (event) {
            event.preventDefault();
          });
        
      },[])
        console.log("me")



    const clientDataInfo = [
        { title: "Name", icon: <FaRegUser />, value: clientData.name },
        { title: "Email", icon: <FaEnvelope />, value: clientData.email },
        { title: "Phone", icon: <FaPhone />, value: clientData.conctact },
        { title: "Address", icon: <FaMapMarkerAlt />, value: "123 Main St, City, Country" },
        { title: "Client Type", icon: <FaUserTag />, value: "Premium" },
        { title: "Date Registered", icon: <FaCalendarAlt />, value: "2023-01-01" },
        { title: "Company", icon: <FaBuilding />, value: clientData.company },
        { title: "Total Requests", icon: <FaFileAlt />, value: "50" }
      ];

    const dataDocs = [
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

      const data = [
        { id: 1, title: "Response one", date: "28/08/2023", postedBy: "u3tech", status: "Approved" },
        { id: 2, title: "Response two", date: "28/08/2023", postedBy: "u3tech", status: "pending" },
        { id: 3, title: "Response three", date: "28/08/2023", postedBy: "u3tech", status: "Rejected" },
        { id: 4, title: "Response four", date: "28/08/2023", postedBy: "u3tech", status: "Approved" },
        { id: 5, title: "Response five", date: "28/08/2023", postedBy: "u3tech", status: "pending" },
        { id: 6, title: "Response six", date: "28/08/2023", postedBy: "u3tech", status: "Rejected" },
        { id: 7, title: "Response seven", date: "28/08/2023", postedBy: "u3tech", status: "Approved" },
        { id: 8, title: "Response eight", date: "28/08/2023", postedBy: "u3tech", status: "pending" },
        { id: 9, title: "Response nine", date: "28/08/2023", postedBy: "u3tech", status: "Rejected" },
        { id: 10, title: "Response ten", date: "28/08/2023", postedBy: "u3tech", status: "Approved" },
        { id: 11, title: "Response eleven", date: "28/08/2023", postedBy: "u3tech", status: "pending" },
        { id: 12, title: "Response twelve", date: "28/08/2023", postedBy: "u3tech", status: "Rejected" },
        { id: 13, title: "Response thirteen", date: "28/08/2023", postedBy: "u3tech", status: "Approved" },
        { id: 14, title: "Response fourteen", date: "28/08/2023", postedBy: "u3tech", status: "pending"},
        { id: 15, title: "Response fifteen", date: "28/08/2023", postedBy: "u3tech", status: "Rejected" },
        { id: 16, title: "Response sixteen", date: "28/08/2023", postedBy: "u3tech", status: "Approved" },
        { id: 17, title: "Response seventeen", date: "28/08/2023", postedBy: "u3tech", status: "pending" },
        { id: 18, title: "Response eighteen", date: "28/08/2023", postedBy: "u3tech", status: "Rejected" },
        { id: 19, title: "Response nineteen", date: "28/08/2023", postedBy: "u3tech", status: "Approved" },
        { id: 20, title: "Response twenty", date: "28/08/2023", postedBy: "u3tech", status: "pending" },
      ];

    const DetailsClient = () => {
        
        return (
            <>
                <div className="w-100 d-flex flex-column">
                    {
                        clientDataInfo.map((data)=> (
                            <div className="row w-100 ps-3 py-2">
                                <div className="col-12 col-sm-5 col-md-4 d-flex align-items-center" style={{color:"grey"}}>{data.icon}<span className="ps-2" style={{minWidth:"120px"}}>{data.title}</span> </div>
                                <div className="col-12 col-sm-7 col-md-8" style={{color:"#006996",fontWeight:"700"}}>{data.value}</div>
                            </div>
                        ))
                    }
                </div>
            </>
        )
    }

    const DocumentsClient = () => {

        return (
            <>
                <div className="table-responsive  w-100  mt-4" style={{ height: "auto", overflow: "scroll" }}>
                    <div className="d-flex flex-column mx-auto" style={{ width: "100%", minWidth: "350px", overflowX: "scroll" }}>
                    <div className="w-100 d-flex align-items-center flex-column justify-content-center" style={{ minWidth: "100%" }}>
                        <div className="d-flex justify-content-around bg-dark text-white align-items-center  mb-2  py-1 shadow" style={{ width: "100%", minWidth: "750px", height: "50px" }}>
                        <div className="" style={{width:"30px"}}>S.no</div>
                        <div className="d-flex align-items-center" style={{ minWidth: "200px" }}>
                            <span className="">Document Title</span>
                            <RiExpandUpDownFill />
                        </div>
                        <div className="d-flex align-items-center" style={{ minWidth: "140px" }}>
                            <span className="">View</span>
                            <RiExpandUpDownFill />
                        </div>
                        </div>
                        {pdfUrls.map((pdfUrl, index) => (
                        <div key={index} className="d-flex justify-content-around   align-items-center  mb-2  py-1 shadow" style={{ width: "100%", minWidth: "750px", height: "50px" }}>
                            <div style={{width:"30px"}}>{index + 1}</div>
                            <div className="d-flex align-items-center" style={{ minWidth: "200px" }}>
                                <span className="">{dataArray[0].title}</span>
                            </div>
                            <div className="d-flex align-items-center" style={{ minWidth: "140px" }}>
                                <Link to={`/clients/pdf/${pdfUrl}`}>View</Link>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
            </>
        )
    }

    const EditData = () => {
        return (
            <>
                <form className="resource-form shadow d-flex flex-column ps-3 py-3 mx-auto"
                    style={{
                        width: '97%',
                        maxWidth: '450px',
                        backgroundColor: '#F7FFFF',
                    }}
                    
                    >
                    <span className="mt-3">
                        <label htmlFor="name" className="ps-2">Name</label>
                        <input type="text" name="name" placeholder="Client Name" onChange={handleChange} required />
                    </span>

                    <span className="mt-3">
                        <label htmlFor="email" className="ps-2">Email</label>
                        <input type="email" name="email" placeholder="Client Email" onChange={handleChange} required />
                    </span>
                    <span className="mt-3">
                        <label htmlFor="contact" className="ps-2">Email</label>
                        <input type="number" name="contact" placeholder="Client Email" onChange={handleChange} required />
                    </span>
                    <span className="mt-3">
                        <input type="submit"  value="submit" style={{ backgroundColor: '#006996', color: 'white' }}/>
                    </span>

            </form>
            </>
        )
    }

    const ClientActivities = () => {
        return (
            <>
                <div className="w-100 d-flex flex-column justify-content-center align-items-center" style={{minHeight:"400px"}}>
                    <img src={image404} alt=""  style={{width:"300px"}}/>
                    <div className="text-center">oops!...work in progress</div>
                </div>
            </>
        )
    }

    const ClientEmail = () => {
        return (
            <>
                <div className="w-100 d-flex flex-column justify-content-center align-items-center"  style={{minHeight:"400px"}}>
                    <img src={image404} alt=""  style={{width:"300px"}}/>
                    <div className="text-center">oops!...No Emails</div>
                </div>
            </>
        )
    }

 


    
    const [tab,setTab] = useState("Documents")
    const {clientName} = useParams()


      const handleTab = (tabname) => {
        setTab(tabname)
      }
      const goback = () => {
        window.history.back()
      }
      if (loading) {
        return (
          <>
            <div className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
              <div className="">Loading...</div>
            </div>
          </>
        );
      }
    return (
        <>
            <section className="w-100">
                <div className="w-100 d-flex align-items-center justify-content-between shadow" style={{
                    height:"50px",
                    backgroundColor:"#e6f2ff"
                }}>
                    <div className="mx-3" >
                        <Link to="#" onClick={goback}>
                            <MdKeyboardBackspace style={{fontSize:"30px"}} />
                        </Link>
                    </div>
                    <img src={logo} alt="" style={{
                        height:"40px"
                    }} />
                </div>
                <div className="breadcrumb py-3 px-3">
                    <div className="breadcrumb-item h4">
                        <Link to="/clients" style={{textDecoration:"none"}}>Clients</Link>
                    </div>
                    <div className="breadcrumb-item h4" style={{textDecoration:"none"}}>{clientData.name}</div>
                </div>
                <div className="w-100 gap-2 row" style={{margin:"0px 0px",}}>
                    <div className="col-11 col-md-6 col-lg-6 mx-auto   d-flex flex-column shadow" style={{
                        height:"auto",
                        minHeight:"70vh"
                    }}>
                        <div className="w-100 d-flex align-items-center mt-3 justify-content-start" style={{minWidth:"300px",overflowX:"scroll",height:"50px"}}>    
                            <div className={`mx-3 ${tab=="Documents"?"tab-active":""}`} onClick={()=>{setTab("Documents")}}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="px-2">Documents</span>
                                    <PiCaretUpDownThin /> 
                                </div>
                            </div>
                            <div className={`mx-3 ${tab=="Activities"?"tab-active":""}`} onClick={()=>{setTab("Activities")}}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="px-2">Activities</span>
                                    <div className="badge bg-primary" style={{fontSize:"10px"}}>new</div>
                                </div>
                            </div>
                            <div className={`mx-3 ${tab=="Emails"?"tab-active":""}`} onClick={()=>{setTab("Emails")}}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="px-2">Emails</span>
                                    <div className="badge bg-primary" style={{fontSize:"10px"}}>new</div>
                                </div>
                            </div>
                            <div className={`mx-3 `} style={{minWidth:"150px"}}>
                                <div className="d-flex  align-items-center">
                                    <FaEnvelope />
                                    <span className="px-2">Send Email</span>
                                    
                                </div>
                            </div>
                            <div className={`mx-3 `} style={{minWidth:"150px"}}>
                                <div className="d-flex  align-items-center">
                                    <FaFileAlt />
                                    <span className="px-2">Send Document</span>
                                    
                                </div>
                            </div>
                            <div className={`mx-3 `} >
                            <RiDeleteBin6Line  />
                            </div>
                        </div>
                        <hr className=""  style={{
                            color:"grey",
                            margin:"0px 10px",
                            paddingTop:"2px"
                        }}/>
                        <div className="w-100">
                        {tab== "Documents" && <DocumentsClient />}
                        {tab=="Emails" && <ClientEmail />}
                        {tab=="Edit" && <EditData />}
                        {tab=="Activities" && <ClientActivities />}
                    </div>
                    </div>
                    <div className=" col-11 col-md-5 col-lg-5  mx-auto card d-flex flex-column shadow" style={{
                    }}> 
                        <div className="d-flex w-100 align-items-center justify-content-between">
                            <h1 className="h1 m-3 px-2" style={{fontWeight:"700",borderLeft:"8px solid #006996"}}>Client Details</h1>
                            <div className="d-flex align-items-center">
                                <button className=" btn btn-outline-primary" onClick={()=>{setRight("edit")}}>Edit</button>
                                <button className=" btn btn-outline-primary mx-3" onClick={()=>{setRight("details")}} >Details</button>
                            </div>
                        </div>
                        {right=="details" && <DetailsClient />}
                        {right=="edit" && <EditData />}
                    </div>
                    
                    
                </div>
            </section>
        </> 
    )
}
export default ClientDetails