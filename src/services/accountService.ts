import Account from '../models/Account';

export const updateCredit = async (accountId: string, amount: number) => {
  const account = await Account.findById(accountId);
  if (!account) throw new Error('Account not found');
  account.credit += amount;
  await account.save();
  return account;
};
