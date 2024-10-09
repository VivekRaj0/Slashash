import { useState, useEffect } from 'react';
import axios from 'axios';

function Favourites() {
  const [favourites, setFavourites] = useState([]);  // State to store the list of favourites

  // useEffect to fetch the favourites from the database when the component mounts
  useEffect(() => {
    const fetchFavourites = async () => {
      const response = await axios.get('/favourites');  // Fetch the favourites from the backend
      setFavourites(response.data);  // Update the favourites state with the fetched data
    };
    fetchFavourites();  // Call the function to fetch favourites
  }, []);  // Empty dependency array means it runs only on component mount

  return (
    <div className="container">
      <h1>Favourites</h1>
      
      {/* Display the list of favourite movies/TV shows */}
      <div className="mt-4">
        {favourites.map(fav => (
          <div className="card mb-3" key={fav.id}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={fav.Poster} className="img-fluid rounded-start" alt={fav.Title} />  {/* Display favourite poster */}
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{fav.Title} ({fav.Year})</h5>  {/* Display favourite title and year */}
                  <p className="card-text">Type: {fav.Genre}</p>  {/* Display favourite type */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favourites;
