import React from 'react';
import ReactDOM from 'react-dom/client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CreateForm from './CreateForm';

const App = ()=> {
  const [movies, setMovies] = useState([])

  useEffect(()=>{
    async function getMovies(){
      const response = await axios.get('/api/movies')
      setMovies(response.data)
    }
    getMovies()
  }, [])

  async function increaseStar(movie){
    const stars = movie.stars + 1
    const response = await axios.put(`api/movies/${movie.id}`, {title: movie.title, stars})
    const updatedMovies = movies.map(movie=> movie.id === response.data.id ? response.data : movie)
    setMovies(updatedMovies)
  }

  async function decreaseStar(movie){
    const stars = movie.stars - 1
    const response = await axios.put(`api/movies/${movie.id}`, {title: movie.title, stars})
    const updatedMovies = movies.map(movie=> movie.id === response.data.id ? response.data : movie)
    setMovies(updatedMovies)
  }

  async function deleteMovie(movie){
    await axios.delete(`api/movies/${movie.id}`)
    setMovies(movies.filter(mov=> mov.id === movie.id ? null : mov))
  }

  return (<>
    <CreateForm movies={movies} setMovies={setMovies}/>
    <ul>
      {
        movies.map(movie=>{
          return (
            <li key={movie.id}>
              <h2>{ movie.title }</h2>
              <h4>
                <span>
                  Rating: { movie.stars } Stars
                  <button onClick={()=> increaseStar(movie)}> + </button>
                  <button onClick={()=> decreaseStar(movie)}> - </button>
                </span>
                <button onClick={()=>deleteMovie(movie)}>Delete</button>
              </h4>
            </li>
          )
        })
      }
    </ul>
  </>);
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
