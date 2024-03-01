import {useState} from 'react'
import '../App.css'


const SendNotice = () => {
    const [notice,setNotice] = useState(
        {
            title:"",
            date:null,
            shortDiscription:"",
            fullDiscription:"", 
            postedBy:"",
            link:"",
            postedAt:new Date()
        }
    )
    const handleChange = (e) => {
        const newData = {...notice}
        newData[e.target.name] = e.target.value
        setNotice(newData);
    }
    
    return (
        <>
            <section className="resource-form w-100"
                    style={{
                    width:"97%",
                    maxWidth:"1100px",
                    height:"87vh"
                }}
                >
                    <div className="text-center h3 bold-2" style={{color:"#006996"}}>Send Notice !</div>
                    <p className="text-center tag-line">Lorem ipsum dolor sit amet consectetur adipi</p>
                    <form className="resource-form shadow  d-flex flex-column ps-3 py-3  mx-auto "  
                    style={{
                    width:"97%",
                    maxWidth:"450px",
                    height:"auto",
                    backgroundColor:"#F7FFFF",
                  
                    }}
                    >
                        <span className="mt-3">
                            <label htmlFor="title" className=" ps-2">Title</label>
                            <input type="text" name="title" placeholder="Title of the book" value={notice.title}  onChange={handleChange}  required/>
                        </span>


                        <span className="mt-3">
                            <label htmlFor="shortDiscription" className=" ps-2">Short Discription</label>
                            <input type="text" name="shortDiscription" placeholder="Short discription about notice" value={notice.shortDiscription} onChange={handleChange} required/>
                        </span>
                                
                        <span className="mt-3">
                            <label htmlFor="longDiscription" className=" ps-2">Full discription</label>
                            <textarea name="fullDiscription" id="" cols="30" rows="5"  placeholder="Full discription" value={notice.fullDiscription} onChange={handleChange}></textarea>
                        </span>

                        <span className="mt-3">
                            <label htmlFor="date" className=" ps-2">Date</label>
                            <input type="date" name="date"  onChange={handleChange} value={notice.date} required/>
                        </span>

                        <span className="mt-3">
                            <label htmlFor="links" className=" ps-2">Link (optional) <sup className="h6 bold-1" style={{color:"red"}}>*</sup> </label>
                            <input type="text" name="link" placeholder="post link" onChange={handleChange} value={notice.link} />
                        </span>
                        
                        
                        <span className="mt-3 w-100">
                            <input type="submit"  value="submit" className="w-100" style={{backgroundColor:"#006996",color:"white"}} />
                        </span>
                    </form>
            </section>
        </>
    )
}
export default SendNotice