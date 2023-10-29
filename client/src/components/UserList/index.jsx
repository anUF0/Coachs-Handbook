import { Link } from 'react-router-dom';

const UserList = ({ users }) => {
  if (!users.length) {
    return <h3>No Coaches Yet</h3>;
  }

  return (
    <div>
      {users &&
        users.map((user) => (
          <div key={user._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {`${user.username}'s`}
            </h4>
            <div className="card-body bg-light p-2">
              <p className="strong">{user.teamName}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/profile/${user._id}`}
            >
              Checkout This Coach's Team.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default UserList;
