import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CurrencySelector = () => {
    const { currencies, selectedCurrency, dispatch } = useContext(AppContext);

    const handleCurrencyChange = (event) => {
        const selectedCurrency = currencies.find(currency => currency.id === event.target.value);
        dispatch({
            type: 'CHG_CURRENCY',
            payload: selectedCurrency,
        });
    };

    return (
        <div className="input-group-prepend" style={{ marginLeft: '2rem' }}>
            <label className="input-group-text" htmlFor="inputGroupSelect03">Currency</label>
            <select className="custom-select" id="inputGroupSelect03" onChange={handleCurrencyChange} value={selectedCurrency.id}>
                {currencies.map((currency) => (
                    <option key={currency.id} value={currency.id}>{currency.currency_sign} {currency.name}</option>
                ))}
            </select>
        </div>
    );
};

export default CurrencySelector;
