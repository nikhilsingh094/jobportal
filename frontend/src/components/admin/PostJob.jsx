import { useState } from "react";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../ui/select";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
 

  // const { singleJob } = useSelector((store) => store.job);
  const { companies } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectHandler = (value) => {
    const selectedCompany = companies.find(
      (comp) => comp.companyName.toLowerCase() === value
    );
    setInput({ ...input, companyId:selectedCompany._id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      setLoading(true);
      const res = await axios.post(
        `https://jobportal-id64.onrender.com/api/v1/job/post`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //     setInput({
  //       title: singleJob?.title || "",
  //       description: singleJob?.description || "",
  //       requirements: singleJob?.requirements || "",
  //       salary: singleJob?.salary || "",
  //       location: singleJob?.location || "",
  //       jobType: singleJob?.jobType || "",
  //       experience: singleJob?.experience || "",
  //       position: singleJob?.position || 0,
  //       companyId: singleJob?.companyId || "",
  //     });
  //   }, [singleJob]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Post a Job
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6">
                {/* Job Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={input.title}
                    onChange={changeEventHandler}
                    className="mt-1 py-2 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter job title"
                  />
                </div>

                {/* Job Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Description
                  </label>
                  <input
                    id="description"
                    name="description"
                    value={input.description}
                    onChange={changeEventHandler}
                    className="mt-1 block w-full py-2 pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter job description"
                  />
                </div>

                {/* Requirements */}
                <div>
                  <label
                    htmlFor="requirements"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Requirements
                  </label>
                  <input
                    id="requirements"
                    name="requirements"
                    value={input.requirements}
                    onChange={changeEventHandler}
                    className="mt-1 py-2 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter job requirements (comma-separated)"
                  />
                </div>

                {/* Salary */}
                <div>
                  <label
                    htmlFor="salary"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Salary
                  </label>
                  <input
                    type="number"
                    id="salary"
                    name="salary"
                    value={input.salary}
                    onChange={changeEventHandler}
                    className="mt-1 py-2 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter salary"
                  />
                </div>

                {/* Location */}
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={input.location}
                    onChange={changeEventHandler}
                    className="mt-1 py-2 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter job location"
                  />
                </div>

                {/* Job Type */}
                <div>
                  <label
                    htmlFor="jobType"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Type
                  </label>
                  <input
                    id="jobType"
                    name="jobType"
                    value={input.jobType}
                    onChange={changeEventHandler}
                    className="mt-1 block w-full py-2 pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  ></input>
                </div>

                {/* Experience */}
                <div>
                  <label
                    htmlFor="experience"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Experience
                  </label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    value={input.experience}
                    onChange={changeEventHandler}
                    className="mt-1 block py-2 pl-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter required experience"
                  />
                </div>

                {/* Position */}
                <div>
                  <label
                    htmlFor="position"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Position
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={input.position}
                    onChange={changeEventHandler}
                    className="mt-1 block py-2 pl-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter job position"
                  />
                </div>

                {/* Company Dropdown */}
                <div>
                  <label
                    htmlFor="companyId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company
                  </label>
                  {companies.length > 0 && (
                    <Select
                      onValueChange={selectHandler}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a company" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {companies.map((company) => (
                            <SelectItem key={company._id} value={company?.companyName?.toLowerCase()}>
                              {company.companyName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              <div className="mt-6">
                {loading ? (
                  <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <Loader2 className="mr-2 h-4 w-4" /> Please wait...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Post Job
                  </button>
                )}

                {companies.length === 0 && (
                  <p className="text-red-600 font-bold">
                    Please add company first
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostJob;
