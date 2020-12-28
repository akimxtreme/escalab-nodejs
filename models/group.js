const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

/* 
    Model       : Group
    Description : Group of living beings - Grupo de Seres Vivos
*/
const GroupSchema = new mongoose.Schema(
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
        kingdom: {
            type: ObjectId,
            ref: "Kingdom",
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Group", GroupSchema);