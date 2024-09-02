

export function AppHeader({ setPage }) {
    return <header className="app-header full ">
        <span className="logo">@thought</span>

        <nav className="app-nav">
            <a href="#" onClick={() => { setPage('about') }}>About</a>
            <a href="#" onClick={() => { setPage('post') }}>Posts</a>
        </nav>
        <a className="login-btn" href="#" onClick={() => { setPage('login') }}>Login</a>
    </header>
}