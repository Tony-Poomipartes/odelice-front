import { Form } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { getAPI } from "../../utils/api";



const SearchBar = ({recipeList, SetSearchResult}) => {
  const [searchValue, setSearchValue] = useState('')
  const [queriedIngredients, setQueriedIngredients] = useState([])
  const [listIngredients, setListIngredients] = useState([])
  
  useEffect(() => {
    getAPI().get(`/recipes`)
        .then(response => {
          setListRecipes(response.data)
            console.log(response.data)
        })
        .catch(error => console.log(error));  
    // getAPI().get(`/ingredients`)
    //     .then(res=> {
    //       setListIngredients(res.data)
    //       console.log(res.data)
    //     })
}, []);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  }


  // gére la recherche d'ingredient en mettant à jour la liste d'ingrédients rechecher grace à la methode
  // de recherche d'ingredient avec le nouveau tableau mis à jour.
  const handleSubmit = (event) =>{
    event.preventDefault();
    if(searchValue.trim() === ""){  // trim pour eviter les espaces entré et les entré vide
      return
    }
    const curentIngredient = listIngredients.filter((ingredient)=>{
      ingredient.name == searchValue
    })
    const temp = [...queriedIngredients, curentIngredient]

    setSearchValue("")
    setQueriedIngredients([...queriedIngredients, curentIngredient]);
    handleIngredientSearch(temp); //on envoie temp plustot que queriedIngredients car l'etats actuel du state n'est pas encore a jour avec le nouvel ingredients.  
  }
  const removeIngedient = (i) =>{
    let tempIngredients = [...queriedIngredients]             // je fais une copie du tableau avec le spread opérator
    tempIngredients.splice(i,1)                               // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    setQueriedIngredients(tempIngredients);
    handleIngredientSearch(tempIngredients);
  }
  const handleIngredientSearch = (temp) =>{
    getAPI().post(`/recipeWithIngredient`,{body:temp})
      .then(res=>{
        SetSearchResult(res.data);
        console.log(res.data, "dit moi tout")
      })
  }
  return (
    <>
      <Form className="form_container" onSubmit={handleSubmit}>
        <Form.Field width={10} >
          <label>Recherchez vos ingredients</label>
          <input value={searchValue} onChange={handleChange} placeholder="Entrez vos ingrédients ..." />
          <button type='submit'>Ajouter ingrédient</button>
        </Form.Field>
        {queriedIngredients &&
        <>
        <h2>liste des ingrédients</h2>
        <ul>
          {queriedIngredients.map((ingredient,i)=><li key={ingredient}>{ingredient} <button onClick={(event)=>removeIngedient(i)}>X</button></li>)}
        </ul>
        </>
      }
      </Form>
    </>
  )
}
export default SearchBar;