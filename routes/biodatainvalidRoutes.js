const express = require("express");
const multer = require("multer");
const { addDataIntoInvalidBioData } = require("../controllers/biodatainvalid/addFileController");
const { checkInvalidData } = require("../utils/checkInvalidDataValidator");
const route = express.Router();

const upload = multer({ dest: "uploads/" });

route.post("/", upload.single("file"), checkInvalidData, addDataIntoInvalidBioData);

module.exports = route;
