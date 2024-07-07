import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const AllocationForm = () => {
    const { dispatch, remaining, selectedCurrency, currencies } = useContext(AppContext);
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('');

    const submitEvent = () => {
        if (cost > remaining) {
            alert("The value cannot exceed remaining funds " + selectedCurrency.currency_sign + remaining);
            setCost("");
            return;
        }

        const expense = {
            name: name,
            cost: parseInt(cost),
        };

        if (action === "Reduce") {
            dispatch({
                type: 'RED_EXPENSE',
                payload: expense,
            });
        } else {
            dispatch({
                type: 'ADD_EXPENSE',
                payload: expense,
            });
        }
    };

    const handleCurrencyChange = (event) => {
        const selectedCurrency = currencies.find(currency => currency.id === event.target.value);
        dispatch({
            type: 'CHG_CURRENCY',
            payload: selectedCurrency,
        });
    };

    return (
        <div>
            <h2>Change allocation</h2>
            <div className="d-flex align-items-center" style={{ gap: '0.5rem' }}>
                <div className="input-group" style={{ flex: '1' }}>
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Department</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect01" onChange={(event) => setName(event.target.value)}>
                        <option defaultValue>Choose...</option>
                        <option value="Marketing" name="marketing">Marketing</option>
                        <option value="Sales" name="sales">Sales</option>
                        <option value="Finance" name="finance">Finance</option>
                        <option value="HR" name="hr">HR</option>
                        <option value="IT" name="it">IT</option>
                        <option value="Admin" name="admin">Admin</option>
                    </select>
                </div>

                <div className="input-group" style={{ flex: '1' }}>
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect02">Allocation</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect02" onChange={(event) => setAction(event.target.value)}>
                        <option defaultValue value="Add" name="Add">Add</option>
                        <option value="Reduce" name="Reduce">Reduce</option>
                    </select>
                </div>

                <div className="input-group" style={{ flex: '1' }}>
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect03">Currency</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect03" onChange={handleCurrencyChange} value={selectedCurrency.id}>
                        {currencies.map((currency) => (
                            <option key={currency.id} value={currency.id}>{currency.currency_sign} {currency.name}</option>
                        ))}
                    </select>
                </div>

                <div className="input-group" style={{ flex: '2' }}>
                    <div className="input-group-prepend">
                        <span className="input-group-text">{selectedCurrency.currency_sign}</span>
                    </div>
                    <input
                        required='required'
                        type='number'
                        id='cost'
                        value={cost}
                        className="form-control"
                        onChange={(event) => setCost(event.target.value)}
                    />
                </div>

                <button className="btn btn-primary" onClick={submitEvent}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default AllocationForm;
