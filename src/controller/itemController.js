
const Item = require("../model/item")


exports.add = async (req, res) => {

    let { name, price, qty, category_id } = req.body

    if(!req.file) return res.send({status:400, message: "item image is missing."})
    if(!name) return res.send({status:400, message: "name is missing."})
    if(!price) return res.send({status:400, message: "price is missing."})
    if(!qty) return res.send({status:400, message: "qty is missing."})
    if(!category_id) return res.send({status:400, message: "category is missing."})
    
    if(!category_id){ category_id = ""}

   const saveItem = new Item({
       name, 
       price, 
       qty, 
       category:category_id,
       itemImage:req.file.filename
    })
   await saveItem.save()

    return res.send({
        status:200, 
        message: "item create successfully.",
        data:saveItem
    })
}

exports.list = async (req, res) => {

   Item
   .find()
   .select('name price itemImage')
   .populate("category")
   .then(docs => {
      
    return res.send({
        status:200, 
        message: "item get successfully.",
        count: docs.length,
        data:docs
    })

   });

    
}


