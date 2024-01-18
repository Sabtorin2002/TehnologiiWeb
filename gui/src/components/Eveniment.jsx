import {useNavigate} from 'react-router'
import {useState, useEffect} from 'react'
import './Eveniment.css';
import axios from 'axios';
const Eveniment = () =>{
    const navigate = useNavigate();
    const [stareEveniment1, setStareEveniment1] =useState('CLOSED');
    const [stareEveniment2, setStareEveniment2] =useState('CLOSED');
    const [stareEvenimentt3, setStareEveniment3] =useState('CLOSED');
    const [timpPanaLaDeschidereEveniment2, setTimpPanaLaDeschidereEveniment2] =useState(null);
    const [timpPanaLaIncheiereEveniment2, setTimpPanaLaIncheiereEveniment2]=useState(null);
    const oraDeschidereEveniment2=20;
    const durataEveniment2=4;
    const zilePanalaDeschidereEveniment2=3;
    const [codAcces, setCodAcces] = useState('');


    const [prezenta, setPrezent] = useState('');

    const handlePrezent = async(e) =>{
      alert("Prezent la eveniment");
      try{

      }catch(error){
        console.log(error);
      }
    }
    
    useEffect(() => {
      const intervalDeschidereEveniment2 = setInterval(() => {
        setStareEveniment2('OPEN');
        setTimeout(() => {
          setStareEveniment2('CLOSED');
        }, durataEveniment2 * 60 * 60 * 1000); // Convertim durata evenimentului în milisecunde
      }, calculeazaTimpPanaLaOra(oraDeschidereEveniment2));
  
      setTimpPanaLaDeschidereEveniment2(calculeazaTimpPanaLaOra(oraDeschidereEveniment2));
      setTimpPanaLaIncheiereEveniment2(calculeazaTimpPanaLaOra(oraDeschidereEveniment2 + durataEveniment2));
  
      return () => clearInterval(intervalDeschidereEveniment2);
    }, []);
  
    const calculeazaTimpPanaLaOra = (oraProgramata) => {
      const acum = new Date();
      const dataDeschidere = new Date(acum.getFullYear(), acum.getMonth(), acum.getDate() + zilePanalaDeschidereEveniment2, oraProgramata, 0, 0, 0);
    const timpPanaLaOra = dataDeschidere - acum;
    return timpPanaLaOra + (timpPanaLaOra > 0 ? 0 : 24 * 60 * 60 * 1000); // 24 de ore în milisecunde pentru a gestiona ora programată pentru ziua următoare
    };
  
    const handleEveniment2Click = () => {
      alert(`Timp rămas până când evenimentul devine OPEN: ${timpPanaLaDeschidereEveniment2 / (60 * 1000)} minute`);
      alert(`Evenimentul se va încheia în: ${(timpPanaLaIncheiereEveniment2) / (60 * 1000)} minute`);
    };
  
    

    return(
      <>
    <div className='navbar'>
    {/* <img className="navbar-image"src='/images/bilete.jpg' width="50" height="50" alt='imagine'></img> */}
            <div className="navbar-title">IaBilet</div>
        <div className="navbar-buttons">
          {/* <button className="navbar-button" onClick={() => navigate('/')}>Home</button> */}
          <button className="navbar-button" onClick={() => navigate('/login')}>Iesire din cont</button>
        </div>
    </div>
    <div className='image-container'>
    <button className='containerButton' onClick={() => alert(stareEveniment1)}>
            <img className='containerImage' src='/images/logosaga.jpg' width="500" height="500" alt='LogoSaga'></img>
            </button>
            <button className='containerButton'onClick={handleEveniment2Click}>
            <img className='containerImage' src='/images/dinamopetrolul.jpg' width="500" height="500" alt="DinamoPetrolul"></img>
            </button>
            <button className='containerButton' onClick={() =>alert(stareEvenimentt3)}>
            <img className='containerImage' src='/images/logountold.jpg' width="500" height="500" alt='LogoUntold' ></img>
            </button>
    </div>
    <div className='title'>
    <h2>Completeaza urmatorul form pentru a marca prezenta la eveniment.</h2>
    <label>
      <input type="text" id="codAccesAutentificiare "value={codAcces} onChange={(e) => setCodAcces(e.target.value)} placeholder='Introdu codul de acces pentru eveniment pentru a marca prezenta:' />
      </label>
            <label></label>
    </div>
    <div className="form-group centered-form-group">
              <button type='button' onClick={handlePrezent}>Prezent</button> 
          </div>
    </>
    );
};

export default Eveniment;
