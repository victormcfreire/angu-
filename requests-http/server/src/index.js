const cors = require("cors");
const bodyParser = require("body-parser");
const multiParty = require("connect-multiparty");

const express = require("express");
const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const multiPartyMiddleware = multiParty({ uploadDir: './uploads' });
app.post('/upload', multiPartyMiddleware, (req, res) => {
  const files = req.files;
  console.log(files);
  res.json({ message: files });
});

app.use((err, req, res, next) => res.json({ error: err.message }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
