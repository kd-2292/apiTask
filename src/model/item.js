const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: { type: String, },
    price: {type:String},
    qty: {type:String},
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category", 
        required:true
    },
    itemImage: {
        type:String,
        get: (itemImage)=>{
            return `${process.env.BASE_URL}public/${itemImage}`
        },
    }
},
{
    timestamps: true,
    toJSON: { getters: true } 
});


module.exports = mongoose.model("Item", itemSchema);