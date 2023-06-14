import React, { useEffect, useState } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((response) => response.json())
      .then((data) => {
        console.log("fetched data", data)
        setTransactions(data);
        setFilteredTransactions(data); // Initialize filtered transactions with all transactions
      })
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  // new transaction
  const addTransaction = (transaction) => {
    // Make API call to post the new transaction
    fetch("backend/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the transactions state with the response from the API
        setTransactions([...transactions, data]);

        // Update the filtered transactions with the new transaction included
        setFilteredTransactions([...filteredTransactions, data]);
      })
      .catch((error) =>
        console.error("Error adding transaction to the backend:", error)
      );
  };

  // filter transactions
  const filterTransactions = (searchItem) => {
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchItem.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  return (
    <div>
      <Search onSearch={filterTransactions} />
      <AddTransactionForm onAddTransaction={addTransaction} />
      <TransactionsList transactions={filteredTransactions} />
    </div>
  );
}

export default AccountContainer;
