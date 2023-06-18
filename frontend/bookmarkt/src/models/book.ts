import mongoose from 'mongoose';

export interface BookType {
  id: string;
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

bookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const BookModel = mongoose.models.Book || mongoose.model<BookType>('Book', bookSchema);

export default BookModel