const fs = require("fs");
const axios = require("axios");
const { parse } = require("csv-parse");

const SHEETS_TSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ8HQOtqg2Kyq850yTYljNW4nXIvZMSV2HkczuZy7Rs-tnJQ709kArfi5nw4Eplbq21NWm00C6ChQFK/pub?gid=0&single=true&output=tsv";

// Function to fetch and parse the TSV data
async function fetchAndParseTSV() {
  try {
    // Fetch the TSV data
    const response = await axios.get(SHEETS_TSV_URL);
    const tsvData = response.data;

    // Parse the TSV data
    parse(tsvData, { delimiter: "\t", columns: true }, (err, rows) => {
      if (err) {
        console.error("Error parsing TSV:", err);
        return;
      }

      // Initialize empty objects for each language
      const en = {};
      const id = {};

      // Loop through each row, using the first column as the key
      rows.forEach((row) => {
        const key = row[Object.keys(row)[0]]; // Assuming first column is the key
        const english = row[Object.keys(row)[1]]; // Second column (English)
        const indonesian = row[Object.keys(row)[2]]; // Third column (Indonesian)

        // Add translations to each language object
        en[key] = english;
        id[key] = indonesian;
      });

      // Ensure the translations folder exists
      const outputDir = "./translations";
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
      }

      // Save each language JSON file
      fs.writeFileSync(`${outputDir}/en.json`, JSON.stringify(en, null, 2));
      fs.writeFileSync(`${outputDir}/id.json`, JSON.stringify(id, null, 2));

      console.log("Translation files created successfully!");
    });
  } catch (error) {
    console.error("Error fetching TSV:", error);
  }
}

// Call the function to fetch and parse the TSV
fetchAndParseTSV();
