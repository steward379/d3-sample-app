import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import { mockData } from './data';
import './App.css';
import ChartOne from './ChartOne';
import ChartTwo from './ChartTwo';
import ChartThree from './ChartThree';
import MegaChart from './MegaChart';
import rawData from './chart1Data.json';
import cryptoData from './chart3Data.json';
import megaData from './mainChartData.json';

const aaplData = rawData.map(d => ({
  ...d,
  Date: new Date(d.Date),
}));

function App() {
  const [filter, setFilter] = useState('');
  const itemsPerPage = 10;
  const [displayedData, setDisplayedData] = useState(mockData.slice(0, itemsPerPage));
  const totalItems = mockData.length;

  useEffect(() => {
    setDisplayedData(mockData.filter(
      (item) =>
        item.dateCreated.includes(filter) ||
        item.description.toLowerCase().includes(filter.toLowerCase()) ||
        item.amount.includes(filter) ||
        item.status.toLowerCase().includes(filter.toLowerCase())
    ).slice(0, itemsPerPage));
  }, [filter]);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) { 
      setDisplayedData(prevDisplayedData => {
        const moreData = mockData.filter(
          (item) =>
            item.dateCreated.includes(filter) ||
            item.description.toLowerCase().includes(filter.toLowerCase()) ||
            item.amount.includes(filter) ||
            item.status.toLowerCase().includes(filter.toLowerCase())
        ).slice(prevDisplayedData.length, prevDisplayedData.length + itemsPerPage); 
        return [...prevDisplayedData, ...moreData];
      });
    }
  };

  const estimatedItemHeight = 57;
 
  const maxTableHeight = displayedData.length > itemsPerPage
    ? `${(itemsPerPage * estimatedItemHeight) + (estimatedItemHeight / 2)}px` // 假设显示半条数据的高度作为提示
    : `${displayedData.length * estimatedItemHeight}px`;

  return (
    <div className="App">
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="flex-1">
          <div className="flex justify-between mb-4">
            <div className="w-1/3 bg-gray-200 p-4 rounded z-10">
              <ChartOne aapl={aaplData} />
            </div>
            <div className="w-1/3 bg-gray-200 p-4 rounded">
              <ChartTwo aapl={aaplData} />
            </div>
            <div className="w-1/3 bg-gray-200 p-4 rounded">
              <ChartThree crypto={cryptoData} />
            </div>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="search-input mb-4 block  px-4 py-2 border-2 border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent" 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <Dropdown title="Payment History" totalItems={totalItems}>
            <div className="payment-container overflow-auto mx-10 mt-[-8px]"  
                  onScroll={handleScroll} 
                  style={{ maxHeight: "605px" }}>
              <table className="payment-table min-w-full divide-y divide-gray-300" 
                    style={{ width: "calc(100% - 1rem)" }}>
                <thead className="payment-head bg-gray-300">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="payment-body bg-white divide-y divide-gray-300">
                  {displayedData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-left whitespace-nowrap">{item.dateCreated}</td>
                      <td className="px-6 py-4 text-left whitespace-nowrap">{item.description}</td>
                      <td className="px-6 py-4 text-left whitespace-nowrap">{item.amount}</td>
                      <td className="px-6 py-4 text-left whitespace-nowrap">
                        <span 
                          className={`inline-block px-2 py-1 rounded-full text-white text-center ${
                            item.status === 'failed' ? 'bg-red-500' : 'bg-green-500'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Dropdown>
        </div>
        <div className="w-full md:w-[500px] h-[400px] bg-[#141e27] p-4 rounded md:mb-0 z-10">
          <MegaChart data={megaData} />
        </div>
      </div>
    </div>
  );
}

export default App;