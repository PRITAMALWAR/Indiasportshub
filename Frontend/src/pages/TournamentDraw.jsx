import { useEffect, useState } from "react";
import { getAllMatches, scrapeLatest } from "../api/matchesApi";
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
  const [scrapedJson, setScrapedJson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const matches = await getAllMatches();

    setQf(matches.filter(m => normalizeRound(m.roundName) === "QF"));
    setSf(matches.filter(m => normalizeRound(m.roundName) === "SF"));
    setF(matches.filter(m => normalizeRound(m.roundName) === "F"));
  };

  const handleScrape = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await scrapeLatest();
      setScrapedJson(data);
    } catch (e) {
      setError(e?.message || "Failed to scrape latest data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", color: "red" }}>
        Men's Singles Tournament Draw
      </h1>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <button onClick={handleScrape} disabled={loading}>
          {loading ? 'Scraping…' : 'Scrape Latest'}
        </button>
        {error && <span style={{ color: 'crimson' }}>{error}</span>}
      </div>

      <RoundSection
        quarterfinals={qf}
        semifinals={sf}
        finals={f}
      />

      {scrapedJson && (
        <div style={{ marginTop: 24 }}>
          <h2>Scraped JSON</h2>
          <pre style={{ background: '#111', color: '#0f0', padding: 12, borderRadius: 8, overflowX: 'auto' }}>
            {JSON.stringify(scrapedJson, null, 2)}
          </pre>
        </div>
      )}
    </>
  );
};

export default TournamentDraw;
