import express from 'express'
import { addProduct, deleteProduct, getProducts, updateProduct } from '../controller/inventoryController.js';
import { fullValidationPost, fullValidationPut, partialValidation } from '../inventoryMiddleware/inventoryMiddleware.js';

const router = express.Router();

// -------------------------------------------------------
// GET /getProducts
// Returns all products (no validation required)
// -------------------------------------------------------
router.get('/getProducts', getProducts);


// -------------------------------------------------------
// POST /addProduct
// Creates a new product
// fullValidationPost ensures:
// - all fields exist
// - fields are valid
// - no duplicates
// -------------------------------------------------------
router.post('/addProduct', fullValidationPost, addProduct);


// -------------------------------------------------------
// DELETE /deleteProduct/:id
// Deletes a product by productId (from URL params)
// No validation middleware needed because:
// - no request body is used
// - controller handles "not found" case
// -------------------------------------------------------
router.delete('/deleteProduct/:id', deleteProduct);


// -------------------------------------------------------
// PUT /updateProduct/:id
// Replaces entire product (except productId)
// fullValidationPut ensures:
// - all required fields provided
// - types and values valid
// - no duplicate productName
// -------------------------------------------------------
router.put('/updateProduct/:id', fullValidationPut, updateProduct);


// -------------------------------------------------------
// PATCH /updateProduct/:id
// Updates only provided fields
// partialValidation ensures:
// - at least one field exists
// - only provided fields are validated
// - no duplicate productName
// -------------------------------------------------------
router.patch('/updateProduct/:id', partialValidation, updateProduct);


export default router;
