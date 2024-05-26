const express = require('express');
const dotenv = require('dotenv');
const bootstrap = require('./routes/index.routes');
dotenv.config();

const app = express();
bootstrap(app, express);

// Express server
const port = process.env.PORT || 6000;

const server =app.listen(port, () => {
    console.log(`App running on port ${port}`);
});


process.on('unhandledRejection',(error)=>{
console.error(`unhandledRejection error ${error.name}, ${error.message} `);
server.close(()=>{
    console.error('Shutting Down ...');
    process.exit(1);
})

})