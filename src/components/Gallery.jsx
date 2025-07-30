import { createClient } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const Gallery = () => {
    const [characters, setCharacters] = useState([])

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const { data,error } = await supabase
                .from("character")
                .select('id, name, race, class')

                if (error) throw error
                setCharacters(data)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchCharacters()
    }, [])
    
    return (
        <div className="gallery-container">
            <h1>Character Gallery</h1>
            <div className="character-grid">
                {characters.map(character => (
                    <div className="character-card" key={character.id}>
                        <h3>Name: {character.name}</h3>
                        <p>Race: {character.race}</p>
                        <p>Class: {character.class}</p>
                        <Link to={`/character/${character.id}`}><button>Details</button></Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Gallery