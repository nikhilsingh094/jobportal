import { useEffect } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "../../../redux/applicationSlice";
import { toast } from "sonner";
import { Button } from "../ui/button";

function Applicants() {
  const params = useParams();
  const dispatch = useDispatch();

  const shortListing = ["accepted", "rejected"];

  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async(status,id)=>{
    try {
      const res = await axios.post(`http://localhost:5050/api/v1/application/status/${id}/update`,{status},{
        withCredentials:true
      })
      if(res.data.success){
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5050/api/v1/application/${params.id}/applicants`,
          {
            withCredentials: true,
          }
        );
        console.log("API Response:", res.data.job); // Log the job object
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplicants();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Applicants</h1>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resume
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applicants &&
                  applicants.applications?.map((applicant) => (
                    <tr key={applicant._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {applicant.applicant.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {applicant.applicant.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {applicant.applicant.phoneNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {
                          applicant?.applicant?.profile?.resume ? 
                          <a className="text-blue-800" href={applicant?.applicant?.profile?.resume} target="_blank">{applicant?.applicant?.profile?.resumeOriginalName} 
                          </a> : <span className="text-blue-800">NA</span>
                          }
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="flex gap-2">
                          {shortListing.map((status, index) => {
                            return (
                              <Button onClick={()=>statusHandler(status,applicant?._id)}
                                key={index}
                                className="flex w-fit items-center my-2 cursor-pointer"
                              >
                                {status}
                              </Button>
                            );
                          })}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(applicant.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Applicants;
