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

export const handleChangeReview = (
  currentTotal: number,
  currentAverage: number,
  oldRating: number,
  newRating: number
) => {
  const reviewSum = currentAverage * currentTotal;
  const revisedSum = reviewSum - oldRating + newRating;
  return parseFloat((revisedSum / currentTotal).toFixed(2));
};

export const handleDeleteReview = (
  currentTotal: number,
  currentAverage: number,
  ratingDeleted: number,
) => {
  const revisedSum = currentTotal - 1;
  const revisedAverage =
    (currentAverage * currentTotal - ratingDeleted) / revisedSum;
  return parseFloat(revisedAverage.toFixed(2));
};

export const extractTextFromDescription = (description: string) => {
  const extractedDescription = description.replace(/<[^>]+>/g, '');
  return extractedDescription;
};

export const extractYearFromDate = (stringDate: string) => {
  const year = stringDate.split('-', 1)[0];
  return year;
};

export const getTimeDifference = (timeNow: number, timeThen: number) => {
  const timeDifference = (timeNow - timeThen) / 1000;
  if (timeDifference / 60 < 1) {
    return 'Just now';
  }
  if (timeDifference / 60 >= 1 && timeDifference / 3600 < 1) {
    return `${Math.floor(timeDifference / 60)}m`;
  }
  if (timeDifference / 3600 >= 1 && timeDifference / (3600 * 24) < 1) {
    return `${Math.floor(timeDifference / 3600)}h`;
  } else {
    return `Over a day ago`;
  }
};

export const parseBookshelfName = (bookshelfName: string): string => {
  const firstParse = bookshelfName.replaceAll(' ', '-');
  return firstParse.toLowerCase();
};
