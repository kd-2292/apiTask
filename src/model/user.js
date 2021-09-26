const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    name: { 
      type: String, 
      default: null 
    },
    username: {
        type:String,
        unique: true 
    },
    hash_password :{
      type: String
    },
    token: { 
        type: String 
    },
    last_login: { 
        type: String 
    }
},
{timestamps: true});

userSchema.virtual("password").set(function (password) {
    this.hash_password = bcrypt.hashSync(password, saltRounds);
})

userSchema.methods = {
    _validPassword: function(password){
        return bcrypt.compareSync(password, this.hash_password)
    }
}


module.exports = mongoose.model("user", userSchema);