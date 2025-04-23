const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    role_name: {
        type: String,
        enum: ["Admin","Driver", "Rider"],
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("roles", roleSchema);