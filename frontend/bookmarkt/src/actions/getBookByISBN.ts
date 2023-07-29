import { GoogleBookItemInterface } from "./getBooksFromSearch";
import { GOOGLE_API_KEY } from "@/utils/config";

const googleAPIISBNSearchUrl =
  'https://www.googleapis.com/books/v1/volumes?q=isbn:';

export async function getBookByISBN(ISBN: string) {
  const partialResponse =
    'totalItems,items(id,volumeInfo(title,subtitle,authors,publishedDate,description,imageLinks,industryIdentifiers))';
  const res = await fetch(
    `${googleAPIISBNSearchUrl}${ISBN}&fields=${partialResponse}&key=${GOOGLE_API_KEY}`
  );
  if (!res.ok) {
    return null;
  }
  const bookData:GoogleBookItemInterface = await res.json();
  return bookData;
}
