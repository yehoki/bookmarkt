import { getSingleBook } from "../getSingleBook";

export async function getGoogleBooksFromList(googleIds: string[]) {
  const googleBooks = await Promise.all(googleIds.map(async (googleId) => {
    const res = await getSingleBook(googleId);
    if (res) {
      return res
    }
    return null;
  }));
  return googleBooks;
}
