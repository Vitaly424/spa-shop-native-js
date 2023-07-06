import FavouritesCards from "./favouritesCardsModel";
import * as view from "./favouritesCardsViews";

export default async function (state) {
  //   Получить список объектов которые находятся в избранном
  const favsList = state.favourites.favs;

  // Получение данных с сервера
  const favouritCards = new FavouritesCards(favsList);
  await favouritCards.getFavs();

  // Отоброжаем контейнер и карточки

  if (favouritCards.cards !== undefined) {
    view.renderPage(favouritCards.cards);
  } else {
    alert("В избранном пусто");
  }

  addToFavsListener();

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
