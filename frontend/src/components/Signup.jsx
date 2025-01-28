import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { RadioGroup } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/userSlice";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { user } = useSelector((store) => store.auth);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", input.name);
    formdata.append("email", input.email);
    formdata.append("phoneNumber", input.phoneNumber);
    formdata.append("password", input.password);
    formdata.append("role", input.role);
    if (input.file) {
      formdata.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `https://jobportal-yikl.onrender.com/api/v1/user/register`,
        formdata,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        setInput({
          name: "",
          email: "",
          phoneNumber: "",
          password: "",
          role: "",
          // file: "",
        });
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create an Account
          </h2>
          <form onSubmit={submitHandler} className="space-y-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                id="name"
                placeholder="Enter your full name"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                id="email"
                placeholder="Enter your email"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-600"
              >
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                id="phone"
                placeholder="Enter your Number"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                id="password"
                placeholder="Enter your password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <RadioGroup className="flex items-center gap-4 my-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="role">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="role">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                onChange={changeFileHandler}
                accept="image/*"
                type="file"
                className="cursor-pointer"
              />
            </div>
            <div>
              {loading ? (
                <Button className="w-full bg-blue-600 text-white font-medium py-2 rounded-md">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </Button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                >
                  Sign Up
                </button>
              )}
            </div>
          </form>
          <p className="text-sm text-gray-600 mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
