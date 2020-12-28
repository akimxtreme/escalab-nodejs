const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

/* 
    Model       : LivingBeing
    Description : Living beings - Seres Vivos
*/
const LivingBeingSchema = new mongoose.Schema(
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
        classification: {
            type: ObjectId,
            ref: "Classification",
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("LivingBeing", LivingBeingSchema);