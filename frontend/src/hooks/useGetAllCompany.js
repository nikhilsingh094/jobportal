import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setAllCompany } from "../../redux/companySlice";

function useGetAllCompany() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllCompany = async () => {
      try {
        const res = await axios.get(`https://jobportal-id64.onrender.com/api/v1/company/getCompany`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllCompany(res?.data?.companies));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllCompany();
  }, []);
}

export default useGetAllCompany;
