import { useState } from 'react';

import { AppHeader } from './views/app-header.jsx'
import { Login } from './views/login-index.jsx'
import { About } from './views/about.jsx'
import { PostIndex } from './views/post-index.jsx'

import Swal from 'sweetalert2';

function App() {
  const [page, setPage] = useState('post')

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
    <section className='main-layout app'>
      <AppHeader setPage={setPage} />

      <main>
        {page === 'login' && <Login />}
        {page === 'about' && <About />}
        {page === 'post' && <PostIndex />}
      </main>

    </section>
  );
}

export default App;