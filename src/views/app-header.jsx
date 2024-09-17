import { NavLink } from "react-router-dom"

export function AppHeader() {
    return <header className="app-header full ">
        <span className="logo pointer" href="#">@thought</span>

        <nav className="app-nav">
            <NavLink to='/about'>About</NavLink>
            <NavLink to='/posts'>Posts</NavLink>
        </nav>
        <a className="login-btn" href="/#" >Login</a>
    </header>
}