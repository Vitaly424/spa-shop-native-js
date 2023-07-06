import singleItem from "./../singleItem/singleItemController";

export default function (state) {
  // Отчищаем контейнер приложения
  document.querySelector("#app").innerHTML = "";

  // Запускаем компонент
  singleItem(state);
}
