import {useNavigate} from 'react-router'
import './Login.css';
import {useState} from 'react'
import axios from 'axios'

const Login = () =>{
    const navigate = useNavigate();
    const[usernameUtilizator, setUsername] = useState('');
    const[passwordUtilizator, setPassword] = useState('');
    
    const handleLogin = async(e) =>{
      e.preventDefault();
      const username = document.getElementById("usernameAutentificare").value;
      const password = document.getElementById("parolaAutentificare").value;

      try{
        const response = await axios.post('http://localhost:5000/login', {username, password});
        if(response.data.validation){
          alert("Logare cu succes");
          console.log(JSON.stringify(response.data, null, 2));
          navigate(`/login/${response.data.user.ID}`,{state:{user:response.data.user, verificare:true}});
        }else{
          alert("Logare nereusita");
        }
      }catch(error){
        console.error("Eroare in timpul autentificarii:", error);
        alert("A aparut o eroare in timpul autentificarii");
      }
    }
    return(
    <div className="login-container">
        <div className='navbar'>
            <div className="navbar-title">IaBilet</div>
            <div className="navbar-buttons">
          <button className="navbar-button" onClick={() => navigate('/')}>Pagina Principala</button>
            </div>
        </div>
        <div className="login-content">
          <form>
            <h2>
            Bine ai venit!
              </h2>
          <div className="form-group">
            <label>
              <input type="text" id="usernameAutentificare" value={usernameUtilizator} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
            </label>
          </div>
          <div className="form-group">
            <label>
              <input type="password" id="parolaAutentificare"value={passwordUtilizator} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            </label>
          </div>
          <button type="button" onClick={handleLogin}>Log in</button>
        </form>
        </div>
        </div>
    );
};

export default Login;