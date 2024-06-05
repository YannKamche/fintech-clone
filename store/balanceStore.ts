import { create } from "zustand";
import { asyncStorage } from "./secure-storage"; // adjust the path as needed
import { createJSONStorage, persist } from "zustand/middleware";

// Defining Transaction
export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: Date;
}

// Defining Interface for BalanceState
export interface BalanceState {
  transactions: Array<Transaction>;
  runTransaction: (transaction: Transaction) => void;
  balance: () => number;
  clearTransactions: () => void;
}

export const useBalanceStore = create<BalanceState>()(
  persist(
    (set, get) => ({
      transactions: [],
      runTransaction: (transaction: Transaction) => {
        set((state) => ({
          transactions: [...state.transactions, transaction],
        }));
      },
      balance: () =>
        get().transactions.reduce(
          (acc, transaction) => acc + transaction.amount,
          0
        ),
      clearTransactions: () => {
        set({ transactions: [] });
      },
    }),
    {
      name: "balance",
      storage: createJSONStorage(() => asyncStorage),
    }
  )
);
