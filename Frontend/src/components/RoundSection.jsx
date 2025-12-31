import MatchCard from "./MatchCard";
import "./Bracket.css";

const RoundSection = ({ quarterfinals, semifinals, finals }) => {
  return (
    <div className="bracket-container">

      {/* QUARTER FINALS */}
      <div className="round">
        <h3>Quarter Final</h3>
        {quarterfinals.map((match, index) => (
          <MatchCard key={index} match={match} />
        ))}
      </div>

      {/* SEMI FINALS */}
      <div className="round">
        <h3>Semi Final</h3>
        {semifinals.map((match, index) => (
          <MatchCard key={index} match={match} />
        ))}
      </div>

      {/* FINAL */}
      <div className="round">
        <h3>Final</h3>
        {finals.map((match, index) => (
          <MatchCard key={index} match={match} />
        ))}
      </div>

    </div>
  );
};

export default RoundSection;
