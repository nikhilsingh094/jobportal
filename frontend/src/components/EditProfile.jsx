import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { setUser, setLoading } from "../../redux/userSlice";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const EditProfile = ({ open, setOpen }) => {
  const { loading, user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: user?.name,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    file: user?.profile?.resume,
  });

  const chanfeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", input.name);
    formdata.append("email", input.email);
    formdata.append("phoneNumber", input.phoneNumber);
    formdata.append("bio", input.bio);
    formdata.append("skills", input.skills);
    if (input.file) {
      formdata.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `https://jobportal-yikl.onrender.com/api/v1/user/profile/update`,
        formdata,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
        setInput({
          name: "",
          email: "",
          phoneNumber: "",
          bio: "",
          skills: "",
          file: "",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
    console.log(input);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler} className="space-y-2">
          {/* Name */}
          <div>
            <label className="block text-gray-600">Name</label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={chanfeEventHandler}
              className="mt-1 p-1 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              value={input.email}
              name="email"
              onChange={chanfeEventHandler}
              className="mt-1 p-1 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-gray-600">Contact</label>
            <input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={chanfeEventHandler}
              className="mt-1 p-1 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-gray-600">Bio</label>
            <input
              type="text"
              name="bio"
              value={input.bio}
              onChange={chanfeEventHandler}
              className="mt-1 p-1 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-gray-600">Skills</label>
            <input
              type="text"
              name="skills"
              value={input.skills}
              onChange={chanfeEventHandler}
              className="mt-1 p-1 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Resume Upload */}
          <div className="flex items-center gap-2">
            <label className="block text-gray-600">Resume</label>
            <input
              type="file"
              name="file"
              onChange={changeFileHandler}
              accept="application/pdf"
              className="mt-1 w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gray-100 file:text-gray-700"
            />
            <div className="flex justify-end space-x-4 mt-1">
              {loading ? (
                <Button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </Button>
              ) : (
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700"
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
