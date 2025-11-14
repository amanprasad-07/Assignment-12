import products from '../products.json' with { type: 'json' }

// ---------------------------------------------
// FULL VALIDATION FOR POST (new product creation)
// Requires ALL fields to be present and valid
// ---------------------------------------------
export const fullValidationPost = (req, res, next) => {

    const { productId, productName, description, stock } = req.body;

    // Check if any required field is missing
    if (
        productId === undefined ||
        productName === undefined ||
        description === undefined ||
        stock === undefined
    ) {
        return res.status(400).json({ message: "Invalid input data: All required fields must be provided." });
    }

    // Check for empty string fields
    if (productName === '' || description === '') {
        return res.status(400).json({ message: "Invalid input data: Fields cannot be empty." });
    }

    // productId must be a positive number
    if (productId < 1) {
        return res.status(400).json({ message: "Invalid input data: productId must be positive." });
    }

    // stock must be boolean
    if (typeof stock !== "boolean") {
        return res.status(400).json({ message: "Invalid input data: stock must be a boolean." });
    }

    // Check for duplicate productId or productName
    const idExist = products.some(p => p.productId === productId);
    const nameExist = products.some(p => p.productName === productName);

    if (idExist || nameExist) {
        return res.status(400).json({ message: "Invalid input data: already exists" });
    }

    next();
}


// ---------------------------------------------------------
// FULL VALIDATION FOR PUT (complete product replacement)
// productId comes from URL, only body fields validated
// ---------------------------------------------------------
export const fullValidationPut = (req, res, next) => {

    const productId = req.params.id; // ID is fixed and cannot be changed
    const { productName, description, stock } = req.body;

    // PUT requires all fields except productId (which is params)
    if (
        productName === undefined ||
        description === undefined ||
        stock === undefined
    ) {
        return res.status(400).json({ message: "Invalid input data: All required fields must be provided." });
    }

    // Cannot have empty fields
    if (productName === '' || description === '') {
        return res.status(400).json({ message: "Invalid input data: Fields cannot be empty." });
    }

    // stock must be boolean
    if (typeof stock !== "boolean") {
        return res.status(400).json({ message: "Invalid input data: stock must be a boolean." });
    }

    // Check if new productName already exists in database
    const nameExist = products.some(p => p.productName === productName);

    if (nameExist) {
        return res.status(400).json({ message: "Invalid input data: already exists" });
    }

    next();
}


// -----------------------------------------------------
// PARTIAL VALIDATION FOR PATCH (only provided fields)
// Only validate fields that exist in req.body
// -----------------------------------------------------
export const partialValidation = (req, res, next) => {

    const productId = req.params.id;
    const { productName, description, stock } = req.body;

    // If no updatable fields provided → reject
    if (
        productName === undefined &&
        description === undefined &&
        stock === undefined
    ) {
        return res.status(400).json({ message: "Invalid input data: Any required fields must be provided." });
    }

    // Validate only fields that exist
    if (productName !== undefined && productName === '') {
        return res.status(400).json({ message: "Invalid input data: productName cannot be empty" });
    }

    if (description !== undefined && description === '') {
        return res.status(400).json({ message: "Invalid input data: description cannot be empty." });
    }

    if (stock !== undefined && typeof stock !== "boolean") {
        return res.status(400).json({ message: "Invalid input data: stock must be a boolean." });
    }

    // Check duplicate name only if client is changing productName
    if (productName !== undefined) {
        const nameExist = products.some(p => p.productName === productName);
        if (nameExist) {
            return res.status(400).json({ message: "Invalid input data: already exists" });
        }
    }

    next();
}

