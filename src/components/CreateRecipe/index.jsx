import { useState, useEffect } from "react";
import { getAPI } from '../../utils/api';


const createRecipe = () => {

    const [recipe, setRecipe] = useState ([]);

    useEffect (() => {
        getAPI().post(`/recipes`)
        .then (response => {
            setRecipe(response.data)
            console.log(response.data)
        })
        .catch(error => console.log(error))
    },[]);
    
    return (
        <>
        <h1>Créer ta recette</h1>
   <form action="submit" method="post" >
        <label> Nom de la recette</label> 
        <input value={recipe.name}/>

        <label>Entre les ingrédients de la recette</label>
            <ul>
                <li><input/></li>
                <li><input/></li>
                <li><input/></li>
                <li><input/></li>
                <li><input/></li>
            </ul>
        <label>Decrit les étapes</label> 

        <label>Etape 1</label>  
        <input/>
        <label>Etape 2</label> 
        <input/>
        <label>Etape 3</label> 
        <input/>
        <label>Etape 4</label> 
        <input/>
        <label>Photo de la recette</label>
        <input type="file" accept="image/*"/>
        <input type="submit" value="Ajouter la recette"/>
    </form>
        </>
    )
}

export default createRecipe;