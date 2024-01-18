import{useNavigate} from 'react-router'
import axios from 'axios'
import './OeLogin.css'
import { useState } from 'react';

const OeLogin = () =>{
const navigate = useNavigate();

const [usernameOrganizator, setUsernameOrganizator] = useState('');
const [parolaOrganizator, setParolaOrganizator] = useState('');

const handleLogin =async(e) =>{
    e.preventDefault();
    const username = document.getElementById("usernameAutentificare").value;
    const password = document.getElementById("parolaAutentificare").value;

    try{
        const response = await axios.post('http://localhost:5000/OELogIn', {username, password});
        if(response.data.validation){
          alert("Logare cu succes");
          console.log(JSON.stringify(response.data, null, 2));
          navigate(`/PaginaOrganizator`,{state:{user:response.data.user, verificare:true}});
        }else{
          alert("Logare nereusita");
        }

    }catch(error){
        console.error("Eroare in timpul autentificarii:", error);
        alert("A aparut o eroare in timpul autentificarii");
      }
}
return(
    <>
    <div className='navbar'>
        <div className="navbar-title">IaBilet</div>
            {/* <img className="navbar-image"src='/images/bilete.jpg' width="50" height="50" alt='imagine'></img> */}
        <div className="navbar-buttons">
          <button className="navbar-button" onClick={() => navigate('/')}>Pagina prinicipala</button>
        </div>
        </div>
        <div className="logIn-content">
        <h2>Bun venit organizatorule!</h2>
        <p>Intra in cont pentru a adauga evenimente oricand vrei tu.</p>
        
        <form>
        <div className="form-group">
            <label>
              <input type="text" id="usernameAutentificare" value={usernameOrganizator} onChange={(e) => setUsernameOrganizator(e.target.value)} placeholder='Username' />
            </label>
          </div>
          <div className="form-group">
            <label>
              <input type="password" id="parolaAutentificare"value={parolaOrganizator} onChange={(e) => setParolaOrganizator(e.target.value)} placeholder='Password' />
            </label>
          </div>
          <button type="button" onClick={handleLogin}>Log in</button>
        </form>
        </div>
    </>
);
}

export default OeLogin;