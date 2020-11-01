import './App.css';

function App() {
  return (
    <div className="App">
      <h1>CRUD Application</h1>
      
      <div className='form'>
        <label>Nome da receita</label>
        <input type='text' name='nomeReceita'></input>
        <label>Ingredientes</label>
        <input type='text' name='ingredientes'></input>
        <label>Instruções</label>
        <input type='text' name='instrucoes'></input>

        <button type='submit'>Submit</button>
      </div>
      
    </div>
    
  );
}

export default App;
