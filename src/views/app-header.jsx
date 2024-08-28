

export function AppHeader({ setPage }) {
    return <header className="app-header full flex main-layout">
            <h1>InstaPOST</h1>

            <nav className="app-nav">
                <a href="#" onClick={() => { setPage('login') }}>Login</a>
                <a href="#" onClick={() => { setPage('about') }}>About</a>
                <a href="#" onClick={() => { setPage('post') }}>Posts</a>
            </nav>
    </header>
}