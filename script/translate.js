const fs = require("fs");
const axios = require("axios");
const { parse } = require("csv-parse");
const path = require("path");

const SHEETS_TSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ8HQOtqg2Kyq850yTYljNW4nXIvZMSV2HkczuZy7Rs-tnJQ709kArfi5nw4Eplbq21NWm00C6ChQFK/pub?gid=0&single=true&output=tsv";

const outputFolder = path.resolve(__dirname, "../src/libs/translation/locales"); // Define the base output folder

// Function to fetch and parse the TSV data

// Create directories if they don't exist
const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  fs.mkdirSync(dirname, { recursive: true });
};

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
      const cn = {};
      const tw = {};

      // Loop through each row, using the first column as the key
      rows.forEach((row) => {
        const key = row[Object.keys(row)[0]]; // Assuming first column is the key
        const english = row[Object.keys(row)[1]];
        const indonesian = row[Object.keys(row)[2]];
        const chinese = row[Object.keys(row)[3]];
        const taiwanese = row[Object.keys(row)[4]];

        // Add translations to each language object
        en[key] = english;
        id[key] = indonesian;
        cn[key] = chinese;
        tw[key] = taiwanese;
      });

      // Define file paths for the English and Indonesian translations
      const enFilePath = path.join(outputFolder, "en", "common.json");
      const idFilePath = path.join(outputFolder, "id", "common.json");
      const cnFilePath = path.join(outputFolder, "cn", "common.json");
      const twFilePath = path.join(outputFolder, "tw", "common.json");

      // Ensure the directories exist
      ensureDirectoryExistence(enFilePath);
      ensureDirectoryExistence(idFilePath);
      ensureDirectoryExistence(cnFilePath);
      ensureDirectoryExistence(twFilePath);

      // Save each language JSON file
      fs.writeFileSync(enFilePath, JSON.stringify(en, null, 2));
      fs.writeFileSync(idFilePath, JSON.stringify(id, null, 2));
      fs.writeFileSync(cnFilePath, JSON.stringify(cn, null, 2));
      fs.writeFileSync(twFilePath, JSON.stringify(tw, null, 2));

      console.log("Translation files created successfully!");
    });
  } catch (error) {
    console.error("Error fetching TSV:", error);
  }
}

// Call the function to fetch and parse the TSV
fetchAndParseTSV();
