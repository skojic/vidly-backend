/**
 * Backend code for web application Vidly
 */

const express = require ('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

/**
 * Creating movies database JSON
 * @param {array}
 * @returns {JSON}
 */

const movies = [
  {genre: 'action', name: 'Quantum Of Solace', duration: 120},
  {genre: 'comedy', name: 'White Chicks', duration: 90},
  {genre: 'comedy', name: 'Freddy Got Fingered', duration: 120},
  {genre: 'action', name: 'Conan The Barbarian', duration: 90},
];

/**
 * Function for validating movies
 * @param {array} movies 
 */

function validateMovies(movies) {
  const schema = {
    genre: Joi.string().min(3).required(),
    name: Joi.string().min(3).required(),
    duration: Joi.number().max(120).required(),
  };
  return Joi.validate(movies, schema);
}

/**
 * Creating HTTP routes
 */

app.get('/', (req, res) => {
  res.send(movies);
});

app.get('/api/:genre', (req, res) => {
  const genre = movies.filter(c => c.genre === req.params.genre);
  if (!genre) return res.status(404).send('The movie with the specified genre not found.')
  res.send(genre);
});

app.get('/api/duration/:duration', (req, res) => {
  const duration = movies.filter(c => c.duration === parseInt(req.params.duration));
  if (!duration) return res.status(404).send('The movie with the specified duration time not found.')
  res.send(duration);
});

/**
 * Server listening
 * @param {env} PORT
 * @returns {number}
 */

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on ${port}`));