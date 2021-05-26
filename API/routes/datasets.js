import express from "express";
import { v4 as uuidv4 } from "uuid"; // assign unique ID's to datasets
import fs from "fs";
uuidv4();

// all routes that start with /datasets are processed here
const datasetsFilename = "./datasets.json";
const router = express.Router();
let datasets = []; // list of dataset objects
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
  console.log("In updateDatasetObject");
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
    return console.log(err);
  }
  // the datasets object only needs to get information from the file when the server boots up
  initialBoot = false;
}

// GET request to /datasets
// returns all datasets
router.get("/", (req, res) => {
  updateDatasetObject();
  console.log("GET request for all datasets.");
  res.send(datasets); // return all datasets
});

// POST request made to /datasets, this is the dataset upload
router.post("/", (req, res) => {
  const dataset = req.body;
  const datasetId = uuidv4();

  updateDatasetObject();
  console.log(`POST request for id: ${datasetId}`);
  const datasetWithId = { ...dataset, id: datasetId };
  datasets.push(datasetWithId);

  res.send(
    `Upload successful, dataset_id: ${datasetId}. You can use the id to fetch the dataset.`
  );
  updateDatasetFile();
});

// GET request to /'id', where 'id' is any string
// return the dataset with the specified id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const foundDataset = datasets.find((dataset) => dataset.id === id);

  console.log(`GET request for id: ${id}`);
  updateDatasetObject();
  if (foundDataset === undefined) {
    res.send(`Dataset with id: ${id} not found.`);
  } else {
    res.send(foundDataset);
  }
});

// DELETE request to /'id', where 'id' is any string
// delete the dataset with the specified id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  console.log(`DELETE request for id: ${id}`);

  updateDatasetObject();
  datasets = datasets.filter((dataset) => dataset.id !== id); // deletion happens on this line via filtering
  res.send(`Dataset with id ${id} deleted from the database`);
  updateDatasetFile();
});

export default router;
