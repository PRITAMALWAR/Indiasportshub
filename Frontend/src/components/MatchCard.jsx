const MatchCard = ({ match }) => {
  const scores = match.score?.split(",") || [];

  return (
    <div className="match-node">
      <div className={`player ${match.winner === match.player1 ? "win" : ""}`}>
        {match.player1}
        <span>{scores[0] || ""}</span>
      </div>

      <div className={`player ${match.winner === match.player2 ? "win" : ""}`}>
        {match.player2}
        <span>{scores[1] || ""}</span>
      </div>
    </div>
  );
};

export default MatchCard;
