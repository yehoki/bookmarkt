export const parseQuery = (query: string): string => {
  return query.toLowerCase().replaceAll(' ', '+');
};

// https://www.googleapis.com/books/v1/volumes?q=atomic+habits&fields=totalItems,items(id, volumeInfo(title,subtitle,authors,publishedDate,description,imageLinks))&key=AIzaSyAh7ShtHwi3S6y-ArXGGBSU7eWXPZFwLIY

// https://www.googleapis.com/books/v1/volumes?q=the+4-hour+work+week&fields=totalItems,items(id,volumeInfo(title,subtitle,authors,publishedDatedescription,imageLinks))&key=
