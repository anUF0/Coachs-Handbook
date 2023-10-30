import { useParams } from 'react-router-dom';
import { DELETE_PLAYER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { QUERY_PLAYERS, QUERY_ME } from '../../utils/queries';

const PlayerList = ({ players = [] }, teamName, showTeamName) => {
  const { userId: userParams } = useParams();
  const [removePlayer, { error }] = useMutation(DELETE_PLAYER, {
    refetchQueries: [QUERY_PLAYERS, 'getPlayers', QUERY_ME, 'me'],
  });

  //const handleClick = async (event)=> ()

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
                {/*!userParams && (
                  <button className="btn btn-danger">Remove</button>
                )*/}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PlayerList;
