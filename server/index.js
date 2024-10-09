// Import statements instead of require
import express from 'express';
import mysql from 'mysql';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json()); // Middleware to parse JSON request bodies




// MySQL connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Vivek@419',  // Change this to your database password
    database: 'moviedb'     // Change this to your database name
});


// db.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE favourites ( id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), year VARCHAR(10),  type VARCHAR(50), poster VARCHAR(255), imdbID VARCHAR(50))";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table created");
//     });
//   });
// Route to search for movies or TV shows using the OMDB API
app.get('/search', async (req, res) => {


    try {
        // Make a GET request to OMDB API with the search query
        const response = await axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=716a6a70`);
        res.json(response.data);  // Send the search results back to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from OMDB' });  // Error handling
    }
});

// POST route to handle adding a favourite movie
app.post('/favourite', async (req, res) => {
    try {
      const { imdbID, Title, Year, Poster, Type } = req.body;
  
      // Insert movie into the favourites table
      const query = `INSERT INTO favourites (imdbID, Title, Year, Poster, Type) VALUES (?, ?, ?, ?, ?)`;
      await db.execute(query, [imdbID, Title, Year, Poster, Type]);
  
      res.status(201).json({ message: 'Movie added to favourites' });
    } catch (error) {
      console.error('Error saving favourite:', error);
      res.status(500).json({ error: 'An error occurred while saving favourite' });
    }
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
