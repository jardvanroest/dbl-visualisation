import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import datasetsRoutes from "./routes/datasets.js";

// NOTE: use 'npm start' to run the API (has to be run in parallel to the front-end)

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" })); // maximum size of uploads
app.use("/datasets", datasetsRoutes);

app.get("/", (req, res) => {
  res.send("Hello, you just accessed the homepage of the API");
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
