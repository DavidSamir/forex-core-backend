import { Schema, model, Document } from 'mongoose';

export interface ITrade extends Document {
  account: Schema.Types.ObjectId;
  type: 'buy' | 'sell';
  symbol: string;
  quantity: number;
  price: number;
  date: Date;
}

const TradeSchema = new Schema<ITrade>({
  account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  type: { type: String, enum: ['buy', 'sell'], required: true },
  symbol: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

export default model<ITrade>('Trade', TradeSchema);
