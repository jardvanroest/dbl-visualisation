import express from 'express';
import {v4 as uuidv4 } from 'uuid'; // assign unique ID's to datasets
uuidv4();

// all routes that start with /datasets are processed here
const router = express.Router(); 

let datasets = []   // list of dataset objects

// GET request to /datasets
router.get('/', (req, res) => {
    console.log('GET request for all datasets.');
    res.send(datasets); // return all datasets
});

// POST request made to /datasets, this is the dataset upload
router.post('/', (req, res) => {    
    const dataset = req.body;
    const datasetId = uuidv4();
    console.log(`POST request for id: ${datasetId}`);
    
    const datasetWithId = { ... dataset, id: datasetId };
    datasets.push(datasetWithId);

    res.send(`Upload successful, dataset_id: ${datasetId}. You can use the id to fetch the dataset.`);
})

// GET request to /'id', where 'id' is any string
// return the dataset with the specified id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const foundDataset = datasets.find((dataset) => dataset.id === id);
    console.log(`GET request for id: ${id}`);
    if (foundDataset === undefined) {
        res.send(`Dataset with id: ${id} not found.`)
    } else {
        res.send(foundDataset);
    }
})

// DELETE request to /'id', where 'id' is any string
// delete the dataset with the specified id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    console.log(`DELETE request for id: ${id}`);

    datasets = datasets.filter((dataset) => dataset.id !== id); // deletion happens on this line via filtering
    res.send(`Dataset with id ${id} deleted from the database`);
})

export default router;