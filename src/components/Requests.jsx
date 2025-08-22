import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import addRequests from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
      console.log(res.data.data);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    fetchRequests();
  });

  return <div>Requests</div>;
};

export default Requests;
