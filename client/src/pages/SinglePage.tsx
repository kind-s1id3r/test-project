import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Item } from '../types';

function SinglePage() {
  const { id } = useParams();
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    fetch(`${process.env.API_URL}/items/${id}`)
      .then(res => res.json())
      .then(data => setItem(data))
      .catch(err => {
        console.error('Failed to fetch item', err);
      });
  }, []);

  return (
    <div className="detail">
        <Link to={'/'}>Go Back</Link>
      <h2>Item Details</h2>
      {
        item ? 
        <>
          <p>ID: {item.id}</p>
          <p>Name: {item.name}</p>
          <p>Description: {item.description}</p>
        </>
        :
        <span>Loading...</span>
      }
    </div>
  );
}

export default SinglePage;
