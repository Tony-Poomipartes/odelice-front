import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { Card, Image, Rating } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useState, useEffect } from 'react';
import '../App.css';
import { getAPI } from '../utils/api';

const HomePage = () => {
  const [recipeList, setRecipeList] = useState([])
  const [searchResult, SetSearchResult] = useState([])

  useEffect(() => {
    getAPI().get('/recipes')
      .then(response => setRecipeList(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <SearchBar recipeList={recipeList} SetSearchResult={SetSearchResult} />
      <div className="card_AllRecipes" >
        {searchResult.length < 1 &&
          recipeList.map((recipe, index) => (
            <div key={index}>
              <Link to={`/recipes/${recipe.id}`}>
                <Card className="myCard">
                  <Image src={recipe.picture} />
                  <Card.Content>
                    <Card.Header>{recipe.name}</Card.Header>
                    <Card.Description>{recipe.pseudo}</Card.Description>
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
          ))
        }
        {searchResult && searchResult.map((recipe, index) => (
          <div key={index}>
            <Link to={`/recipes/${recipe.id}`}>
          <Card className="myCard">
              <Image src={recipe.picture} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{recipe.name}</Card.Header>
                <Card.Description>{recipe.pseudo}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Rating
                  icon="star"
                  defaultRating={Math.round(recipe.average_rating)}
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
  );
};
export default HomePage;
