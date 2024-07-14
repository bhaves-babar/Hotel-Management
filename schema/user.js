const mongoose = require("mongoose");

// Define the schema for the user
let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensures email is unique
    }
});

// Create a model using the schema
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;