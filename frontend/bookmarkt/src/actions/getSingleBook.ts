const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API;
const googleAPIBaseUrl = 'https://www.googleapis.com/books/v1';

export async function getSingleBook(googleId: string) {
  const partialResponse =
    'id,volumeInfo(title,subtitle,authors,publishedDate,description,imageLinks)';

  const res = await fetch(
    `${googleAPIBaseUrl}/volumes/${googleId}?fields=${partialResponse}&key=${GOOGLE_API_KEY}`
  );
  if (!res.ok) {
    return null;
  }
  const bookInformation = await res.json();
  return bookInformation;
}
