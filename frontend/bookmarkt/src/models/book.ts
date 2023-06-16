import mongoose from 'mongoose';


export interface BookType {
  _id: string;
  title: string;
  author: string;
}

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a book title'],
  },
  author: {
    type: String,
    required: true,
  },
});

const BookModel = mongoose.models.Book || mongoose.model<BookType>('Book', bookSchema);

export default BookModel