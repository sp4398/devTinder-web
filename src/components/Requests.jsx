import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

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
  }, []);

  const handleClick = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      //
    }
  };

  if (!requests) return;

  if (requests.length === 0) return <h1>No Requests Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl text-white">Connections Requests</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, age, photoUrl, about, gender } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              <p>{about}</p>
              {age && gender && <p>{age + ", " + gender}</p>}
            </div>
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => handleClick("accepted", request._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => handleClick("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
