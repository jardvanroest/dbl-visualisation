import express from "express";
import { v4 as uuidv4 } from "uuid"; // assign unique ID's to datasets
import fs from "fs";
uuidv4();

// all routes that start with /datasets are processed here
const datasetsFilename = "./datasets.json";
const router = express.Router();
let datasets = [];
let initialBoot = true;

function updateDatasetFile() {
  fs.writeFile(
    datasetsFilename,
    JSON.stringify(datasets, null, 2),
    function (err, data) {
      if (err) {
        return console.log(err);
      }
      console.log("Dataset object changed, file updated.");
    }
  );
}

function updateDatasetObject() {
  if (initialBoot == false) {
    return;
  }
  initialBoot = false;
  try {
    let data = fs.readFileSync(datasetsFilename);
    console.log(
      "First API request since server reboot, file read and object updated."
    );
    try {
      datasets = JSON.parse(data);
    } catch {
      console.log(
        "WARNING: Empty datasets.js file, starting with empty object."
      );
    }
  } catch {
    return console.log(
      "WARNING: Can not find datasets.js file, starting with empty object."
    );
  }
  // the datasets object only needs to get information from the file when the server first boots up
}

// returns all datasets, used for testing purposes
router.get("/", (req, res) => {
  updateDatasetObject();
  console.log("GET request for all datasets.");
  res.send(datasets);
});

// POST request made to /datasets, this is the dataset upload function
router.post("/", (req, res) => {
  const dataset = req.body;
  const datasetId = uuidv4();

  updateDatasetObject();
  console.log(`POST request for id: ${datasetId}`);
  const datasetWithId = { ...dataset, id: datasetId };
  datasets.push(datasetWithId);

  res.send(`${datasetId}`);
  updateDatasetFile();
});

// return the dataset with the specified id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  console.log(`GET request for id:${id}`);
  updateDatasetObject();
  const foundDataset = datasets.find((dataset) => dataset.id === id);
  if (foundDataset === undefined) {
    res.status(400).send(`Dataset not found.`);
  } else {
    res.send(foundDataset);
  }
});

// delete the dataset with the specified id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  console.log(`DELETE request for id:${id}`);

  updateDatasetObject();
  datasets = datasets.filter((dataset) => dataset.id !== id); // deletion happens on this line via filtering
  res.send(`Dataset with id ${id} deleted from the database`);
  updateDatasetFile();
});

export default router;
