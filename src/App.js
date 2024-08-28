import './assets/App.css';
import Swal from 'sweetalert2';
// import "sweetalert2/src/sweetalert2.scss"

function App() {

  function showMsg(isSuccess, msg) {

    Swal.fire({
      title: msg,
      icon: isSuccess ? 'success' : 'error',
      text: isSuccess ? '' : 'try again later',
      showConfirmButton: false,
      timer: 1200,
      width: '250px',
      position: 'bottom-end',
      backdrop: 'rgba(0,0,123,0.0)',
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello react</h1>
        <button onClick={() => showMsg(true, 'Remove successfully')}> OK</button>
      </header>
    </div>
  );
}

export default App;