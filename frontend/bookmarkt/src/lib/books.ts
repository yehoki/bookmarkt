import dbConnect from './dbConnect';

let client: any;
let db: any;
let books: any;

async function init() {
  if (db) return;
  try {
    client = await dbConnect();
    db = await client.db();
    books = await db.collection('books');
  } catch (err) {
    throw new Error('Error connecting to DB');
  }
}

(async () => {
  await init();
})();

export async function getAllBooks() {
  try {
    if (!books) await init();
    const result = await books.find({});
    return { books: result };
  } catch (err) {
    return { error: err };
  }
}

export async function createBook(title: string, author: string) {
  try {
    if (!books) await init();
    return await books.insertOne({
      title: title,
      author: author,
    });
  } catch (err) {
    return { error: err };
  }
}
