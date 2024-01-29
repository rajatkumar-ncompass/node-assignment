const joi = require("joi");
const fs = require("fs");
const { errorMessageFunction } = require("../utils/errorMessage");

const biodataSchema = joi.object({
  NID: joi.string().required(),
  Name: joi.string().required(),
  email: joi
    .string()
    .regex(/@gmail\.com$/)
    .required(),
  age: joi.number().required(),
});

const checkInvalidData = async (req, res, next) => {
  try {
    const filePath = req.file.path;

    let result = [];
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      const rows = data.split("\n");
      const headers = rows[0].split(",");

      //To convert the data stored into array of objects
      for (let i = 1; i < rows.length; i++) {
        const obj = {};
        const currentRow = rows[i].split(",");

        for (let j = 0; j < headers.length; j++) {
          obj.NID = currentRow[0];
          obj.Name = currentRow[1];
          obj.email = currentRow[2];
          obj.age = currentRow[3].slice(0, -1);
        }
        result.push(obj);
      }

      //Validation to filter the records based on the schema
      let filteredBody = [];
      for (let i = 0; i < result.length; i++) {
        try {
          const check = biodataSchema.validate(result[i]);
          if (check.error) {
            continue;
          } else {
            filteredBody.push(check.value);
          }
        } catch (error) {}
      }

      //create a nested array of records satisfying the validation criterias
      let finalBody = [];
      for (let i = 0; i < filteredBody.length; i++) {
        finalBody.push(Object.values(filteredBody[i]));
      }
      req.body = finalBody;
      next();
    });
  } catch (err) {
    let errorResponse = errorMessageFunction(false, err, 400);
    res.status(400).send(errorResponse);
  }
};

module.exports = { checkInvalidData };
