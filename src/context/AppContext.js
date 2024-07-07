import React, { createContext, useReducer } from 'react';

// The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            let total_budget = state.expenses.reduce((previousExp, currentExp) => previousExp + currentExp.cost, 0);
            total_budget += action.payload.cost;

            if (total_budget <= state.budget) {
                const updatedExpenses = state.expenses.map((currentExp) => {
                    if (currentExp.name === action.payload.name) {
                        return { ...currentExp, cost: currentExp.cost + action.payload.cost };
                    }
                    return currentExp;
                });
                return { ...state, expenses: updatedExpenses };
            } else {
                alert("Cannot increase the allocation! Out of funds");
                return state;
            }

        case 'RED_EXPENSE':
            const red_expenses = state.expenses.map((currentExp) => {
                if (currentExp.name === action.payload.name && currentExp.cost - action.payload.cost >= 0) {
                    return { ...currentExp, cost: currentExp.cost - action.payload.cost };
                }
                return currentExp;
            });
            return { ...state, expenses: red_expenses };

        case 'DELETE_EXPENSE':
            const remainingExpenses = state.expenses.map((currentExp) => {
                if (currentExp.name === action.payload) {
                    return { ...currentExp, cost: 0 };
                }
                return currentExp;
            });
            return { ...state, expenses: remainingExpenses };

        case 'SET_BUDGET':
            return { ...state, budget: action.payload };

        case 'CHG_CURRENCY':
            return { ...state, selectedCurrency: action.payload };

        default:
            return state;
    }
};

// Sets the initial state when the app loads
const initialState = {
    budget: 2000,
    expenses: [
        { id: "Marketing", name: 'Marketing', cost: 50 },
        { id: "Finance", name: 'Finance', cost: 300 },
        { id: "Sales", name: 'Sales', cost: 70 },
        { id: "Human Resource", name: 'Human Resource', cost: 40 },
        { id: "IT", name: 'IT', cost: 500 },
    ],
    currencies: [
        { id: "Dollar", name: 'Dollar', currency_sign: "$" },
        { id: "Pound", name: 'Pound', currency_sign: "£" },
        { id: "Euro", name: 'Euro', currency_sign: "€" },
        { id: "Rupee", name: 'Rupee', currency_sign: "₹" },
    ],
    selectedCurrency: { id: "Dollar", name: 'Dollar', currency_sign: "$" },
};

// Creates the context - this is the thing our components import and use to get the state
export const AppContext = createContext();

// Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested (wrapped) components
export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const totalExpenses = state.expenses.reduce((total, item) => total + item.cost, 0);
    const remaining = state.budget - totalExpenses;

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                budget: state.budget,
                remaining: remaining,
                dispatch,
                currencies: state.currencies,
                selectedCurrency: state.selectedCurrency,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
