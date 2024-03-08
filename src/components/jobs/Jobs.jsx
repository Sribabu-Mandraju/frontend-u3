import "../../css/jobs.css";
import { fetchJobs } from "../../store/jobSlice";
import JobForm from "./JobForm";
import JobListing from "./JobListing";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Jobs = () => {
  const [isForm, setIsForm] = useState(false);
  const jobSectionRef = useRef(null);
  const dispatch = useDispatch();

  const jobStatus = useSelector((state) => state.job.state);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (jobStatus === "idle") {
      dispatch(fetchJobs(token));
    }
  }, [jobStatus, dispatch]);

  const scrolltoTop = () => {
    jobSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-2 jobs" ref={jobSectionRef}>
      <h3>Manage Jobs</h3>
      <JobForm isForm={isForm} setIsForm={setIsForm} />
      <JobListing setIsForm={setIsForm} scrolltoTop={scrolltoTop} />
    </section>
  );
};

export default Jobs;
