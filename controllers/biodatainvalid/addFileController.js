const fs = require("fs");
const { executeQuery } = require("../../utils/db");
const mysql = require("mysql2");
const { successMessageFunction } = require("../../utils/successMessage");
const { errorMessageFunction } = require("../../utils/errorMessage");

const invalidBiodataTable = "BIODATA_INVALID";
let insertQuery = `INSERT INTO ${invalidBiodataTable} VALUES ? `;

const addDataIntoInvalidBioData = async (req, res) => {
  try {
    const invalidData = req.body;
    let finalQuery = mysql.format(insertQuery, [invalidData]);
    let dataObtained;
    const sTime = performance.now();
    await executeQuery(finalQuery).then((response) => {
      dataObtained = response[0].info;
    });
    const eTime = performance.now();
    const tTime = eTime - sTime;
    let successResponse = successMessageFunction(
      true,
      200,
      dataObtained,
      sTime,
      eTime,
      tTime
    );
    res.status(200).send(successResponse);
  } catch (error) {
    let errorResponse = errorMessageFunction(false, error, 400);
    res.status(400).send(errorResponse);
  }
};

module.exports = {
  addDataIntoInvalidBioData,
};
