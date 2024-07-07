import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses, selectedCurrency, dispatch } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);

    // Calculate total spending
    const totalSpending = expenses.reduce((total, item) => total += item.cost, 0);

    const handleBudgetChange = (event) => {
        const value = parseInt(event.target.value);
        if (value < totalSpending) {
            alert("You cannot reduce the budget value lower than the spending");
            return;
        }
        setNewBudget(value);
        dispatch({
            type: 'SET_BUDGET',
            payload: value,
        });
    };

    return (
        <div className='alert alert-secondary'>
            <span>Budget: {selectedCurrency.currency_sign} </span>
            <input type="number" step="10" value={newBudget} onChange={handleBudgetChange} />
        </div>
    );
};

export default Budget;
