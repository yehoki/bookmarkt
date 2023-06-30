export const parseQuery = (query: string): string => {
  return query.toLowerCase().replaceAll(' ', '+');
};

export const parseAuthors = (authors: string[] | undefined): string => {
  if (authors === undefined) {
    return '';
  }
  if (authors.length <= 1) {
    return authors[0];
  }
  let authorList = authors[0];
  for (let i = 1; i < authors.length; i++) {
    authorList = `${authorList}, ${authors[i]}`;
  }
  return authorList;
};
