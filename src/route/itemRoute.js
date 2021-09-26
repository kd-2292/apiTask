const express = require("express");
const router = express.Router();
const itemController = require("../controller/itemController");

const multer = require("multer");

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `files/item-${file.fieldname}-${Date.now()}.${ext}`);
    },
  });

const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "png" || ile.mimetype.split("/")[1] === "jpg") {
      cb(null, true);
    } else {
      cb(new Error("Not a image File!!"), false);
    }
  };

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

router.post(
    "/add", 
    upload.single("itemImage"), 
    itemController.add);

router.post(
    "/list",  
    itemController.list);
    

module.exports = router;