import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Link } from "react-router-dom"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const Character = () => {
    const params = useParams() 
    const [character, setCharacter] = useState();

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const { data, error } = await supabase
                .from("character")
                .select("id, name, race, class")
                .eq('id', params.id)

                if (error) throw error
                setCharacter(data[0])
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchCharacter()
    }, [])

    return (
        <div>
            <h1>Character: {character?.name}</h1>
            <h2>Race: {character?.race}</h2>
            <h2>Class: {character?.class}</h2>
            <Link to={`/character/${character?.id}/edit`}><button>Edit</button></Link>
        </div>
    )
}

export default Character