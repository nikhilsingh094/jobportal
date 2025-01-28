import { Edit2, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminJobTable() {
  const { allAdminJobs, searchJobs } = useSelector((store) => store.job);
  const [filterjob, setFilterJob] = useState(allAdminJobs);
  const navigate = useNavigate()

  useEffect(() => {
    const filterData =
      allAdminJobs?.length >= 0 &&
      allAdminJobs.filter((jb) => {
        if (!searchJobs) {
          return true;
        }
        return jb?.title
          ?.toLowerCase()
          .includes(searchJobs.toLowerCase());
      });
      setFilterJob(filterData)
  }, [allAdminJobs, searchJobs]);

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
            <th className="px-6 py-4 text-left">Company Name</th>
            <th className="px-6 py-4 text-left">Role</th>
            <th className="px-6 py-4 text-left">Created</th>
            <th className="px-6 py-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {filterjob?.map((j) => (
            <tr
              key={j.id}
              className="border-b hover:bg-gray-100 transition"
            >
              <td className="px-6 py-4">{j?.company?.companyName}</td>
              <td className="px-6 py-4">{j?.title}</td>
              <td className="px-6 py-4">{j?.createdAt.split("T")[0]}</td>
              <td className="px-6 py-4">
             
                <button className="text-blue-600 hover:text-blue-800 transition ml-4">
                  <Eye onClick={()=>navigate(`/admin/job/${j._id}/applicants`)} className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminJobTable;
