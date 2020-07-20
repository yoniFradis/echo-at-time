const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./lib/routes/messagesRoutes');
routes(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

module.exports = app;
