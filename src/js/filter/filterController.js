import Filter from "./filterModel";
import * as view from "./filterView";

export default async function (state) {
  // Создаём объект фильтра
  if (!state.filter) {
    state.filter = new Filter();
  }

  // Получение параметров для фильтра
  await state.filter.getParams();

  // Отрисовка фильтра
  view.render(state.filter.params);

  // Делаем запрос на сервер
  await state.filter.getResults();
  state.results = state.filter.result;

  //   Обновляем счётчик на кнопке
  view.changeButtonText(state.filter.result.length);

  // Прослушка событий формы
  const form = document.querySelector("#filter-form");

  form.addEventListener("change", async (e) => {
    e.preventDefault();
    state.filter.query = view.getInput();
    await state.filter.getResults();
    state.results = state.filter.result;
    view.changeButtonText(state.filter.result.length);
  });

  form.addEventListener("reset", async () => {
    state.filter.query = "";
    await state.filter.getParams();
    await state.filter.getResults();
    state.results = state.filter.result;
    state.emitter.emit("event:render-listing", {});
    view.changeButtonText(state.filter.result.length);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    state.emitter.emit("event:render-listing", {});
  });
}
