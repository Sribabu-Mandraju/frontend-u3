import { IoBagCheck } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs, jobActions } from "../../store/jobSlice";
import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosRefresh } from "react-icons/io";
import { IoIosTimer } from "react-icons/io";
import { FaEdit, FaEye } from "react-icons/fa";
import { toast } from "react-hot-toast";
import axios from "axios";

const JobCard = ({
  //eslint-disable-next-line
  id,
  //eslint-disable-next-line
  active,
  //eslint-disable-next-line
  company,
  //eslint-disable-next-line
  desc,
  //eslint-disable-next-line
  location,
  //eslint-disable-next-line
  req,
  //eslint-disable-next-line
  role,
  //eslint-disable-next-line
  link,
  //eslint-disable-next-line
  resultLink,
  //eslint-disable-next-line
  setIsForm,
  //eslint-disable-next-line
  scrolltoTop,
}) => {
  const [less, setLess] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [deactivate, setDeactivate] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    setDeleting(true);
    const deleteConfirm = window.confirm("Are you sure you want to delete");
    if (deleteConfirm) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `${import.meta.env.VITE_APP_BACKEND_URL}/admin/job/delete/${id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        toast.success("Job deleted successfully");
        dispatch(jobActions.setBack());
        dispatch(fetchJobs(token));
      } catch (error) {
        console.log(error);
        toast.error("Error!! job not deleted");
      } finally {
        setDeleting(false);
      }
    }
    setDeleting(false);
  };

  const handleEdit = () => {
    dispatch(
      jobActions.setCurrent({
        id,
        role,
        company,
        location,
        link,
        resultLink: resultLink ? resultLink : "",
        desc,
        req,
      })
    );
    setIsForm(true);
    scrolltoTop();
  };

  const handleActivate = async () => {
    setDeactivate(true);
    const confirmDeactivation = window.confirm(
      "Are you sure you want to expire the job"
    );
    if (!confirmDeactivation) {
      setDeactivate(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/admin/job/expire/${id}`,
        {
          active: false,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("Job Expired successfully");
      dispatch(jobActions.setBack());
      dispatch(fetchJobs(token));
    } catch (error) {
      console.log(error);
      toast.error("Error expiring the job , try again");
    } finally {
      setDeactivate(false);
    }
  };

  const handleRefresh = async () => {
    setRefresh(true);
    const confirmRefreshing = window.confirm(
      "Are you sure you want to refresh this job"
    );
    if (!confirmRefreshing) {
      setRefresh(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/admin/job/refresh/${id}`,
        {
          active: true,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      toast.success("Job Expired successfully");
      dispatch(jobActions.setBack());
      dispatch(fetchJobs(token));
    } catch (error) {
      toast.error("Error expiring the job , try again");
    } finally {
      setRefresh(false);
    }
  };

  return (
    <div className="joblist_card">
      <h3 className="text-capitalize">
        {role}{" "}
        <span className={active ? "active" : ""}>
          {active ? "Active" : "Expired"}
        </span>
      </h3>
      <p className="mb-0 loc text-capitalize">
        {company} , {location}
      </p>
      <p className="mt-2 mb-0">{desc}</p>
      <div
        className="toggle_less"
        style={{
          height: less ? "0" : "fit-content",
        }}
      >
        <h5>Requirements :-</h5>
        <ul>
          {/* eslint-disable-next-line */}
          {req.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>
      <p className="show_lom" onClick={() => setLess((p) => !p)}>
        {!less ? "Hide" : "Show"} Requirements...
      </p>
      <div className="mt-2 d-flex gap-2 flex-wrap">
        {resultLink !== "" && (
          <a>
            <button className="btn d-flex align-items-center btn-success btn-sm">
              <FaEye />
              &nbsp;&nbsp;View Responses
            </button>
          </a>
        )}
        <button
          onClick={handleEdit}
          className="btn d-flex align-items-center btn-primary btn-sm"
        >
          <FaEdit />
          &nbsp;&nbsp;Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="btn d-flex align-items-center btn-danger btn-sm"
        >
          <RiDeleteBinLine />
          &nbsp;&nbsp;{deleting ? "Deleting..." : "Delete"}
        </button>
        {active ? (
          <button
            onClick={handleActivate}
            disabled={deactivate}
            className="btn d-flex align-items-center btn-warning btn-sm"
          >
            <IoIosTimer />
            &nbsp;&nbsp;{deactivate ? "Expiring..." : "Expire"}
          </button>
        ) : (
          <button
            onClick={handleRefresh}
            disabled={refresh}
            className="btn d-flex align-items-center btn-dark btn-sm"
          >
            <IoIosRefresh />
            &nbsp;&nbsp;{refresh ? "Refreshing..." : "Refresh"}
          </button>
        )}
      </div>
    </div>
  );
};

//eslint-disable-next-line
const JobListing = ({ setIsForm, scrolltoTop }) => {
  const dispatch = useDispatch();

  const jobData = useSelector((state) => state.job.data);
  const jobStatus = useSelector((state) => state.job.state);
  const jobError = useSelector((state) => state.job.error);

  return (
    <div className="job_listing_container">
      <h4 className="d-flex align-items-center gap-2 py-4">
        <IoBagCheck color="rgb(0, 105, 150)" size={18} /> My Job Listings
      </h4>

      {jobStatus === "loaded" && !jobError ? (
        <>
          {/* eslint-disable-next-line */}
          {jobData && jobData.length > 0 ? (
            // eslint-disable-next-line
            jobData.map((job) => (
              <JobCard
                key={job.id}
                active={job.active}
                company={job.company}
                desc={job.desc}
                req={job.requirements}
                role={job.role}
                id={job.id}
                link={job.link}
                location={job.location}
                resultLink={job.resultLink}
                setIsForm={setIsForm}
                scrolltoTop={scrolltoTop}
              />
            ))
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "200px", minHeight: "30vh" }}
            >
              <h4>No Results Found</h4>
            </div>
          )}
        </>
      ) : jobError ? (
        <div className="my-5 d-flex justify-content-center align-items-center gap-2 flex-column">
          <h2 className="job_errmsg">Error fetching jobs</h2>
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch(jobActions.setBack());
              dispatch(fetchJobs());
            }}
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="my-5 d-flex justify-content-center align-items-center gap-2 flex-column">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h2 className="job_errmsg">Loading</h2>
        </div>
      )}
    </div>
  );
};

export default JobListing;
