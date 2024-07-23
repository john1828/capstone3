import { useState } from 'react';
import ProductCard from './ProductCard';

export default function ProductSearch () {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch("http://localhost:4000/courses/search", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ courseName: searchQuery })
      });
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching for product:', error);
    }
  };

  return (
    <div className='mt-3 my-5'>
      <h2>Search Products</h2>
      <div className="form-group">
        <input
          type="text"
          id="courseName"
          className="form-control"
          placeholder="Product name"
          style={{ width: '20rem' }}
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
        />
      </div>
      <button className="btn btn-primary my-3" onClick={handleSearch}>
        Find
      </button>
      <h4>Search Results:</h4>
      <ul>
        {searchResults.map(product => (
          <ProductCard productProp={product} key={product._id} />
        ))}
      </ul>
    </div>
  );
};


