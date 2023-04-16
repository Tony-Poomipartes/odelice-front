import { useState, useEffect } from "react";
import { getToken } from "./utils/api";
import jwt_decode from "jwt-decode";

// == Import page
import "./styles/_reset.css"
import "./App.css";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";

import Homepage from "./pages/HomePage";
import Signup from "./pages/SignUp/SignUp";
import Recipe from "./pages/Recipe";
import SignIn from "./pages/SignIn";
import CreateRecipe from "./pages/CreateRecipe";
import UpdateRecipe from "./pages/UpdateRecipe";
import AllRecipes from "./pages/AllRecipes";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import CGU from "./pages/CGU";

// Import React
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";



// == Composant
const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    let token = getToken()
    if (token && typeof token == "string") {

      setIsLogged(true);

    }
  }, [])
  console.log(isLogged, "isLoggedFromHome? ")
  return (
    <>
      <Router>
        <AppHeader isLogged={isLogged} setIsLogged={setIsLogged} />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/recipes/:id" element={<Recipe />} />
          <Route path="/profile" element={<Profile setIsLogged={setIsLogged}/>} />
          <Route path="/signin" element={<SignIn setIsLogged={setIsLogged} />} />
          <Route path="/recipes/create" element={<CreateRecipe />} />
          <Route path="/*" element={<Error />} />
          <Route path="/recipes" element={<AllRecipes />} />
          <Route path="/CGU" element={<CGU />} />
          <Route path="/recipes/update/:id" element={<UpdateRecipe />} />
        </Routes>
        <AppFooter />
      </Router>

    </>
  );
};

// == Export
export default App;
