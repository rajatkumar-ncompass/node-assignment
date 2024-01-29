const errorMessageFunction = (successvalue, statusValue, messageValue) => {
  return {
    success: successvalue,
    status: statusValue,
    message: messageValue,
  };
};

module.exports = { errorMessageFunction };
