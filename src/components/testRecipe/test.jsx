import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAPI } from '../../utils/api';

const Recipe = () => {
    const [recipe, setRecipe] = useState([]);

    useEffect(() => {
        getAPI().get('/recipes/1')
            .then(response => setRecipe(response.data))
            .catch(error => console.log(error));
    }, []);


     return (
         <>
         <Link to="/recipes/update/1">
            <button>Modifier la recette</button>
        </Link>

        <div className="commentaires">
            <p>Pseudo du membre</p>
            <textarea value="texte"> Votre commentaire...</textarea>
            <button type="submit">Ajouter votre commentaire</button>
        </div>
        
           <div className="recipe">
         <img src={recipe.picture} alt={recipe.name} /> 
                   
              <img src={recipe.picture} alt={recipe.name} />    
              <h2>{recipe.name}</h2>
              <p>{recipe.description}</p>
              <p>{recipe.steps}</p> 
        
            
         </div> 

        
</>
);
};

export default Recipe;
