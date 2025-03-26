import { Schema, model, Document } from 'mongoose';

export interface ITransaction extends Document {
  account: Schema.Types.ObjectId;
  type: 'deposit' | 'withdrawal';
  amount: number;
  date: Date;
}

const TransactionSchema = new Schema<ITransaction>({
  account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  type: { type: String, enum: ['deposit', 'withdrawal'], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

export default model<ITransaction>('Transaction', TransactionSchema);
