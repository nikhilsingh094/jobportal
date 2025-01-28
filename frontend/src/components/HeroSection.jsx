import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchBrowseJobs } from "../../redux/jobSlice";

const HeroSection = () => {
  /*const category = [
      {
        company: "TechCorp",
        title: "Front-End Developer",
        description: "Build interactive user interfaces and seamless web experiences with technologies like React, HTML, CSS, and JavaScript.",
        salaryRange: "$60,000 - $90,000",
        jobType: "Full-time"
      },
      {
        company: "WebWorks",
        title: "Back-End Developer",
        description: "Work with server-side logic, databases, and APIs to support the front-end of the application using technologies like Node.js and Express.",
        salaryRange: "$70,000 - $100,000",
        jobType: "Part-time"
      },
      {
        company: "CodeLab",
        title: "Full-Stack Developer",
        description: "Develop both front-end and back-end of applications, ensuring the integration of all layers of the tech stack.",
        salaryRange: "$80,000 - $120,000",
        jobType: "Full-time"
      },
      {
        company: "Cloudify",
        title: "DevOps Engineer",
        description: "Manage infrastructure, deployment pipelines, and CI/CD tools to ensure smooth delivery of software products.",
        salaryRange: "$85,000 - $120,000",
        jobType: "Full-time"
      },
      {
        company: "Designo",
        title: "UI/UX Designer",
        description: "Create visually stunning and user-friendly designs for web and mobile applications, focusing on user experience.",
        salaryRange: "$50,000 - $85,000",
        jobType: "Part-time"
      },
      {
        company: "DataTech",
        title: "Data Scientist",
        description: "Analyze large data sets to extract valuable insights and build machine learning models for business intelligence.",
        salaryRange: "$90,000 - $130,000",
        jobType: "Full-time"
      }
    ];
    */

  const { allJobs } = useSelector((store) => store.job);

  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = () => {
    dispatch(setSearchBrowseJobs(input));
    navigate("/browse");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Discover the Latest Job Openings and Unlock Your Dream Career!
          </p>
          <div className="bg-white p-4 rounded-lg shadow-md inline-block w-full max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                placeholder="Job title, keywords, or company"
                className="flex-1 text-black p-3 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-4 md:mb-0"
              />
              <button onClick={searchHandler} className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition duration-300">
                Search Jobs
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Explore Latest Job Opening
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allJobs.length <= 0 ? (
              <h1>No Jobs Available</h1>
            ) : (
              allJobs?.map((cate) => (
                <div
                  key={cate._id}
                  className="p-6 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition duration-300 text-center"
                >
                  <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
                    {cate?.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{cate?.description}</p>
                  <p className="text-gray-600 text-sm mb-2">
                    Company:{" "}
                    <span className="font-semibold">
                      {cate?.company?.companyName}
                    </span>
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    Job Type:{" "}
                    <span className="font-semibold">{cate?.jobType}</span>
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    Salary Range:{" "}
                    <span className="font-semibold">{cate?.salary}</span>
                  </p>
                  <button onClick={()=>navigate(`/description/${cate._id}`)} className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700">
                    Details
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-gray-300 py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">
              &copy; 2025 JobPortal. All rights reserved.
            </p>
            <ul className="flex space-x-6">
              {["Home", "About Us", "Jobs", "Contact", "Privacy Policy"].map(
                (link, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-white">
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HeroSection;
