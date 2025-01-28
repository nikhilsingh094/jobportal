import useGetCompanyById from "@/hooks/useGetCompanyById";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function CompanySetup() {
  const params = useParams();
  useGetCompanyById(params.id)
  const [input, setInput] = useState({
    companyName: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector(store => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    const formdata = new FormData();
    formdata.append("companyName", input.companyName);
    formdata.append("description", input.description);
    formdata.append("location", input.location);
    formdata.append("website", input.website);
    if (input.file) {
      formdata.append("file", input.file);
    }

    try {
      const res = await axios.put(
        `https://jobportal-yikl.onrender.com/api/v1/company/updateCompany/${params.id}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setInput({
      companyName: singleCompany.companyName || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header with Back Button */}
        <div className="p-6 border-b border-gray-200 flex items-center space-x-4">
          <Link
            to="/admin/companies"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <IoArrowBackOutline className="h-6 w-6 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Company Setup</h1>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Company Name */}
          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-700"
            >
              Company Name
            </label>
            <input
              type="text"
              value={input.companyName}
              onChange={changeEventHandler}
              id="companyName"
              name="companyName"
              placeholder="Enter company name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              value={input.description}
              onChange={changeEventHandler}
              id="description"
              name="description"
              rows={3}
              placeholder="Enter a brief description of the company"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          </div>

          {/* Website */}
          <div>
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-700"
            >
              Website
            </label>
            <input
              type="url"
              id="website"
              value={input.website}
              onChange={changeEventHandler}
              name="website"
              placeholder="Enter company website"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
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
              value={input.location}
              onChange={changeEventHandler}
              name="location"
              placeholder="Enter company location"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label
              htmlFor="logo"
              className="block text-sm font-medium text-gray-700"
            >
              Company Logo
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                id="logo"
                onChange={changeFileHandler}
                name="file"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompanySetup;
