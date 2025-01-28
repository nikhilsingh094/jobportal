import { useDispatch } from "react-redux";
import { setAllAppliedJobs } from "../../redux/jobSlice";
import { useEffect } from "react";
import axios from "axios";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5050/api/v1/application/get`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.application));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppliedJobs();
  }, []);
};

export default useGetAppliedJobs;
