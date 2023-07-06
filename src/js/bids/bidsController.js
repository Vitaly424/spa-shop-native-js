import * as view from "./bidsView";
import Bids from "./bidsModel";

export default async function (state) {
  if (!state.bids) {
    state.bids = new Bids();
  }

  // Получаем заявки с сервера
  await state.bids.getBids();

  // Отоброжаем заявки на странице
  view.renderBids(state.bids.bids);
}
