import PropTypes from "prop-types";

const UserCard = ({ user }) => {
  // const { firstName, lastName, photoUrl, age, gender, about } = user;
  console.log(user);

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img className="w-100 h-90" src={user?.photoUrl} alt="user" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
        {user?.age && user?.gender && <p>{user?.age + ", " + user?.gender}</p>}
        <p>{user?.about}</p>
        <div className="card-actions justify-center my-5">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Intersted</button>
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    photoUrl: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    gender: PropTypes.string,
    about: PropTypes.string,
  }).isRequired,
};

export default UserCard;
