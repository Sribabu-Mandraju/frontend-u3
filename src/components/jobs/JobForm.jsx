import { FaPlus, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { jobActions, fetchJobs } from "../../store/jobSlice";

// eslint-disable-next-line
const JobForm = ({ setIsForm, isForm }) => {
  const [data, setData] = useState({
    role: "",
    company: "U3Technologies",
    location: "",
    desc: "",
    requirements: "",
    link: "",
    responseLink: "",
  });
  const currentJob = useSelector((state) => state.job.current);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentJob) {
      setData({
        role: currentJob.role,
        company: currentJob.company,
        location: currentJob.location,
        requirements: currentJob.req,
        link: currentJob.link,
        desc: currentJob.desc,
        responseLink: currentJob.responseLink || "",
      });
    }
  }, [currentJob]);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_APP_BACKEND_URL}admin/job/update/${
          currentJob.id
        }`,
        {
          role: data.role,
          company: data.company,
          location: data.location,
          desc: data.desc,
          requirements: data.requirements,
          active: true,
          link: data.link,
          responseLink: data.responseLink,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("Job Edited Successfully");
      setData({
        role: "",
        company: "U3Technologies",
        location: "",
        requirements: "",
        link: "",
        responseLink: "",
      });
      setIsForm(false);
      dispatch(jobActions.clearCurrent());
      dispatch(jobActions.setBack());
      dispatch(fetchJobs(token));
    } catch (error) {
      console.log(error);
      toast.error("Error occured while editing job, try again");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}admin/job/new`,
        {
          role: data.role,
          company: data.company,
          location: data.location,
          desc: data.desc,
          requirements: data.requirements.split(","),
          active: true,
          link: data.link,
          responseLink: data.responseLink,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("New Job Created Successfully");
      setData({
        role: "",
        company: "U3Technologies",
        location: "",
        requirements: "",
        link: "",
        responseLink: "",
      });
      setIsForm(false);
      dispatch(jobActions.setBack());
      dispatch(fetchJobs(token));
    } catch (error) {
      console.log(error);
      toast.error("Error occured while creating job, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="btn btn-primary d-flex align-items-center gap-2 mx-3"
        onClick={() => setIsForm((p) => !p)}
      >
        {isForm ? <FaTimes /> : <FaPlus />} {isForm ? "Close Form" : "Add Job"}
      </button>
      {isForm && (
        <>
          <form
            className="resource-form shadow  d-flex flex-column ps-3 py-3 my-4  mx-auto "
            style={{
              width: "97%",
              maxWidth: "450px",
              height: "auto",
              backgroundColor: "#F7FFFF",
            }}
          >
            <h3 className="text-center">
              {currentJob ? "Edit" : "Add New"} Job
            </h3>
            <span className="mt-3">
              <label htmlFor="title" className=" ps-2">
                Role
              </label>
              <input
                type="text"
                name="role"
                placeholder="Job Role"
                value={data.role}
                onChange={handleChange}
                required
              />
            </span>

            <span className="mt-3">
              <label htmlFor="desc" className=" ps-2">
                Description
              </label>
              <textarea
                name="desc"
                id="desc"
                cols="30"
                rows="3"
                placeholder="Description of Job"
                value={data.desc}
                onChange={handleChange}
                required
              ></textarea>
            </span>

            <span className="mt-3">
              <label htmlFor="requirements" className=" ps-2">
                Requirements
              </label>
              <textarea
                name="requirements"
                id="requirements"
                cols="30"
                rows="3"
                placeholder="Sepcify requiremetns , seperate each requirment with ','"
                value={data.requirements}
                onChange={handleChange}
                required
              ></textarea>
            </span>

            <span className="mt-3">
              <label htmlFor="company" className=" ps-2">
                Company
              </label>
              <input
                type="text"
                name="company"
                onChange={handleChange}
                value={data.company}
                required
              />
            </span>

            <span className="mt-3">
              <label htmlFor="location" className="ps-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Location mention remote if it is so"
                onChange={handleChange}
                value={data.location}
                required
              />
            </span>

            <span className="mt-3">
              <label htmlFor="links" className=" ps-2">
                Form Link
              </label>
              <input
                type="text"
                name="link"
                id="links"
                placeholder="Form Link"
                onChange={handleChange}
                value={data.link}
                required
              />
            </span>

            <span className="mt-3">
              <label htmlFor="responseLinks" className=" ps-2">
                Form Responses Link
              </label>
              <input
                type="text"
                name="responseLink"
                id="responseLinks"
                placeholder="Drop the link of responses document here (optional)"
                onChange={handleChange}
                value={data.responseLink}
              />
            </span>

            {!currentJob && (
              <span className="mt-3 w-100">
                <input
                  type="submit"
                  value={loading ? "submitting" : "submit"}
                  disabled={loading}
                  className="w-100"
                  onClick={handleSubmit}
                  style={{ backgroundColor: "#006996", color: "white" }}
                />
              </span>
            )}
            {currentJob && (
              <span className="mt-3 w-100">
                <input
                  type="submit"
                  value={loading ? "Editing..." : "Edit"}
                  disabled={loading}
                  onClick={handleEdit}
                  className="w-100"
                  style={{ backgroundColor: "#006996", color: "white" }}
                />
              </span>
            )}
            <span className="mt-3 w-100">
              <button
                type="button"
                disabled={loading}
                className="w-100 text-center"
                style={{
                  backgroundColor: "#006996",
                  color: "white",
                  width: "97%",
                  maxWidth: "400px",
                  height: "40px",
                  borderRadius: "20px",
                  ouline: "none",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setData({
                    role: "",
                    company: "U3Technologies",
                    location: "",
                    requirements: "",
                    link: "",
                    responseLink: "",
                  });
                  setIsForm(false);
                }}
              >
                Clear
              </button>
            </span>
          </form>
        </>
      )}
    </>
  );
};

export default JobForm;
