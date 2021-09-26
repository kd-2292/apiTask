
const Category = require("../model/category")
const Item = require("../model/item")


exports.add = async (req, res) => {

    let { name, parent_id } = req.body

    if(!name) return res.send({status:400, message: "category name is missing."})
    if(!parent_id){ parent_id = ""}

   const saveCategory = new Category({name, parent_id})
   await saveCategory.save()

    return res.send({
        status:200, 
        message: "category create successfully.",
        data:saveCategory
    })
}

exports.list = async (req, res) => {

   const getCategory = await Category.find({}).exec()

    return res.send({
        status:200, 
        message: "category get successfully.",
        count:getCategory.length,
        data:getCategory
    })
}


exports.getItemBycategory = async (req, res) => {

    let {categoryId} = req.body

    if(!categoryId) return res.send({status:400, message: "category is missing."})

    Item
   .find({category:categoryId})
   .populate("category", "name")
   .then(doc => {
      
    return res.send({
        status:200, 
        message: "get item by category successfully.",
        count: doc.length,
        data:doc
    })

   });

 }


