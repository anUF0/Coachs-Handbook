const TeamList = ({
  teams,
  teamName,
  showTeamName = true,
  showUsername = true,
}) => {
  if (!teams.length) {
    return <h3>This Coach has No Teams Yet</h3>;
  }
  return (
    <div>
      {showTeamName && <h3>{teamName}</h3>}
      {teams &&
        teams.map((team) => {
          <div key={team._id} className="card mb-3">
            <div className="card-body bg-light p-2">
              <p>{team.players}</p>
            </div>
          </div>;
        })}
    </div>
  );
};

export default TeamList;
