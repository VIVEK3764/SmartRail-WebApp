import TrainCard from "../Components/TrainCard";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function DisplayTrain() {
  const { state } = useLocation();
  const { mode, details } = state || {};

  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse("/isl_wise_train_detail_03082015_v1.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        console.log("✅ First row:", result.data[0]);
        console.log("First Row Object:", result.data[0]);
        console.log("Keys:", Object.keys(result.data[0]));

        setTrains(result.data);
        setLoading(false);
      },
      error: (err) => {
        console.error("CSV Parse Error:", err);
        setLoading(false);
      }
    });
  }, []);

  const filteredTrains = trains.filter((train) => {
    if (mode === "Name") {
      return train["train Name"]?.toLowerCase().startsWith(details.toLowerCase());
    } else if (mode === "Number") {
      return train["Train No."]?.replace(/['"]+/g, "") === details;
    } else if (mode === "Location") {
      return (
        train["source Station Name"]?.trim().toLowerCase().startsWith(details.from.trim().toLowerCase()) &&
        train["station Name"]?.trim().toLowerCase().startsWith(details.to.trim().toLowerCase())
      );
    }
    return true; // fallback: show all
  });
  
  
//const filteredTrains = trains.slice(0, 10); // Show first 10 trains only

  if (loading) return <p>Loading train data...</p>;

  return (
    <div>
      <h2 style={{ marginLeft: "1rem" }}>
        {filteredTrains.length > 0
          ? `Showing ${filteredTrains.length} train(s)`
          : "No trains found matching your search."}
      </h2>

      <div className="TrainGrid">
  {filteredTrains.map((train, index) => (
    <div
      key={index}
      style={{
        border: "1px solid #ccc",
        margin: "10px",
        padding: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h4>{train["train Name"]}</h4>
      <p>Number: {train["Train No."]?.replace(/['"]+/g, "")}</p> {/* strip quotes */}
    </div>
  ))}
</div>


    </div>
  );
}

export default DisplayTrain;
