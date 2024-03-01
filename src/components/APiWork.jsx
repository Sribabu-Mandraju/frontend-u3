import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiWork = () => {
  const [movies, setMovies] = useState([]);
  const apiKey = '5a6b53afcdmsh31e01b922d82ca8p1cd78bjsn651386001005';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://movies-api14.p.rapidapi.com/movies',
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
          }
        };
        const response = await axios.request(options);
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovies();
  }, [apiKey]);

  return (
    <div>
      <h2>Movie List</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ApiWork;
