import { useSelector } from "react-redux";
import FilterJobs from "./FilterJobs";
import Job from "./Job";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";

function Jobs() {
  const { allJobs, searchBrowseJob } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchBrowseJob) {
      const filteredJobs = allJobs.filter((j) => {
        return (
          j.title.toLowerCase().includes(searchBrowseJob.toLowerCase()) ||
          j.location.toLowerCase().includes(searchBrowseJob.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchBrowseJob]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Left Sidebar - Filter Section */}
            <FilterJobs />

            {/* Right Side - Job Postings */}
            {filterJobs.length <= 0 ? (
              <span>No Job Found</span>
            ) : (
              // Wrap the job listings container with scrollable styles
              <div className="w-full md:w-[70%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto overflow-x-hidden">
                {filterJobs.map((jb) => {
                  return <Job key={jb._id} job={jb} />;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Jobs;