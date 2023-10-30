//import { DELETE_PLAYER } from '../../utils/mutations';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
//import { useParams } from 'react-router-dom';
//import Auth from '../../utils/auth';
const PlayerList = ({ players = [] }, teamName, showTeamName) => {
  //const [removePlayer, { error }] = useMutation(DELETE_PLAYER, {
  //  refetchQueries: [QUERY_PLAYERS, 'getPlayers', QUERY_ME, 'me'],
  //});

  const { loading, data } = useQuery(QUERY_ME);

  const user = data?.me || data?.user || {};

  //const handleClick = async () => {
  //  const playerId = this.player.id;
  //  const { data } = await removePlayer({ variables: { playerId } });
  //};

  if (!players.length) {
    return <h3>Can't Play the Game without Players</h3>;
  }
  /// const formattedSkillAndTraits = players.map(
  ///   (player) => player.skillsAndTraits
  /// );

  return (
    <div>
      {showTeamName && <h3>{teamName}</h3>}
      {players &&
        players.map((player) => (
          <div key={player._id} className="card mb-3">
            <div>
              {' '}
              <div className="p-3">
                <p>
                  Position: {player.position} | MA: {player.MA} | ST:{' '}
                  {player.ST} | AG: {player.AG}+ | PA: {player.PA}+ | AV:{' '}
                  {player.AV}+ | Skills and Traits: {player.skillsAndTraits}
                  {/*formattedSkillAndTraits*/}
                </p>
                {/*Auth.loggedIn() && Auth.getProfile().data._id === user._id ? (
                  <button className="btn btn-danger" onClick={handleClick}>
                    Remove
                  </button>
                ) : (
                  ''
                )*/}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PlayerList;
