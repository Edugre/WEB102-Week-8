import { createClient } from "@supabase/supabase-js"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const Create = () => {

    const navigate = useNavigate()

    useEffect(() => {
        console.log("Connected to the database successfully!")
    }, [])

    const submitCharacter = async (e) => {
        e.preventDefault()
        
        const formData = new FormData(e.target)
        const name = formData.get('name')
        const race = formData.get('race')
        const characterClass = formData.get('class')
        
        try {
            const { error } = await supabase
                .from("character")
                .insert({ 
                    name: name,
                    race: race, 
                    class: characterClass 
                })
            
            if (error) throw error
            console.log("Character created successfully!")
            navigate("/character/gallery")
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return (
        <div className="create-container">
            <h1>Create a new Character</h1>
            <form className="character-info" onSubmit={submitCharacter}>
                <div className="info-input">
                    <label for="text">Character name</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="info-input">
                <label for="race">Character Race</label>
                    <select id="race" name="race">
                        <option>Human</option>    
                        <option>Elf</option>    
                        <option>Dwarf</option>    
                        <option>Halfling</option>    
                        <option>Orc</option>    
                    </select> 
                </div>
                <div className="info-input">
                <label for="class">Character Class</label>
                    <select id="class" name="class">
                        <option>Warrior</option>    
                        <option>Mage</option>    
                        <option>Rogue</option>    
                        <option>Cleric</option>    
                        <option>Ranger</option>    
                        <option>Paladin</option>    
                    </select>
                </div>
                <div className="info-input">
                    <button type="submit">Create Character</button>
                </div>
            </form>
        </div>
    )
}

export default Create