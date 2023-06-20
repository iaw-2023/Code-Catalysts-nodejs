const express = require('express');
const v1CamisetaRouter = require("./v1/routes/router");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/v1/", v1CamisetaRouter);

app.listen(PORT, () => {console.log("API corriendo en http://localhost:"+PORT+"/api/v1/")});