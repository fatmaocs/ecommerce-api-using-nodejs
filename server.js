const express= require("express");
const morgan =require("morgan");
const mongoose=require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path:"config.env"});
const dbConnection = require("./config/database");
const categoryRoute =require('./routes/categoryRoute');
const globalError = require("./middlewares/errorMiddleware");
const ApiError = require("./utils/apiError");

//connect with db 
dbConnection();

//Express app
const app = express();

//Middlewares
const environment = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : '';
if (environment === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// Routes
app.use('/api/v1/categories', categoryRoute);

//Catch-all middleware for unmatched routes
app.all('/{*any}', (req, res, next) => {
    // const err = new Error(`Can't find this route: ${req.originalUrl}`);
    // next(err);
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400))
});

// Global error-handling middleware
app.use(globalError);


// Start the server
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log('App is running on port 8001');
});


// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err.message);
    server.close(() => {
        console.error('Shutting down the server due to unhandled promise rejection');
        process.exit(1); // Exit the process with failure
    });
});