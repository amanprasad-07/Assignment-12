import products from '../products.json' with { type: 'json' }

// -----------------------------------------------------
// GET ALL PRODUCTS
// Returns the entire products list from the JSON file
// -----------------------------------------------------
export const getProducts = (req, res) => {
    res.json(products);
}


// -----------------------------------------------------
// ADD NEW PRODUCT (POST)
// Assumes validation middleware already checked input
// Pushes new product into in-memory array
// -----------------------------------------------------
export const addProduct = (req, res) => {
    const { productId, productName, description, stock } = req.body;

    // Create new product object
    const product = { productId, productName, description, stock };

    // Add to in-memory JSON array (non-persistent)
    products.push(product);

    // Return confirmation + created object
    res.status(201).json({ Message: "Product added successfully", product });
}


// -----------------------------------------------------
// DELETE PRODUCT BY ID
// Finds product using productId from URL params
// Removes it from the array if found
// -----------------------------------------------------
export const deleteProduct = (req, res) => {
    // Convert ID from URL to number and find product
    const product = products.find(p => p.productId === parseInt(req.params.id));

    // If no product matches → 404
    if (!product) {
        return res.status(404).json({ Message: "Product not found" });
    }

    // Find index to remove
    const index = products.findIndex(p => p.productId === product.productId);

    // Remove product from array
    products.splice(index, 1);

    // 204 → success with no content
    res.status(204).end();
}


// -----------------------------------------------------
// UPDATE PRODUCT (PUT or PATCH)
// Only updates fields that exist in req.body
// ProductId cannot be changed because it comes from params
// -----------------------------------------------------
export const updateProduct = (req, res) => {
    // Find product by numeric ID
    const product = products.find(p => p.productId === parseInt(req.params.id));

    // If product not found → 404
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    // Extract allowed updatable fields
    const { productName, description, stock } = req.body;

    // Update only provided fields (PATCH-like behavior)
    if (productName !== undefined) product.productName = productName;
    if (description !== undefined) product.description = description;
    if (stock !== undefined) product.stock = stock;

    // Return updated product
    res.status(200).json({ message: "Product updated successfully", product });
}
