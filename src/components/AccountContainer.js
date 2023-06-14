import React, { useEffect, useState } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("db.json")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  // new transaction
  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };
  // filter transactions
  const filterTransactions = (searchItem) => {
    const filteredTransactions = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchItem.toLowerCase())
    );
    return filteredTransactions;
  };
  return (
    <div>
      <Search onSearch={filterTransactions} />
      <AddTransactionForm onAddTransaction={addTransaction} />
      <TransactionsList transactions={transactions} />
    </div>
  );
}

export default AccountContainer;
