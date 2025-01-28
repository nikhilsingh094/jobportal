import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setCompany } from "../../redux/companySlice";

function useGetCompanyById(companyId) {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCompanyById = async () => {
      try {
        const res = await axios.get(`https://jobportal-id64.onrender.com/api/v1/company/getCompanyById/${companyId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCompanyById();
  }, [companyId,dispatch]);
}

export default useGetCompanyById;
