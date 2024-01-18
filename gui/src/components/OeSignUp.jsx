import{useNavigate} from 'react-router'
import axios from 'axios'
import './OeSignUp.css'
import { useState } from 'react';

const OeSignUp = () =>{
const navigate = useNavigate();
const [numeOrganizator, setNumeOrganizator] = useState('');
const [adresaOrganizator, setAdresaOrganizator] = useState('');
const [parolaOrganizator, setParolaOrganizator] =useState('');

const handleSignUp = async(e)=>{
    e.preventDefault();
    const nume = document.getElementById('numeAutentificare').value;
    const adresa = document.getElementById('adresaAutentificare').value;
    const parola = document.getElementById('parolaAutentificare').value;

    try{
        const response = await axios.post('http://localhost:5000/OESignUp',{
            nume,
            adresa,
            parola
        });
        if(response.data.validation){
            alert("Autentificare cu succes");
          // console.log("Răspuns server:", response.data.validation, response.data.user ? response.data.user.username : '');
          console.log(response.data);
            navigate('/OELogIn',{state:{user:response.data.user, verificare:true}});
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
            {/* <img className="navbar-image"src='/images/bilete.jpg' width="50" height="50" alt='imagine'></img> */}
        <div className="navbar-buttons">
          <button className="navbar-button" onClick={() => navigate('/')}>Pagina prinicipala</button>
          <button className="navbar-button" onClick={() => navigate('/OELogIn')}>Log in as Organizer</button>
        </div>
        </div>
        <div className="signup-content">
        <h2>Bun venit pe IaBilet!</h2>
        <p>Aici poți organiza propriul tău eveniment. Completează formularul de înregistrare pentru a face parte din echipa noastra.</p>
        <form>
          <div className="form-group">
            <label>
              <input type="text" id="numeAutentificare" value={numeOrganizator} onChange={(e) => setNumeOrganizator(e.target.value)} placeholder='Username' />
            </label>
          </div>
          <div className="form-group">
            <label>
              <input type="text" id="adresaAutentificare" value={adresaOrganizator} onChange={(e) => setAdresaOrganizator(e.target.value)} placeholder='eMail' />
            </label>
          </div>
          <div className="form-group">
            <label>
              <input type="text" id="parolaAutentificare" value={parolaOrganizator} onChange={(e) => setParolaOrganizator(e.target.value)} placeholder='Parola' />
            </label>
          </div>
          <button type="button" onClick={handleSignUp}>Sign Up</button>
          </form>
      </div>
        </>
    );

};

export default OeSignUp;