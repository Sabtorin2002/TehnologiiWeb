import{useNavigate} from 'react-router'
import{useEffect, useState} from 'react'
import axios from 'axios'
import './PaginaOrganizator.css'

const PaginaOrganizator = () =>{
const navigate = useNavigate();
const [coduriAcces, setCoduriAcces] = useState([]);

useEffect(()=>{
    async function fetchData(){
        try{
            const response = await axios.get('http://localhost:5000/PaginaOrganizator');
            setCoduriAcces(response.data);
        }catch(error){
            console.log('Eroare la obtinerea datelor din evenimente.', error);
        }
    }

    fetchData();
},[]);

return(
    <>
    <div className='navbar'>
        <div className="navbar-title">IaBilet</div>
            {/* <img className="navbar-image"src='/images/bilete.jpg' width="50" height="50" alt='imagine'></img> */}
        <div className="navbar-buttons">
          <button className="navbar-button" onClick={() => navigate('/')}>Pagina prinicipala</button>
          <button className='lista-participanti'onClick={() => navigate('/PaginaOrganizator/ListaParticipanti')}>Lista participantilor</button>
        </div>
        </div>
        <div className="coduri-acces-lista">
            <h2>Coduri de acces pentru evenimente</h2>
            <ul>
                {coduriAcces.map((coduriAcces, index)=>(
                    <li key={index}>{coduriAcces.CodAcces}</li>
                ))}
            </ul>
        </div>
        
    </>
)

}
export default PaginaOrganizator;