import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import Eveniment from './components/Eveniment'
import SignUp from './components/SignUp';
import OrganizeazaEveniment from './components/OrganizeazaEveniment'
import OeSignUp from './components/OeSignUp';
import OeLogin from './components/OeLogin';
import PaginaOrganizator from './components/PaginaOrganizator';
import ListaParticipanti from './components/ListaParticipanti'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login'element={<Login/>}></Route>
      <Route path='/login/*'element={<Eveniment/>}></Route>
      <Route path='/login/:eid'element={<Eveniment/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/organizeazaEveniment'element={<OrganizeazaEveniment/>}></Route>
      <Route path='/OESignUp'element={<OeSignUp/>}></Route>
      <Route path='/OELogIn' element={<OeLogin/>}></Route>
      <Route path='/PaginaOrganizator'element={<PaginaOrganizator/>}></Route>
      <Route path='/PaginaOrganizator/ListaParticipanti'element={<ListaParticipanti/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
