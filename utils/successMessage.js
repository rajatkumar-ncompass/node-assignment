const successMessageFunction = (
  successValue,
  statusValue,
  messageValue,
  sTimeValue,
  eTimeValue,
  tTimeValue
) => {
  return {
    success: successValue,
    status: statusValue,
    message: messageValue,
    startTime: sTimeValue,
    endTime: eTimeValue,
    totalTime: tTimeValue,
  };
};

module.exports = { successMessageFunction };
