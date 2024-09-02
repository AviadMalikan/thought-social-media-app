import { useState } from 'react';

import { AppHeader } from './views/app-header.jsx'
import { Home } from './views/home.jsx'
import { About } from './views/about.jsx'
import { PostIndex } from './views/post-index.jsx'

import Swal from 'sweetalert2';

function App() {
  const [page, setPage] = useState('post')

  function showMsg(msg, isSuccess, text) {
    const Toast = Swal.mixin({
      toast: true,
      background: "rgba(247, 238, 211)",
      position: "bottom-end",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: isSuccess ? 'success' : 'error',
      text: isSuccess ? text : 'try again later',
    });
  }

  return (
    <section className='main-layout app'>
      <AppHeader setPage={setPage} />

      <main>
        {page === 'login' && <Home showMsg={showMsg} />}
        {page === 'about' && <About />}
        {page === 'post' && <PostIndex showMsg={showMsg} />}
      </main>

    </section>
  );
}

export default App;