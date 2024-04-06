import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './dropdown.css'; 
import LoadingOverlay from './LoadingOverlay'

const Dropdown = ({ children, title, totalItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000); 
    }
  }, [isOpen]);

  const contentStyle = {
    maxHeight: isOpen ? (isLoading ? "0" : "1000px") : "0",
    opacity: 1,
    transition: 'max-height 0.5s ease-in-out, opacity 0.5s ease-in-out',
  };

  return (
    <div className="mb-4">
      <div className="payment-container">
        <button
          className={`lg:w-[1100px] md:w-[500px] sm:w-[300px] flex justify-between items-center px-8 py-4 text-xl font-semibold ${isOpen ? 'text-gray-800 bg-gray-300' : 'text-gray-800 bg-gray-200'} border-2 border-gray-400 rounded-lg hover:bg-gray-300`}
        >
          {isOpen ? title : `${title} (${totalItems})`}
          <span className="text-2xl transition-transform duration-300"
                onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '▲' : '▼'}
          </span>
        </button>
        {/* {isOpen && ( */}
          <div style={contentStyle} className="overflow-hidden transition-[max-height] duration-500 ease-in-out">
          {/* <div className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}> */}
            {isLoading && ReactDOM.createPortal(
              <LoadingOverlay />,
              document.getElementById('loading-root')
            )}
            {!isLoading && <div className="mt-2">{children}</div>}
          </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default Dropdown;