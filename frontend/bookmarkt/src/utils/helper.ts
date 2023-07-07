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

export const handleNewReview = (
  currentTotal: number,
  currentAverage: number,
  newRating: number
) => {
  const newAverage =
    (currentAverage * currentTotal + newRating) / (currentTotal + 1);
  return parseFloat(newAverage.toFixed(2));
};
