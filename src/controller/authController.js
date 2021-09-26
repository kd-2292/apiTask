
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Userinterface = require("../interface/Userinterface");

exports.register = async (req, res) => {

    try {
        
        const {name, username, password} = req.body;
        const account = await User.findOne({ username: username }).lean();

        if (account)
            return res.send({status: 409, message: "already exists"});
        else {
  
          let setJson = {
            name        : name || "User",
            username    : username,
            password    : password
          }
      
          const  modelSave = new User(setJson);
      
          await modelSave.save();

          let resolvData = new Userinterface(modelSave)
      
          return res.send({
            status: 200,
            message: "user create successfully.",
            data: resolvData
          })
  
        }

      } catch (err) {
  
          return res.send({status: 404, message: "something wrong please try again.." });
      }
}
    


exports.login = async (req, res) => {

    let {password, username} = req.body

    if(!password || !username)
        return res.send({status:400, message: "username or password is required."}) 
  
    let instace = await User.findOne({username:username}).exec()

    if(!instace){
        return res.send({ status:404, message: "no user with this username please register first."}) 
    }
  
    let matchPass = await instace._validPassword(password)
  
     if(matchPass){

        let setUser = {
            id : instace.id,
            name : instace.name || "",
            username : instace.username
        }
        const token = jwt.sign(
            setUser,
            process.env.JWT_KEY,
            { expiresIn: "1h",}
          );

      return res.send({
          status:200,
          message:"user login successfully.",
          token:token,
          data: setUser
        })


     }else{
      return res.send({
          status:404,
          message: "username or password is wrong plz try again."
        })
     }
  
}
