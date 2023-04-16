import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAPI } from "../utils/api";
import { Link } from "react-router-dom";


const UpdateRecipe = () => {
    const [recipeInfo, setRecipeInfo] = useState({})
    
    const navigate = useNavigate();

    let { id } = useParams(); 

    useEffect(() => {
        getAPI().get(`/recipes/${id}`)
            .then(response => {
                setRecipeInfo(response.data)
                console.log(response.data)
            })
            .catch(error => console.log(error));
    }, []);

    const submit = (event) => {
        event.preventDefault();
        getAPI().patch(`/recipes/${id}`, recipeInfo)
        .then(response => navigate(`/recipes/${id}`))
        .catch(error => console.log(error));
    }

    return (
        <>
        <h1>Modifie ta recette</h1>

        <form action="submit" method="post" onSubmit={submit} className="updateRecipe">
        <label> Nom de la recette</label>
        <input 
        value={recipeInfo.name}
        type="text"/>

        <label>Entre les ingrédients de la recette</label>
            <ul>
                <li><input
                value={recipeInfo.ingredients}/></li>
                <li><input/></li>
                <li><input/></li>
                <li><input/></li>
                <li><input/></li>
            </ul>

        <label>Decrit les étapes</label> <br />

        <label>Etape 1</label> 
        <input 
        value={recipeInfo.steps}
        type="text" />
        <label>Etape 2</label> 
        <input/>
        <label>Etape 3</label> 
        <input/>
        <label>Etape 4</label> 
        <input/>
        <label>Photo de la recette</label>
        <input type="file" accept="image/*"/>
        <Link to={`/recipes/${id}`}>
        <input type="submit" value="Ajouter la recette"/>
        </Link>
    </form>
        </>
    )
}

export default UpdateRecipe;