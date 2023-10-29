const PlayerList = ({ players, teamName, showTeamName, showUsername }) => {
  if (!players.length) {
    return <h3>Can Play the Game without Players</h3>;
  }

  return (
    <div>
      {showTeamName && <h3>{teamName}</h3>}
      {players &&
        players.map((player) => (
          <div key={player._id} className="card mb-3">
            <div>
              {' '}
              <div className="card-body bg-light p-2">
                <p>{player.position}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PlayerList;
