require('dotenv').config()

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();
const AuthRouter = require("./routes/auth.routes");
const PetRouter = require("./routes/pet.router");
app.use(cors());



app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    extended: true, limit: "50mb"
  }));
  

app.use(PetRouter)
app.use(AuthRouter);

app.listen(port, () => console.info(`Running in port ${port}`));