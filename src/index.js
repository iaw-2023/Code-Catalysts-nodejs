const express = require('express');
const cors = require('cors');
const v1Router = require("./v1/routes/router");
const app = express();
const PORT = 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./v1/docs/api-docs.json'); // Ruta al archivo Swagger JSON generado

app.use(express.json());
app.use(cors());
app.use(cors({
  origin: '*'
}));
app.use("/api/v1/", v1Router);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {console.log("API corriendo en http://localhost:"+PORT+"/api/v1/")});