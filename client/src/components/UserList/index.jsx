import { Link } from 'react-router-dom';

const UserList = ({ users, title, showTitle = true, showUsername = true }) => {
  if (!users.length) {
    return <h3>No Coaches Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {users &&
        users.map((user) => (
          <div key={user._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${user.username}`}
                ></Link>
              ) : (
                <></>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{user.teams.teamName}</p>
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
