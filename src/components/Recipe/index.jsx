import { useState, useEffect, } from "react";
import { Link, useParams } from "react-router-dom";
import { getAPI } from '../../utils/api';
import "./style.scss";

const Recipe = () => {
    const [recipe, setRecipe] = useState({
        // je transforme l'objet par un tableau vide et une string vide
        ingredients: [],
        steps: "",
    });

    let { id } = useParams();

    useEffect(() => {
        getAPI().get(`/recipes/${id}`)
            .then(response => {
                setRecipe(response.data)
                console.log(response.data)
            })
            .catch(error => console.log(error));
    }, []);

    // je nettoie la string des /, {}, .,
    const cleanString = (steps) => {
        console.log(steps)
        steps = steps.replaceAll('\"', '')
        steps = steps.replace('{', '')
        steps = steps.replace('}', '')
        steps = steps.split('.,')

        return steps
    }


    return (
        <>

            <Link to={`/recipes/update/${id}`}>
                <button>Modifier la recette</button>
            </Link>
            <div className="recipe">
                <h2>{recipe.name}</h2>
                <p>{recipe.description}</p>
                <img src={recipe.picture} alt={recipe.name} />

                <h2>Liste des ingrédients</h2>
                <ul>
                    {recipe.ingredients.map(ingredient => {
                        return (
                            <li key={ingredient.name}>{ingredient.name} {ingredient.quantity} {ingredient.units}</li>

                        )
                    })}
                </ul>
                <h2>Etape de la recette :</h2>
                <ol>
                    {cleanString(recipe.steps).map(step => (
                        <li>{step}</li>
                    ))}
                </ol>

            </div>

            <div className="commentaires">
                <p>Pseudo du membre</p>
                <textarea value="texte"> Votre commentaire...</textarea>
                <button type="submit">Ajouter votre commentaire</button>
            </div>

        </>
    );
};

export default Recipe;

