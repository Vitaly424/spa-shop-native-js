import SingleItem from "./singleItemModel";
import * as view from "./singleItemView";

export default async function (state) {
  // Создаём новый объект с singleItem
  state.singleItem = new SingleItem(state.routeParams);

  // Получаем данные с сервера
  await state.singleItem.getItem();

  // Отрисовываем разметку для отдельного объекта
  view.render(
    state.singleItem.result,
    state.favourites.isFav(state.singleItem.id)
  );

  // ------------ Запуск прослушки события

  // Открытие модального окна
  document.querySelector(".button-order").addEventListener("click", () => {
    view.showModal();
  });

  // Закрытие модального окна
  document.querySelector(".modal__close").addEventListener("click", () => {
    view.hideModal();
  });

  // Закрытие модального окна - клик по overlay
  document.querySelector(".modal-wrapper").addEventListener("click", (e) => {
    if (e.target.closest(".modal")) {
      return null;
    } else {
      view.hideModal();
    }
  });

  // Отправка формы
  document
    .querySelector(".modal__form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = view.getInput();
      await state.singleItem.submitForm(formData);

      const response = state.singleItem.response;

      if (response.message === "Bid Created") {
        alert("Ваша заявка успешно отправлена");
        view.hideModal();
        view.clearInput();
      } else if (response.message === "Bid Not Created") {
        response.errors.forEach((item) => {
          alert(item);
        });
      }
    });

  // Клик по кнопке, добавить в избранное
  document
    .querySelector("#addToFavoriteButton")
    .addEventListener("click", (e) => {
      e.preventDefault();
      state.favourites.toggleFav(state.singleItem.id);
      view.toggleFavouriteButton(state.favourites.isFav(state.singleItem.id));
    });
}
