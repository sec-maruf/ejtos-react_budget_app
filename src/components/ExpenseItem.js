import React, { useContext } from 'react';
import { FaPlusCircle, FaMinusCircle,FaTimesCircle } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';

const ExpenseItem = (props) => {
    const { dispatch,selectedCurrency } = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
        });
    };

    const increaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });

    }
    
    const reduceAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'RED_EXPENSE',
            payload: expense
        });

    }


    return (
        <tr>
            <td>{props.name}</td>
            <td>{selectedCurrency.currency_sign}{props.cost}</td>
            <td>
                <button 
                    onClick={event => increaseAllocation(props.name)} 
                    style={{ background: 'none', border: 'none' }}
                >
                    <FaPlusCircle size='1.5em' color='green' />
                </button>
            </td>
            <td>
                <button 
                    onClick={event => reduceAllocation(props.name)} 
                    style={{ background: 'none', border: 'none' }}
                >
                    <FaMinusCircle size='1.5em' color='red' />
                </button>
            </td>
            <td>
                <button 
                    onClick={handleDeleteExpense} 
                    style={{ background: 'none', border: 'none' }}
                >
                    <FaTimesCircle size='1.5em' color='red' />
                </button>
            </td>
        </tr>
    );
};

export default ExpenseItem;
