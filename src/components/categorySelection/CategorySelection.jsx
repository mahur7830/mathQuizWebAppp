import React, { useState } from 'react';
import './category.css';

const CategorySelection = ({ onSelectCategory }) => {
  const [error, setError] = useState('');

  const handleSelectCategory = (category) => {
    //check for a valid category selection
    if (!category) {
      setError('Please select a valid category.');
    } else {
      setError(''); // Clear any previous errors
      onSelectCategory(category.toLowerCase());
    }
  };

  return (
    <div className="category-selection">
      <h2>Select a Category</h2>
      {error && <p className="error-message">{error}</p>} 
      {['Addition', 'Subtraction', 'Multiplication', 'Division', 'Counting'].map((category) => (
        <button key={category} onClick={() => handleSelectCategory(category)}>
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySelection;
