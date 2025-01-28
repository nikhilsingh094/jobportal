import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCompany } from "../../../redux/companySlice";

function AddCompany() {
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerCompany = async () => {
    try {
      const res = await axios.post(
        `https://jobportal-id64.onrender.com/api/v1/company/addCompany`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      
      if (res.data.success) {
        dispatch(setCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Company</h2>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700"
              >
                Company Name
              </label>
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                type="text"
                id="companyName"
                name="companyName"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 pl-2"
                placeholder="Enter the company name"
              />
            </div>

            <div className="text-right flex gap-2 justify-end">
              <button className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <Link to="/admin/companies"> Cancle</Link>
              </button>
              <button
                onClick={registerCompany}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add Company
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCompany;
