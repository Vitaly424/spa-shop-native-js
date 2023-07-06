export default class FavouritesCards {
  constructor(favsList) {
    this.favsList = favsList;
  }

  async getFavs() {
    if (this.favsList.length !== 0) {
      const ids = this.favsList.toString();
      const queryString = `https://jsproject.webcademy.ru/items?ids=${ids}`;

      const result = await fetch(queryString);
      const data = await result.json();
      this.cards = data;
      console.log(this.cards);
    }
  }
}
