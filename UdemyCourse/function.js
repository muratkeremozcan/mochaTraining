module.exports = IsAlive;

function IsAlive(ping) {
  try {
    var pingOneSuccess = ping();
    var pingTwoSuccess = ping();
    var pingThreeSuccess = ping();
  } catch (e) {
    return new Error('ping threw exception');
  }
  if (pingOneSuccess && pingTwoSuccess && pingThreeSuccess) {
    return true;
  }
  return false;
}