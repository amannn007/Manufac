import React from "react";
import rawData from "./Manufac _ India Agro Dataset.json";
import { processCropData } from "./utils/dataProcessing";
import Table from "./components/Table";
import "./index.css"

const App: React.FC = () => {
  const { yearlyProduction, cropAverages } = processCropData(rawData);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Agro Dashboard</h1>
      <h2>Yearly Production</h2>
      <Table
        headers={["Year", "Crop with Maximum Production", "Crop with Minimum Production"]}
        data={yearlyProduction.map((row) => ({
          Year: row.year || "N/A",
          "Crop with Maximum Production": row.maxCrop || "N/A",
          "Crop with Minimum Production": row.minCrop || "N/A",
        }))}
      />
      <h2>Crop Averages</h2>
      <Table
        headers={["Crop", "Average Yield", "Average Area"]}
        data={cropAverages.map((row) => ({
          Crop: row.crop || "N/A",
          "Average Yield": row.averageYield || "N/A",
          "Average Area": row.averageArea || "N/A",
        }))}
      />
    </div>
  );
};

export default App;
