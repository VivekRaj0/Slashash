import { useEffect, useState } from 'react';
import axios from 'axios';

function Favourites() {
  const [favourites, setFavourites] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null); // Error handling
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch favourites from the backend on component mount
  useEffect(() => {
    const fetchFavourites = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/favourites');
        
        // Ensure the response is an array
        if (Array.isArray(response.data)) {
          setFavourites(response.data); // Set the data if it's an array
        } else {
          setFavourites([]); // Fallback to an empty array if the response is not an array
        }
      } catch (err) {
        setError(err,'Error fetching favourites');
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, []);

  return (
    <div className="container">
      <h1>Your Favourites</h1>

      {/* Display loading indicator */}
      {loading && <div>Loading...</div>}

      {/* Display error message */}
      {error && <div className="text-danger">{error}</div>}

      {/* Display favourites list */}
      <div className="mt-4">
        {Array.isArray(favourites) && favourites.length > 0 ? (
          favourites.map((movie) => (
            <div className="card mb-3" key={movie.imdbID}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
                    className="img-fluid rounded-start"
                    alt={movie.Title}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{movie.Title} ({movie.Year})</h5>
                    <p className="card-text">Type: {movie.Type}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && <div>No favourites found</div> // Show this if there are no favourites
        )}
      </div>
    </div>
  );
}

export default Favourites;
