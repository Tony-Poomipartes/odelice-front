import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAPI } from "../../utils/api";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [picture, setPicture] = useState ("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const register = async (event) => {
    event.preventDefault();

    // valide le formulaire (aucun input ne doit être vide et les mdp doivent correspondrent)
    if (!email || !password || !passwordConfirm || !pseudo) {
      setErrorMessage("Veuillez remplir tous les champs");
      return;
    }

    if (password !== passwordConfirm) {
      setErrorMessage("les mots de passes ne correspondent pas");
      return;
    } 

    // requête pour enregistrer l'utilisateur en BDD
    try {
      const resp = await getAPI().post("/members",{
          email,
          password,
          passwordConfirm,
          firstname,
          lastname,
          pseudo, 
          picture,
      });
      console.log(resp)

    } catch (error) {
      console.log(error);
    }

    // redirection
    navigate("/signin");
  };

  return (
    <>
      <h1>Création de compte</h1>

      <form action="" onSubmit={register} className="signupForm">
        {errorMessage && <p>{errorMessage}</p>}
 
        <label htmlFor="picture">Mettez le lien de votre photo</label>
        <input
         type="text"
         name="picture"
         value={picture}
         onChange={(event) => setPicture (event.target.value)}
         /> 

        <label htmlFor="name">Entrez votre prénom: </label>
        <input
          type="text"
          name="firstname"
          placeholder="Pierre"
          value={firstname}
          onChange={(event) => setFirstname(event.target.value)}
        />

        <label htmlFor="name">Entrez votre nom: </label>
        <input
          type="text"
          name="lastname"
          placeholder="Dupont"
          value={lastname}
          onChange={(event) => setLastname(event.target.value)}
        />

        <label htmlFor="name">Entrez votre email: </label>
        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label htmlFor="name">Entrez votre mot de passe </label>
        
        <input
          type="password"
          name="password"
          placeholder="mot de passe"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <p> Le mot de passe doit contenir une majuscule et un chiffre </p>

        <label htmlFor="name">Confirmez votre mot de passe :</label>
        <input
          type="password"
          name="passwordConfirm"
          placeholder="mot de passe"
          value={passwordConfirm}
          onChange={(event) => setPasswordConfirm(event.target.value)}
        />

        <label htmlFor="name">Entrez votre pseudo :</label>
        <input
          type="text"
          name="pseudo"
          placeholder="JeanBon67"
          value={pseudo}
          onChange={(event) => setPseudo(event.target.value)}
        />

        <button type="submit">Créer un compte</button>
      </form>
    </>
  );
};

export default Signup;
