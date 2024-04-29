import './NavBar.css'

function NavBar(){

    return(
        <header>
            <nav>
                <div className="logo">HomeGroom</div>
                <ul>
                    <li>Services</li>
                    <li>About</li>
                    <li>
                        <button className="btn">SignIn</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}


export default NavBar;