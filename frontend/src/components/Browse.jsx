import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { setAllJobs, setSearchBrowseJobs } from "../../redux/jobSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Browse() {

  const {searchBrowseJob} = useSelector(store=>store.job)
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  const navigate = useNavigate()

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`https://jobportal-id64.onrender.com/api/v1/job/get?keyword=${searchBrowseJob}`, {
          withCredentials: true,
        });
        

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, []);

  
  useEffect(() => {
    return () => {
      dispatch(setSearchBrowseJobs(""));
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-6">
          <div className="w-full bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Search Results
            </h2>
            <div className="text-gray-600">
              <p>Displaying {allJobs.length} results for your search</p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Loop through the job data and render job cards directly */}
                {allJobs.map((job) => (
                  <div
                    key={job._id}
                    className="p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src={job?.company?.logo}
                        alt="Company logo"
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <h3 className="text-xl font-semibold text-indigo-600">
                        {job?.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-2">
                    {job?.description}
                    </p>
                    <p className="text-gray-600 text-sm mb-2">
                      Company: <span className="font-semibold">{job?.company?.companyName}</span>
                    </p>
                    <p className="text-gray-600 text-sm mb-2">
                      Salary Range:{" "}
                      <span className="font-semibold">{job?.salary}</span>
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      Job Type: <span className="font-semibold">{job?.role}</span>
                    </p>
                    <div className="flex space-x-4">
                      <button onClick={()=>navigate(`/description/${job._id}`)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Browse;
