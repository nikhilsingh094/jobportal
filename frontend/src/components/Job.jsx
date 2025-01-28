import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function Job({job}) {
  const navigate = useNavigate()  

  return (
    <>
    
    <div className="mx-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <div className="flex items-center mb-4">
            <img
              src={job?.company?.logo}
              alt="TechCorp logo"
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
            Job Type: <span className="font-semibold">{job?.jobType}</span>
          </p>
          <p className="text-gray-600 text-sm mb-4">
            Positions: <span className="font-semibold">{job?.position}</span>
          </p>
          <div className="flex space-x-4">
            <Button onClick={()=>navigate(`/description/${job?._id}`)}>Details</Button>
          </div>
        
      </div>
    </div>
    </>
  );
}

export default Job;
