import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  account: Schema.Types.ObjectId;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  account: { type: Schema.Types.ObjectId, ref: 'Account' }
});

export default model<IUser>('User', UserSchema);
