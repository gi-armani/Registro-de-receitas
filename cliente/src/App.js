import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [nomeReceita, setNomeReceita] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [instrucoes, setInstrucoes] = useState('');

  const submitReview = () => {
    Axios.post('http://localhost:4000/api/insert', {nomeReceita: nomeReceita, ingredientes: ingredientes, instrucoes: instrucoes});
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

        <button type='submit' onClick={submitReview}>Submit</button>
      </div>
      
    </div>
    
  );
}

export default App;
