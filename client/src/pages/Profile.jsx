import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import PlayerList from '../components/PlayerList';
import PlayerForm from '../components/PlayerForm';

import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  //const [userId, setUserId] = useState();

  //useEffect(() => {
  //  const token = Auth.getToken();
  //  if (token) {
  //    if (!Auth.isTokenExpired(token)) {
  //      const user = Auth.getProfile();
  //      setUserId(user.data._id);
  //      console.log(user.data._id);
  //    }
  //  }
  //}, []);

  const { userId: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_SINGLE_USER : QUERY_ME, {
    variables: { userId: userParam },
  });

  const user = data?.me || data?.user || {};
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5">
          <PlayerList
            players={user.players}
            teamName={`${user.teamName}`}
            showTeamName={false}
            showUsername={false}
          />
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <PlayerForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
