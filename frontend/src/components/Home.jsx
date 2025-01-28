
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAllJobs } from "../../redux/jobSlice";

function Home() {
  const dispatch = useDispatch();
  const {searchBrowseJob} = useSelector(store=>store.job)

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`https://jobportal-id64.onrender.com/api/v1/job/get?keyword=${searchBrowseJob}`, {
          withCredentials: true,
        });
        

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, []);

  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <HeroSection />
    </div>
  );
}

export default Home;
