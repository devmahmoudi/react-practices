import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <section>
            <nav className="navbar padding-bottom" >
                <h1 className="alternate-color">
                    وبلاگ ریداکسی من
                </h1>
                <div>
                    <Link to={'/blogs'}>پست ها</Link>
                </div>
            </nav>
        </section>
    )
}

export default Navbar;