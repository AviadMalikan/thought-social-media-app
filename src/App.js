import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import { AppHeader } from './views/app-header.jsx'
import { Home } from './views/home.jsx'
import { About } from './views/about.jsx'
import { PostIndex } from './views/post-index.jsx'
import { PostEdit } from './cmps/post-edit.jsx';
import { PostDetails } from './cmps/post-details.jsx';
import { UserMsg } from './cmps/user-msg.jsx';

function App() {



  return <Router>
    <section className='main-layout app'>
      <AppHeader />

      <main>
        <Routes>
          <Route path='/about' element={<About />} />
          <Route path='/' element={<Home />} />

          <Route path='/posts' element={<PostIndex />} />
          <Route path='/posts/edit' element={<PostEdit />} />
          <Route path='/posts/edit/:postId' element={<PostEdit />} />
          <Route path='/posts/:postId' element={<PostDetails />} />

          <Route path='*' element={<h2>PAGE NOT FOUND</h2>} />
        </Routes>
      </main>

      <UserMsg />
    </section>
  </Router>;
}

export default App;