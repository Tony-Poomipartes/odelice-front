// import recipes from "../data/recipes";
import "semantic-ui-css/semantic.min.css";
import { useState, useEffect } from "react";
import { Card, Image, Rating } from "semantic-ui-react";
import { getAPI } from '../utils/api';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getAPI().get('/recipes')
      .then(response => setRecipes(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      {/* <h1>Liste de toutes les recettes</h1> */}
      <h2>Toutes les recettes</h2>
      <div className="card_AllRecipes">
        {recipes.map((recipe, index) => (
          <div key={index}>
            <Link to={`/recipes/${recipe.id}`}>
              <Card className="myCard">
                <Image src={recipe.picture} alt={recipe.name} />
                <Card.Content>
                  <Card.Header>{recipe.name}</Card.Header>
                  <Card.Description>{recipe.pseudo}</Card.Description>
                </Card.Content>
                <Card.Content>
                  <Card.Description>{recipe.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Rating
                    icon="star"
                    defaultRating={Math.round(recipe.avg_rate)}
                    maxRating={5}
                    disabled
                  />
                </Card.Content>
              </Card>
            </Link>
          </div>
        ))}

      </div>
    </>
  )
}

export default AllRecipes;

