const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Routers = require('./Routers/router');
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(Routers);

app.listen(process.env.PORT || 3000);
