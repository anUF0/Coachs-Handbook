import { Link } from 'react-router-dom';

const UserList = ({
  users,
  username,
  showTitle = true,
  showUsername = true,
}) => {
  if (!users.length) {
    return <h3>No Coaches Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{username}</h3>}
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
              to={`/${user.teams._id}`}
            >
              Join the discussion on this thought.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default UserList;
