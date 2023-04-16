import { getAPI, setToken } from "../utils/api";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signin = ({setIsLogged}) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const login = async (event) => {
    event.preventDefault();


    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs");
      return;
    }


    try {
      const resp = await getAPI().post("/auth/login", {
        email,
        password,
      });
      console.log(resp);

      const token = resp.data.accessToken
      
      if(token){
        setToken(token);
        setIsLogged(true)
      }

      navigate("/");
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div>
      <h1>Connexion à votre compte</h1>
      <form action="" onSubmit={login} className="signinForm">
        {errorMessage && <p>{errorMessage}</p>}

        <label htmlFor="name">Mail :</label>
        <input
          type="email"
          name="email"
          placeholder="entrez votre email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="name">Mot de passe</label>
        <input
          type="password"
          name="password"
          placeholder="entrez votre mot de passe"
          onChange={(event) => setPassword(event.target.value)}
        />
        <p className="password">Mot de passe oublié?</p>

        <button className="button_signin">Connexion</button>
      </form>
      <Link to={"/signup"}>
        <p className="notEnregistred">Vous n'êtes pas encore inscrit?</p>
      </Link>
    </div>
  );
}
export default Signin;
