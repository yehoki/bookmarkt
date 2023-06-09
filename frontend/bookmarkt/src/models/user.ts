import mongoose from 'mongoose';

export interface UserType {
  id: string;
  name: string;
  username: string;
  password: string;
  books?: string[];
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    minLength: [3, 'Username must be at least 4 characters long'],
  },
  passwordHash: {
    type: String,
  },
  books: [
    {
      type: String,
    },
  ],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const UserModel =
  mongoose.models.User || mongoose.model<UserType>('User', userSchema);

export default UserModel;
