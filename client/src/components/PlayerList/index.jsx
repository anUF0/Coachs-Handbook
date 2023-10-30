const PlayerList = ({ players = [] }, teamName, showTeamName) => {
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
                  {player.ST} | AG: {player.AG} | PA: {player.PA}+ | AV:{' '}
                  {player.AV}+ | Skills and Traits:{' '}
                  {/*formattedSkillAndTraits*/}
                </p>
                {/*!userParm && (
                  <btn>X</btn>)*/}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PlayerList;
