const express = require('express');
const dotenv = require('dotenv');
// const path =require('path')
const bootstrap = require('./routes/index.routes');
dotenv.config();

const app = express();
// app.use(express.static(path.join(__dirname,'./images')))
bootstrap(app, express);

// Express server
const port = process.env.PORT || 8000;

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