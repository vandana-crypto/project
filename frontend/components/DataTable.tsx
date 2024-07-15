import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchData } from '../redux/slices/dataSlice';
import { RootState, useAppDispatch } from '../redux/slices/store';

const DataTable: React.FC<{ symbol: string }> = ({ symbol }) => {
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.data.data);
  const status = useSelector((state: RootState) => state.data.status);

  useEffect(() => {
    dispatch(fetchData(symbol));

    const interval = setInterval(() => {
      dispatch(fetchData(symbol));
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch, symbol]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Failed to load data</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Price</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry) => (
          <tr key={entry._id}>
            <td>{entry.symbol}</td>
            <td>{entry.price}</td>
            <td>{new Date(entry.timestamp).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
