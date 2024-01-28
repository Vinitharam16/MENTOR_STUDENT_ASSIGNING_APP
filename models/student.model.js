const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    mentor: {
        type: String,
        default: undefined,
        ref: 'Mentor'
    }
});

module.exports = mongoose.model("Students", studentSchema);