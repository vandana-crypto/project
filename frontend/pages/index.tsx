import React, { useState } from 'react';
import DataTable from '../components/DataTable';

const Home = () => {
    const [symbol, setSymbol] = useState('bitcoin');

    return (
        <div>
            <h1>Real-Time Price Data</h1>
            <button onClick={() => setSymbol('ethereum')}>Ethereum</button>
            <button onClick={() => setSymbol('ripple')}>Ripple</button>
            <button onClick={() => setSymbol('litecoin')}>Litecoin</button>
            <button onClick={() => setSymbol('bitcoin-cash')}>Bitcoin Cash</button>
            <DataTable symbol={symbol} />
        </div>
    );
};

export default Home;
