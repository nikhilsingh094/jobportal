import { Edit } from "lucide-react";
import AppliedJobs from "./AppliedJobs";
import Navbar from "./Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState } from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJob";

function Profile() {
  useGetAppliedJobs();
  
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg">
        {/* Profile Header */}
        <div className="flex items-center space-x-6">
          <Avatar>
            <AvatarImage src={user?.profile?.profilePhoto} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 flex items-center">
              {user?.name}
              <button
                onClick={() => setOpen(true)}
                className="ml-2 text-gray-600 hover:text-gray-800"
              >
                <Edit />
              </button>
            </h1>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            Bio
          </h2>
          <p className="mt-2 text-gray-600">{user?.profile?.bio}</p>
        </div>

        {/* Skills Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
          <div className="flex gap-2">
            {user?.profile?.skills?.map((item, index) => (
              <p key={index} className="mt-2 text-gray-600">
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Contact</h2>
          <p className="mt-2 text-gray-600">{user?.email}</p>
          <p className="mt-2 text-gray-600">{user?.phoneNumber}</p>
        </div>

        {/* Resume Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Resume</h2>
          <p className="mt-2 text-gray-600">
            <a
              href={user?.profile?.resume}
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          </p>
        </div>

        {/* Applied Jobs Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Applied Jobs</h2>
          <AppliedJobs />
        </div>
        <EditProfile open={open} setOpen={setOpen} />
      </div>
    </>
  );
}

export default Profile;
