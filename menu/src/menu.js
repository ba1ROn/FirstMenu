import React, { useEffect, useState } from 'react';

const FetchMenuData = () => {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/Menu/mainmenu');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMenuData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Main Menu</h1>
      <ul>
        {menuData.map(item => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Position: {item.menuPos}</p>
            <p>Access: {item.menuAccess}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchMenuData;
