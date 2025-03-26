import Trade from '../models/Trade';
import Account from '../models/Account';

export const executeTrade = async (
  accountId: string,
  type: 'buy' | 'sell',
  symbol: string,
  quantity: number,
  price: number
) => {
  const account = await Account.findById(accountId);
  if (!account) throw new Error('Account not found');

  if (type === 'buy') {
    const cost = quantity * price;
    if (account.credit < cost) {
      throw new Error('Insufficient credit');
    }
    account.credit -= cost;
    // Update portfolio: add new asset or increase quantity if exists
    const assetIndex = account.portfolio.findIndex(a => a.symbol === symbol);
    if (assetIndex > -1) {
      account.portfolio[assetIndex].quantity += quantity;
    } else {
      account.portfolio.push({ symbol, quantity });
    }
  } else if (type === 'sell') {
    const assetIndex = account.portfolio.findIndex(a => a.symbol === symbol);
    if (assetIndex === -1 || account.portfolio[assetIndex].quantity < quantity) {
      throw new Error('Insufficient stock holdings');
    }
    account.portfolio[assetIndex].quantity -= quantity;
    const revenue = quantity * price;
    account.credit += revenue;
  }

  await account.save();

  const trade = new Trade({
    account: account._id,
    type,
    symbol,
    quantity,
    price
  });
  await trade.save();

  return { message: 'Trade executed successfully', trade };
};
