import{useNavigate} from 'react-router'
import{useState} from 'react'
import axios from 'axios'
import './Signup.css'

const SignUp = () =>{
    const navigate = useNavigate();
    const [numeUtilizator, setNumeUtilizator] = useState('');
    const [prenumeUtilizator, setPrenumeUtilizator] = useState('');
    const [CNPUtilizator, setCNPUtilizator] = useState('');
    const [genUtilizator, setGenUtilizator] = useState('');
    const [usernameUtilizator, setUsernameUtilizator]=useState('');
    const [parolaUtilizator, setParolaUtilizator]=useState('');
    const [codEveniment, setCodEveniment]=useState('');

    const handleSignUp = async(e)=>{
        e.preventDefault();
    const nume = document.getElementById('numeAutentificare').value;
    const prenume = document.getElementById('prenumeAutentificare').value;
    const cnp = document.getElementById('CNPAutentificare').value;
    const gen = document.getElementById('genAutentificare').value;
    const username = document.getElementById("usernameAutentificare").value;
    const password = document.getElementById("parolaAutentificare").value;
    const codEveniment=document.getElementById("codEvenimentAutentificare").value;

    try{
        const response = await axios.post('http://localhost:5000/signup', {
          nume, 
          prenume, 
          cnp, 
          gen, 
          username, 
          password,
          codEveniment
        });
        if(response.data.validation){
          alert("Autentificare cu succes");
        // console.log("Răspuns server:", response.data.validation, response.data.user ? response.data.user.username : '');
        console.log(response.data);
          navigate('/login',{state:{user:response.data.user, verificare:true}});
        }else{
          alert("Autentificare nereusita");
        }
      }catch(error){
        console.error("Eroare in timpul autentificarii:", error);
        alert("A aparut o eroare in timpul autentificarii");
      }

    };
    return(
    <>
    <div className='navbar'>
            <div className="navbar-title">IaBilet</div>
        <div className="navbar-buttons">
          <button className="navbar-button" onClick={() => navigate('/')}>Pagina prinicipala</button>
          <button className="navbar-button" onClick={() => navigate('/login')}>Autentificare</button>
        </div>
    </div>
    <div className="login-content">
          <form>
            <h2>
            Bine ai venit!
              </h2>
          <div className="form-group">
            <label>
              <input type="text" id="numeAutentificare" value={numeUtilizator} onChange={(e) => setNumeUtilizator(e.target.value)} placeholder='Nume' />
            </label>
          </div>
          <div className="form-group">
            <label>
              <input type="text" id="prenumeAutentificare"value={prenumeUtilizator} onChange={(e) => setPrenumeUtilizator(e.target.value)} placeholder='Prenume' />
            </label>
          </div>
          <div className="form-group">
            <label>
              <input type="text" id="CNPAutentificare" value={CNPUtilizator} onChange={(e) => setCNPUtilizator(e.target.value)} placeholder='CNP' />
            </label>
            </div>
            <div className="form-group">
            <label>
              <input type="text" id="genAutentificare" value={genUtilizator} onChange={(e) => setGenUtilizator(e.target.value)} placeholder='Gen' />
            </label>
            </div>
            <div className="form-group">
            <label>
              <input type="text" id="usernameAutentificare" value={usernameUtilizator} onChange={(e) => setUsernameUtilizator(e.target.value)} placeholder='Username' />
            </label>
            </div>
            <div className="form-group">
            <label>
              <input type="text" id="parolaAutentificare" value={parolaUtilizator} onChange={(e) => setParolaUtilizator(e.target.value)} placeholder='Parola' />
            </label>
            </div>
            <div className="form-group">
            <label>
              <input type="text" id="codEvenimentAutentificare" value={codEveniment} onChange={(e) => setCodEveniment(e.target.value)} placeholder='CodEveniment' />
            </label>
            </div>
          <button type="button" onClick={handleSignUp}>SignUp</button>
        </form>
        </div>
    </>
    );
}

export default SignUp;