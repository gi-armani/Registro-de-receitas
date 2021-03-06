import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [nomeReceita, setNomeReceita] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [instrucoes, setInstrucoes] = useState('');
  const [listaReceitas, setListaReceitas] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:4000/api/get').then((response) => {
      setListaReceitas(response.data);
      //console.log(response.data);
    });
  }, []);
  
  const submitReview = () => {
    console.log('deu');
    Axios.post('http://localhost:4000/api/insert', {
      nomeReceita: nomeReceita, 
      ingredientes: ingredientes, 
      instrucoes: instrucoes
    }).then(() => {
      alert('sucess')
    });
  };

  return (
    <div className="App">
      <h1>CRUD Application</h1>
      
      <div className='form'>
        <label>Nome da receita</label>
        <input type='text' name='nomeReceita' onchange={(e) => (
          setNomeReceita(e.target.value)
        )}></input>
        <label>Ingredientes</label>
        <input type='text' name='ingredientes' onchange={(e) => (
          setIngredientes(e.target.value)
        )}></input>
        <label>Instruções</label>
        <input type='text' name='instrucoes' onchange={(e) => (
          setInstrucoes(e.target.value)
        )}></input>

        <button  onClick={submitReview()}>Submit</button>
      
        {listaReceitas.map((val) => {
          return <h1>Nome da receita: {val.nomeReceita}</h1>
        })}
      </div>
      
    </div>
    
  );
}

export default App;
