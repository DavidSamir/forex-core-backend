import { Schema, model, Document } from 'mongoose';

export interface IAccount extends Document {
  credit: number;
  portfolio: Array<{ symbol: string; quantity: number }>;
}

const AccountSchema = new Schema<IAccount>({
  credit: { type: Number, default: 0 },
  portfolio: [
    {
      symbol: { type: String },
      quantity: { type: Number }
    }
  ]
});

export default model<IAccount>('Account', AccountSchema);
