const mongoose = require("mongoose");

/* 
    Model       : Kingdom
    Description : Kingdom of living beings - Reino de los Seres Vivos
*/
const kingdomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 64,
            unique: true
        },
        description: {
            type: String,
            required: false,
            maxlength: 2000
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Kingdom", kingdomSchema);