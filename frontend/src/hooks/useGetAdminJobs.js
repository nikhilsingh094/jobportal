import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllAdminJobs} from "../../redux/jobSlice";

function useGetAdminJobs() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAdminJobs = async () => {
      try {
        const res = await axios.get(`https://jobportal-yikl.onrender.com/api/v1/job/getadminjobs`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAdminJobs();
  }, []);
}

export default useGetAdminJobs;
