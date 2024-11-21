interface CropData {
  year: number;
  crop: string;
  production: number;
  yield: number;
  area: number;
}

export const processCropData = (rawData: any[]) => {
  // Convert raw data into a usable format
  const formattedData: CropData[] = rawData.map((entry) => ({
    year: parseInt(entry.Year.match(/\d{4}/)?.[0] || "0"), // Extract the year
    crop: entry["Crop Name"],
    production: entry["Crop Production (UOM:t(Tonnes))"] || 0,
    yield: entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] || 0,
    area: entry["Area Under Cultivation (UOM:Ha(Hectares))"] || 0,
  }));

  // Extract unique years
  const years = Array.from(new Set(formattedData.map((d) => d.year)));

  // a. Max and Min Production Per Year
  const yearlyProduction = years.map((year) => {
    const cropsForYear = formattedData.filter((d) => d.year === year);
    if (cropsForYear.length === 0) return { year, maxCrop: "N/A", minCrop: "N/A" };

    const maxCrop = cropsForYear.reduce((a, b) =>
      a.production > b.production ? a : b
    );
    const minCrop = cropsForYear.reduce((a, b) =>
      a.production < b.production ? a : b
    );

    return {
      year,
      maxCrop: maxCrop.crop || "N/A",
      minCrop: minCrop.crop || "N/A",
    };
  });

  // b. Average Yield and Area Per Crop
  const crops = Array.from(new Set(formattedData.map((d) => d.crop)));
  const cropAverages = crops.map((crop) => {
    const cropsData = formattedData.filter((d) => d.crop === crop);
    const totalYield = cropsData.reduce((sum, d) => sum + d.yield, 0);
    const totalArea = cropsData.reduce((sum, d) => sum + d.area, 0);

    return {
      crop,
      averageYield: cropsData.length ? (totalYield / cropsData.length).toFixed(2) : "N/A",
      averageArea: cropsData.length ? (totalArea / cropsData.length).toFixed(2) : "N/A",
    };
  });

  return { yearlyProduction, cropAverages };
};
