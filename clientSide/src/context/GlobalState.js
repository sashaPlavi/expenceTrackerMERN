import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getTransaction() {
    console.log("bla");

    try {
      const response = await axios.get("/api/v1/transactions", {
        headers: { "Access-Control-Allow-Origin": "http://localhost:5001" },
      });
      console.log(response);

      dispatch({
        type: "GET_TRANSACTIONS",
        payload: response.data.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error,
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error,
      });
    }
  }

  async function addTransaction(transaction) {
    const conf = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        "/api/v1/transactions",
        transaction,
        conf
      );
      dispatch({
        type: "ADD_TRANSACTION",
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        getTransaction,
        deleteTransaction,
        addTransaction,
        error: state.error,
        loading: state.error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
