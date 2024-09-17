import { useState } from 'react';

import { AppHeader } from './views/app-header.jsx'
import { Home } from './views/home.jsx'
import { About } from './views/about.jsx'
import { PostIndex } from './views/post-index.jsx'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Swal from 'sweetalert2';
import { PostDetails } from './cmps/post-details.jsx';

function App() {
  // const [page, setPage] = useState('post')

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

  return <Router>
    <section className='main-layout app'>
      <AppHeader />

      <main>
        <Routes>
          <Route path='/about' element={<About />} />
          <Route path='/' element={<Home />} />
        
          <Route path='/posts' element={<PostIndex />} />
          <Route path='/posts/:postId' element={<PostDetails />} />
        
          <Route path='*' element={<h2>PAGE NOT FOUND</h2>} />
        </Routes>
      </main>

    </section>
  </Router>;
}

export default App;