import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AdminJobTable from "./AdminJobTable";
import { setJobSearch } from "../../../redux/jobSlice";
import useGetAdminJobs from "@/hooks/useGetAdminJobs";


function AdminJobs() {
  useGetAdminJobs();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setJobSearch(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Jobs</h1>
          <button
            onClick={() => navigate("/admin/job/post")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            New Job
          </button>
        </div>

        <div className="relative mb-4">
          <input
          value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Search companies..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        <AdminJobTable/>
      </div>
    </div>
  );
}

export default AdminJobs;
