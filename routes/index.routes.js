const morgan = require('morgan');
const connectDB = require('../config/dbConnection');
const cors = require('cors');
const globalErrorHandling = require('../utils/errorHandling');
const categoryRouter = require('./category.routes');
const ApiError = require('../utils/errorClass');
const subCategoryRouter = require('./subCategory.routes');
const brandsRouter = require('./brand.routes');

const bootstrap = (app, express) => {

    app.use(express.json());
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }

    const corsOptions = {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true 
    };
    app.use(cors(corsOptions));
    
    app.get('/', (req, res) => {
        res.send('OUR API V3');
    });

    // Set Up Routing
    app.use('/api/v1/categories', categoryRouter);
    app.use('/api/v1/subcategories', subCategoryRouter);
    app.use('/api/v1/brands', brandsRouter);


    app.use("*", (req, res, next) => {
        
        next(new ApiError(`In-valid Routing: ${req.originalUrl}`,400));
    });

    // Global error handling
    app.use(globalErrorHandling);

    
    // DB connection
    connectDB();
}

module.exports = bootstrap;
