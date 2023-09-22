import React, { useState } from "react";
import axios from "axios";

export default function CreateForm({ movies, setMovies }){
    const [title, setTitle] = useState("")
    const [stars, setStars] = useState(1)

    async function createMovie(ev){
        ev.preventDefault()
        const response = await axios.post(`/api/movies`, {title, stars})
        console.log(response.data)
        setMovies([...movies, response.data[0]])
    }

    return (<>
        <form onSubmit={createMovie}>
            <input type="text" onChange={(e)=>setTitle(e.target.value)}/>
            <input type="number" min={1} max={5} defaultValue={stars} onChange={(e) => setStars(e.target.value)}/>
            <button type="submit">Submit</button>
        </form>
    </>)
}