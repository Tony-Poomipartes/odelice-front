import { NavLink } from 'react-router-dom'

const Navbar = ({ isLogged, setIsLogged }) => {
  //je  suprime le token du localStorage
  const deleteToken = () => {
    localStorage.removeItem('token')
    setIsLogged(false)
  }
  // lien de menu .. 
  const liens = [
    {
      url: "/",
      name: "Home",
      isLoggedIn: false,
    }, {
      url: "/recipes",
      name: "Nos Recettes",
      isLoggedIn: false
    },

  ]
  const loginManager = [
    {
      url: "/signin",
      name: "Se Connecter",
      isLoggedIn: false
    },
    {
      url: "/signup",
      name: "S'inscrire",
      isLoggedIn: false
    },
    {
      url: "/",
      name: "Déconnexion",
      isLoggedIn: true,
      function: ()=>{deleteToken()}
    },
    {
      url: "/profile",
      name: "Mon Profil",
      isLoggedIn: true
    }
  ];

  return (
    <>
      {/* Si nous avons des liens :  */}
      {liens &&
        // alors on afiche la nav ... 
        
          <ul className='list-link'>
            {/* on boucle sur la liste de liens avec map .  */}
            {/* si nous avons un token et le lien.name est "connections on replace l'entrée de la nav ... " */}
            {liens.map((lien) =>
              <li key={lien.name}><NavLink to={lien.url} className={({ isActive }) => `link nav-link${isActive ? 'menu-link--selected' : ''}`}>{lien.name}</NavLink> </li> 
            )}
            {
              loginManager.map((lien) => {
                
                if (!isLogged && !lien.isLoggedIn) {
                  return <li key={lien.name}><NavLink to={lien.url} className={({ isActive }) => `link nav-link${isActive ? 'menu-link--selected' : ''}`}>{lien.name}</NavLink> </li>
                }
                else if(isLogged && lien.isLoggedIn) {
                  return <li key={lien.name}><NavLink to={lien.url} className='link' onClick={lien.function} >{lien.name}</NavLink> </li>
                }
              })
            }
          </ul>
      
      }
    </>
  )
};
export default Navbar;