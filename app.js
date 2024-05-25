const express = require('express');
const dotenv = require('dotenv');
const bootstrap = require('./routes/index.routes');
dotenv.config();

const app = express();
bootstrap(app, express);

// Express server
const port = process.env.PORT || 6000;

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
