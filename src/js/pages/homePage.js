import filter from "../filter/filterController";
import listing from "../listing/listingController";

export default async function (state) {
  await filter(state);
  listing(state);
}
