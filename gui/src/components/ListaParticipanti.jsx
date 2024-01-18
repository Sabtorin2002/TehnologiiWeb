import{useNavigate} from 'react-router'
import{useEffect, useState} from 'react'
import axios from 'axios'
import './PaginaOrganizator.css'

const ListaPariticpanti = () =>{
    const navigate = useNavigate();
    const[coduriAcces, setCoduriAcces]=useState([]);
    const[participants, setParticipants]=useState([]);
    
    useEffect(() => {
        // Fetch data from the server or set the participants array with your data
        axios.get('http://localhost:5000/PaginaOrganizator/ListaParticipanti')
          .then(response => {
            setParticipants(response.data);
          })
          .catch(error => {
            console.error('Error fetching participants:', error);
          });
      }, []);
    return(
    <>
    <div className='navbar'>
        <div className="navbar-title">IaBilet</div>
            {/* <img className="navbar-image"src='/images/bilete.jpg' width="50" height="50" alt='imagine'></img> */}
        <div className="navbar-buttons">
          <button className="navbar-button" onClick={() => navigate('/')}>Pagina prinicipala</button>
          <button className='lista-participanti'onClick={() => navigate('/PaginaOrganizator/')}>Pagina organizator</button>
        </div>
        </div>
        <div className="lista-participanti">
            <h2>Lista Participanti:</h2>
            <ul>
                {participants.map((participant, index)=>(
                    <li key={index}>
                        <strong>Nume:</strong>{participant.Nume},{''}
                        <strong>Prenume:</strong>{participant.Prenume},{''}
                        <strong>Cod Eveniment:</strong>{participant.CodEveniment}
                    </li>
                ))}
            </ul>
        </div>
    </>
    );
}

export default ListaPariticpanti;