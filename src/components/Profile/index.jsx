import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAPI } from "../../utils/api";
import jwt_decode from "jwt-decode";




const Profile = ({ setIsLogged }) => {
  const [searchValue, setsearchValue] = useState("");
  const [member, setMember] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    firstname: "",
    lastname: "",
    pseudo: "",
    picture: ""
  });

  const navigate = useNavigate();
  const decoded = jwt_decode(localStorage.token);
  const id = decoded.id


  useEffect(() => {
    getAPI().get(`/members/${id}`)
      .then(response => {
        setMember(response.data)
        setFormData((prevValue) => {
          return {
            ...prevValue,
            ...response.data

          }
        })
        console.log("user info : ", response.data)
      })
      .catch(error => console.log(error))
  }, [])


  const handleDeleteProfil = () => {
    const confirmed = window.confirm("Etes-vous sûr de vouloir supprimer votre profil ?");
    try {
      if (confirmed) {
        getAPI().delete(`/members/${id}`, { headers: { Authorization: `Bearer ${localStorage.token}` } })
          .then(response => {
            console.log(response.data)
            localStorage.removeItem('token');
            setIsLogged(false)
            
          })
        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchValue.trim() === "") {  // trim pour eviter les espaces entré et les entré vide
      return
    };
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value
    setFormData({
      ...formData,
      [name]: value
    })

  };
  const updateUserProfile = (event) => {
    event.preventDefault();
    delete formData.id
    delete formData.comments
    delete formData.recipes


    console.log("form : ", formData)



    getAPI().put(`/members/${id}`, formData)
      .then(response => {
        setMember(response.data)
        console.log(response.data, "Profil mis à jour avec succès")
      }).catch((error) => console.error(error), "Erreur lors de la mise à jour du profil")
  };



  return (
    <main className="profilPage">
      <button className='deleteButton' onClick={handleDeleteProfil}>Suprrimer votre profil</button>

      <div className="infoUser">
        <div className="informations">
      <h2>Mes informations</h2>
          <div className="PictureProfil">
            <img src={member.picture} alt={member.pseudo} />
          </div>
          <p>Nom : {member.lastname}</p>
          <p>Prénom : {member.firstname}</p>
          <p>Pseudo : {member.pseudo}</p>
          <button className="deconnexion" type="submit">Se déconnecter</button>

        </div>

        <div className="modification">
          <h2>Modifie mes informations</h2>
          <form action="" onSubmit={(event) => updateUserProfile(event)} >
            <label htmlFor="lastname" >lastename : </label>
            <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Entrez votre nom" />
            <label htmlFor="firstname" >firstname : </label>
            <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} placeholder="Entrez votre Prénom" />
            <label htmlFor="pseudo" >pseudo : </label>
            <input type="text" id="pseudo" name="pseudo" value={formData.pseudo} onChange={handleChange} placeholder="Entrez votre Pseudo" />
            <label htmlFor="email" >email : </label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Entrez votre Email" />
            <label htmlFor="password">password : </label>

            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Entrez votre ancien ou nouveau Mot de passe" />
            <p> Le mot de passe doit contenir une majuscule et un chiffre </p>
            <label htmlFor="passwordConfirm">password : </label>

            <input type="password" id="passwordConfirm" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} placeholder="Confirmez votre ancien ou nouveau mot de passe" />
            <label htmlFor="picture" >Mettez le lien de votre photo</label>
            <input type="text" id="picture" name="picture" value={formData.picture} onChange={handleChange} />
            <button type="submit">Modifier</button>
          </form>
        </div>
      </div>


      <div className="myRecipe">
        <h2>Mes recettes</h2>
        <Link to={`/recipes/create`}>
          <button>Ajouter une recette</button>
        </Link>
      </div>


    </main>
  )


}

export default Profile;
