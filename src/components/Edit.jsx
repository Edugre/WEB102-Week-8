import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { createClient } from "@supabase/supabase-js"

const Edit = () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)

    const params = useParams()
    const id = params.id
    const navigate = useNavigate()
    const [character, setCharacter] = useState()

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const { data, error } = await supabase.
                from("character")
                .select("id, name, race, class").eq('id', id)

                if (error) throw error
                setCharacter(data[0])
                console.log(data)

            } catch (error) {
                console.log(error)
            }
        }

        fetchCharacter()
    }, [])

    const updateCharacter = async (e) => {
        e.preventDefault()
        
        const formData = new FormData(e.target)
        const name = formData.get("name")
        const race = formData.get("race")
        const characterClass = formData.get("class") 

        try {
            const { error } = await supabase
                .from("character")
                .update({ name: name, race: race, class: characterClass })
                .eq("id", id)
            
            if (error) throw error
            navigate('/character/gallery')
        } catch (error) {
            console.error(error)
        }
    }

    const deleteCharacter = async () => {
        try {
            const { error } = await supabase
                .from("character")
                .delete()
                .eq("id", id)

            if (error) throw error
            navigate('/character/gallery')
        } catch (error) {
            console.log(error)
        }

    
    }

    return (
        <div>
            <h1>Edit Character</h1>
            <h2>Current data</h2>
            <p>Name: {character?.name}</p>
            <p>Race: {character?.race}</p>
            <p>Class: {character?.class}</p>
            <form className="character-info" onSubmit={updateCharacter}>
                <div className="info-input">
                    <label for="text">Character name</label>
                    <input type="text" id="name" name="name" required defaultValue={character?.name} />
                </div>
                <div className="info-input">
                <label for="race">Character Race</label>
                    <select id="race" name="race" defaultValue={character?.race}>
                        <option>Human</option>    
                        <option>Elf</option>    
                        <option>Dwarf</option>    
                        <option>Halfling</option>    
                        <option>Orc</option>    
                    </select> 
                </div>
                <div className="info-input">
                <label for="class">Character Class</label>
                    <select id="class" name="class" defaultValue={character?.class}>
                        <option>Warrior</option>    
                        <option>Mage</option>    
                        <option>Rogue</option>    
                        <option>Cleric</option>    
                        <option>Ranger</option>    
                        <option>Paladin</option>    
                    </select>
                </div>
                <div className="buttons-container">
                    <button type="submit">Update Character</button>
                </div>
            </form>
            <button onClick={deleteCharacter}>Delete Character</button>
        </div>
    )
}

export default Edit