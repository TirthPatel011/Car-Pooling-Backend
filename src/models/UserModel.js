const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: { // changed from Phone to phone
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    roleId: {
        type: Schema.Types.ObjectId,
        ref: "roles"
    },
   
});

module.exports = mongoose.model("users", userSchema);