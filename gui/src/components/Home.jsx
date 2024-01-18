import {useNavigate} from 'react-router'
import './Home.css';
const Home = () =>{
    const navigate = useNavigate();
    return(
      <>
    <div className='navbar'>
            <div className="navbar-title">IaBilet</div>
            {/* <img className="navbar-image"src='/images/bilete.jpg' width="50" height="50" alt='imagine'></img> */}
        <div className="navbar-buttons">
          <button className="navbar-button" onClick={() => navigate('/')}>Pagina prinicipala</button>
          <button className="navbar-button" onClick={() => navigate('/login')}>Logare</button>
          <button className='navbar-button' onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
    </div>
    <div className='image-container'>
           <button className='containerButton' onClick={() => alert('Intra in cont pentru a vizualiza evenimentul.')}>
            <img className='containerImage' src='/images/logosaga.jpg' width="500" height="500" alt='LogoSaga'></img>
            </button>
            <button className='containerButton'onClick={() => alert("Intra in cont pentru a vizualiza evenimentul.")}>
            <img className='containerImage' src='/images/dinamopetrolul.jpg' width="500" height="500" alt="DinamoPetrolul"></img>
            </button>
            <button className='containerButton' onClick={() =>alert("Intra in cont pentru a vizualiza evenimentul.")}>
            <img className='containerImage' src='/images/logountold.jpg' width="500" height="500" alt='LogoUntold' ></img>
            </button>
    </div>
    <div className='toolbar'>
    <button className='OeButton' onClick={() => navigate('/OrganizeazaEveniment')}>Organizeaza propriul eveniment</button>
    </div>
    </>
    );
};

export default Home;