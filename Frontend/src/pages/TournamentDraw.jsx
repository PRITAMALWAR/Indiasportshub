import { useEffect, useState } from "react";
import { getAllMatches } from "../api/matchesApi";
import RoundSection from "../components/RoundSection";

const normalizeRound = (r = "") => {
  r = r.toLowerCase();
  if (r === "qf" || r.includes("quarter")) return "QF";
  if (r === "sf" || r.includes("semi")) return "SF";
  if (r === "final") return "F";
  return "";
};

const TournamentDraw = () => {
  const [qf, setQf] = useState([]);
  const [sf, setSf] = useState([]);
  const [f, setF] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const matches = await getAllMatches();

    setQf(matches.filter(m => normalizeRound(m.roundName) === "QF"));
    setSf(matches.filter(m => normalizeRound(m.roundName) === "SF"));
    setF(matches.filter(m => normalizeRound(m.roundName) === "F"));
  };

  return (
    <>
      <h1 style={{ textAlign: "center", color: "red" }}>
        Men's Singles Tournament Draw
      </h1>

      <RoundSection
        quarterfinals={qf}
        semifinals={sf}
        finals={f}
      />
    </>
  );
};

export default TournamentDraw;
