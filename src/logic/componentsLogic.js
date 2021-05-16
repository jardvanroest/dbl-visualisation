export function convertIntoTooltipData_Aliases(obj, aliases) {
  let returnObj = {};
  for (let [key, val] of Object.entries(obj)) {
    returnObj[aliases[key]] = val;
  }
  return returnObj;
}
