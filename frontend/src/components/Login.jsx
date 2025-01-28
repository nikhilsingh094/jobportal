import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { RadioGroup } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { setLoading,setUser } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const Login = () => {
    const [input,setInput] = useState({
        email:"",
        password:"",
        role:"",
    })

    const {user} = useSelector(store=>store.auth)
    const changeEventHandler = (e) => {
        setInput({...input,[e.target.name]:e.target.value})
    }

    const navigate = useNavigate();
    const {loading} = useSelector(store=>store.auth);
    const dispatch = useDispatch()

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true))
          const res = await axios.post(
            `http://localhost:5050/api/v1/user/login`,
            input,
            {
              headers: {
                "Content-type": "application/json",
              },
              withCredentials: true,
            }
          );
          if(res.data.success){
            dispatch(setUser(res.data.user))
            navigate("/")
            setInput({
                email: "",
                password: "",
                role: "",
            })
            toast.success(res.data.message)
          }
        } catch (error) {
            console.log(error);     
        }finally{
            dispatch(setLoading(false))
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
            Login into your account
          </h2>
          <form onSubmit={loginHandler} className="space-y-2">
            
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
                    checked={input.role === 'student'}
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
                    checked={input.role === 'recruiter'}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="role">Recruiter</Label>
                </div>
              </RadioGroup>
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
                  Login
                </button>
              )}
            </div>
          </form>
          <p className="text-sm text-gray-600 mt-6 text-center">
            Do not have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
