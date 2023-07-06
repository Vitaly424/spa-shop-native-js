import * as view from "./listingView";

export default function (state) {
  console.log("staart");

  view.render();

  state.results.forEach((object) => {
    view.renderCard(object, state.favourites.isFav(object.id));
  });

  // Запускаем прослушку клика на иконки "Добавить в избранное"
  addToFavsListener();

  state.emitter.subscribe("event:render-listing", () => {
    // Очистить контейнер с карточками
    view.clearListingContainer();

    // Отрендерить карточки
    state.results.forEach((object) => {
      view.renderCard(object, state.favourites.isFav(object.id));
    });

    addToFavsListener();
  });

  // Функция для работы иконок, добавить в избранное
  function addToFavsListener() {
    Array.from(document.getElementsByClassName("card__like")).forEach(
      (item) => {
        item.addEventListener("click", (e) => {
          e.preventDefault();

          const currentId = e.target.closest(".card").dataset.id;
          state.favourites.toggleFav(currentId);

          view.toggleFavouriteIcon(
            e.target.closest(".card__like"),
            state.favourites.isFav(currentId)
          );
        });
      }
    );
  }
}
