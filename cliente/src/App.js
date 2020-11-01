import './App.css';

function App() {
  return (
    <div className="App">
      <h1>CRUD Application</h1>
      
      <div className='form'>
        <label>Song name</label>
        <input type='text' name='songName'></input>
        <label>Lyrics analysis</label>
        <input type='text' name='songName'></input>

        <button type='submit'>Submit</button>
      </div>
      
    </div>
    
  );
}

export default App;
