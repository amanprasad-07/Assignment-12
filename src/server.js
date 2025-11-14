import express from 'express'
import router from './routes/inventoryRoutes.js';

const app = express();

// -------------------------------------------------------
// Middleware to parse JSON request bodies
// Required for reading req.body in POST, PUT, PATCH
// -------------------------------------------------------
app.use(express.json());


// -------------------------------------------------------
// Register main router
// All inventory-related routes are handled in inventoryRoutes.js
// Base URL: '/'
// -------------------------------------------------------
app.use('/', router);

const PORT = 3003;

// -------------------------------------------------------
// Start the Express server
// Listens on specified PORT for incoming HTTP requests
// -------------------------------------------------------
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});
