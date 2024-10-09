// Import statements instead of require
import express from 'express';
import mysql from 'mysql2';
import axios from 'axios';

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

// MySQL connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',  // Change this to your database password
    database: 'movieDB'     // Change this to your database name
});

// Route to search for movies or TV shows using the OMDB API
app.get('/search', async (req, res) => {
    const { query } = req.query;  // Extract the search query from URL parameters
    const apiKey = '716a6a70';  // Replace with your OMDB API key

    try {
        // Make a GET request to OMDB API with the search query
        const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
        res.json(response.data.Search);  // Send the search results back to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from OMDB' });  // Error handling
    }
});

// Route to save a favourite movie/TV show to the database
app.post('/favourite', (req, res) => {
    const { title, year, type, poster, imdbID } = req.body;  // Extract movie details from the request body
    const query = 'INSERT INTO favourites (title, year, type, poster, imdbID) VALUES (?, ?, ?, ?, ?)';  // SQL query to insert into 'favourites' table

    // Execute the query, inserting the movie details into the database
    db.query(query, [title, year, type, poster, imdbID], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error saving favourite' });  // Error handling
        res.json({ message: 'Favourite saved successfully' });  // Success response
    });
});

// Route to retrieve all favourite movies/TV shows from the database
app.get('/favourites', (req, res) => {
    // Query the 'favourites' table and retrieve all saved records
    db.query('SELECT * FROM favourites', (err, results) => {
        if (err) return res.status(500).json({ error: 'Error fetching favourites' });  // Error handling
        res.json(results);  // Send the retrieved records back to the client
    });
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
