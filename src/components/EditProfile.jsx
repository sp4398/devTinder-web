import { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL+"/profile/edit",  
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        {
          headers: { "Content-Type": "application/json" }, // Ensure headers are set
          withCredentials: true, // Ensure credentials are sent
        }
      );
      dispatch(addUser(res?.data?.data));
    } catch (error) {
      console.error("PATCH request failed:", error);
      setError(error?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-15">
      <div className="flex justify-center mx-5">
        <div className="card bg-neutral w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl justify-center">Edit Profile</h2>
            <label className="form-control w-full max-w-xs my-1">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                value={firstName}
                className="input input-bordered w-full max-w-xs my-1"
                onChange={(e) => setFirstName(e.target.value)}
                required
                aria-label="First Name"
              />
            </label>
            <label className="form-control w-full max-w-xs my-1">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                value={lastName}
                className="input input-bordered w-full max-w-xs my-1"
                onChange={(e) => setLastName(e.target.value)}
                required
                aria-label="Last Name"
              />
            </label>
            <label className="form-control w-full max-w-xs my-1">
              <div className="label">
                <span className="label-text">Photo URL</span>
              </div>
              <input
                type="text"
                value={photoUrl}
                className="input input-bordered w-full max-w-xs my-1"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-1">
              <div className="label">
                <span className="label-text">Age</span>
              </div>
              <input
                type="text"
                value={age}
                className="input input-bordered w-full max-w-xs my-1"
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-1">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <div className="flex gap-4">
                            <label className="label cursor-pointer justify-start gap-2">
                                <input
                                    type="radio"
                                    // {...register("gender")}
                                    className="radio radio-primary"
                                    value="male"
                                />
                                <span className="label-text">Male</span>
                            </label>
                            <label className="label cursor-pointer justify-start gap-2">
                                <input
                                    type="radio"
                                    // {...register("gender")}
                                    className="radio radio-primary"
                                    value="female"
                                />
                                <span className="label-text">Female</span>
                            </label>
                        </div>
            </label>
            <label className="form-control w-full max-w-xs my-1">
              <div className="label">
                <span className="label-text">About</span>
              </div>
              <input
                type="text"
                value={about}
                className="input input-bordered w-full max-w-xs my-1"
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>

            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center my-1">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
    </div>
  );
};

export default EditProfile;
