export default function formatNumber(num) {
  let [int, dec] = Math.abs(num).toFixed(2).split(".");
  let newInt = new Intl.NumberFormat("ru-RU").format(int);
  let resultNumber = newInt + "." + dec + " \u20BD";
  return resultNumber;
}