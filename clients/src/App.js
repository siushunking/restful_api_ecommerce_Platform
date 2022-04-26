import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Allproducts from './components/Allproducts';


const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(2);
  

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('http://localhost:8080/products');
      setProducts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1> E-commerce Platform </h1>
      <Allproducts products={products} loading={loading} />
    </div>
  );
};

export default App;
