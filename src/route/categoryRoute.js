const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");

router.post(
    "/add",  
    categoryController.add);

router.post(
    "/list",  
    categoryController.list);

router.post(
    "/getItemBycategory",  
    categoryController.getItemBycategory);
    

module.exports = router;