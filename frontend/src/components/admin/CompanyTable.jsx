import { Edit2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CompanyTable() {
  const { companies, searchCompany } = useSelector((store) => store.company);

  const [filterComp, setFilterComp] = useState(companies);
  const navigate = useNavigate()

  useEffect(() => {
    const filterData =
      companies?.length >= 0 &&
      companies.filter((comp) => {
        if (!searchCompany) {
          return true;
        }
        return comp?.companyName
          ?.toLowerCase()
          .includes(searchCompany.toLowerCase());
      });
      setFilterComp(filterData)
  }, [companies, searchCompany]);

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
            <th className="px-6 py-4 text-left">Logo</th>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Date</th>
            <th className="px-6 py-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {filterComp?.map((company) => (
            <tr
              key={company.id}
              className="border-b hover:bg-gray-100 transition"
            >
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <img
                      src={company.logo}
                      alt="logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">{company.companyName}</td>
              <td className="px-6 py-4">{company.createdAt.split("T")[0]}</td>
              <td className="px-6 py-4">
                <button className="text-blue-600 hover:text-blue-800 transition">
                  <Edit2 onClick={()=>navigate(`/admin/companies/${company._id}`)} className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompanyTable;
