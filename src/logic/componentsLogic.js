import { mapGetters } from "vuex";

export function getAvg(arr, param) {
  let total = 0;
  if (param === undefined) {
    for (let i = 0; i < arr.length; i++) {
      total += arr[i];
    }
  } else {
    for (let i = 0; i < arr.length; i++) {
      total += arr[i][param];
    }
  }
  return Math.round((total / arr.length) * 100000) / 100000;
}
// + avg
export function getSampleVariance(arr, param) {
  let square_var = [];
  let avg = getAvg(arr, param);
  if (param === undefined) {
    for (let i = 0; i < arr.length; i++) {
      square_var.push((arr[i] - avg) ^ 2);
    }
  } else {
    for (let i = 0; i < arr.length; i++) {
      square_var.push((arr[i][param] - avg) ^ 2);
    }
  }
  return [Math.sqrt(sumVals(square_var) / square_var.length), avg];
}
function sumVals(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}
export function _RGBToHex(rgb) {
  // Choose correct separator
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  // Turn "rgb(r,g,b)" into [r,g,b]
  rgb = rgb.substr(4).split(")")[0].split(sep);

  let r = Math.min(+rgb[0], 255).toString(16),
    g = Math.min(+rgb[1], 255).toString(16),
    b = Math.min(+rgb[2], 255).toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}
