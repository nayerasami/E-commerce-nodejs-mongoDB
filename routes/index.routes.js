const morgan = require('morgan');
const connectDB = require('../config/dbConnection');
const cors = require('cors');
const globalErrorHandling = require('../utils/errorHandling');
const categoryRouter = require('./category.routes');
const ApiError = require('../utils/errorClass');
const subCategoryRouter = require('./subCategory.routes');
const brandsRouter = require('./brand.routes');
const productRouter = require('./product.routes');
const cookieParser =require('cookie-parser');
const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const verifyToken =require('../middelwares/auth/isAuthorized')
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
    
    app.use(cookieParser());

    app.get('/', (req, res) => {
        res.send('OUR API V3');
    });

    // Set Up Routing
    app.use('/api/v1/auth',authRouter)
    app.use('/api/v1/categories', verifyToken,categoryRouter);
    app.use('/api/v1/subcategories',verifyToken, subCategoryRouter);
    app.use('/api/v1/brands',verifyToken, brandsRouter);
    app.use('/api/v1/products',verifyToken, productRouter);
    app.use('/api/v1/user',verifyToken,userRouter)


    app.use("*", (req, res, next) => {
        
        next(new ApiError(`In-valid Routing: ${req.originalUrl}`,400));
    });

    // Global error handling
    app.use(globalErrorHandling);

    
    // DB connection
    connectDB();
}

module.exports = bootstrap;
