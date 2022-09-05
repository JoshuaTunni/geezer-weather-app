const PORT = 8000;
const cors = require("cors");
const express = require("express");
const axios = require("axios");
const { response } = require("express");
require("dotenv").config();

const app = express();

app.use(cors());

app.get("/weather", (req, res) => {
  const term = req.query.city;
  const key = process.env.REACT_APP_API_KEY;

  console.log("term: " + term);

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${term}&units=metric&appid=${key}`
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.json(response.data);
    });
});

app.listen(PORT, () => {
  console.log(`server is running in port: ${PORT}`);
});
