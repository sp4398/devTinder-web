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
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex justify-center my-12">
        {/* Form Section */}
        <div className="flex justify-center mx-5">
          <div className="card bg-neutral w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl justify-center">
                Edit Profile
              </h2>

              {/* First Name */}
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
                />
              </label>

              {/* Last Name */}
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
                />
              </label>

              {/* Photo URL */}
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

              {/* Age */}
              <label className="form-control w-full max-w-xs my-1">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="number"
                  value={age}
                  min="18"
                  max="100"
                  className="input input-bordered w-full max-w-xs my-1"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>

              {/* Gender */}
              <label className="form-control w-full max-w-xs my-1">
                <div className="label">
                  <span className="label-text">Gender</span>
                </div>
                <div className="flex gap-4">
                  <label className="label cursor-pointer justify-start gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      className="radio radio-primary"
                      checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <span className="label-text">Male</span>
                  </label>
                  <label className="label cursor-pointer justify-start gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="radio radio-primary"
                      checked={gender === "female"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <span className="label-text">Female</span>
                  </label>
                </div>
              </label>

              {/* About */}
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

              {/* Error */}
              {error && <p className="text-red-500">{error}</p>}

              {/* Save */}
              <div className="card-actions justify-center my-1">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
          showActions={false}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
