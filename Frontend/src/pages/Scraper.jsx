import { useState } from "react";
import { scrapeLatest } from "../api/matchesApi";
import ReactJson from "react-json-view";

function Scraper() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onScrape = async () => {
    try {
      setError("");
      setLoading(true);
      const resp = await scrapeLatest();
      setData(resp);
    } catch (e) {
      setError(e?.message || "Failed to scrape latest data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>Scraper</h1>
      <p>Click the button to scrape the latest tournament draw and preview the JSON below.</p>
      <button onClick={onScrape} disabled={loading}>
        {loading ? "Scraping…" : "Scrape Latest"}
      </button>
      {error && (
        <div style={{ color: "crimson", marginTop: 12 }}>{error}</div>
      )}
      {data && (
        <div style={{ marginTop: 16 }}>
          <ReactJson src={data} name={false} theme="monokai" collapsed={1} displayDataTypes={false} />
        </div>
      )}
    </div>
  );
}

export default Scraper;
