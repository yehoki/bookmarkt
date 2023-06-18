import mongoose from 'mongoose';

export interface UserType {
  id: string;
  name: string;
  username: string;
  password: string;
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
  password: {
    type: String,
    required: [true, 'Password cannot be empty'],
    minLength: [4, 'Password must be at least 4 characters long'],
  },
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const UserModel =
  mongoose.models.User || mongoose.model<UserType>('User', userSchema);

export default UserModel;
