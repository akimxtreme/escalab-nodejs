const mongoose = require("mongoose");

/* 
    Model       : Classification
    Description : Classification of living beings - Clasificacion de Seres Vivos
*/
const ClassificationSchema = new mongoose.Schema(
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
            required: true,
            maxlength: 2000
        },
        group: {
            type: ObjectId,
            ref: "Group",
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Classification", ClassificationSchema);