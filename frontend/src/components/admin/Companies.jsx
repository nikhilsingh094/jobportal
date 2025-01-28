import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import CompanyTable from "./CompanyTable";
import useGetAllCompany from "@/hooks/useGetAllCompany";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompany } from "../../../redux/companySlice";

function Companies() {
  useGetAllCompany();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearchCompany(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Companies</h1>
          <button
            onClick={() => navigate("/admin/companies/create")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            New Company
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

        <CompanyTable />
      </div>
    </div>
  );
}

export default Companies;
