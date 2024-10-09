import { useState } from 'react';
import axios from 'axios';

function MovieSearch() {
  const [query, setQuery] = useState(''); // State to store the search query
  const [results, setResults] = useState([]); // State to store search results
  const [error, setError] = useState(null); // State to store error messages
  const [loading, setLoading] = useState(false); // State to show a loading indicator

  // Function to handle the search action
  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }

    setError(null); // Clear any previous errors
    setLoading(true); // Show loading spinner

    try {
      // Fetch data from the backend using the search query
      const response = await axios.get(`http://localhost:3000/search?query=${query}`);

      // Handle API response - ensure we are setting an array
      const resultsData = response.data;

      if (Array.isArray(resultsData)) {
        setResults(resultsData); // Update the search results if it's an array
      } else if (resultsData) {
        setResults([resultsData]); // If a single object is returned, wrap it in an array
      } else {
        setResults([]); // If no data, set an empty array
      }
    } catch (err) {
      setError(err,'Error fetching data from the server');
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  // Function to handle adding a movie/TV show to favourites
  const handleFavourite = async (movie) => {
    try {
      await axios.post('/favourite', movie); // Send movie data to the backend
      alert('Added to favourites'); // Show success message
    } catch (err) {
      alert(err,'Error saving to favourites');
    }
  };

  return (
    <div className="container">
      <h1>Search Movies</h1>
      
      {/* Input field to enter search query */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query state
        className="form-control"
        placeholder="Search for a movie or show..."
      />
      
      {/* Button to trigger search */}
      <button onClick={handleSearch} className="btn btn-primary mt-2">
        Search
      </button>

      {/* Display loading spinner */}
      {loading && <div className="mt-3">Loading...</div>}

      {/* Display error message */}
      {error && <div className="mt-3 text-danger">{error}</div>}

      {/* Display search results */}
      <div className="mt-4">
        {Array.isArray(results) && results.length > 0 ? (
          results.map((movie) => (
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
                    <h3 className="card-title">{movie.Title} ({movie.Year})</h3>
                    <h5 className="card-title">Actors: {movie.Actors}</h5>
                    <h5 className="card-title">Directors: {movie.Director}</h5>
                    <p className="card-text"><b>Plot:</b> {movie.Plot}</p>
                    <p className="card-text">Type: {movie.Type}</p>
                    <p className='card-text'>Rating: {movie.imdbRating}</p>
                    {console.log(movie)}
                    <button onClick={() => handleFavourite(movie)} className="btn btn-success">
                      Favourite
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && !error && <div className="mt-3">No results found</div>
        )}
      </div>
    </div>
  );
}

export default MovieSearch;
