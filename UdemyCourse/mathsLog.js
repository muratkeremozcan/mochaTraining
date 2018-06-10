module.exports = AddLog;
function AddLog(numberOne, numberTwo, log) {
  var result = numberOne + numberTwo;
  log(result);
  return result;
}