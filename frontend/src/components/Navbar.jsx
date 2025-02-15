import  { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../redux/userSlice";
import { Menu, X } from "lucide-react"; // Import icons for hamburger and close

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.get("https://jobportal-id64.onrender.com/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div>
          <h1 className="text-2xl font-bold text-red-600">
            <Link to="/">Naukri</Link>
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies/">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="outline"
                  className="bg-blue-700 text-white hover:bg-blue-500 hover:text-white"
                >
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover className="text-white">
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 border-2 p-4 m-4 bg-blue-200 z-30">
                <div className="flex items-center gap-4 space-y-2">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="font-medium">{user?.name}</h1>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  {user && user.role === "student" ? (
                    <>
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                      <Button variant="link" onClick={handleLogout}>
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Button variant="link" onClick={handleLogout}>
                      Logout
                    </Button>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
        <div className="md:hidden">
          <Button variant="ghost" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white">
          <ul className="flex flex-col font-medium items-center gap-5 p-4">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies/">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
            {!user ? (
              <div className="flex flex-col items-center gap-2">
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/register">
                  <Button
                    variant="outline"
                    className="bg-blue-700 text-white hover:bg-blue-500 hover:text-white"
                  >
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Button variant="link">
                  <Link to="/profile">View Profile</Link>
                </Button>
                <Button variant="link" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;