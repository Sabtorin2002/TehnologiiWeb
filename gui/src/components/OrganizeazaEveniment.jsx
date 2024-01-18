import{useNavigate} from 'react-router'
import{useState} from 'react'
import axios from 'axios'
import './OrganizeazaEveniment.css'

const OrganizeazaEveniment = () =>{
    const [nume, setNume] = useState('');
    const [start, setStart] = useState('');
    const [durata, setDurata] = useState('');
    const [locatie, setLocatie] = useState('');
    const [codAcces, setCodAcces]=useState('');
    const navigate = useNavigate();

    const handleCreateEveniment = async(e)=>{
        e.preventDefault();
        const nume = document.getElementById("numeEveniment").value;
        const start = document.getElementById("startEveniment").value;
        const durata = document.getElementById("durataEveniment").value;
        const locatie = document.getElementById("locatieEveniment").value;
        const codAcces = document.getElementById("codAccesEveniment").value;

        try{
            const response = await axios.post('http://localhost:5000/OrganizeazaEveniment' ,{
                nume,
                start,
                durata,
                locatie,
                codAcces
            });
            if(response.data.validation){
                alert("Eveniment creat cu succes");
              // console.log("Răspuns server:", response.data.validation, response.data.user ? response.data.user.username : '');
              console.log(response.data);
                navigate('/login',{state:{user:response.data.user, verificare:true}});
              }else{
                alert("Creare eveniment nereusita.");
              }
        }catch(error){
            console.error("Eroare in timpul adaugarii:", error);
            alert("A aparut o eroare in timpul adaugarii");
        }
    };

    

    return(
        <div className='create-container'>
        <div className='navbar'>
            <div className="navbar-title">IaBilet</div>
            {/* <img className="navbar-image"src='/images/bilete.jpg' width="50" height="50" alt='imagine'></img> */}
        <div className="navbar-buttons">
          <button className="navbar-button" onClick={() => navigate('/')}>Pagina prinicipala</button>
        </div>
    </div>
    <div className="create-content">
          <form>
            <h2>
            Organizeaza propriul tau eveniment!
              </h2>
          <div className="form-group">
            <label>
            <input type="text" id="numeEveniment" value={nume} onChange={(e) => setNume(e.target.value)} placeholder='Titlul evenimentului:' />
            </label>
          </div>
          <div className="form-group">
            <label>
            <input type="text" id="startEveniment" value={start} onChange={(e) => setStart(e.target.value)} placeholder='Data de inceput a evenimentului:' />
            </label>
          </div>
          <div className="form-group">
            <label>
            <input type="text" id="durataEveniment" value={durata} onChange={(e) => setDurata(e.target.value)} placeholder='Durata evenimentului(ore):' />
            </label>
          </div>
          <div className="form-group">
            <label>
            <input type="text" id="locatieEveniment" value={locatie} onChange={(e) => setLocatie(e.target.value)} placeholder='Unde va avea loc evenimentul?' />
            </label>
          </div>
          <div className="form-group">
            <label>
            <input type="text" id="codAccesEveniment" value={codAcces} onChange={(e) => setCodAcces(e.target.value)} placeholder='Codul de acces pentru participanti:' />
            </label>
          </div>
          <button type="button" onClick={handleCreateEveniment}>Creare eveniment</button>
          <h2>
            Vrei sa devii organizator acreditat?
          </h2>
          <button type="button" onClick={() => navigate('/OESignUp')}>Apasa aici</button>
        </form>
        </div>
        </div>

    );
}

export default OrganizeazaEveniment;