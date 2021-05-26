import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import datasetsRoutes from "./routes/datasets.js";

// NOTE: use 'npm start' to run the API (has to be run in parallel to the front-end)

const app = express();
const PORT = 5000;

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/datasets", datasetsRoutes);

// req = request, res = response
// use AXIOS on the front-end to make the http requests
app.get("/", (req, res) => {
  res.send("Hello, you just accessed the homepage of the API");
});

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
