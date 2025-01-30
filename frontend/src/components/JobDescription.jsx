import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../../redux/jobSlice";
import { toast } from "sonner";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  const hasApplied =
    singleJob?.applications?.some((appli) => appli.applicant === user?._id) ||
    false;
  const [isApplied, setIsApplied] = useState(hasApplied);

  const applyJob = async () => {
    if (!user) {
      alert("You need to login or register first");
      return;
    }

    try {
      const res = await axios.get(
        `https://jobportal-id64.onrender.com/api/v1/application/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );
      
      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getSingleJob = async () => {
      try {
        const res = await axios.get(
          `https://jobportal-id64.onrender.com/api/v1/job/get/${jobId}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some((appli) => appli.applicant === user?._id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {singleJob?.title}
        </h2>

        <div className="text-lg text-gray-700 mb-4">
          <p>
            <strong>Location:</strong> {singleJob?.location}.
          </p>
          <p>
            <strong>Experience:</strong> {singleJob?.experienceLevel}
          </p>
          <p>
            <strong>Salary:</strong> {singleJob?.salary}
          </p>
          <p>
            <strong>Total Applicants:</strong> {singleJob?.applications.length}
          </p>
          <p>
            <strong>Posted:</strong> {singleJob?.createdAt.split("T")[0]}
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Job Description
          </h3>
          <p className="mt-2 text-gray-600">{singleJob?.description}</p>
        </div>

        {/* Apply Button */}
        <div className="flex justify-center">
          <button
            disabled={isApplied || !user}
            onClick={applyJob}
            className={`px-6 py-2 rounded-lg font-medium ${
              isApplied ? "bg-green-600 text-white" : "bg-blue-600 text-white"
            } hover:${isApplied ? "bg-green-700" : "bg-blue-700"}`}
          >
            {isApplied ? "Applied" : user ? "Apply" : "Login or Register to Apply"}
          </button>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
