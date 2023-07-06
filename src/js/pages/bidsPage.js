import bids from "../bids/bidsController";

export default function (state) {
  document.querySelector("#app").innerHTML = "";

  // Запускаем компонент bids
  bids(state);
}
